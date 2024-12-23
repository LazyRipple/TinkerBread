import { useLoader } from '@react-three/fiber';
import { DRACOLoader } from 'three-stdlib';
import { TextureLoader } from 'three';
import { GLTFLoader } from 'three-stdlib';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

export const Scene = () => {
    const sceneTexture = useLoader(TextureLoader, '/scene/scene.jpg');
    sceneTexture.flipY = false;
    sceneTexture.colorSpace = THREE.SRGBColorSpace

    const sceneModel = useLoader(
        GLTFLoader,
        '/scene/scene.glb',
        (loader) => {
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('/draco/');
            loader.setDRACOLoader(dracoLoader);
        }
    );

    const modelRef = useRef();

    useEffect(() => {
        if (sceneModel && sceneModel.scene) {
            sceneModel.scene.traverse((child) => {
                if (child.isMesh) {
                    child.material.map = sceneTexture;
                    child.material.needsUpdate = true;
                }
            });

            modelRef.current = sceneModel.scene;
        }
    }, [sceneModel, sceneTexture]);

    if (!sceneModel) return null;

    return <primitive object={sceneModel.scene} scale={0.1} position={[1, -3, 5]} />
};