import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { IllusionMode } from '../../types';

interface ParticlesProps {
  mode: IllusionMode;
}

const Particles: React.FC<ParticlesProps> = ({ mode }) => {
  const count = 1200;
  const pointsRef = useRef<THREE.Points>(null!);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Generate particle positions and colors based on active illusion mode
  const [positions, colors] = useMemo(() => {
    const posArr = new Float32Array(count * 3);
    const colArr = new Float32Array(count * 3);

    const getPaletteColors = () => {
      switch (mode) {
        case 'matrix':
          return ['#10b981', '#34d399', '#059669', '#a7f3d0'];
        case 'cyberpunk':
          return ['#ec4899', '#a855f7', '#06b6d4', '#f43f5e'];
        case 'gold':
          return ['#f59e0b', '#fbbf24', '#d97706', '#fef3c7'];
        case 'quantum':
        default:
          return ['#06b6d4', '#3b82f6', '#8b5cf6', '#a855f7'];
      }
    };

    const palette = getPaletteColors().map(c => new THREE.Color(c));

    for (let i = 0; i < count; i++) {
      // Spread in a large sphere / box volume
      const radius = 18 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      posArr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      posArr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArr[i * 3 + 2] = radius * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      colArr[i * 3] = color.r;
      colArr[i * 3 + 1] = color.g;
      colArr[i * 3 + 2] = color.b;
    }

    return [posArr, colArr];
  }, [mode, count]);

  // Handle pointer tracking safely
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Smooth lerp for mouse coordinates
    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

    // Slow orbital rotation
    pointsRef.current.rotation.y += delta * 0.04;
    pointsRef.current.rotation.x = mouseRef.current.y * 0.15;
    pointsRef.current.rotation.z = mouseRef.current.x * 0.1;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

interface BackgroundCanvasProps {
  mode: IllusionMode;
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ mode }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-80">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Particles mode={mode} />
      </Canvas>
    </div>
  );
};
