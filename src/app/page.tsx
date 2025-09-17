'use client'

import AudioController from '@/components/home/AudioController'
import Scene3D from '@/components/home/Scene3D'

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <AudioController />
      <Scene3D />
    </div>
  )
}