import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

// 月のコンポーネント（高品質版）
export function Moon() {
  return (
    <group>
      {/* メイン月 - 高解像度 */}
      <mesh position={[4, 8, -20]}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshToonMaterial
          color="#F5F5DC"
          gradientMap={null}
        />
      </mesh>


      {/* 月の光輪 - 複数層 */}
      <mesh position={[4, 8, -20]} scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#F5F5DC"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh position={[4, 8, -20]} scale={[1.5, 1.5, 1.5]}>
        <sphereGeometry args={[2.5, 24, 24]} />
        <meshBasicMaterial
          color="#F0F0F0"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>


      {/* うさぎの模様 */}
      {/* うさぎの体 */}
      <mesh position={[2.8, 6.8, -17.5]} rotation={[0, 0, 0.3]}>
        <circleGeometry args={[0.5, 16]} />
        <meshBasicMaterial color="#D3D3D3" transparent opacity={0.4} />
      </mesh>

      {/* うさぎの頭 */}
      <mesh position={[2.4, 7.4, -17.5]} rotation={[0, 0, 0.2]}>
        <circleGeometry args={[0.3, 16]} />
        <meshBasicMaterial color="#D3D3D3" transparent opacity={0.4} />
      </mesh>

      {/* うさぎの耳（長い） */}
      <mesh position={[2.2, 7.8, -17.5]} rotation={[0, 0, 0.6]} scale={[0.3, 1.5, 1]}>
        <circleGeometry args={[0.15, 12]} />
        <meshBasicMaterial color="#D3D3D3" transparent opacity={0.35} />
      </mesh>

      <mesh position={[2.5, 7.9, -17.5]} rotation={[0, 0, 0.2]} scale={[0.3, 1.5, 1]}>
        <circleGeometry args={[0.15, 12]} />
        <meshBasicMaterial color="#D3D3D3" transparent opacity={0.35} />
      </mesh>

      {/* うさぎの前足（餅つき） */}
      <mesh position={[2.6, 6.9, -17.5]} rotation={[0, 0, -0.4]} scale={[0.5, 1, 1]}>
        <circleGeometry args={[0.18, 12]} />
        <meshBasicMaterial color="#D3D3D3" transparent opacity={0.35} />
      </mesh>

      {/* うさぎの後ろ足 */}
      <mesh position={[3.1, 6.3, -17.5]} rotation={[0, 0, -0.2]} scale={[0.7, 1, 1]}>
        <circleGeometry args={[0.2, 12]} />
        <meshBasicMaterial color="#D3D3D3" transparent opacity={0.35} />
      </mesh>

      {/* うさぎの尻尾 */}
      <mesh position={[3.3, 6.7, -17.5]}>
        <circleGeometry args={[0.1, 12]} />
        <meshBasicMaterial color="#D3D3D3" transparent opacity={0.3} />
      </mesh>

      {/* きりんの模様 */}
      {/* きりんの体 */}
      <mesh position={[4.8, 7.0, -17.5]} rotation={[0, 0, 0.1]} scale={[0.8, 1.2, 1]}>
        <circleGeometry args={[0.4, 16]} />
        <meshBasicMaterial color="#D3D3D3" transparent opacity={0.4} />
      </mesh>

      {/* きりんの長い首 */}
      <mesh position={[4.6, 8.0, -17.5]} rotation={[0, 0, 0.3]} scale={[0.4, 1.8, 1]}>
        <circleGeometry args={[0.25, 12]} />
        <meshBasicMaterial color="#D3D3D3" transparent opacity={0.4} />
      </mesh>

      {/* きりんの頭 */}
      <mesh position={[4.3, 8.7, -17.5]} rotation={[0, 0, 0.2]} scale={[0.8, 1.4, 1]}>
        <circleGeometry args={[0.18, 12]} />
        <meshBasicMaterial color="#D3D3D3" transparent opacity={0.4} />
      </mesh>

      {/* きりんの鼻先 */}
      <mesh position={[4.15, 8.95, -17.5]} rotation={[0, 0, 0.2]} scale={[0.6, 1.2, 1]}>
        <circleGeometry args={[0.12, 8]} />
        <meshBasicMaterial color="#D3D3D3" transparent opacity={0.4} />
      </mesh>

      {/* きりんの角（2本） */}
      <mesh position={[4.2, 8.9, -17.5]} rotation={[0, 0, 0.1]} scale={[0.3, 1, 1]}>
        <circleGeometry args={[0.08, 8]} />
        <meshBasicMaterial color="#D3D3D3" transparent opacity={0.35} />
      </mesh>

      <mesh position={[4.4, 8.9, -17.5]} rotation={[0, 0, 0.1]} scale={[0.3, 1, 1]}>
        <circleGeometry args={[0.08, 8]} />
        <meshBasicMaterial color="#D3D3D3" transparent opacity={0.35} />
      </mesh>

      {/* きりんの前足 */}
      <mesh position={[4.5, 6.3, -17.5]} rotation={[0, 0, 0]} scale={[0.3, 1.5, 1]}>
        <circleGeometry args={[0.12, 8]} />
        <meshBasicMaterial color="#D3D3D3" transparent opacity={0.35} />
      </mesh>

      <mesh position={[4.8, 6.3, -17.5]} rotation={[0, 0, 0]} scale={[0.3, 1.5, 1]}>
        <circleGeometry args={[0.12, 8]} />
        <meshBasicMaterial color="#D3D3D3" transparent opacity={0.35} />
      </mesh>

      {/* きりんの後ろ足 */}
      <mesh position={[5.0, 6.0, -17.5]} rotation={[0, 0, 0]} scale={[0.3, 1.2, 1]}>
        <circleGeometry args={[0.12, 8]} />
        <meshBasicMaterial color="#D3D3D3" transparent opacity={0.35} />
      </mesh>

      <mesh position={[5.3, 6.0, -17.5]} rotation={[0, 0, 0]} scale={[0.3, 1.2, 1]}>
        <circleGeometry args={[0.12, 8]} />
        <meshBasicMaterial color="#D3D3D3" transparent opacity={0.35} />
      </mesh>

      {/* きりんの尻尾 */}
      <mesh position={[5.5, 6.7, -17.5]} rotation={[0, 0, -0.3]} scale={[0.2, 1, 1]}>
        <circleGeometry args={[0.08, 8]} />
        <meshBasicMaterial color="#D3D3D3" transparent opacity={0.3} />
      </mesh>

      {/* 月光の点光源 */}
      <pointLight position={[4, 8, -18]} intensity={0.2} color="#F5F5DC" />
    </group>
  )
}


