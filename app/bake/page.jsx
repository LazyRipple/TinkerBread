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

    // test data
    const data = {
        'ggbType': 'ggb1',
        'thanks_message': "thank you! merry christmas!!",
        'items': [
            { 'ggbId': 0, 'item': { 'head': 'christmas_hat', 'left hand': null, 'right hand': null } },
            { 'ggbId': 1, 'item': { 'head': null, 'left hand': null, 'right hand': null } },
            { 'ggbId': 2, 'item': { 'head': null, 'left hand': null, 'right hand': null } },
            { 'ggbId': 3, 'item': { 'head': null, 'left hand': null, 'right hand': null } },
            { 'ggbId': 4, 'item': { 'head': 'reindeer', 'left hand': null, 'right hand': null } },
            { 'ggbId': 5, 'item': { 'head': null, 'left hand': null, 'right hand': null } },
            { 'ggbId': 6, 'item': { 'head': null, 'left hand': null, 'right hand': null } },
            { 'ggbId': 7, 'item': { 'head': 'earpuff', 'left hand': null, 'right hand': null } },
            { 'ggbId': 8, 'item': { 'head': null, 'left hand': null, 'right hand': null } },
        ]
    }

    // load thank you message
    const thankYouMessage = data.thanks_message;
    const ggbType = data.ggbType;

    // choose parts
    const [currentPage, setCurrentPage] = useState(0);
    const gingerbreadsPerPage = 3

    const getParts = (page) => {
        const startIndex = page * gingerbreadsPerPage;
        const endIndex = startIndex + gingerbreadsPerPage;
        const selectedItems = data.items.slice(startIndex, endIndex);

        console.log(selectedItems);


        const initialParts = [];
        selectedItems.forEach((item) => {
            initialParts.push(item.item);
        });

        console.log('this is initial part');
        console.log(initialParts);


        return initialParts;
    };


    const parts = ['head', 'left hand', 'right hand']
    const [partsInGingerbread, setPartsInGingerBread] = useState(getParts(currentPage)); // parts that already been saved
    const [tempPartsInGingerbread, setTempPartsInGingerBread] = useState(JSON.parse(JSON.stringify(partsInGingerbread)));

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


    function isPartFull(part) {
        return partsInGingerbread[focusedIndex][part] !== null;
    }

    const handlePrev = () => {
        setCurrentPage((prevPage) => {
            if (prevPage > 0) {
                const newPage = prevPage - 1;
                setPartsInGingerBread(getParts(newPage));
                setTempPartsInGingerBread(getParts(newPage));
                return newPage;
            }
            return prevPage;
        });
    };

    const handleNext = () => {
        setCurrentPage((prevPage) => {
            const newPage = prevPage + 1;
            if (newPage * gingerbreadsPerPage < data.items.length) {
                setPartsInGingerBread(getParts(newPage));
                setTempPartsInGingerBread(getParts(newPage));
                return newPage;
            }
            return prevPage;
        });
    };

    const hasPrev = currentPage > 0;
    const hasNext = currentPage < Math.ceil(data.items.length / gingerbreadsPerPage) - 1;


    return (
        <div className="gradient-container relative flex flex-col h-full min-h-screen w-full gap-6 md:mx-auto md:max-w-[25rem] bg-blue-50 text-blue-800 shadow-lg">
            <Canvas>
                <ambientLight intensity={4.5} />
                {/* <ambientLight color={'#ffa35c'} intensity={1} /> */}
                <Snow count={500} area={{ x: [-5, 5], y: [-5, 10], z: [-15, -2] }} />
                <Scene />

                {modelInstances.map((instance, index) => (
                    <Gingerbread
                        key={index}
                        ggbType={ggbType}
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

            {/* Back */}
            {selectedMode !== 'inspect' &&
                <button className="absolute border-2 border-white top-3 left-3 bg-red-800 text-white w-12 h-12 p-3 rounded-full shadow-lg hover:bg-red-900 transition duration-300"
                    onClick={handleBack}>
                    <img src='/icon/back.webp' alt="Back" className='back w-full h-full' />
                </button>}

            {selectedMode === 'view' && focusedIndex === canDecorateIndex && (
                <div className="absolute top-20 left-7 border-2 border-white bg-[#FFD889] text-pink-900 p-5 rounded-xl shadow-lg w-80">
                    <p className="text-lg font-semibold mb-4 text-center">
                        Are you ready to dress your friend gingerbread? 🎄🍪
                    </p>
                    <button
                        className="block mx-auto bg-green-700 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-800 transition duration-300"
                        onClick={handleGetDecorated}
                        disabled={canDecorateIndex !== focusedIndex}
                    >
                        Yes, Let's Go! 🌟
                    </button>
                </div>
            )}


            {selectedMode === 'choosePos' && (
                <div className="absolute top-20 left-5 z-10 bg-[#FFD889] text-pink-900 border-2 border-white p-4 rounded-xl shadow-lg w-72">
                    {/* Title */}
                    <p className="text-lg font-semibold mb-4 text-center">
                        Choose your position 🎨
                    </p>

                    {/* Position selection buttons */}
                    <div className="flex flex-col justify-center items-center gap-2">
                        {parts.map((part, index) => {
                            return (
                                !isPartFull(part) && (
                                    <button
                                        key={index}
                                        onClick={() => handleSelectPart(part)}
                                        className="p-2 bg-green-700 text-white w-full rounded-lg shadow-md hover:bg-green-800 transition duration-300"
                                    >
                                        {part}
                                    </button>
                                )
                            );
                        })}
                    </div>
                </div>
            )}


            {selectedMode === 'chooseDress' && selectedPart && (
                <div className="absolute top-20 left-5 z-10 bg-[#FFD889] text-pink-900 border-2 border-white p-4 rounded-xl shadow-lg w-60">
                    {/* Title */}
                    <div className="text-lg font-semibold mb-4 text-center">
                        {`Choose an accessory 🎨`}
                    </div>

                    {/* Dress options */}
                    <div className="flex flex-col justify-center gap-3 w-full items-center">
                        {dressOptions[selectedPart].map((dress) => (
                            <button
                                key={dress}
                                onClick={() => handleSelectDress(dress)}
                                className={`p-2 w-full rounded-lg shadow-md transition duration-300 ${dress === selectedDress
                                    ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                                    : 'bg-green-700 text-white hover:bg-green-800'
                                    }`}
                            >
                                {dress}
                            </button>
                        ))}
                    </div>

                    {/* Confirm button */}
                    <button
                        className="mt-4 block mx-auto w-full bg-red-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-800 transition duration-300"
                        onClick={handleConfirmDress}
                    >
                        Confirm 🌟
                    </button>
                </div>
            )}


            {selectedMode === 'message' && (
                <div className="absolute top-20 left-5 z-10 bg-[#FFD889] text-pink-900 border-2 border-white p-4 rounded-xl shadow-lg w-60">
                    {/* Title */}
                    <div className="text-lg font-semibold text-center mb-3">
                        Send some messages🎄
                    </div>

                    {/* Message input area */}
                    <textarea
                        className="w-full h-32 border-2 border-pink-900 rounded-md p-3 text-pink-900 placeholder:text-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-700 resize-none"
                        value={message}
                        onChange={(e) => {
                            if (e.target.value.length <= 100) {
                                handleInputChange(e);
                            }
                        }}
                        placeholder="Type your message here..."
                    />

                    {/* Send button */}
                    <button
                        className="mt-4 block mx-auto bg-green-700 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-800 transition duration-300"
                        onClick={handleSendMessage}
                    >
                        Send 🌟
                    </button>
                </div>
            )}


            {selectedMode === 'thankyou' && (
                <div className="absolute top-20 left-7 border-2 border-white bg-[#FFD889] text-pink-900 p-5 rounded-xl shadow-lg w-80">
                    <p className="text-lg font-semibold mb-4 text-center" >{thankYouMessage}
                    </p>
                    <button
                        className="block mx-auto bg-green-700 text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-800 transition duration-300"
                        onClick={handleBack}
                        disabled={canDecorateIndex !== focusedIndex}
                    >
                        Back to kitchen
                    </button>
                </div>
            )}

            {/* Navigation arrows */}
            <div className="flex justify-between mt-4 w-1/2">
                {hasPrev && <button
                    onClick={handlePrev}
                    className={`p-2 rounded-fullbg-blue-500 hover:bg-blue-700 text-white`}
                >
                    Prev
                </button>}
                {hasNext && <button
                    onClick={handleNext}
                    className={`p-2 rounded-fullbg-blue-500 hover:bg-blue-700 text-white`}
                >
                    Next
                </button>}
            </div>

        </div >
    );
}
