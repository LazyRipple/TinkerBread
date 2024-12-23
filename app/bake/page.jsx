"use client";
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import '@/style/bake.css';
import { Snow } from '@/components/Snow.jsx';
import { CameraController } from '@/components/CameraController.jsx';
import { Scene } from '@/components/Scene.jsx';
import { Gingerbread } from '@/components/Gingerbread.jsx';

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
                    <Gingerbread
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
