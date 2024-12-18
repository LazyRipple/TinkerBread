"use client";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useState, useRef } from "react";
import * as THREE from "three";

export default function DressingScene() {
    const [focusedIndex, setFocusedIndex] = useState(null);
    const [selectedMode, setSelectedMode] = useState(null); // "view" or "decorate"
    const [gingerbreadStyles, setGingerbreadStyles] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ]);
    const [currentPos, setCurrentPos] = useState(null);
    const [canChangeFocus, setCanChangeFocus] = useState(true);

    const isLocked = (index) =>
        index > 0 && gingerbreadStyles[index - 1].includes(null);

    const handleAccessorySelection = (index, pos, color) => {
        const updatedStyles = [...gingerbreadStyles];
        updatedStyles[index][pos] = color;
        setGingerbreadStyles(updatedStyles);
        setCurrentPos(null);

        if (!updatedStyles[index].includes(null)) setSelectedMode(null);
    };

    const handleGingerbreadClick = (index) => {
        if (canChangeFocus) {
            setFocusedIndex(index);
            setCanChangeFocus(false);
        }
    };

    const handleBackClick = () => {
        setFocusedIndex(null);
        setSelectedMode(null);
        setCurrentPos(null);
        setCanChangeFocus(true);
    };

    return (
        <div className="relative w-screen h-screen">
            <Canvas>
                {/* Lighting and Environment */}
                <ambientLight intensity={0.8} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />
                <Environment preset="sunset" />

                {/* Camera Controller */}
                <CameraController focusedIndex={focusedIndex} />

                {/* Table */}
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
                    <planeGeometry args={[15, 15]} />
                    <meshStandardMaterial color="#8B4513" roughness={1} />
                </mesh>

                {/* Gingerbread Models */}
                {[0, 1, 2].map((index) => (
                    <Gingerbread
                        key={index}
                        index={index}
                        position={[index * 3 - 3, 0, 0]}
                        onClick={() => handleGingerbreadClick(index)} // Click to focus
                        isFocused={focusedIndex === index}
                        isLocked={isLocked(index)}
                        styles={gingerbreadStyles[index]}
                        setCurrentPos={setCurrentPos} // Allow Gingerbread to set position
                        selectedMode={selectedMode}
                        focusedIndex={focusedIndex}
                    />
                ))}
            </Canvas>

            {/* Back Button */}
            {focusedIndex !== null && (
                <button
                    onClick={handleBackClick}
                    className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Back
                </button>
            )}

            {/* Mode Selection */}
            {focusedIndex !== null &&
                selectedMode === null &&
                !currentPos && (
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
                        <button
                            onClick={() => setSelectedMode("view")}
                            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                        >
                            View
                        </button>
                        <button
                            onClick={() => {
                                if (!isLocked(focusedIndex)) setSelectedMode("decorate");
                            }}
                            className={`${isLocked(focusedIndex)
                                ? "bg-gray-500 text-gray-300"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                                } px-4 py-2 rounded`}
                            disabled={isLocked(focusedIndex)}
                        >
                            Decorate
                        </button>
                    </div>
                )}

            {/* Position Selection */}
            {selectedMode === "decorate" && currentPos === null && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    {[0, 1, 2].map((pos) => (
                        <button
                            key={pos}
                            onClick={() => {
                                if (!gingerbreadStyles[focusedIndex][pos] && focusedIndex !== null) setCurrentPos(pos);
                            }}
                            className={`${gingerbreadStyles[focusedIndex][pos]
                                ? "bg-gray-500 text-gray-300"
                                : "bg-green-500 text-white hover:bg-green-600"
                                } px-4 py-2 rounded`}
                            disabled={gingerbreadStyles[focusedIndex][pos] || focusedIndex === null}
                        >
                            Position {pos + 1}
                        </button>
                    ))}
                </div>
            )}

            {/* Accessory Selection */}
            {currentPos !== null && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-6">
                    {["red", "green", "blue"].map((color) => (
                        <div
                            key={color}
                            onClick={() => handleAccessorySelection(focusedIndex, currentPos, color)}
                            className={`cursor-pointer relative`}
                        >
                            <div
                                style={{
                                    backgroundColor: color,
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: "50%",
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)",
                                }}
                            />
                            <span
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-sm"
                                style={{ opacity: 0.8 }}
                            >
                                {color.charAt(0).toUpperCase() + color.slice(1)}
                            </span>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

function CameraController({ focusedIndex }) {
    const { camera, gl } = useThree();

    // Default view and focused positions
    const defaultPosition = new THREE.Vector3(6, 6, 10); // Default angled view
    const focusedPositions = [
        new THREE.Vector3(-3, 6, 0), // Top view of Gingerbread 0
        new THREE.Vector3(0, 6, 0),  // Top view of Gingerbread 1
        new THREE.Vector3(3, 6, 0),  // Top view of Gingerbread 2
    ];

    // Camera transition logic
    useFrame(() => {
        const target = focusedIndex !== null ? focusedPositions[focusedIndex] : defaultPosition;

        camera.position.lerp(target, 0.05);

        if (focusedIndex === null) {
            camera.lookAt(0, 0, 0); // Look at the center of the table
        } else {
            const focusedPosition = focusedPositions[focusedIndex];
            camera.position.set(focusedPosition.x, focusedPosition.y, focusedPosition.z);
            camera.lookAt(focusedPositions[focusedIndex].x, 0, focusedPositions[focusedIndex].z);
        }
    });

    return (
        <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            enableDamping={true}
            dampingFactor={0.25}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 3}
            minDistance={5}
            maxDistance={15}
            target={[0, 0, 0]}
            args={[camera, gl.domElement]}
        />
    );
}
function Gingerbread({ position, onClick, styles, isFocused, setCurrentPos, selectedMode, focusedIndex }) {
    const ref = useRef();
    const [hover, setHover] = useState(false);

    const handlePointerOver = () => {
        if (!focusedIndex) {
            setHover(true);
        }
    };

    const handlePointerOut = () => {
        setHover(false)
    };

    const handlePositionClick = (pos) => {
        if (!styles[pos] && selectedMode === "decorate" && isFocused) { // Only allow click in decorate mode
            setCurrentPos(pos); // Only select position if it's unoccupied
        }
    };

    return (
        <group position={position} rotation={[-Math.PI / 2, 0, 0]} onClick={onClick}>
            <mesh
                ref={ref}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
            >
                <boxGeometry args={[2, 3, 0.1]} />
                <meshStandardMaterial color={"#f4a261"} />
            </mesh>

            {hover && (focusedIndex == null) && !isFocused && (
                <lineSegments>
                    <bufferGeometry attach="geometry" {...new THREE.EdgesGeometry(ref.current.geometry)} />
                    <lineBasicMaterial attach="material" color="white" linewidth={2} />
                </lineSegments>
            )}

            {/* Gingerbread accessories */}
            {styles.map((color, idx) =>
                color ? (
                    <mesh key={idx} position={[0, idx - 1, 0.2]}>
                        <sphereGeometry args={[0.2, 16, 16]} />
                        <meshStandardMaterial color={color} />
                    </mesh>
                ) : (
                    <mesh
                        key={`pos-${idx}`}
                        position={[0, idx - 1, 0]}
                        onClick={() => handlePositionClick(idx)}
                    >
                        <sphereGeometry args={[0.3, 16, 16]} />
                        <meshStandardMaterial color={"#9e2a2b"} transparent opacity={0.2} />
                    </mesh>
                )
            )}
        </group>
    );
}
