'use client'
import { useEffect, useRef } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export default function GingerbreadModel({ ggbType }) {
    const modelRef = useRef();

    const texture = useLoader(TextureLoader, `./gingerbread/${ggbType}.jpg`, () => {
        console.log('loaded');
    });
    texture.flipY = false;

    const model = useLoader(
        GLTFLoader,
        `./gingerbread/${ggbType}.glb`,
        (loader) => {
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('./draco/');
            loader.setDRACOLoader(dracoLoader);
        }
    );

    useEffect(() => {
        if (model && model.scene) {
            model.scene.traverse((child) => {
                if (child.isMesh) {
                    child.material.map = texture;
                    child.material.needsUpdate = true;
                }
            });

            modelRef.current = model.scene;
        }
    }, [model, texture]);

    return (
        <Canvas className="mt-4 h-64">
            <ambientLight intensity={0.2} />
            <Stage intensity={0.1} environment="studio">
                <primitive object={model.scene} rotation={[Math.PI / 2, 0, 0]} />
            </Stage>
            <OrbitControls />
        </Canvas>
    );
}