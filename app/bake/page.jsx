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
import '@/style/bake.css';

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
}

function GingerbreadWithDecoration({ instance, index, handleClick, focusedIndex, tempAccessoryOfThis }) {
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

    // Refs for controlling models and group
    const modelRef = useRef();

    useEffect(() => {
        if (model && model.scene) {
            model.scene.traverse((child) => {
                if (child.isMesh) {
                    child.material.map = modelTexture;
                    child.material.needsUpdate = true;
                }
            });
            modelRef.current = model.scene;
        }

    }, [model, modelTexture]);

    // If model not loaded, return null
    if (!model || !model.scene) {
        return null;
    }

    const headAccessory = tempAccessoryOfThis[index]['head'] || null;
    const leftAccessory = tempAccessoryOfThis[index]['left hand'] || null;
    const rightAccessory = tempAccessoryOfThis[index]['right hand'] || null;

    // load head model 

    let headAccessoryModel = null;
    let headAccessoryTexture = null;

    if (headAccessory) {
        headAccessoryModel = useLoader(GLTFLoader, `./accessory/${headAccessory}.glb`, (loader) => {
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('./draco/');
            loader.setDRACOLoader(dracoLoader);
        });

        headAccessoryTexture = useLoader(TextureLoader, `./accessory/${headAccessory}.jpg`, () => {
            console.log(`head texture of ${index} loaded`);
        });
        headAccessoryTexture.flipY = false;
    }

    // load head model 

    let leftAccessoryModel = null;
    let leftAccessoryTexture = null;

    if (leftAccessory) {
        leftAccessoryModel = useLoader(GLTFLoader, `./accessory/${leftAccessory}.glb`, (loader) => {
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('./draco/');
            loader.setDRACOLoader(dracoLoader);
        });

        leftAccessoryTexture = useLoader(TextureLoader, `./accessory/${leftAccessory}.jpg`, () => {
            console.log(`head texture of ${index} loaded`);
        });
        leftAccessoryTexture.flipY = false;
    }

    // load right model 

    let rightAccessoryModel = null;
    let rightAccessoryTexture = null;

    if (rightAccessory) {
        rightAccessoryModel = useLoader(GLTFLoader, `./accessory/${rightAccessory}.glb`, (loader) => {
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('./draco/');
            loader.setDRACOLoader(dracoLoader);
        });

        rightAccessoryTexture = useLoader(TextureLoader, `./accessory/${rightAccessory}.jpg`, () => {
            console.log(`head texture of ${index} loaded`);
        });
        rightAccessoryTexture.flipY = false;
    }

    useEffect(() => {
        const updateAccessoryTexture = (accessoryModel, accessoryTexture) => {
            if (accessoryModel && accessoryModel.scene) {
                accessoryModel.scene.traverse((child) => {
                    if (child.isMesh) {
                        child.material.map = accessoryTexture;
                        child.material.needsUpdate = true;
                    }
                });
            }
        };

        updateAccessoryTexture(headAccessoryModel, headAccessoryTexture);
        updateAccessoryTexture(leftAccessoryModel, leftAccessoryTexture);
        updateAccessoryTexture(rightAccessoryModel, rightAccessoryTexture);
    }, [headAccessoryModel, headAccessoryTexture, leftAccessoryModel, leftAccessoryTexture, rightAccessoryModel, rightAccessoryTexture]);


    const position = {
        'candy': [-27, 0.5, 3],
        'red_present': [-29, 0.6, 3],
        'cup': [-31, 0.6, 2.9],
        'christmas_hat': [-24.8, 0.5, -2.8],
        'reindeer': [-28.2, 0, -3],
        'earpuff': [-32.25, 0.5, -2.2],
        'green_present': [-28.2, 0.6, -3.2],
        'candy2': [-25.8, 0.8, -3.6],
        'christmas_tree': [-23.4, 0.7, -4]
    }

    console.log('head accessory model:', headAccessoryModel, index);
    console.log('left accessory model:', leftAccessoryModel, index);
    console.log('right accessory model:', rightAccessoryModel, index);

    console.log(tempAccessoryOfThis);



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
                scale={1}
            />

            {/* head accessory */}
            {headAccessoryModel && <primitive
                key={`head-accessory-${index}`}
                position={position[headAccessory]}
                scale={1}
                object={headAccessoryModel.scene.clone()} />}

            {/* left hand accessory */}
            {leftAccessoryModel && <primitive
                key={`left-accessory-${index}`}
                position={position[leftAccessory]}
                scale={1}
                object={leftAccessoryModel.scene.clone()} />}

            {/* right hand accessory */}
            {rightAccessoryModel && <primitive
                key={`right-accessory-${index}`}
                position={position[rightAccessory]}
                scale={1}
                object={rightAccessoryModel.scene.clone()} />}
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
    const [selectedMode, setSelectedMode] = useState('inspect'); // inspect, view, choosePos, chooseDress, message, thankyou
    const [focusedIndex, setFocusedIndex] = useState(null);
    const [canDecorateIndex, setCanDecorateIndex] = useState(0);

    const handleClick = (index) => {
        console.log('Clicked index:', index);
        console.log('Current mode before click:', selectedMode);

        console.log(`can decorate index = ${canDecorateIndex}`);


        recalculateIndex();

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

        setFocusedIndex(null);
        setSelectedMode('inspect');
        setSelectedPart(null);
        setMessage(null);
        setSelectedDress(null);
        console.log(partsInGingerbread);

        setTempPartsInGingerBread(JSON.parse(JSON.stringify(partsInGingerbread)));

        console.log('Mode changed to inspect');
    };

    const handleGetDecorated = () => {
        if (focusedIndex !== canDecorateIndex) return;
        setSelectedMode('choosePos')
    }

    const handleSelectPart = (part) => {
        console.log("Part selected:", part);
        setSelectedPart(part);
        setSelectedMode('chooseDress');
        setTempPartsInGingerBread(JSON.parse(JSON.stringify(partsInGingerbread)));
    };

    const handleSelectDress = (dress) => {
        setSelectedDress(dress);
        updateSelectDress({ index: focusedIndex, part: selectedPart, dress: dress });
    }

    const updateSelectDress = ({ index, part, dress }) => {
        if (!dress) return;
        console.log('called');
        console.log('index = ', index);

        const updatedParts = { ...tempPartsInGingerbread };
        updatedParts[index][part] = dress;
        setTempPartsInGingerBread(updatedParts)
    }

    const handleConfirmDress = () => {
        setSelectedMode('message');
    }

    const handleSendMessage = () => {

        setSelectedMode('thankyou');
        setPartsInGingerBread(JSON.parse(JSON.stringify(tempPartsInGingerbread)));
    };

    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    // choose parts
    const parts = ['head', 'left hand', 'right hand']
    const [partsInGingerbread, setPartsInGingerBread] = useState({ // parts that already been saved
        0: { 'head': null, 'left hand': null, 'right hand': null },
        1: { 'head': null, 'left hand': null, 'right hand': null },
        2: { 'head': null, 'left hand': null, 'right hand': null },
    });
    const [tempPartsInGingerbread, setTempPartsInGingerBread] = useState({
        0: { 'head': null, 'left hand': null, 'right hand': null },
        1: { 'head': null, 'left hand': null, 'right hand': null },
        2: { 'head': null, 'left hand': null, 'right hand': null },
    });
    const [selectedPart, setSelectedPart] = useState(null);
    const [selectedDress, setSelectedDress] = useState(null);
    const [message, setMessage] = useState('');

    const dressOptions = {
        'head': ['christmas_hat', 'reindeer', 'earpuff'],
        'left hand': ['candy', 'red_present', 'cup'],
        'right hand': ['candy2', 'christmas_tree', 'green_present'],
    };

    const recalculateIndex = () => {
        for (const part of Object.values(partsInGingerbread[canDecorateIndex])) {
            if (part === null) return;
        }
        setCanDecorateIndex((prev) => prev + 1);
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
                        handleClick={handleClick}
                        tempAccessoryOfThis={tempPartsInGingerbread}
                        selectedPart={selectedPart}
                        selectedDress={selectedDress}
                        updateSelectDress={updateSelectDress} />
                ))}

                <CameraController focusedIndex={focusedIndex} modelInstances={modelInstances} />
                {/* <OrbitControls /> */}
            </Canvas>

            {selectedMode !== 'inspect' &&
                <button className="absolute top-2 left-2 bg-red-800 text-white w-28 p-3 rounded-lg shadow-lg hover:bg-red-400 transition duration-300"
                    onClick={handleBack}>
                    Back
                </button>}

            {selectedMode === 'view' && <button
                className="absolute top-20 left-2 bg-green-800 text-white w-28 p-3 rounded-lg shadow-lg hover:bg-green-400 transition duration-300"
                onClick={handleGetDecorated}
                disabled={canDecorateIndex !== focusedIndex}>
                decorate</button>}

            {selectedMode === 'choosePos' && (
                <div className="absolute bottom-0 left-4 z-10">
                    {parts.map((part, index) => {
                        return (
                            <button
                                key={index}
                                onClick={() => handleSelectPart(part)}
                                className="p-2 m-2 bg-blue-500 text-white w-28"
                            >
                                {part}
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