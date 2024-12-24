"use client";
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import '@/style/bake.css';
import { Snow } from '@/components/Snow.jsx';
import { CameraController } from '@/components/CameraController.jsx';
import { Scene } from '@/components/Scene.jsx';
import { Gingerbread } from '@/components/Gingerbread.jsx';
import { OrbitControls } from '@react-three/drei';
import { Arrow3D } from '@/components/Arrow';

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
        // save to database
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
        console.log('next');

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

    const canDisplayPrev = hasPrev && (selectedMode === 'inspect');
    const canDisplayNext = hasNext && (selectedMode === 'inspect');

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
                {canDisplayPrev && <Arrow3D key={'prev'} arrow={'prev'} position={[4.75, 0, 0.2]} rotation={[0, Math.PI * 3 / 2, 0]} onClick={handlePrev} />}
                {canDisplayNext && <Arrow3D key={'next'} arrow={'next'} position={[6.3, 0, 0.2]} rotation={[0, Math.PI * 3 / 2, 0]} onClick={handleNext} />}
            </Canvas>

            {/* Back */}
            {selectedMode !== 'inspect' &&
                <button className="absolute border-2 border-white top-3 left-3 bg-red-800 text-white w-12 h-12 p-3 rounded-full shadow-lg hover:bg-red-900 transition duration-300"
                    onClick={handleBack}>
                    <img src='/icon/back.webp' alt="Back" className='back w-full h-full' />
                </button>}

        </div >
    );
}
