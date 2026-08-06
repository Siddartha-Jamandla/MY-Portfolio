import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface MailboxSceneProps {
  isTyping: boolean;
  isSent: boolean;
}

const MailboxModel: React.FC<MailboxSceneProps> = ({ isTyping, isSent }) => {
  const cubeRef = useRef<THREE.Mesh>(null!);
  const sphereRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    const speed = isSent ? 4 : isTyping ? 2.5 : 1;

    if (cubeRef.current) {
      cubeRef.current.rotation.y += delta * 0.8 * speed;
      cubeRef.current.rotation.x += delta * 0.4 * speed;
    }

    if (sphereRef.current) {
      sphereRef.current.rotation.y -= delta * 1.2 * speed;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 1.5 * speed;
    }
  });

  return (
    <Float speed={isSent ? 5 : 2} rotationIntensity={1} floatIntensity={1.5}>
      <group>
        {/* Core Geometry (Floating Mailbox / Crystal Node) */}
        <mesh ref={cubeRef}>
          <octahedronGeometry args={[1.6, 0]} />
          <MeshDistortMaterial
            color={isSent ? '#10b981' : isTyping ? '#ec4899' : '#06b6d4'}
            emissive={isSent ? '#10b981' : isTyping ? '#ec4899' : '#06b6d4'}
            emissiveIntensity={isSent ? 1.0 : isTyping ? 0.8 : 0.5}
            metalness={0.9}
            roughness={0.1}
            distort={isSent ? 0.6 : isTyping ? 0.4 : 0.2}
            speed={4}
          />
        </mesh>

        {/* Orbiting Signal Ring */}
        <mesh ref={ringRef}>
          <torusGeometry args={[2.4, 0.04, 16, 100]} />
          <meshStandardMaterial
            color={isSent ? '#34d399' : '#a855f7'}
            emissive={isSent ? '#34d399' : '#a855f7'}
            emissiveIntensity={0.8}
            metalness={0.9}
          />
        </mesh>

        {/* Inner Glowing Orb */}
        <mesh ref={sphereRef} scale={isSent ? 1.4 : 1.0}>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshBasicMaterial
            color={isSent ? '#34d399' : isTyping ? '#f43f5e' : '#38bdf8'}
            wireframe
          />
        </mesh>
      </group>
    </Float>
  );
};

interface ContactMailbox3DProps {
  isTyping: boolean;
  isSent: boolean;
}

export const ContactMailbox3D: React.FC<ContactMailbox3DProps> = ({ isTyping, isSent }) => {
  return (
    <div className="w-full h-[280px] sm:h-[340px] pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} color="#06b6d4" intensity={1} />

        <MailboxModel isTyping={isTyping} isSent={isSent} />
      </Canvas>
    </div>
  );
};
