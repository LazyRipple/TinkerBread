'use client';
import { useEffect, useState } from 'react';
import { Howl } from 'howler';

const MusicPlayer = () => {
    const [audioLoaded, setAudioLoaded] = useState(false);

    useEffect(() => {
        const audio = new Howl({
            src: ['/bgm.mp3'],
            loop: true,
            volume: 0.05,
        });

        audio.play();
        setAudioLoaded(true);

        return () => {
            audio.stop();
        };
    }, []);

    if (!audioLoaded) {
        return <div>Loading Music...</div>;
    }

    return null;
};

export default MusicPlayer;
