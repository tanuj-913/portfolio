'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

/* ---------- letter shapes, built in code so there's no font/SVG to load ---------- */

function shapeT() {
  const s = new THREE.Shape()
  s.moveTo(-1.05, 1.5)
  s.lineTo(1.05, 1.5)
  s.lineTo(1.05, 0.92)
  s.lineTo(0.31, 0.92)
  s.lineTo(0.31, -1.5)
  s.lineTo(-0.31, -1.5)
  s.lineTo(-0.31, 0.92)
  s.lineTo(-1.05, 0.92)
  s.closePath()
  return s
}

function shapeJ() {
  const s = new THREE.Shape()
  s.moveTo(0.33, 1.5)
  s.lineTo(0.95, 1.5)
  s.lineTo(0.95, -0.52)
  s.quadraticCurveTo(0.95, -1.5, 0.02, -1.5)
  s.quadraticCurveTo(-0.78, -1.5, -0.9, -0.78)
  s.lineTo(-0.3, -0.66)
  s.quadraticCurveTo(-0.22, -0.96, 0.02, -0.96)
  s.quadraticCurveTo(0.33, -0.96, 0.33, -0.48)
  s.closePath()
  return s
}

/** Notched octagonal frame — outer ring with the middle cut out. */
function shapeFrame() {
  const oct = (r: number, cut: number) => {
    const p: [number, number][] = [
      [-r + cut, r], [r - cut, r], [r, r - cut], [r, -r + cut],
      [r - cut, -r], [-r + cut, -r], [-r, -r + cut], [-r, r - cut],
    ]
    return p
  }
  const s = new THREE.Shape()
  oct(3.15, 0.85).forEach(([x, y], i) => (i ? s.lineTo(x, y) : s.moveTo(x, y)))
  s.closePath()
  const hole = new THREE.Path()
  oct(2.82, 0.76).forEach(([x, y], i) => (i ? hole.lineTo(x, y) : hole.moveTo(x, y)))
  hole.closePath()
  s.holes.push(hole)
  return s
}

const EXTRUDE = { depth: 0.34, bevelEnabled: true, bevelSize: 0.045, bevelThickness: 0.05, bevelSegments: 3, curveSegments: 24 }
const EXTRUDE_THIN = { depth: 0.16, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 2, curveSegments: 12 }

/** Reeded edge — the milled grooves around a real coin's rim. */
function Reeding({ radius, count = 84 }: { radius: number; count?: number }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2
        return { x: Math.cos(a) * radius, y: Math.sin(a) * radius, rot: a }
      }),
    [radius, count],
  )
  return (
    <group>
      {items.map((it, i) => (
        <mesh key={i} position={[it.x, it.y, 0]} rotation={[0, 0, it.rot]}>
          <boxGeometry args={[0.07, 0.055, 0.46]} />
          <meshStandardMaterial color="#0d3a48" emissive="#22d3ee" emissiveIntensity={0.35} metalness={1} roughness={0.3} />
        </mesh>
      ))}
    </group>
  )
}

