'use client'

import React,{ useState } from 'react'
import '@/style/bake.css';
import { useParams, notFound } from 'next/navigation'
import { useSession, status } from 'next-auth/react'
import { BakeMeComponents } from "@/components/BakeMeComponents"
import Loading from '../Loading'
import { BakeSessionProvider, useSessionContext } from './SessionContext'
import toast, { Toaster } from 'react-hot-toast';
import BakeMoreGingerbread from '@/components/BakeMoreGingerbread'
import { Canvas } from '@react-three/fiber';
import { Snow } from '@/components/Snow.jsx';
import { CameraController } from '@/components/CameraController.jsx';
import { Scene } from '@/components/Scene.jsx';
import { Gingerbread } from '@/components/GingerbreadMe.jsx';
import { OrbitControls } from '@react-three/drei';
import { Arrow3D } from '@/components/Arrow';
import Link from 'next/link';


export default function Page() {
  const { GGBs_id } = useParams()

  if (status === 'unauthenticated') {        
     return notFound()
  }
  return (
    <BakeSessionProvider>
      <PageContent GGBs_id={GGBs_id} />
    </BakeSessionProvider >
  )
}

export function PageContent() {
  const { user, GGBs, load_status } = useSessionContext()
  const { data: session } = useSession()

  
    const shareLink = `${session.user.link_id}`

    const modelInstances = [
        { position: [2.3, 0, -0.9], scale: 0.1 },
        { position: [2.9, 0, -0.9], scale: 0.1 },
        { position: [3.5, 0, -0.9], scale: 0.1 },
    ];

    // Mode state
    const [selectedMode, setSelectedMode] = useState('inspect'); // inspect, view
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

    // return
    if (load_status == 'loading') return <Loading /> 
    if (!GGBs) return notFound()
    return (
        <div className="gradient-container relative flex size-full min-h-screen flex-col gap-6 bg-blue-50 text-blue-800 shadow-lg">
          <Toaster />
          <p className="absolute top-16 z-30 w-full text-center font-bold text-white">{`${user?.username}'s TinkerBreads`}</p>
          
          
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

            {/* Home */}
            {selectedMode === 'inspect' &&
            <Link href="/" className='absolute'>
                <button className="absolute left-3 top-3 size-12 rounded-full border-2 border-white bg-red-800 p-3 text-white shadow-lg transition duration-300 hover:bg-red-900"
                    onClick={handleBack}>
                    <img src='/icon/home.webp' alt="Home" className='size-full' />
                </button>
              </Link>}

            {/* Back */}
            {selectedMode !== 'inspect' &&
                <button className="absolute left-3 top-3 size-12 rounded-full border-2 border-white bg-red-800 p-3 text-white shadow-lg transition duration-300 hover:bg-[#FFD889]"
                    onClick={handleBack}>
                    <img src='/icon/back.webp' alt="Back" className='size-full' />
                </button>}

            {/* Friend's message */}
            {showMessage && (
                <div className="absolute left-7 top-20 w-80 rounded-xl border-2 border-white bg-[#FFD889] p-5 text-red-800 shadow-lg">
                    <button
                        className="absolute right-2 top-2 font-bold text-red-800 transition duration-300 hover:text-red-500"
                        onClick={handleCloseMessage}
                    >
                        ×
                    </button>
                    <p className="mb-2 text-sm font-semibold">
                        <span className="font-bold">From:</span> {name}
                    </p>
                    <p className="break-words text-base">
                        {message}
                    </p>
                </div>
            )}

            {/* Manu */}
            {selectedMode === 'inspect' &&
            <div className="absolute bottom-4 left-4 z-50 flex flex-col space-y-2">
              <BakeMeComponents shareLink={shareLink} />
              <BakeMoreGingerbread session={session} />
            </div>
          }

            {/* Share Link */}
            <button
                className="absolute right-4 top-4 rounded-xl border-2 border-white bg-red-800 px-4 py-2 text-white shadow-lg transition duration-300 hover:bg-[#FFD889] hover:text-red-800"
                onClick={() => {
                   toast.success(`copied link: "${shareLink}"`)
                   // TODO : change link on production
                  const link = `http://localhost:3000/bake/${shareLink}`
                    navigator.clipboard.writeText(link)
                }}
            >
                Copy ID
            </button>

        </div >
    );
}
