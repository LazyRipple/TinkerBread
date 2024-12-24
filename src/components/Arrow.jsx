import { useLoader } from '@react-three/fiber';
import { DRACOLoader } from 'three-stdlib';
import { TextureLoader } from 'three';
import { GLTFLoader } from 'three-stdlib';
import { useRef, useEffect } from 'react';
import { SRGBColorSpace } from 'three';

export const Arrow3D = ({ arrow, position, onClick, rotation }) => {
    const sceneTexture = useLoader(TextureLoader, `/icon/${arrow}.jpg`);
    sceneTexture.flipY = false;
    sceneTexture.colorSpace = SRGBColorSpace;

    const sceneModel = useLoader(
        GLTFLoader,
        `/icon/${arrow}.glb`,
        (loader) => {
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('/draco/');
            loader.setDRACOLoader(dracoLoader);
        }
    );

    const groupRef = useRef();

    useEffect(() => {
        if (sceneModel && sceneModel.scene) {
            sceneModel.scene.traverse((child) => {
                if (child.isMesh) {
                    child.material.map = sceneTexture;
                    child.material.needsUpdate = true;
                }
            });
        }
    }, [sceneModel, sceneTexture]);

    if (!sceneModel) return null;

    console.log('arrow loaded');

    return (
        <group
            ref={groupRef}
            position={position}
            rotation={rotation}
            onPointerDown={onClick}
        >
            <primitive object={sceneModel.scene.clone()} scale={0.2} />
        </group>
    );
};
