'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Suspense, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Moon, Susuki, Engawa, StoneLantern, Ground } from './objects'
import ConfirmModal from './ConfirmModal'

// 月見団子のコンポーネント（アニメ調）
function Dango({ onDangoClick }: { onDangoClick: () => void }) {
  // ピラミッド型の団子配置（密着）
  const dangoPositions = [
    // 下段（3×3の9個）
    [-0.18, 0.1, -0.18], [0, 0.1, -0.18], [0.18, 0.1, -0.18],
    [-0.18, 0.1, 0], [0, 0.1, 0], [0.18, 0.1, 0],
    [-0.18, 0.1, 0.18], [0, 0.1, 0.18], [0.18, 0.1, 0.18],
    // 中段（2×2の4個）
    [-0.09, 0.28, -0.09], [0.09, 0.28, -0.09],
    [-0.09, 0.28, 0.09], [0.09, 0.28, 0.09],
    // 上段（1個）
    [0, 0.46, 0]
  ]

  return (
    <group position={[1.8, 0.3, 1.5]}>
      {/* 三方（台）- 縁側の上に配置 */}
      <group>
        {/* メイン台座 */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.7, 0.7, 0.12, 12]} />
          <meshToonMaterial color="#CD853F" />
        </mesh>

        {/* 三方の脚 */}
        {[0, Math.PI * 2/3, Math.PI * 4/3].map((angle, i) => (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.5, -0.2, Math.sin(angle) * 0.5]}
            castShadow
          >
            <cylinderGeometry args={[0.08, 0.06, 0.3, 8]} />
            <meshToonMaterial color="#A0522D" />
          </mesh>
        ))}
      </group>

      {/* 団子 - ピラミッド型 */}
      {dangoPositions.map((pos, i) => (
        <mesh
          key={i}
          position={[pos[0], pos[1] + 0.04, pos[2]]}
          castShadow
          onClick={onDangoClick}
        >
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshToonMaterial color="#FFFFFF" />
        </mesh>
      ))}

      {/* かわいいハイライト */}
      {dangoPositions.map((pos, i) => (
        <mesh
          key={`highlight-${i}`}
          position={[pos[0] - 0.05, pos[1] + 0.09, pos[2] + 0.08]}
          scale={[0.3, 0.2, 0.2]}
        >
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.8} />
        </mesh>
      ))}

      {/* 台座の影 */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.7, 16]} />
        <meshBasicMaterial color="#000000" opacity={0.15} transparent />
      </mesh>
    </group>
  )
}

// 3Dシーンを管理するコンポーネント
export default function Scene3D() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)

  const handleDangoClick = () => {
    setShowModal(true)
  }

  const handleConfirm = () => {
    setShowModal(false)
    router.push('/posts')
  }

  const handleCancel = () => {
    setShowModal(false)
  }

  return (
    <>
      <Canvas
        camera={{ position: [0.5, 0.6, 2], fov: 75 }}
        style={{ background: 'linear-gradient(to bottom, #191970 0%, #000428 100%)' }}
      shadows
    >
      <Suspense fallback={null}>
        {/* アニメ調の環境光 */}
        <ambientLight intensity={0.4} color="#E6E6FA" />

        {/* アニメ調の月光 */}
        <directionalLight
          position={[0, 10, -15]}
          intensity={1.5}
          color="#FFFF99"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />

        <Ground />
        <StoneLantern />
        <Moon />
        <Dango onDangoClick={handleDangoClick} />
        <Susuki />
        <Engawa />

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          maxPolarAngle={Math.PI}
          minDistance={0.1}
          maxDistance={0.1}
          target={[0.5, 0.9, 2.0]}
          rotateSpeed={-0.3}
        />
      </Suspense>
    </Canvas>

    <ConfirmModal
      isOpen={showModal}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
      message="投稿一覧画面に遷移しますか？"
    />
  </>
  )
}