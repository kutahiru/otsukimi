'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, useTexture, Plane, Box, Cylinder } from '@react-three/drei'
import { Suspense, useRef, useMemo } from 'react'
import * as THREE from 'three'

// 月のコンポーネント（アニメ調）
function Moon() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002 // 少し早めの回転
    }
  })

  return (
    <group>
      {/* メイン月 - シンプルな球体 */}
      <mesh ref={meshRef} position={[0, 8, -20]}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshToonMaterial
          color="#FFFF99"
          gradientMap={null}
        />
      </mesh>

      {/* 月の模様 - シンプルなクレーター風 */}
      <mesh position={[0.3, 8.5, -19.8]}>
        <circleGeometry args={[0.3, 16]} />
        <meshBasicMaterial color="#F0F000" transparent opacity={0.3} />
      </mesh>
      <mesh position={[-0.5, 7.8, -19.8]}>
        <circleGeometry args={[0.2, 16]} />
        <meshBasicMaterial color="#F0F000" transparent opacity={0.2} />
      </mesh>
      <mesh position={[0.6, 7.5, -19.8]}>
        <circleGeometry args={[0.15, 16]} />
        <meshBasicMaterial color="#F0F000" transparent opacity={0.25} />
      </mesh>

      {/* 月の光輪 - より目立つアニメ調 */}
      <mesh position={[0, 8, -20]} scale={[1.3, 1.3, 1.3]}>
        <sphereGeometry args={[2.2, 16, 16]} />
        <meshBasicMaterial
          color="#FFFF66"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

// 月見団子のコンポーネント（アニメ調）
function Dango() {
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
    <group position={[2, 0.2, 2]}>
      {/* 三方（台）- 縁側の上に配置 */}
      <group>
        {/* メイン台座 */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 0.8, 0.08, 12]} />
          <meshToonMaterial color="#8B4513" />
        </mesh>

        {/* 三方の脚 */}
        {[0, Math.PI * 2/3, Math.PI * 4/3].map((angle, i) => (
          <mesh
            key={i}
            position={[Math.cos(angle) * 0.5, -0.15, Math.sin(angle) * 0.5]}
            castShadow
          >
            <cylinderGeometry args={[0.04, 0.03, 0.2, 6]} />
            <meshToonMaterial color="#654321" />
          </mesh>
        ))}
      </group>

      {/* 団子 - ピラミッド型 */}
      {dangoPositions.map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} castShadow>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshToonMaterial color="#FFFFFF" />
        </mesh>
      ))}

      {/* かわいいハイライト */}
      {dangoPositions.map((pos, i) => (
        <mesh
          key={`highlight-${i}`}
          position={[pos[0] - 0.05, pos[1] + 0.05, pos[2] + 0.08]}
          scale={[0.3, 0.2, 0.2]}
        >
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.8} />
        </mesh>
      ))}

      {/* 台座の影 */}
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.9, 16]} />
        <meshBasicMaterial color="#000000" opacity={0.15} transparent />
      </mesh>
    </group>
  )
}

