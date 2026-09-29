'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Line, OrbitControls, Sparkles } from '@react-three/drei'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { skills } from '@/lib/content'

const ACCENT = '#22d3ee'
const ACCENT_2 = '#38bdf8'
const RADIUS = 3.4
const CAM_Z = 10.6
// depth range the labels fade across, derived from the camera so it can't drift
const NEAR_D = CAM_Z - RADIUS
const FAR_D = CAM_Z + RADIUS
const depthFade = (d: number, floor: number) =>
  THREE.MathUtils.clamp(1 - ((d - NEAR_D) / (FAR_D - NEAR_D)) * (1 - floor), floor, 1)

function fibonacciSphere(n: number, radius: number) {
  const pts: THREE.Vector3[] = []
  const phi = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < n; i++) {
    const y = 1 - ((i + 0.5) / n) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = phi * i
    pts.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius))
  }
  return pts
}

function Core() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 1.8) * 0.05)
    ref.current.rotation.y += 0.004
  })
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[0.5, 1]} />
      <meshStandardMaterial color="#0e7490" emissive={ACCENT} emissiveIntensity={0.7} metalness={0.85} roughness={0.3} flatShading />
    </mesh>
  )
}

type LabelState = { x: number; y: number; depth: number }

function Scene({
  selected,
  setSelected,
  onLabels,
  onLeafLabels,
}: {
  selected: number | null
  setSelected: (i: number | null) => void
  onLabels: (s: LabelState[]) => void
  onLeafLabels: (s: LabelState[]) => void
}) {
  const group = useRef<THREE.Group>(null)
  const nodeRefs = useRef<(THREE.Group | null)[]>([])
  const leafRefs = useRef<(THREE.Group | null)[]>([])
  const { camera, size } = useThree()
  const [hovered, setHovered] = useState<number | null>(null)

  const nodes = useMemo(() => fibonacciSphere(skills.length, RADIUS), [])

  const leaves = useMemo(() => {
    if (selected === null) return []
    const origin = nodes[selected]
    const items = skills[selected].items.slice(0, 10)
    const dir = origin.clone().normalize()
    const up = Math.abs(dir.y) > 0.9 ? new THREE.Vector3(1, 0, 0) : new THREE.Vector3(0, 1, 0)
    const a = new THREE.Vector3().crossVectors(dir, up).normalize()
    const b = new THREE.Vector3().crossVectors(dir, a).normalize()
    return items.map((label, i) => {
      const ang = (i / items.length) * Math.PI * 2
      const pos = origin
        .clone()
        .add(dir.clone().multiplyScalar(0.6))
        .add(a.clone().multiplyScalar(Math.cos(ang) * 1.05))
        .add(b.clone().multiplyScalar(Math.sin(ang) * 1.05))
      return { label, pos, from: origin }
    })
  }, [selected, nodes])

  const v = useMemo(() => new THREE.Vector3(), [])

  useFrame((_, d) => {
    if (group.current && selected === null) group.current.rotation.y += d * 0.05

    // project every node to screen space — labels are plain DOM, fully controlled
    const out: LabelState[] = []
    for (let i = 0; i < nodes.length; i++) {
      const g = nodeRefs.current[i]
      if (!g) {
        out.push({ x: -9999, y: -9999, depth: 1 })
        continue
      }
      g.getWorldPosition(v)
      const depth = v.clone().sub(camera.position).length()
      v.project(camera)
      out.push({
        x: (v.x * 0.5 + 0.5) * size.width,
        y: (-v.y * 0.5 + 0.5) * size.height,
        depth,
      })
    }
    onLabels(out)

    const leafOut: LabelState[] = []
    for (let i = 0; i < leaves.length; i++) {
      const g = leafRefs.current[i]
      if (!g) { leafOut.push({ x: -9999, y: -9999, depth: 1 }); continue }
      g.getWorldPosition(v)
      const depth = v.clone().sub(camera.position).length()
      v.project(camera)
      leafOut.push({ x: (v.x * 0.5 + 0.5) * size.width, y: (-v.y * 0.5 + 0.5) * size.height, depth })
    }
    onLeafLabels(leafOut)
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={80} color={ACCENT} />
      <pointLight position={[-5, -3, -3]} intensity={45} color={ACCENT_2} />

      <mesh onClick={() => setSelected(null)} scale={40}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial side={THREE.BackSide} transparent opacity={0} depthWrite={false} />
      </mesh>

      <group ref={group}>
        <Core />

        {nodes.map((p, i) => (
          <Line
            key={`spoke-${i}`}
            points={[[0, 0, 0], [p.x, p.y, p.z]]}
            color={selected === i ? ACCENT : ACCENT_2}
            lineWidth={selected === i ? 1.8 : 0.8}
            transparent
            opacity={selected === null ? 0.3 : selected === i ? 0.8 : 0.06}
          />
        ))}

        {nodes.map((p, i) => (
          <group key={skills[i].tier} ref={(el) => { nodeRefs.current[i] = el }} position={p}>
            <mesh
              onClick={(e) => { e.stopPropagation(); setSelected(selected === i ? null : i) }}
              onPointerOver={(e) => { e.stopPropagation(); setHovered(i); document.body.style.cursor = 'pointer' }}
              onPointerOut={() => { setHovered(null); document.body.style.cursor = 'auto' }}
              scale={selected === i ? 1.5 : hovered === i ? 1.25 : 1}
            >
              <sphereGeometry args={[0.2, 24, 24]} />
              <meshStandardMaterial
                color={selected === i ? '#ffffff' : ACCENT}
                emissive={selected === i ? ACCENT : ACCENT_2}
                emissiveIntensity={selected === i ? 1.8 : 0.8}
                transparent
                opacity={selected !== null && selected !== i ? 0.2 : 1}
              />
            </mesh>
          </group>
        ))}

        {leaves.map((l, i) => (
          <group key={`leaf-${i}`}>
            <Line
              points={[[l.from.x, l.from.y, l.from.z], [l.pos.x, l.pos.y, l.pos.z]]}
              color={ACCENT_2}
              lineWidth={0.7}
              transparent
              opacity={0.45}
            />
            <group ref={(el) => { leafRefs.current[i] = el }} position={l.pos}>
              <mesh>
                <sphereGeometry args={[0.08, 14, 14]} />
                <meshBasicMaterial color={ACCENT_2} />
              </mesh>
            </group>
          </group>
        ))}
      </group>

      <Sparkles count={40} scale={13} size={1.4} speed={0.18} color={ACCENT} opacity={0.3} />
      <OrbitControls enablePan={false} enableZoom={false} enableDamping dampingFactor={0.06} rotateSpeed={0.5} />
    </>
  )
}

export default function SkillGraph({
  selected,
  setSelected,
}: {
  selected: number | null
  setSelected: (i: number | null) => void
}) {
  const [labels, setLabels] = useState<LabelState[]>([])
  const [leafLabels, setLeafLabels] = useState<LabelState[]>([])

  return (
    <div className="relative w-full">
      <div className="relative h-[520px] w-full sm:h-[640px]">
      <Canvas camera={{ position: [0, 0, CAM_Z], fov: 45 }} dpr={[1, 1.75]} gl={{ alpha: true }}>
        <Scene selected={selected} setSelected={setSelected} onLabels={setLabels} onLeafLabels={setLeafLabels} />
      </Canvas>

      {/* labels live in the DOM, positioned from projected 3D coords */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {skills.map((s, i) => {
          const l = labels[i]
          if (!l) return null
          // nearer nodes read brighter; far ones recede instead of colliding
          const dim = selected !== null && selected !== i
          const near = selected === i ? 1 : depthFade(l.depth, 0.5)
          return (
            <div
              key={s.tier}
              className="absolute whitespace-nowrap text-center transition-opacity duration-200"
              style={{
                left: l.x,
                top: l.y,
                transform: 'translate(-50%, 18px)',
                opacity: dim ? 0.12 : near,
                zIndex: Math.round(1000 - l.depth * 50),
              }}
            >
              <div
                className="font-display text-[15px] font-bold uppercase tracking-[0.16em] sm:text-[17px]"
                style={{
                  fontFamily: 'var(--font-orbitron)',
                  color: selected === i ? '#ffffff' : '#eafaff',
                  textShadow:
                    selected === i
                      ? '0 0 10px rgba(34,211,238,0.85), 0 0 22px rgba(5,6,10,1), 0 0 34px rgba(5,6,10,0.95)'
                      : '0 0 14px rgba(5,6,10,1), 0 0 28px rgba(5,6,10,0.95)',
                }}
              >
                {s.tier}
              </div>
              <div className="font-mono text-[12px] text-cyan-400/70" style={{ textShadow: '0 0 12px rgba(5,6,10,0.95)' }}>
                {s.items.length}
              </div>
            </div>
          )
        })}
      </div>

      {/* skill names on the expanded branch */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {selected !== null &&
          skills[selected].items.slice(0, 10).map((item, i) => {
            const l = leafLabels[i]
            if (!l || l.x < -1000) return null
            const near = depthFade(l.depth, 0.55)
            return (
              <div
                key={item}
                className="absolute whitespace-nowrap font-mono text-[13px] text-white"
                style={{
                  left: l.x,
                  top: l.y,
                  transform: 'translate(-50%, 14px)',
                  opacity: near,
                  textShadow: '0 0 12px rgba(5,6,10,0.98), 0 0 22px rgba(5,6,10,0.9)',
                  zIndex: Math.round(1000 - l.depth * 50),
                }}
              >
                {item}
              </div>
            )
          })}
      </div>

      </div>

      <div className="pt-3 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-white/35">
        {selected === null ? 'Drag to orbit · click a node' : `${skills[selected].tier} · click again to close`}
      </div>
    </div>
  )
}
