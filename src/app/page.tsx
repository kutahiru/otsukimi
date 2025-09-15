'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, useTexture, Plane, Box, Cylinder } from '@react-three/drei'
import { Suspense, useRef, useMemo } from 'react'
import * as THREE from 'three'

// 月のコンポーネント（改良版）
function Moon() {
  const meshRef = useRef<THREE.Mesh>(null)

  // 月の表面にクレーター風の模様を作る
  const moonGeometry = useMemo(() => {
    const geometry = new THREE.SphereGeometry(2, 64, 64)
    const positions = geometry.attributes.position

    // ランダムにクレーターっぽい凹凸を追加
    for (let i = 0; i < positions.count; i++) {
      const vertex = new THREE.Vector3()
      vertex.fromBufferAttribute(positions, i)

      // ノイズを追加してクレーター感を演出
      const noise = Math.sin(vertex.x * 5) * Math.cos(vertex.y * 5) * Math.sin(vertex.z * 5) * 0.05
      vertex.multiplyScalar(1 + noise)

      positions.setXYZ(i, vertex.x, vertex.y, vertex.z)
    }

    geometry.computeVertexNormals()
    return geometry
  }, [])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002 // ゆっくりと自転
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 8, -20]} geometry={moonGeometry}>
      <meshPhongMaterial
        color="#FFF8DC"
        shininess={1}
        specular="#FFFFFF"
        transparent
        opacity={0.95}
      />
    </mesh>
  )
}

// 月見団子のコンポーネント（改良版）
function Dango() {
  const dangoPositions = [
    [-0.4, 0.2, 0], [0, 0.2, 0], [0.4, 0.2, 0], // 下段
    [-0.2, 0.5, 0], [0.2, 0.5, 0] // 上段
  ]

  return (
    <group position={[3, 0, 2]}>
      {/* 三方（台）- より詳細に */}
      <group>
        {/* メイン台座 */}
        <mesh position={[0, -0.3, 0]}>
          <cylinderGeometry args={[1.2, 1.2, 0.1, 8]} />
          <meshPhongMaterial color="#654321" shininess={10} />
        </mesh>

        {/* 三方の脚 */}
        {[0, Math.PI * 2/3, Math.PI * 4/3].map((angle, i) => (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.8, -0.45, Math.sin(angle) * 0.8]}
          >
            <cylinderGeometry args={[0.05, 0.05, 0.2]} />
            <meshPhongMaterial color="#654321" shininess={10} />
          </mesh>
        ))}
      </group>

      {/* 団子 - より美味しそうに */}
      {dangoPositions.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshPhongMaterial
            color="#FFF8DC"
            shininess={30}
            specular="#FFFFFF"
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}

      {/* 団子の影 */}
      {dangoPositions.map((pos, i) => (
        <mesh key={`shadow-${i}`} position={[pos[0], -0.25, pos[2]]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.1, 16]} />
          <meshBasicMaterial color="#000000" opacity={0.2} transparent />
        </mesh>
      ))}
    </group>
  )
}

