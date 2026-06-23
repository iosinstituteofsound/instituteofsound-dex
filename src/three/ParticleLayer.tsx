import { memo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import type { Mesh, Points } from 'three'

function EnergyRing() {
  const ref = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.4
  })
  return (
    <mesh ref={ref}>
      <torusGeometry args={[1.2, 0.02, 8, 64]} />
      <meshBasicMaterial color="#00dcff" transparent opacity={0.35} />
    </mesh>
  )
}

function FloatingParticles({ count = 60 }: { count?: number }) {
  const ref = useRef<Points>(null)
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.15
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 3
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2
    positions[i * 3 + 2] = (Math.random() - 0.5) * 1.5
  }
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#00dcff" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <EnergyRing />
      <FloatingParticles />
      <EffectComposer>
        <Bloom intensity={0.4} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
      </EffectComposer>
    </>
  )
}

export const ParticleLayer = memo(function ParticleLayer({ active }: { active: boolean }) {
  if (!active) return null
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return (
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(0,220,255,0.15), transparent 60%)',
        }}
      />
    )
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
      <Canvas
        frameloop="always"
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ alpha: true, antialias: false }}
      >
        <Scene />
      </Canvas>
    </div>
  )
})
