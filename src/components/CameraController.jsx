import { useThree } from "@react-three/fiber";
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export const CameraController = ({ focusedIndex }) => {
    const { camera, gl } = useThree();

    const defaultPosition = new THREE.Vector3(2.104 + 2.5, 5.362, 2.1 + 5.5 - 2);
    const defaultRotation = new THREE.Vector3(-0.56159 - 0.5, 0.358407 - 0.75, 0.20840 - 0.7);
    const focusedPositions = [
        new THREE.Vector3(0.8, 1, 1),
        new THREE.Vector3(2, 2, 1.4),
        new THREE.Vector3(3.7, 2, 3),
    ];
    const focusedRotations = [
        new THREE.Vector3(-3, 2, 1),
        new THREE.Vector3(-1, 0, 1),
        new THREE.Vector3(0, 0.208407, 0.208407),
    ];

    const positionLimit = {
        x: 20,
        y: 10,
        z: 5,
    };
    const rotationLimit = {
        x: 2,
        y: 2,
        z: 2,
    };

    useFrame(() => {
        const targetPosition = focusedIndex !== null ? focusedPositions[focusedIndex] : defaultPosition;
        const targetRotation = focusedIndex !== null ? focusedRotations[focusedIndex] : defaultRotation;

        // Smoothly transition position
        camera.position.lerp(targetPosition, 0.01);

        // Apply limits for position (clamp the position within defined limits)
        camera.position.x = THREE.MathUtils.clamp(camera.position.x, targetPosition.x - positionLimit.x, targetPosition.x + positionLimit.x);
        camera.position.y = THREE.MathUtils.clamp(camera.position.y, targetPosition.y - positionLimit.y, targetPosition.y + positionLimit.y);
        camera.position.z = THREE.MathUtils.clamp(camera.position.z, targetPosition.z - positionLimit.z, targetPosition.z + positionLimit.z);

        // Smoothly transition rotation
        camera.rotation.x = THREE.MathUtils.clamp(camera.rotation.x, targetRotation.x - rotationLimit.x, targetRotation.x + rotationLimit.x);
        camera.rotation.y = THREE.MathUtils.clamp(camera.rotation.y, targetRotation.y - rotationLimit.y, targetRotation.y + rotationLimit.y);
        camera.rotation.z = THREE.MathUtils.clamp(camera.rotation.z, targetRotation.z - rotationLimit.z, targetRotation.z + rotationLimit.z);
    });

    return (
        <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            enableDamping={true}
            dampingFactor={0.25}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 3}
            minDistance={1}
            maxDistance={5}
            args={[camera, gl.domElement]}
        />
    );
}