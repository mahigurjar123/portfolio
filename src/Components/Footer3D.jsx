import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';

const Background = () => {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.1;
      meshRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere ref={meshRef} args={[1, 100, 100]} position={[0, 0, -5]}>
          <MeshDistortMaterial
            color="#4c1d95"
            attach="material"
            distort={0.4}
            speed={1.5}
            roughness={0}
          />
        </Sphere>
      </Float>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
    </>
  );
};

const Footer3D = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Background />
      </Canvas>
    </div>
  );
};

export default Footer3D;