// ススキのコンポーネント（ふぁさふぁさ版）
function Susuki() {
  const grassRef = useRef<THREE.Group>(null)

  // useFrame((state) => {
  //   if (grassRef.current) {
  //     // ふわふわした風の揺れ
  //     grassRef.current.children.forEach((child, i) => {
  //       const time = state.clock.elapsedTime
  //       const phase = i * 0.2
  //       child.rotation.z = Math.sin(time * 1.5 + phase) * 0.3
  //       child.rotation.x = Math.cos(time * 0.8 + phase) * 0.1
  //     })
  //   }
  // })

  return (
    <group ref={grassRef} position={[-8, 0, -5]}>
      {Array.from({ length: 25 }, (_, i) => {
        const x = Math.random() * 8 - 4
        const z = Math.random() * 8 - 4
        const height = 1.2 + Math.random() * 0.8
        const clusterSize = 3 + Math.floor(Math.random() * 3)

        return (
          <group key={i} position={[x, 0, z]}>
            {/* 複数の茎でボリューム感 */}
            {Array.from({ length: clusterSize }, (_, stem) => (
              <group key={stem}>
                {/* 茎 */}
                <mesh
                  position={[
                    (Math.random() - 0.5) * 0.1,
                    height / 2,
                    (Math.random() - 0.5) * 0.1
                  ]}
                  castShadow
                >
                  <cylinderGeometry args={[0.015, 0.02, height, 6]} />
                  <meshToonMaterial color="#2F4F2F" />
                </mesh>

                {/* 葉っぱ - 控えめに */}
                {Array.from({ length: 4 + Math.floor(Math.random() * 2) }, (_, j) => {
                  const leafHeight = height * 0.2 + j * height * 0.1
                  const angle = (j * Math.PI * 0.3) + Math.random() * 0.4
                  const leafLength = 0.6 + Math.random() * 0.6

                  return (
                    <mesh
                      key={j}
                      position={[
                        Math.sin(angle) * 0.08 + (Math.random() - 0.5) * 0.05,
                        leafHeight,
                        Math.cos(angle) * 0.08 + (Math.random() - 0.5) * 0.05
                      ]}
                      rotation={[
                        Math.PI * 0.05 + Math.random() * 0.2,
                        angle + Math.random() * 0.3,
                        Math.PI * 0.1 + Math.random() * 0.3
                      ]}
                      scale={[1, leafLength, 1]}
                    >
                      <planeGeometry args={[0.04, 1]} />
                      <meshToonMaterial color="#556B2F" side={THREE.DoubleSide} transparent opacity={0.7} />
                    </mesh>
                  )
                })}

                {/* ふぁさふぁさの穂 */}
                <mesh
                  position={[
                    (Math.random() - 0.5) * 0.15,
                    height + 0.4 + Math.random() * 0.2,
                    (Math.random() - 0.5) * 0.15
                  ]}
                  rotation={[
                    Math.random() * 0.3,
                    Math.random() * Math.PI,
                    Math.random() * 0.4 - 0.2
                  ]}
                  castShadow
                >
                  <coneGeometry args={[0.06, 0.4, 8]} />
                  <meshToonMaterial color="#F4A460" />
                </mesh>

                {/* 穂の周りの細かい毛 - 極大量に */}
                {Array.from({ length: 150 + Math.floor(Math.random() * 90) }, (_, k) => {
                  const fiberAngle = (k / 25) * Math.PI * 4 + Math.random() * 0.5
                  const fiberRadius = 0.08 + Math.random() * 0.05
                  const fiberLength = 0.12 + Math.random() * 0.08

                  return (
                    <mesh
                      key={`fiber-${stem}-${k}`}
                      position={[
                        Math.sin(fiberAngle) * fiberRadius + (Math.random() - 0.5) * 0.1,
                        height + 0.4 + Math.random() * 0.3,
                        Math.cos(fiberAngle) * fiberRadius + (Math.random() - 0.5) * 0.1
                      ]}
                      rotation={[
                        Math.random() * 0.8,
                        fiberAngle + Math.random() * 0.5,
                        Math.random() * 0.8
                      ]}
                    >
                      <cylinderGeometry args={[0.001, 0.0005, fiberLength]} />
                      <meshBasicMaterial color="#F5DEB3" transparent opacity={0.8} />
                    </mesh>
                  )
                })}
              </group>
            ))}
          </group>
        )
      })}
    </group>
  )
}