// ススキのコンポーネント（ふぁさふぁさ版）
export function Susuki() {
  const grassRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (grassRef.current) {
      // ふわふわした風の揺れ
      grassRef.current.children.forEach((child, i) => {
        const time = state.clock.elapsedTime
        const phase = i * 0.3
        child.rotation.z = Math.sin(time * 1.2 + phase) * 0.2
        child.rotation.x = Math.cos(time * 0.7 + phase) * 0.08
      })
    }
  })

  const susukiElements = useMemo(() => {
    return (
    <group ref={grassRef} position={[0, 0, -2]}>
      {Array.from({ length: 3 }, (_, i) => {
        const positions = [-1.5, -0.8, -0.1]
        const x = positions[i]
        const z = Math.random() * 0.5 - 0.25
        const height = 1.2 + Math.random() * 0.8
        const clusterSize = 2 + Math.floor(Math.random() * 2)

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
  }, [])

  return susukiElements
}

// 縁側（アニメ調）- 日本家屋の縁側
export function Engawa() {
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
        {Array.from({ length: 5 }, (_, i) => (
          <mesh
            key={i}
            position={[i * 1.1 - 2.2, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[1.1, 1.3]} />
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

      {/* 左側の座布団（斜め配置） */}
      <group position={[-0.7, 0.28, 2.0]} rotation={[0, Math.PI / 6, 0]}>
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
        <group key={i} position={[i * 1.6 - 2.4, 1.4, 3.5]}>
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

// 石灯籠（アニメ調）
export function StoneLantern() {
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
export function Ground() {
  return (
    <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshToonMaterial color="#2F4F2F" />
    </mesh>
  )
}