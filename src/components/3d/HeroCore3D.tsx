import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { IllusionMode } from '../../types';

interface CoreSceneProps {
  mode: IllusionMode;
  onHoverStateChange?: (hovered: boolean) => void;
}

const CoreModel: React.FC<CoreSceneProps> = ({ mode, onHoverStateChange }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const ring1Ref = useRef<THREE.Mesh>(null!);
  const ring2Ref = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  const getCoreColors = () => {
    switch (mode) {
      case 'matrix':
        return { primary: '#10b981', secondary: '#34d399', accent: '#059669' };
      case 'cyberpunk':
        return { primary: '#ec4899', secondary: '#a855f7', accent: '#06b6d4' };
      case 'gold':
        return { primary: '#f59e0b', secondary: '#fbbf24', accent: '#d97706' };
      case 'quantum':
      default:
        return { primary: '#06b6d4', secondary: '#8b5cf6', accent: '#3b82f6' };
    }
  };

  const colors = getCoreColors();

  useFrame((state, delta) => {
    const speedMultiplier = hovered ? 2.5 : 1.0;

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4 * speedMultiplier;
      meshRef.current.rotation.y += delta * 0.6 * speedMultiplier;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.8 * speedMultiplier;
      ring1Ref.current.rotation.x += delta * 0.3 * speedMultiplier;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.7 * speedMultiplier;
      ring2Ref.current.rotation.z -= delta * 0.4 * speedMultiplier;
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  const handlePointerOver = () => {
    setHovered(true);
    if (onHoverStateChange) onHoverStateChange(true);
  };

  const handlePointerOut = () => {
    setHovered(false);
    if (onHoverStateChange) onHoverStateChange(false);
  };

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        {/* Inner Glowing Neural Core */}
        <mesh
          ref={meshRef}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          scale={hovered ? 1.25 : 1.1}
        >
          <icosahedronGeometry args={[1.5, 2]} />
          <MeshDistortMaterial
            color={colors.primary}
            emissive={colors.primary}
            emissiveIntensity={hovered ? 0.9 : 0.5}
            roughness={0.2}
            metalness={0.8}
            distort={hovered ? 0.4 : 0.25}
            speed={3}
            wireframe={false}
          />
        </mesh>

        {/* Wireframe Shell Overlay */}
        <mesh scale={hovered ? 1.35 : 1.2}>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshBasicMaterial
            color={colors.secondary}
            wireframe
            transparent
            opacity={hovered ? 0.6 : 0.3}
          />
        </mesh>

        {/* Outer Orbiting Gyro Ring 1 */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[2.5, 0.04, 16, 100]} />
          <meshStandardMaterial
            color={colors.secondary}
            emissive={colors.secondary}
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Outer Orbiting Gyro Ring 2 */}
        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[3.0, 0.03, 16, 100]} />
          <meshStandardMaterial
            color={colors.accent}
            emissive={colors.accent}
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Small Orbital Satellites */}
        {[0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].map((angle, idx) => (
          <mesh
            key={idx}
            position={[
              Math.cos(angle) * 3.4,
              Math.sin(angle) * 1.5,
              Math.sin(angle) * 2.2,
            ]}
          >
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color={colors.primary}
              emissive={colors.primary}
              emissiveIntensity={1}
            />
          </mesh>
        ))}
      </Float>
    </group>
  );
};

interface HeroCore3DProps {
  mode: IllusionMode;
}

export const HeroCore3D: React.FC<HeroCore3DProps> = ({ mode }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[550px] cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#06b6d4" />
        <spotLight position={[0, 10, 0]} intensity={1.5} penumbra={1} color="#8b5cf6" />

        <CoreModel mode={mode} onHoverStateChange={setIsHovered} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.8}
          autoRotate={!isHovered}
          autoRotateSpeed={1.5}
        />
      </Canvas>

      {/* Floating 3D Interaction Hint Tag */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none px-4 py-1.5 rounded-full glass-panel text-xs text-cyan-300/80 flex items-center gap-2 border border-cyan-500/20 backdrop-blur-md shadow-lg animate-pulse">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>Drag to rotate • Hover to accelerate quantum core</span>
      </div>
    </div>
  );
};
