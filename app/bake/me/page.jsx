"use client";
import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import '@/style/bake.css';
import { Snow } from '@/components/Snow.jsx';
import { CameraController } from '@/components/CameraController.jsx';
import { Scene } from '@/components/Scene.jsx';
import { Gingerbread } from '@/components/GingerbreadMe.jsx';
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

    const handleClick = (index) => {
        console.log('Clicked index:', index);
        console.log('Current mode before click:', selectedMode);

        if (selectedMode !== 'inspect') {
            console.log(`Gingerbread ${index} clicked in ${selectedMode} mode!`);
            return;
        }

        setFocusedIndex(index);
        setSelectedMode('view');

        console.log(`Gingerbread ${index} clicked and mode changed to view`);
    };

    const handleBack = () => {
        setShowMessage(false);
        setFocusedIndex(null);
        setSelectedMode('inspect');
        setSelectedPart(null);
        setMessage(null);
        setSelectedDress(null);
    };

    // test data
    const data = {
        'ggbType': 'ggb1',
        'thanks_message': "thank you! merry christmas!!",
        'items': [
            { 'ggbId': 0, 'item': { 'head': { 'item': 'christmas_hat', 'name': 'Neen', 'message': "merry christmas!sawesfdsafsssssssssssssssssssssssssssssssssssssssssssssssss" }, 'left hand': { 'item': null, 'name': null, 'message': null }, 'right hand': { 'item': null, 'name': null, 'message': null } } },
            { 'ggbId': 1, 'item': { 'head': { 'item': null, 'name': null, 'message': null }, 'left hand': { 'item': null, 'name': null, 'message': null }, 'right hand': { 'item': null, 'name': null, 'message': null } } },
            { 'ggbId': 2, 'item': { 'head': { 'item': null, 'name': null, 'message': null }, 'left hand': { 'item': null, 'name': null, 'message': null }, 'right hand': { 'item': null, 'name': null, 'message': null } } },
            { 'ggbId': 3, 'item': { 'head': { 'item': null, 'name': null, 'message': null }, 'left hand': { 'item': null, 'name': null, 'message': null }, 'right hand': { 'item': null, 'name': null, 'message': null } } },
            { 'ggbId': 4, 'item': { 'head': { 'item': 'reindeer', 'name': 'beam', 'message': 'so sleepy' }, 'left hand': { 'item': null, 'name': null, 'message': null }, 'right hand': { 'item': null, 'name': null, 'message': null } } },
            { 'ggbId': 5, 'item': { 'head': { 'item': null, 'name': null, 'message': null }, 'left hand': { 'item': null, 'name': null, 'message': null }, 'right hand': { 'item': null, 'name': null, 'message': null } } },
            { 'ggbId': 6, 'item': { 'head': { 'item': null, 'name': null, 'message': null }, 'left hand': { 'item': null, 'name': null, 'message': null }, 'right hand': { 'item': null, 'name': null, 'message': null } } },
            { 'ggbId': 7, 'item': { 'head': { 'item': 'earpuff', 'name': null, 'message': null }, 'left hand': { 'item': null, 'name': null, 'message': null }, 'right hand': { 'item': null, 'name': null, 'message': null } } },
            { 'ggbId': 8, 'item': { 'head': { 'item': null, 'name': null, 'message': null }, 'left hand': { 'item': null, 'name': null, 'message': null }, 'right hand': { 'item': null, 'name': null, 'message': null } } }
        ]
    };

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

    const [partsInGingerbread, setPartsInGingerBread] = useState(getParts(currentPage)); // parts that already been saved

    const [selectedPart, setSelectedPart] = useState(null);
    const [selectedDress, setSelectedDress] = useState(null);

    const handlePrev = () => {
        setShowMessage(false);
        setCurrentPage((prevPage) => {
            if (prevPage > 0) {
                const newPage = prevPage - 1;
                setPartsInGingerBread(getParts(newPage));
                return newPage;
            }
            return prevPage;
        });
    };

    const handleNext = () => {
        setShowMessage(false);
        setCurrentPage((prevPage) => {
            const newPage = prevPage + 1;
            if (newPage * gingerbreadsPerPage < data.items.length) {
                setPartsInGingerBread(getParts(newPage));
                return newPage;
            }
            return prevPage;
        });
    };

    const hasPrev = currentPage > 0;
    const hasNext = currentPage < Math.ceil(data.items.length / gingerbreadsPerPage) - 1;

    const canDisplayPrev = hasPrev && (selectedMode === 'inspect');
    const canDisplayNext = hasNext && (selectedMode === 'inspect');

    const [showMessage, setShowMessage] = useState(false);

    const handleCloseMessage = () => {
        setShowMessage(false);
        setName('');
        setMessage('');
    }

    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

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
                        accessoryOfThis={partsInGingerbread}
                        selectedPart={selectedPart}
                        selectedDress={selectedDress}
                        setName={setName}
                        setMessage={setMessage}
                        setShowMessage={setShowMessage} />
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

            {/* Friend's message */}
            {showMessage && (
                <div className="absolute top-20 left-7 border-2 border-white bg-[#FFD889] text-pink-900 p-5 rounded-xl shadow-lg w-80">
                    <button
                        className="absolute top-2 right-2 text-pink-900 font-bold hover:text-red-500 transition duration-300"
                        onClick={handleCloseMessage}
                    >
                        ×
                    </button>
                    <p className="text-sm font-semibold mb-2">
                        <span className="font-bold">From:</span> {name}
                    </p>
                    <p className="text-base break-words">
                        {message}
                    </p>
                </div>
            )}


        </div >
    );
}
