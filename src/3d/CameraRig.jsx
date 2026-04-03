/**
 * CameraRig.jsx — Cinematic camera controller inside R3F Canvas
 *
 * Reads engineRef for:
 *   cameraTargetZ  : where camera WANTS to be
 *   velocity       : for shake + tilt
 *   speed          : smoothed abs velocity (warp effect)
 *   mouse          : smoothed XY (-1 → +1 each axis)
 *
 * Applies:
 *   position.z     : lerp toward target (inertia feel)
 *   position.x/y   : subtle shake proportional to speed
 *   rotation.y     : mouse look horizontal
 *   rotation.x     : mouse look vertical + slight downward pitch
 *   fov            : warp squeeze when scrolling fast (speed boost feel)
 */

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

/* Lerp factor — lower = more cinematic lag */
const LERP_Z     = 0.055;
const LERP_ROT   = 0.038;
const LERP_SHAKE = 0.10;
const LERP_FOV   = 0.08;

const BASE_FOV   = 75;
const WARP_FOV   = 90; // squeeze when fast

export default function CameraRig({ engineRef }) {
  const { camera } = useThree();

  /* Internal smooth state (all in refs — no React re-renders) */
  const currentZ     = useRef(50);
  const currentRotY  = useRef(0);
  const currentRotX  = useRef(0);
  const shakeX       = useRef(0);
  const shakeY       = useRef(0);
  const currentFov   = useRef(BASE_FOV);
  const clock        = useRef(0);

  useFrame((state, delta) => {
    clock.current += delta;
    const t = clock.current;

    const eng = engineRef?.current;
    if (!eng) return;

    const targetZ = eng.cameraTargetZ?.current ?? 0;
    const vel     = eng.velocity?.current       ?? 0;
    const spd     = eng.speed?.current          ?? 0;
    const mx      = eng.mouse?.current?.x       ?? 0;
    const my      = eng.mouse?.current?.y       ?? 0;

    /* ── Z Position (core journey) ── */
    currentZ.current += (targetZ - currentZ.current) * LERP_Z;
    camera.position.z = currentZ.current;

    /* ── Camera shake (speed-reactive) ── */
    const shakeAmt   = Math.min(spd * 0.4, 0.12);
    const targetShkX = Math.sin(t * 11.3) * shakeAmt;
    const targetShkY = Math.cos(t *  9.1) * shakeAmt * 0.6;
    shakeX.current  += (targetShkX - shakeX.current) * LERP_SHAKE;
    shakeY.current  += (targetShkY - shakeY.current) * LERP_SHAKE;
    camera.position.x = shakeX.current;
    camera.position.y = shakeY.current;

    /* ── Mouse look ── */
    const tRotY  =  mx * 0.12;
    const tRotX  = -my * 0.07 - 0.03; // -0.03 = slight downward pitch
    currentRotY.current += (tRotY - currentRotY.current) * LERP_ROT;
    currentRotX.current += (tRotX - currentRotX.current) * LERP_ROT;
    camera.rotation.y = currentRotY.current;
    camera.rotation.x = currentRotX.current;

    /* ── FOV warp on fast scroll ── */
    const targetFov = BASE_FOV + (WARP_FOV - BASE_FOV) * Math.min(spd * 3, 1);
    currentFov.current += (targetFov - currentFov.current) * LERP_FOV;
    camera.fov = currentFov.current;
    camera.updateProjectionMatrix();
  });

  return null;
}