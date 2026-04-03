/**
 * Scene.jsx — React Three Fiber Canvas (fixed, behind UI overlay)
 *
 * Performance flags:
 *  dpr=[1,1.5]  — cap pixel ratio (avoids 4x fill on Retina)
 *  flat         — disables tone-mapping (better for additive VFX)
 *  frameloop    — "always" for smooth RAF (no demand mode)
 *  powerPreference "high-performance" — triggers discrete GPU
 *
 * No post-processing library needed:
 *  Bloom effect is achieved via AdditiveBlending + shader alpha
 *  (zero extra draw passes → perfect for 60fps target)
 */

import { Canvas } from '@react-three/fiber';
import CameraRig       from './CameraRig';
import ParticleField   from './ParticleField';
import WorldGeometry   from './WorldGeometry';

export default function Scene({ engineRef }) {
  return (
    <div
      style={{
        position:  'fixed',
        inset:     0,
        zIndex:    0,
        background: '#020617',
        pointerEvents: 'none',   // HTML overlay handles all mouse events
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75, near: 0.1, far: 400 }}
        gl={{
          antialias:         true,
          alpha:             false,
          powerPreference:   'high-performance',
          stencil:           false,
          depth:             true,
        }}
        dpr={[1, 1.5]}
        flat
        frameloop="always"
        style={{ width: '100%', height: '100%' }}
      >
        {/* Depth fog — darkens far-away geometry, sells the tunnel */}
        <fog attach="fog" args={['#020617', 8, 160]} />

        {/* Ambient: just enough to avoid pure-black geometry */}
        <ambientLight intensity={0.06} />

        {/* A faint point light that follows the camera path */}
        <pointLight position={[0, 0, 20]} intensity={0.4} color="#818cf8" distance={80} decay={2} />
        <pointLight position={[0, 0, -60]} intensity={0.3} color="#22d3ee" distance={80} decay={2} />
        <pointLight position={[0, 0, -110]} intensity={0.5} color="#e879f9" distance={80} decay={2} />

        <CameraRig       engineRef={engineRef} />
        <ParticleField   engineRef={engineRef} />
        <WorldGeometry   engineRef={engineRef} />
      </Canvas>
    </div>
  );
}