function Coin() {
  const coin = useRef<THREE.Group>(null)

  const geoT = useMemo(() => new THREE.ExtrudeGeometry(shapeT(), EXTRUDE).center(), [])
  const geoJ = useMemo(() => new THREE.ExtrudeGeometry(shapeJ(), EXTRUDE).center(), [])
  const geoFrame = useMemo(() => new THREE.ExtrudeGeometry(shapeFrame(), EXTRUDE_THIN).center(), [])

  useFrame(({ clock, pointer }, d) => {
    if (!coin.current) return
    // spins on its vertical axis — head, edge, tail, edge
    coin.current.rotation.y += d * 0.85
    coin.current.rotation.x = THREE.MathUtils.lerp(coin.current.rotation.x, -pointer.y * 0.3, 0.05)
    coin.current.position.y = Math.sin(clock.elapsedTime * 0.9) * 0.14
  })

  const faceMat = (
    <meshStandardMaterial color="#072c38" emissive="#22d3ee" emissiveIntensity={0.55} metalness={1} roughness={0.22} />
  )

  return (
    <group ref={coin}>
      {/* coin body */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[3.05, 3.05, 0.42, 80]} />
        <meshStandardMaterial color="#061e29" emissive="#0e7490" emissiveIntensity={0.3} metalness={1} roughness={0.28} />
      </mesh>

      <Reeding radius={3.05} />

      {/* ---------- HEADS: the TJ mark ---------- */}
      <group position={[0, 0, 0.21]}>
        <mesh geometry={geoFrame} scale={0.92} position={[0, 0, 0.02]}>
          <meshStandardMaterial color="#0b2b36" emissive="#22d3ee" emissiveIntensity={1} metalness={1} roughness={0.25} />
        </mesh>
        <group scale={0.68}>
          <mesh geometry={geoT} position={[-0.85, 0, 0.16]}>{faceMat}</mesh>
          <mesh geometry={geoJ} position={[0.92, 0, 0.16]}>{faceMat}</mesh>
          <mesh geometry={geoT} position={[-0.85, 0, 0.16]} scale={1.03}>
            <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.3} />
          </mesh>
          <mesh geometry={geoJ} position={[0.92, 0, 0.16]} scale={1.03}>
            <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.3} />
          </mesh>
        </group>
      </group>

      {/* ---------- TAILS: the same TJ mark, ringed ---------- */}
      <group position={[0, 0, -0.21]} rotation={[0, Math.PI, 0]}>
        <mesh geometry={geoFrame} scale={0.92} position={[0, 0, 0.02]}>
          <meshStandardMaterial color="#0b2b36" emissive="#38bdf8" emissiveIntensity={0.95} metalness={1} roughness={0.25} />
        </mesh>

        {/* broken arcs framing the mark */}
        {[2.45, 2.15].map((r, i) => (
          <mesh key={r} position={[0, 0, 0.08]} rotation={[0, 0, i * 0.9]}>
            <torusGeometry args={[r, 0.024, 8, 64, Math.PI * (i % 2 ? 1.3 : 1.65)]} />
            <meshStandardMaterial color="#0d3a48" emissive="#38bdf8" emissiveIntensity={0.8} metalness={1} roughness={0.3} />
          </mesh>
        ))}

        <group scale={0.68}>
          <mesh geometry={geoT} position={[-0.85, 0, 0.16]}>
            <meshStandardMaterial color="#072c38" emissive="#38bdf8" emissiveIntensity={0.7} metalness={1} roughness={0.2} />
          </mesh>
          <mesh geometry={geoJ} position={[0.92, 0, 0.16]}>
            <meshStandardMaterial color="#072c38" emissive="#22d3ee" emissiveIntensity={0.7} metalness={1} roughness={0.2} />
          </mesh>
          <mesh geometry={geoT} position={[-0.85, 0, 0.16]} scale={1.03}>
            <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.3} />
          </mesh>
          <mesh geometry={geoJ} position={[0.92, 0, 0.16]} scale={1.03}>
            <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.3} />
          </mesh>
        </group>
      </group>
    </group>
  )
}

function Ring({ r, speed, tilt, colour }: { r: number; speed: number; tilt: number; colour: string }) {
  const g = useRef<THREE.Group>(null)
  useFrame((_, d) => {
    if (g.current) g.current.rotation.z += d * speed
  })
  return (
    <group ref={g} rotation={[tilt, 0, 0]}>
      <mesh>
        <torusGeometry args={[r, 0.007, 8, 140]} />
        <meshBasicMaterial color={colour} transparent opacity={0.4} />
      </mesh>
      <mesh position={[r, 0, 0]}>
        <sphereGeometry args={[0.05, 14, 14]} />
        <meshBasicMaterial color={colour} />
      </mesh>
    </group>
  )
}

export default function Logo3D() {
  return (
    <Canvas camera={{ position: [0, 0, 10.5], fov: 45 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 6]} intensity={110} color="#22d3ee" />
      <pointLight position={[-6, -3, 3]} intensity={70} color="#38bdf8" />
      <pointLight position={[0, 0, -6]} intensity={50} color="#a855f7" />
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Coin />
      </Float>
      <Ring r={4.4} speed={0.26} tilt={1.32} colour="#22d3ee" />
      <Ring r={5.1} speed={-0.17} tilt={1.06} colour="#38bdf8" />
      <Sparkles count={55} scale={11} size={1.5} speed={0.22} color="#22d3ee" opacity={0.45} />
    </Canvas>
  )
}
