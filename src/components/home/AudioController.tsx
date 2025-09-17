'use client'

import { useRef, useEffect, useState } from 'react'

// 音声とミュートボタンを管理するコンポーネント
export default function AudioController() {
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio('/audio/suzumushi.mp3')
    audio.loop = true
    audio.volume = 0.1
    audioRef.current = audio

    // ユーザーの操作後に音声を再生
    const playAudio = () => {
      if (!isMuted) {
        audio.play().catch(e => console.log('Audio play failed:', e))
      }
      document.removeEventListener('click', playAudio)
    }

    document.addEventListener('click', playAudio)

    return () => {
      audio.pause()
      audio.currentTime = 0
      document.removeEventListener('click', playAudio)
    }
  }, [isMuted])

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e))
      }
    }
  }, [isMuted])

  return (
    <button
      onClick={() => setIsMuted(!isMuted)}
      style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        border: 'none',
        borderRadius: '50%',
        background: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        fontSize: '20px',
        cursor: 'pointer',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {isMuted ? '🔇' : '🔊'}
    </button>
  )
}