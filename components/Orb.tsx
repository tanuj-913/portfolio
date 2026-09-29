'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Icosahedron, Sparkles } from '@react-three/drei'
import { useRef } from 'react'
import type { Mesh, Group } from 'three'

function Core() {
  const mesh = useRef<Mesh>(null)
  const wire = useRef<Mesh>(null)

  useFrame((_, d) => {
    if (mesh.current) mesh.current.rotation.y += d * 0.12
    if (wire.current) {
      wire.current.rotation.y -= d * 0.2
      wire.current.rotation.x += d * 0.05
    }
  })

  return (
    <group>
      <Icosahedron ref={mesh} args={[1.5, 1]}>
        <meshStandardMaterial
          color="#0e7490"
          emissive="#22d3ee"
          emissiveIntensity={0.35}
          roughness={0.35}
          metalness={0.8}
          flatShading
        />
      </Icosahedron>
      <Icosahedron ref={wire} args={[2.15, 1]}>
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.18} />
      </Icosahedron>
    </group>
  )
}

function Ring({ radius, speed, tilt }: { radius: number; speed: number; tilt: number }) {
  const g = useRef<Group>(null)
  useFrame((_, d) => {
    if (g.current) g.current.rotation.z += d * speed
  })
  return (
    <group ref={g} rotation={[tilt, 0, 0]}>
      <mesh>
        <torusGeometry args={[radius, 0.008, 8, 128]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.35} />
      </mesh>
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color="#22d3ee" />
      </mesh>
    </group>
  )
}

export default function Orb() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 5, 5]} intensity={90} color="#22d3ee" />
      <pointLight position={[-5, -3, 2]} intensity={50} color="#38bdf8" />
      <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.7}>
        <Core />
      </Float>
      <Ring radius={2.9} speed={0.22} tilt={1.35} />
      <Ring radius={3.6} speed={-0.15} tilt={1.05} />
      <Sparkles count={48} scale={9} size={1.6} speed={0.25} color="#22d3ee" opacity={0.5} />
    </Canvas>
  )
}
