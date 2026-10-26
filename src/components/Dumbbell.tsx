import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import type { Group } from 'three'

function Bell() {
  const g = useRef<Group>(null)
  useFrame((_, d) => { if (g.current) g.current.rotation.y += d * 0.5 })
  const side = [-1, 1]
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1.2}>
      <group ref={g} rotation={[0.35, 0, 0.45]}>
        <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.13, 0.13, 3.6, 32]} /><meshStandardMaterial color="#c9ccd1" metalness={0.9} roughness={0.25} /></mesh>
        {side.map((s) => (
          <group key={s}>
            <mesh position={[s * 1.0, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.85, 0.85, 0.38, 48]} /><meshStandardMaterial color="#141414" metalness={0.7} roughness={0.35} /></mesh>
            <mesh position={[s * 1.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.65, 0.65, 0.3, 48]} /><meshStandardMaterial color="#ff2d2d" metalness={0.5} roughness={0.3} emissive="#ff2d2d" emissiveIntensity={0.25} /></mesh>
          </group>
        ))}
      </group>
    </Float>
  )
}
export default function Dumbbell() {
  return (
    <Canvas dpr={[1, 1.6]} camera={{ position: [0, 0, 6], fov: 45 }} aria-hidden>
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 5, 5]} intensity={2.2} />
      <pointLight position={[-4, -2, 3]} intensity={30} color="#ff2d2d" />
      <Bell />
      <Sparkles count={60} scale={[9, 6, 4]} size={2.5} speed={0.4} color="#ff5a5a" />
    </Canvas>
  )
}
