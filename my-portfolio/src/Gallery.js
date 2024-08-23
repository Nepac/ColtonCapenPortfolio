import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Gallery = () => {
  const texture = useTexture('/path/to/your/panorama.jpg'); // Add your panoramic texture

  const handleObjectClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls enableZoom={false} />

      {/* 360-degree environment */}
      <mesh>
        <sphereGeometry args={[500, 60, 40]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>

      {/* Clickable objects */}
      <mesh position={[0, 0, -5]} onClick={() => handleObjectClick('https://yourwebsite.com')}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      {/* Add more objects as needed */}
    </Canvas>
  );
};

export default Gallery;