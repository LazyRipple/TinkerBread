"use client";
import { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export default function TestPage() {
  const model = useLoader(GLTFLoader, './gingerbread/gingerbread3.glb',
    (loader) => {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('./draco/');
      loader.setDRACOLoader(dracoLoader);
    }
  );

  const modelRef = useRef();
  const lightRef = useRef(); // Point light reference

  useEffect(() => {
    if (model && model.scene) {
      console.log(model);
      modelRef.current = model.scene;
    }
  }, [model]);

  return (
    <Canvas>
      {/* Ambient light for basic illumination */}
      <ambientLight intensity={4} />

      {/* Point Light with Helper */}
      <pointLight
        ref={lightRef}
        position={[2, 1, 2]}
        intensity={100}
        distance={10}
        decay={2}
        color="pink"
      />

      {/* Render the GLTF Model */}
      {model && <primitive object={model?.scene} scale={0.35} />}

      <OrbitControls />
    </Canvas>
  );
}
