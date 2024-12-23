import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export const Snow = ({ count = 2000, area = { x: [0, 10], y: [0, 10], z: [0, 10] } }) => {
    const positions = new globalThis.Float32Array(count * 3); // Each snowflake has x, y, z
    const velocities = useRef(new Array(count).fill(0).map(() => Math.random() * 0.02 + 0.01)); // Snowfall speed
    const ref = useRef();

    // Generate random positions within the specified area
    for (let i = 0; i < count; i++) {
        positions[i * 3] = Math.random() * (area.x[1] - area.x[0]) + area.x[0]; // x
        positions[i * 3 + 1] = Math.random() * (area.y[1] - area.y[0]) + area.y[0]; // y
        positions[i * 3 + 2] = Math.random() * (area.z[1] - area.z[0]) + area.z[0]; // z
    }

    useFrame(() => {
        const array = ref.current.geometry.attributes.position.array;
        const speed = velocities.current;

        for (let i = 0; i < count; i++) {
            array[i * 3 + 1] -= speed[i];
            if (array[i * 3 + 1] < area.y[0]) {
                array[i * 3 + 1] = area.y[1];
            }
        }
        ref.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="white"
                size={0.1}
                sizeAttenuation
                transparent
                opacity={0.5}
            />
        </points>
    );
};