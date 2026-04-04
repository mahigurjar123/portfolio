import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, Box, Torus, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Floating glowing crystal orb 
function GlowOrb({ position, color, speed = 1, scale = 1 }) {
  const meshRef = useRef();
  const initialPos = useRef(position);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    meshRef.current.position.x = initialPos.current[0] + Math.sin(t * 0.5) * 1.5;
    meshRef.current.position.y = initialPos.current[1] + Math.cos(t * 0.4) * 1.2;
    meshRef.current.position.z = initialPos.current[2] + Math.sin(t * 0.3) * 1.0;
    meshRef.current.rotation.x += 0.005 * speed;
    meshRef.current.rotation.y += 0.008 * speed;
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.4}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

// Rotating Torus Ring
function GlowRing({ position, color, speed = 1, scale = 1 }) {
  const meshRef = useRef();
  const initialPos = useRef(position);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    meshRef.current.position.y = initialPos.current[1] + Math.sin(t * 0.3) * 2;
    meshRef.current.rotation.x += 0.01 * speed;
    meshRef.current.rotation.z += 0.008 * speed;
  });

  return (
    <Torus ref={meshRef} args={[1.5, 0.15, 16, 100]} position={position} scale={scale}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.2}
        roughness={0}
        metalness={1}
        transparent
        opacity={0.65}
      />
    </Torus>
  );
}

// Floating Diamond Box
function FloatingCube({ position, color, speed = 1, scale = 1 }) {
  const meshRef = useRef();
  const initialPos = useRef(position);

  useFrame((state) => {
    const t = state.clock.elapsedTime * speed;
    meshRef.current.position.x = initialPos.current[0] + Math.cos(t * 0.4) * 1.8;
    meshRef.current.position.y = initialPos.current[1] + Math.sin(t * 0.5) * 1.0;
    meshRef.current.rotation.x += 0.01 * speed;
    meshRef.current.rotation.y += 0.012 * speed;
    meshRef.current.rotation.z += 0.006 * speed;
  });

  return (
    <Box ref={meshRef} args={[1, 1, 1]} position={position} scale={scale}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.1}
        metalness={0.9}
        wireframe={false}
        transparent
        opacity={0.5}
      />
    </Box>
  );
}

// Particle Nebula Dust
function ParticleField() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const count = isMobile ? 300 : 800; // Reduced count for mobile
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * (isMobile ? 40 : 60);
      arr[i * 3 + 1] = (Math.random() - 0.5) * (isMobile ? 40 : 60);
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return arr;
  }, [count, isMobile]);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#a855f7'), // purple
      new THREE.Color('#38bdf8'), // sky blue
      new THREE.Color('#ec4899'), // pink
      new THREE.Color('#818cf8'), // indigo
    ];
    for (let i = 0; i < count; i++) {
      const col = palette[Math.floor(Math.random() * palette.length)];
      arr[i * 3] = col.r;
      arr[i * 3 + 1] = col.g;
      arr[i * 3 + 2] = col.b;
    }
    return arr;
  }, [count]);

  const particlesRef = useRef();
  useFrame((state) => {
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={isMobile ? 0.2 : 0.15} vertexColors sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

// Mouse-reactive camera movement
function CameraRig() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  useFrame((state) => {
    if (isMobile) {
      // Auto-float on mobile since there is no mouse movement typically
      const t = state.clock.elapsedTime * 0.3;
      state.camera.position.x = Math.sin(t) * 2;
      state.camera.position.y = Math.cos(t) * 1.5;
    } else {
      const mouse = state.mouse;
      state.camera.position.x += (mouse.x * 2 - state.camera.position.x) * 0.05;
      state.camera.position.y += (-mouse.y * 1.5 - state.camera.position.y) * 0.05;
    }
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// Scene
function Scene() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  
  return (
    <>
      <CameraRig />
      
      {/* Lighting */}
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#a855f7" />
      <pointLight position={[-10, -10, 5]} intensity={1.5} color="#38bdf8" />
      <pointLight position={[0, 0, -10]} intensity={1} color="#ec4899" />

      {/* Stars background - Reduced for mobile */}
      <Stars radius={80} depth={50} count={isMobile ? 1000 : 3000} factor={4} saturation={1} fade speed={1} />

      {/* Particle field */}
      <ParticleField />

      {/* Floating Glow Orbs (Icosahedrons) - Minimal on mobile */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <GlowOrb position={[-8, 3, -5]} color="#a855f7" speed={0.8} scale={1.2} />
      </Float>
      {!isMobile && (
        <Float speed={2} rotationIntensity={0.6} floatIntensity={0.7}>
          <GlowOrb position={[9, -2, -8]} color="#38bdf8" speed={1.2} scale={0.9} />
        </Float>
      )}
      <Float speed={1} rotationIntensity={0.4} floatIntensity={0.6}>
        <GlowOrb position={[0, 5, -12]} color="#ec4899" speed={0.6} scale={1.5} />
      </Float>

      {/* Glowing Rings - Fewer on mobile */}
      {!isMobile && (
        <>
          <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
            <GlowRing position={[6, 4, -15]} color="#a855f7" speed={0.7} scale={1.5} />
          </Float>
          <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.8}>
            <GlowRing position={[-7, -5, -12]} color="#ec4899" speed={1.1} scale={1.0} />
          </Float>
        </>
      )}
      <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.5}>
        <GlowRing position={[2, -7, -18]} color="#38bdf8" speed={0.9} scale={1.8} />
      </Float>

      {/* Floating Cubes - Only on desktop for best performance */}
      {!isMobile && (
        <>
          <Float speed={2} rotationIntensity={1} floatIntensity={0.6}>
            <FloatingCube position={[5, -3, -7]} color="#a855f7" speed={1.2} scale={1.2} />
          </Float>
          <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.7}>
            <FloatingCube position={[-5, 6, -9]} color="#38bdf8" speed={0.9} scale={0.8} />
          </Float>
        </>
      )}
    </>
  );
}

// Main Component
const AnimatedBackground = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        background: 'radial-gradient(ellipse at center, #0f0a1e 0%, #09090b 60%, #000000 100%)',
        pointerEvents: 'auto',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AnimatedBackground;
