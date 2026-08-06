import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Skill, IllusionMode } from '../../types';

interface SkillNodeProps {
  skill: Skill;
  position: [number, number, number];
  isSelected: boolean;
  onSelect: (skill: Skill) => void;
}

const SkillNode: React.FC<SkillNodeProps> = ({ skill, position, isSelected, onSelect }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(hovered || isSelected ? 1.3 : 1.0);
    }
  });

  return (
    <group position={position}>
      {/* Node Sphere Point */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(skill);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial
          color={skill.color || '#06b6d4'}
          emissive={skill.color || '#06b6d4'}
          emissiveIntensity={hovered || isSelected ? 1.2 : 0.6}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* HTML Overlay Label */}
      <Html distanceFactor={12} center position={[0, 0.45, 0]}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect(skill);
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`cursor-pointer whitespace-nowrap px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200 select-none flex items-center gap-1.5 shadow-lg border ${
            isSelected
              ? 'bg-cyan-500/90 text-white border-cyan-300 ring-2 ring-cyan-400 scale-110 shadow-cyan-500/50'
              : hovered
              ? 'bg-slate-800/90 text-cyan-300 border-cyan-400/80 scale-105'
              : 'bg-slate-900/80 text-slate-200 border-slate-700/60 hover:border-slate-500'
          }`}
        >
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{ backgroundColor: skill.color || '#06b6d4' }}
          />
          <span>{skill.name}</span>
        </div>
      </Html>
    </group>
  );
};

interface SphereCloudProps {
  skills: Skill[];
  selectedSkill: Skill | null;
  onSelectSkill: (skill: Skill) => void;
  mode: IllusionMode;
}

const SphereCloud: React.FC<SphereCloudProps> = ({ skills, selectedSkill, onSelectSkill }) => {
  const groupRef = useRef<THREE.Group>(null!);

  // Distribute skills evenly on Fibonacci sphere geometry
  const positions = useMemo(() => {
    const pos: [number, number, number][] = [];
    const count = skills.length;
    const radius = 5.2;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y) * radius;
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      pos.push([x, y * radius, z]);
    }
    return pos;
  }, [skills]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glowing Central Nucleus */}
      <mesh>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.8}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Orbit Rings */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[5.2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} />
      </mesh>

      {/* Skill Nodes */}
      {skills.map((skill, idx) => (
        <SkillNode
          key={skill.name}
          skill={skill}
          position={positions[idx] || [0, 0, 0]}
          isSelected={selectedSkill?.name === skill.name}
          onSelect={onSelectSkill}
        />
      ))}
    </group>
  );
};

interface SkillSphere3DProps {
  skills: Skill[];
  selectedSkill: Skill | null;
  onSelectSkill: (skill: Skill) => void;
  mode: IllusionMode;
}

export const SkillSphere3D: React.FC<SkillSphere3DProps> = ({
  skills,
  selectedSkill,
  onSelectSkill,
  mode,
}) => {
  return (
    <div className="relative w-full h-[400px] sm:h-[500px] cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden glass-panel border border-slate-800">
      <Canvas camera={{ position: [0, 0, 11], fov: 55 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <directionalLight position={[-10, -10, -5]} intensity={0.6} />

        <SphereCloud
          skills={skills}
          selectedSkill={selectedSkill}
          onSelectSkill={onSelectSkill}
          mode={mode}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.8}
          autoRotate={false}
        />
      </Canvas>

      <div className="absolute top-4 right-4 pointer-events-none px-3 py-1 rounded-full glass-panel text-xs text-slate-300 border border-slate-700/50">
        360° Drag & Orbit
      </div>
    </div>
  );
};
