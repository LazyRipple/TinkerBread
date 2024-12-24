'use client'
import { useEffect, useState } from 'react'
import { Howl } from 'howler'

const MusicPlayer = () => {
  const [audioLoaded, setAudioLoaded] = useState(false)

  useEffect(() => {
    const audio = new Howl({
      src: ['/bgm.mp3'],
      loop: true,
      volume: 0.02,
    })

    audio.play()
    setAudioLoaded(true)

    return () => {
      audio.stop()
    }
  }, [])

  if (!audioLoaded) {
    return <></>
  }

  return null
}

export default MusicPlayer
