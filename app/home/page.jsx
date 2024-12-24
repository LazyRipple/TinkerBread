'use client'
import React, { useState } from 'react';
import { TutorialModal } from '@/components/Tutorial'
import { CreditsModal } from '@/components/Credits'

export default function Home() {
    const [isModalVisible, setModalVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const tutorialPages = [
        {
            topic: 'Make a gingerbread.',
            description: 'Create your little gingerbread character.',
            image: '/images/tutorial1.png',
        },
        {
            topic: 'Share your ID.',
            description: 'Hit ‘Copy ID’ and send it to your friend.',
            image: '/images/tutorial2.png',
        },
        {
            topic: 'Visit your friend’s kitchen.',
            description: 'Got their ID? Paste it into the box and check out their kitchen!',
            image: '/images/tutorial3.png',
        },
        {
            topic: 'Decorate their gingerbread.',
            description: 'Pick a gingerbread,  some cute accessories, and send a message!',
            image: '/images/tutorial3.png',
        },
        {
            topic: 'Check your kitchen.',
            description: 'Messages show up in your kitchen. Click on the accessories to see them!',
            image: '/images/tutorial3.png',
        },
        {
            topic: 'Bake more gingerbread!',
            description: 'If all of your gingerbread is fully dressed , hit ‘Bake More’ to make a new one. You can see it by clicking on the gloves!',
            image: '/images/tutorial3.png',
        },
    ];

    return (
        <>
            <video autoPlay muted loop playsInline className="bg-video">
                <source src="/Tinkerbread_home.mp4" type="video/mp4" />
            </video>
            <div className="relative overflow-visible flex flex-col justify-center items-center h-full min-h-screen w-full gap-6 text-white shadow-lg">
                <div
                    className="text-4xl font-bold tracking-wider animate-bounce my-3 text-white"
                    style={{ animationDuration: '1.5s' }}
                >
                    Tinkerbread
                </div>
                <button
                    className="w-44 border-2 border-white bg-red-800 hover:bg-[#FFD889] hover:text-red-800 text-white py-2 px-4 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none"
                >
                    Login with Google
                </button>
                <button
                    onClick={() => setModalVisible(true)}
                    className="w-44 border-2 border-white bg-red-800 hover:bg-[#FFD889] hover:text-red-800 text-white py-2 px-4 rounded-xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl focus:outline-none"
                >
                    Tutorial
                </button>
                <button
                    onClick={() => setShowModal(true)}
                    className="w-44 border-2 border-white bg-red-800 hover:bg-[#FFD889] hover:text-red-800 text-white py-2 px-4 rounded-xl shadow-lg transition duration-300"
                >
                    Credits
                </button>
            </div>

            <TutorialModal
                isVisible={isModalVisible}
                onClose={() => setModalVisible(false)}
                tutorialPages={tutorialPages}
            />

            {showModal && <CreditsModal onClose={() => setShowModal(false)} />}
        </>
    );
}