// 縁側（アニメ調）- 日本家屋の縁側
function Engawa() {
  return (
    <group>
      {/* 障子戸の枠 */}
      <mesh position={[0, 1.4, 5]} receiveShadow>
        <boxGeometry args={[8, 3, 0.1]} />
        <meshToonMaterial color="#8B4513" />
      </mesh>

      {/* 屋根の軒 */}
      <mesh position={[0, 3.2, 4.5]} rotation={[-Math.PI / 8, 0, 0]} castShadow>
        <boxGeometry args={[8.5, 0.1, 2]} />
        <meshToonMaterial color="#654321" />
      </mesh>

      {/* 基礎（石の基礎） */}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh
          key={i}
          position={[i * 1.4 - 3.5, -0.4, 2]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1, 0.4, 2.5]} />
          <meshToonMaterial color="#696969" />
        </mesh>
      ))}

      {/* 床の梁（木製） */}
      <mesh position={[0, 0, 2]} castShadow>
        <boxGeometry args={[7.5, 0.2, 2.5]} />
        <meshToonMaterial color="#A0522D" />
      </mesh>

      {/* 縁側の床板 */}
      <group position={[0, 0.2, 2]}>
        {Array.from({ length: 12 }, (_, i) => (
          <mesh
            key={i}
            position={[i * 0.6 - 3.3, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[0.55, 2.5]} />
            <meshToonMaterial color="#D2B48C" />
          </mesh>
        ))}
      </group>



      {/* 室内の畳 */}
      <group position={[0, 0.25, 4.2]}>
        {Array.from({ length: 6 }, (_, i) => (
          <mesh
            key={i}
            position={[i * 1.2 - 3, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[1.1, 1.5]} />
            <meshToonMaterial color="#9ACD32" />
          </mesh>
        ))}
      </group>

      {/* 紫色の四角い座布団 */}
      <group position={[0.5, 0.28, 2]}>
        {/* 座布団本体 */}
        <mesh receiveShadow>
          <boxGeometry args={[0.8, 0.08, 0.8]} />
          <meshToonMaterial color="#9932CC" />
        </mesh>

        {/* 座布団の房（4隅） */}
        {[
          [-0.35, -0.02, -0.35],
          [0.35, -0.02, -0.35],
          [-0.35, -0.02, 0.35],
          [0.35, -0.02, 0.35]
        ].map((pos, i) => (
          <mesh key={i} position={pos as [number, number, number]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshToonMaterial color="#663399" />
          </mesh>
        ))}

        {/* 座布団の縫い目（十字） */}
        <mesh position={[0, 0.041, 0]}>
          <boxGeometry args={[0.02, 0.001, 0.6]} />
          <meshToonMaterial color="#663399" />
        </mesh>
        <mesh position={[0, 0.041, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.02, 0.001, 0.6]} />
          <meshToonMaterial color="#663399" />
        </mesh>
      </group>

      {/* 障子戸 */}
      {Array.from({ length: 4 }, (_, i) => (
        <group key={i} position={[i * 1.8 - 2.7, 1.4, 3.5]}>
          {/* 障子の木枠 - 縦（4本で3列作る） */}
          {Array.from({ length: 4 }, (_, j) => (
            <mesh key={`v-${j}`} position={[j * 0.53 - 0.8, 0, 0.01]}>
              <boxGeometry args={[0.02, 2.8, 0.02]} />
              <meshToonMaterial color="#8B4513" />
            </mesh>
          ))}

          {/* 障子の木枠 - 横（7本で6段作る） */}
          {Array.from({ length: 7 }, (_, j) => (
            <mesh key={`h-${j}`} position={[0, j * 0.47 - 1.4, 0.01]}>
              <boxGeometry args={[1.6, 0.02, 0.02]} />
              <meshToonMaterial color="#8B4513" />
            </mesh>
          ))}

          {/* 格子の中の和紙（3×6=18枚） */}
          {Array.from({ length: 3 }, (_, col) =>
            Array.from({ length: 6 }, (_, row) => (
              <mesh
                key={`paper-${col}-${row}`}
                position={[col * 0.53 - 0.535, row * 0.47 - 1.175, 0.005]}
              >
                <planeGeometry args={[0.49, 0.43]} />
                <meshToonMaterial color="#FFFFFF" transparent opacity={0.9} side={THREE.DoubleSide} />
              </mesh>
            ))
          )}
        </group>
      ))}
    </group>
  )
}

// 遠景の山々（超高品質版）
function Mountains() {
  // 山の層を作成（3層の奥行き）
  const mountainLayers = [
    { distance: -50, color: '#1C2833', opacity: 0.4, scale: 1.5 },
    { distance: -35, color: '#2F4F4F', opacity: 0.6, scale: 1.2 },
    { distance: -25, color: '#4F6F4F', opacity: 0.8, scale: 1.0 }
  ]

  // 複雑な山の形状を作成
  const createMountainGeometry = (baseWidth: number, height: number, complexity: number) => {
    const points: THREE.Vector2[] = []
    const segments = Math.floor(complexity * 20)

    // 山の輪郭を作成
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI
      const x = Math.cos(angle) * baseWidth

      // 複雑な山の稜線
      let y = Math.sin(angle) * height
      y += Math.sin(angle * 3) * height * 0.2
      y += Math.sin(angle * 7) * height * 0.1
      y += Math.sin(angle * 15) * height * 0.05

      // ランダムな凹凸
      y += (Math.random() - 0.5) * height * 0.1

      points.push(new THREE.Vector2(x, Math.max(y, 0)))
    }

    const shape = new THREE.Shape(points)
    return new THREE.ExtrudeGeometry(shape, {
      depth: 2,
      bevelEnabled: false
    })
  }

  return (
    <group>
      {mountainLayers.map((layer, layerIndex) => (
        <group key={layerIndex} position={[0, -0.5, layer.distance]}>
          {Array.from({ length: 12 + layerIndex * 3 }, (_, i) => {
            const height = (2 + Math.random() * 6) * layer.scale
            const width = (3 + Math.random() * 4) * layer.scale
            const x = (i * 6 - 30) + Math.random() * 4 - 2
            const z = Math.random() * 10 - 5

            return (
              <group key={i}>
                {/* メイン山体 */}
                <mesh
                  position={[x, height / 2, z]}
                  rotation={[0, Math.random() * Math.PI, 0]}
                  geometry={createMountainGeometry(width, height, 0.5 + Math.random() * 0.5)}
                >
                  <meshPhongMaterial
                    color={layer.color}
                    transparent
                    opacity={layer.opacity}
                    shininess={1}
                    fog={true}
                  />
                </mesh>


                {/* 山腹の細部 */}
                {Array.from({ length: 3 + Math.floor(Math.random() * 3) }, (_, j) => {
                  const ridgeHeight = height * (0.3 + Math.random() * 0.4)
                  const ridgeWidth = width * (0.3 + Math.random() * 0.3)
                  const offsetX = (Math.random() - 0.5) * width * 0.8
                  const offsetZ = (Math.random() - 0.5) * 2

                  return (
                    <mesh
                      key={j}
                      position={[x + offsetX, ridgeHeight / 2, z + offsetZ]}
                      rotation={[0, Math.random() * Math.PI, 0]}
                    >
                      <coneGeometry args={[ridgeWidth, ridgeHeight, 5]} />
                      <meshPhongMaterial
                        color={layer.color}
                        transparent
                        opacity={layer.opacity * 0.7}
                        shininess={0.5}
                      />
                    </mesh>
                  )
                })}

              </group>
            )
          })}
        </group>
      ))}

    </group>
  )
}

