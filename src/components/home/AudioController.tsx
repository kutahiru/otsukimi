'use client'

import { useRef, useEffect, useState } from 'react'

// 音声とミュートボタンを管理するコンポーネント
export default function AudioController() {
  const [isMuted, setIsMuted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio('/audio/suzumushi.mp3')
    audio.loop = true
    audio.volume = 0.1
    audio.preload = 'auto'

    // 読み込み状態を監視
    const handleCanPlayThrough = () => {
      setIsLoading(false)
      console.log('Audio ready to play')
    }

    const handleLoadStart = () => {
      setIsLoading(true)
      console.log('Audio loading started')
    }

    const handleError = (e: Event) => {
      setIsLoading(false)
      console.error('Audio loading failed:', e)
    }

    audio.addEventListener('canplaythrough', handleCanPlayThrough)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('error', handleError)

    // 明示的に読み込み開始
    audio.load()
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
      audio.removeEventListener('canplaythrough', handleCanPlayThrough)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('error', handleError)
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
      {isLoading ? '⏳' : (isMuted ? '🔇' : '🔊')}
    </button>
  )
}