// ススキのコンポーネント（改良版）
function Susuki() {
  const grassRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (grassRef.current) {
      // 風で揺れる効果
      grassRef.current.children.forEach((child, i) => {
        const time = state.clock.elapsedTime
        child.rotation.z = Math.sin(time * 0.5 + i * 0.3) * 0.1
      })
    }
  })

  return (
    <group ref={grassRef} position={[-8, 0, -5]}>
      {Array.from({ length: 25 }, (_, i) => {
        const x = Math.random() * 6 - 3
        const z = Math.random() * 6 - 3
        const height = 1.5 + Math.random() * 1

        return (
          <group key={i} position={[x, 0, z]}>
            {/* 茎 */}
            <mesh position={[0, height / 2, 0]} rotation={[0, 0, Math.random() * 0.2 - 0.1]}>
              <cylinderGeometry args={[0.015, 0.025, height, 8]} />
              <meshPhongMaterial color="#228B22" shininess={5} />
            </mesh>

            {/* 葉っぱ */}
            {Array.from({ length: 3 + Math.floor(Math.random() * 3) }, (_, j) => (
              <mesh
                key={j}
                position={[
                  Math.sin(j * Math.PI * 0.3) * 0.1,
                  height * 0.3 + j * 0.3,
                  Math.cos(j * Math.PI * 0.3) * 0.1
                ]}
                rotation={[Math.PI * 0.1, j * Math.PI * 0.3, Math.PI * 0.1]}
              >
                <planeGeometry args={[0.05, 0.6]} />
                <meshPhongMaterial color="#32CD32" side={THREE.DoubleSide} shininess={10} />
              </mesh>
            ))}

            {/* 穂 */}
            <mesh position={[0, height + 0.3, 0]} rotation={[0, 0, Math.random() * 0.3 - 0.15]}>
              <cylinderGeometry args={[0.08, 0.04, 0.5, 8]} />
              <meshPhongMaterial color="#F5DEB3" shininess={20} />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}

// 縁側の床と構造（改良版）
function Engawa() {
  return (
    <group>
      {/* 床板 */}
      <group position={[0, -0.4, 2]}>
        {Array.from({ length: 12 }, (_, i) => (
          <mesh
            key={i}
            position={[i * 0.5 - 2.75, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.48, 4]} />
            <meshPhongMaterial color="#8B4513" shininess={5} />
          </mesh>
        ))}
      </group>

      {/* 柱 */}
      {[[-2, 0, 0], [2, 0, 0], [-2, 0, 4], [2, 0, 4]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]}>
          <cylinderGeometry args={[0.08, 0.08, 3]} />
          <meshPhongMaterial color="#654321" shininess={10} />
        </mesh>
      ))}

      {/* 手すり */}
      <group position={[0, 0.8, 0]}>
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 4.2]} />
          <meshPhongMaterial color="#654321" shininess={10} />
        </mesh>
        <mesh position={[0, 0, 4]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 4.2]} />
          <meshPhongMaterial color="#654321" shininess={10} />
        </mesh>
        <mesh position={[-2, 0, 2]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 4.2]} />
          <meshPhongMaterial color="#654321" shininess={10} />
        </mesh>
        <mesh position={[2, 0, 2]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.03, 0.03, 4.2]} />
          <meshPhongMaterial color="#654321" shininess={10} />
        </mesh>
      </group>

      {/* 畳 */}
      <group position={[0, -0.38, 4]}>
        {Array.from({ length: 4 }, (_, i) => (
          <mesh
            key={i}
            position={[i * 1 - 1.5, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.9, 1.8]} />
            <meshPhongMaterial color="#9ACD32" shininess={2} />
          </mesh>
        ))}
      </group>

      {/* 座布団 */}
      <mesh position={[0, -0.3, 3]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.4, 16]} />
        <meshPhongMaterial color="#DC143C" shininess={1} />
      </mesh>
    </group>
  )
}

// 遠景の山々
function Mountains() {
  return (
    <group position={[0, -0.5, -30]}>
      {Array.from({ length: 7 }, (_, i) => {
        const height = 3 + Math.random() * 4
        const width = 4 + Math.random() * 3
        return (
          <mesh
            key={i}
            position={[i * 4 - 12, height / 2, Math.random() * -5]}
            rotation={[0, Math.random() * 0.3, 0]}
          >
            <coneGeometry args={[width, height, 4]} />
            <meshPhongMaterial color="#2F4F4F" shininess={1} />
          </mesh>
        )
      })}
    </group>
  )
}

// 石灯籠
function StoneLantern() {
  return (
    <group position={[6, 0, -3]}>
      {/* 台座 */}
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 0.4]} />
        <meshPhongMaterial color="#696969" shininess={1} />
      </mesh>

      {/* 柱 */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 1.2]} />
        <meshPhongMaterial color="#696969" shininess={1} />
      </mesh>

      {/* 火袋（ひぶくろ） */}
      <mesh position={[0, 1.3, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.6]} />
        <meshPhongMaterial color="#696969" shininess={1} />
      </mesh>

      {/* 灯りの光 */}
      <pointLight position={[0, 1.3, 0]} intensity={0.5} color="#FFA500" />

      {/* 屋根 */}
      <mesh position={[0, 1.8, 0]}>
        <coneGeometry args={[0.5, 0.3, 6]} />
        <meshPhongMaterial color="#696969" shininess={1} />
      </mesh>
    </group>
  )
}

// 庭の地面
function Ground() {
  return (
    <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshPhongMaterial color="#2F4F2F" shininess={1} />
    </mesh>
  )
}

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 2, 5], fov: 75 }}
        style={{ background: 'linear-gradient(to bottom, #191970 0%, #000428 100%)' }}
        shadows
      >
        <Suspense fallback={null}>
          {/* 環境光 */}
          <ambientLight intensity={0.3} color="#4169E1" />

          {/* 月光（メインライト） */}
          <directionalLight
            position={[0, 10, -15]}
            intensity={2}
            color="#FFF8DC"
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />

          {/* 補助光（縁側を明るく） */}
          <pointLight position={[0, 2, 5]} intensity={0.8} color="#FFE4B5" />

          {/* 遠景の補助光 */}
          <pointLight position={[-10, 1, -10]} intensity={0.3} color="#191970" />

          <Ground />
          <Mountains />
          <StoneLantern />
          <Moon />
          <Dango />
          <Susuki />
          <Engawa />

          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />

          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