// 石灯籠（アニメ調）
function StoneLantern() {
  return (
    <group position={[6, 0, -3]}>
      {/* 台座 - シンプル */}
      <mesh position={[0, -0.3, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.8, 0.4, 8]} />
        <meshToonMaterial color="#696969" />
      </mesh>

      {/* 柱 - シンプル */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 1.2, 8]} />
        <meshToonMaterial color="#696969" />
      </mesh>

      {/* 火袋（ひぶくろ）- シンプル */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.6, 6]} />
        <meshToonMaterial color="#696969" />
      </mesh>

      {/* 窓 - シンプルな四角 */}
      {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
        <mesh
          key={i}
          position={[
            Math.cos(angle) * 0.35,
            1.3,
            Math.sin(angle) * 0.35
          ]}
          rotation={[0, angle, 0]}
        >
          <planeGeometry args={[0.2, 0.3]} />
          <meshBasicMaterial color="#333333" />
        </mesh>
      ))}

      {/* 内部の光源 - アニメ調 */}
      <pointLight position={[0, 1.3, 0]} intensity={0.8} color="#FFA500" />

      {/* 内部の炎 - かわいい光る玉 */}
      <mesh position={[0, 1.3, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshBasicMaterial
          color="#FF6600"
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* 屋根 - シンプル */}
      <mesh position={[0, 1.8, 0]} castShadow>
        <coneGeometry args={[0.5, 0.3, 6]} />
        <meshToonMaterial color="#696969" />
      </mesh>

      {/* シンプルな影 */}
      <mesh position={[0, -0.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1, 16]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  )
}

// 庭の地面（アニメ調）
function Ground() {
  return (
    <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshToonMaterial color="#2F4F2F" />
    </mesh>
  )
}

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
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
          <Dango />
          <Susuki />
          <Engawa />

          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            minDistance={0.1}
            maxDistance={0.1}
            target={[0.5, 0.9, 2.0]}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
