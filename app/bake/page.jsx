"use client";
import { useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { TextureLoader } from 'three';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import '@/bake/page.css';

function Snow({ count = 2000, area = { x: [0, 10], y: [0, 10], z: [0, 10] } }) {
    const positions = new globalThis.Float32Array(count * 3); // Each snowflake has x, y, z
    const velocities = useRef(new Array(count).fill(0).map(() => Math.random() * 0.02 + 0.01)); // Snowfall speed
    const ref = useRef();

    // Generate random positions within the specified area
    for (let i = 0; i < count; i++) {
        positions[i * 3] = Math.random() * (area.x[1] - area.x[0]) + area.x[0]; // x
        positions[i * 3 + 1] = Math.random() * (area.y[1] - area.y[0]) + area.y[0]; // y
        positions[i * 3 + 2] = Math.random() * (area.z[1] - area.z[0]) + area.z[0]; // z
    }

    // Update snowflake positions each frame
    useFrame(() => {
        const array = ref.current.geometry.attributes.position.array;
        const speed = velocities.current;

        for (let i = 0; i < count; i++) {
            array[i * 3 + 1] -= speed[i]; // Update y position (fall down)
            if (array[i * 3 + 1] < area.y[0]) {
                array[i * 3 + 1] = area.y[1]; // Reset snowflake to the top within bounds
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
}

function GingerbreadWithDecoration({ instance, index, handleClick, focusedIndex }) {
    // Loading the textures for gingerbread model and accessory
    const modelTexture = useLoader(TextureLoader, './gingerbread/ggb1.jpg', () => {
        console.log('Texture loaded');
    });
    modelTexture.flipY = false;

    // Loading the gingerbread model
    const model = useLoader(GLTFLoader, './gingerbread/ggb1.glb', (loader) => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('./draco/');
        loader.setDRACOLoader(dracoLoader);
    });

    // Loading the accessory model
    const accessoryTexture = useLoader(TextureLoader, './accessory/candy.jpg', () => {
        console.log('Accessory Texture loaded');
    });
    accessoryTexture.flipY = false;

    const accessoryModel = useLoader(GLTFLoader, './accessory/candy.glb', (loader) => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('./draco/');
        loader.setDRACOLoader(dracoLoader);
    });

    // Refs for controlling models and group
    const modelRef = useRef();
    const accessoryRef = useRef();
    const [accessoryPosition, setAccessoryPosition] = useState([-27, 0.5, 3]);

    // Apply textures and set up models when they're loaded
    useEffect(() => {
        if (model && model.scene) {
            // Applying texture to the gingerbread model
            model.scene.traverse((child) => {
                if (child.isMesh) {
                    child.material.map = modelTexture;
                    child.material.needsUpdate = true;
                }
            });
            modelRef.current = model.scene;
        }

        if (accessoryModel && accessoryModel.scene) {
            // Applying texture to accessory model (if needed)
            accessoryModel.scene.traverse((child) => {
                if (child.isMesh) {
                    child.material.map = accessoryTexture;
                    child.material.needsUpdate = true;
                }
            });
            accessoryRef.current = accessoryModel.scene;
        }

    }, [model, accessoryModel, modelTexture, accessoryTexture]);

    // If model not loaded, return null
    if (!model || !model.scene || !accessoryModel || !accessoryModel.scene) {
        return null;
    }

    console.log('loaded gingerberad');

    return (
        <group
            scale={instance.scale}
            position={instance.position}
            onClick={() => handleClick(index)}
            focusedIndex={focusedIndex}>

            <primitive
                key={`ggb3Model - ${index}`}
                object={model.scene.clone()}
                position={[0, 0, 0]}
                scale={[1, 1, 1]}
            />

            <primitive
                position={accessoryPosition}
                scale={[1, 1, 1]}
                object={accessoryModel.scene.clone()} />

        </group>
    );
};

function Scene() {
    const sceneTexture = useLoader(TextureLoader, './scene/scene.jpg');
    sceneTexture.flipY = false;

    const sceneModel = useLoader(
        GLTFLoader,
        './scene/scene.glb',
        (loader) => {
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('./draco/');
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
}

export default function BakePage() {
    const modelInstances = [
        { position: [2.3, 0, -0.9], scale: 0.1 },
        { position: [2.9, 0, -0.9], scale: 0.1 },
        { position: [3.5, 0, -0.9], scale: 0.1 },
    ];

    // Mode state
    const [selectedMode, setSelectedMode] = useState('inspect'); // inspect, view, decorate, choosePos, chooseDress, message, thankyou
    const [focusedIndex, setFocusedIndex] = useState(null);
    const [canDecorateIndex, setCanDecorateIndex] = useState(0);

    const handleClick = (index) => {
        console.log('Clicked index:', index);
        console.log('Current mode before click:', selectedMode);

        console.log(`can decorate index = ${canDecorateIndex}`);

        if (selectedMode !== 'inspect') {
            console.log(`Gingerbread ${index} clicked in ${selectedMode} mode!`);
            return;
        }

        setFocusedIndex(index);
        setSelectedMode('view');

        console.log(`Gingerbread ${index} clicked and mode changed to view`);
    };

    const handleBack = () => {
        console.log('Handle back clicked, current mode:', selectedMode);

        if (selectedMode === 'inspect') return;

        setFocusedIndex(null);
        setSelectedMode('inspect');
        setSelectedPart(null);
        setMessage(null);
        setSelectedDress(null);

        console.log('Mode changed to inspect');
    };

    const handleGetDecorated = () => {
        setSelectedMode('decorate')
    }

    const handleChoosePos = () => { // show button to choose position
        setSelectedMode('choosePos')
    }

    const handleSelectPart = (part) => {
        setSelectedPart(part); // Update the selected part to choose a dress
        setSelectedMode('chooseDress'); // Change mode to chooseDress
    };

    const handleSelectDress = (dress) => {
        setSelectedDress(dress);
    }

    const handleConfirmDress = () => {
        setSelectedMode('message');
    }

    const handleSendMessage = () => {
        setSelectedMode('thankyou');

        const updatedParts = [...partsInGingerbread];
        updatedParts[focusedIndex][selectedPart] = selectedDress;
        setPartsInGingerBread(updatedParts)
    };

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    // choose parts
    const parts = ['head', 'left hand', 'right hand']
    const [partsInGingerbread, setPartsInGingerBread] = useState([
        { 'head': null, 'left hand': null, 'right hand': null },
        { 'head': null, 'left hand': null, 'right hand': null },
        { 'head': null, 'left hand': null, 'right hand': null },
    ]);
    const [selectedPart, setSelectedPart] = useState(null);
    const [selectedDress, setSelectedDress] = useState(null);
    const [message, setMessage] = useState('');

    const dressOptions = {
        head: ['Hat 1', 'Hat 2', 'Hat 3'],
        'left hand': ['Glove 1', 'Glove 2'],
        'right hand': ['Ring 1', 'Ring 2', 'Ring 3'],
    };

    return (
        <div className="gradient-container relative flex flex-col h-full min-h-screen w-full gap-6 md:mx-auto md:max-w-[25rem] bg-blue-50 text-blue-800 shadow-lg">
            <Canvas>
                <ambientLight intensity={1.5} />
                <ambientLight color={'#ffa35c'} intensity={1} />
                <Snow count={500} area={{ x: [-5, 5], y: [-5, 10], z: [-15, -2] }} />
                <Scene />

                {modelInstances.map((instance, index) => (
                    <GingerbreadWithDecoration
                        key={index}
                        instance={instance}
                        index={index}
                        handleClick={handleClick} />
                ))}

                {/* Camera and Controls */}
                <CameraController focusedIndex={focusedIndex} modelInstances={modelInstances} />
                {/* <OrbitControls /> */}
            </Canvas>

            {selectedMode !== 'inspect' && <button className="absolute top-0 left-0 bg-black text-white w-28"
                onClick={handleBack}>
                back</button>}

            {selectedMode === 'view' && <button className="absolute top-10 left-0 bg-black text-white w-28"
                onClick={handleGetDecorated}>
                get decorate</button>}

            {selectedMode === 'decorate' && <button className="absolute top-20 left-0 bg-black text-white w-28"
                onClick={handleChoosePos}>
                decorate</button>}

            {selectedMode === 'choosePos' && (
                <div className="absolute bottom-0 left-4 z-10">
                    {parts.map((part, index) => {
                        return (
                            <button
                                key={index} // React key for list
                                onClick={() => handleSelectPart(part)} // Pass the key and value
                                className="p-2 m-2 bg-blue-500 text-white w-28"
                            >
                                {part} {/* Display the key */}
                            </button>
                        );
                    })}
                </div>
            )}

            {selectedMode === 'chooseDress' && selectedPart && (
                <div className="absolute bottom-0 left-4 z-10">
                    <div className="p-2 text-white">{`Choose a dress for ${selectedPart}`}</div>
                    {dressOptions[selectedPart].map((dress) => (
                        <button
                            key={dress}
                            onClick={() => handleSelectDress(dress)}
                            className={`p-2 m-2 w-28 ${dress === selectedDress ? 'bg-blue-500' : 'bg-green-500'
                                } text-white`}
                        >
                            {dress}
                        </button>
                    ))}

                    <button
                        className="p-2 mt-4 bg-yellow-500 text-white w-28"
                        onClick={handleConfirmDress}
                    >
                        Confirm
                    </button>
                </div>
            )}

            {selectedMode === 'message' && (
                <div className="absolute bottom-0 left-4 z-10">
                    <div className="p-2 text-white">Send a message to the gingerbread owner:</div>

                    {/* Message input area */}
                    <textarea
                        className="p-2 m-2 w-80 h-32 border rounded-md text-black"
                        value={message}
                        onChange={handleInputChange}
                        placeholder="Type your message here..."
                    />

                    {/* Send button */}
                    <button
                        className="p-2 m-2 bg-green-500 text-white w-28"
                        onClick={handleSendMessage}
                    >
                        Send
                    </button>
                </div>
            )}

            {selectedMode === 'thankyou' && (
                <div className="absolute bottom-0 left-4 z-10">
                    <div className="p-2 text-white">Thank you for your message!</div>

                    {/* Go back to inspect button */}
                    <button
                        className="p-2 m-2 bg-black text-white w-28"
                        onClick={handleBack}
                    >
                        Back to Inspect
                    </button>
                </div>
            )}


        </div>
    );
}

function CameraController({ focusedIndex }) {
    const { camera, gl } = useThree();

    // Default view and focused positions
    const defaultPosition = new THREE.Vector3(2.604 - 1.5 + 3, 3.362 + 2, 4.1);
    const defaultRotation = new THREE.Vector3(-0.56159 - 0.5, 0.358407 - 0.75, 0.20840);
    const focusedPositions = [
        new THREE.Vector3(0.5, 1.149, 0.658),
        new THREE.Vector3(1.1, 0.903, 0.658),
        new THREE.Vector3(1.7, 0.903, 0.658),
    ];
    const focusedRotations = [
        new THREE.Vector3(-1.34159, 0.208407, 0.208407),
        new THREE.Vector3(-1.34159, 0.208407, 0.208407),
        new THREE.Vector3(-1.34159, 0.208407, 0.208407),
    ];

    // Camera position and rotation limits
    const positionLimit = {
        x: 2, // How much movement can happen for X axis
        y: 2, // How much movement can happen for Y axis
        z: 2, // How much movement can happen for Z axis
    };
    const rotationLimit = {
        x: 0.75, // How much rotation can happen for X axis
        y: 0.75, // How much rotation can happen for Y axis
        z: 0.75, // How much rotation can happen for Z axis
    };

    // Camera transition logic with movement limits
    useFrame(() => {
        const targetPosition = focusedIndex !== null ? focusedPositions[focusedIndex] : defaultPosition;
        const targetRotation = focusedIndex !== null ? focusedRotations[focusedIndex] : defaultRotation;

        // Smoothly transition position
        camera.position.lerp(targetPosition, 0.03);

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
            enablePan={true}
            enableZoom={true}
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