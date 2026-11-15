"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { DevMood } from "@/context/RoleContext";
import { DevBotAvatar } from "./DevBotAvatar";

interface MorphingThreeCharacterProps {
  mood: DevMood;
  accentColor: string;
  secondaryAccent?: string;
  scrollRotation?: number;
  badgeText?: string;
  className?: string;
}

/**
 * High-fidelity stylized 3D Human Developer character with realistic human
 * proportions, streetwear hoodie, cargo pants, high-top sneakers, sculpted face,
 * stylish hair, developer eyeglasses, headphones, and physically accurate
 * 2-bone analytical IK cycling motion on an articulated road bicycle.
 */
export function MorphingThreeCharacter({
  mood,
  accentColor,
  secondaryAccent = "#22D3EE",
  scrollRotation = 0,
  badgeText = "OG · P1",
  className = "h-full w-full",
}: MorphingThreeCharacterProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [webglFailed, setWebglFailed] = useState(false);

  const moodRef = useRef<DevMood>(mood);
  const accentRef = useRef<string>(accentColor);
  const scrollRotRef = useRef<number>(scrollRotation);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    moodRef.current = mood;
  }, [mood]);

  useEffect(() => {
    accentRef.current = accentColor;
  }, [accentColor]);

  useEffect(() => {
    scrollRotRef.current = scrollRotation;
  }, [scrollRotation]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    const rect = host.getBoundingClientRect();
    const width = Math.max(rect.width, 220);
    const height = Math.max(rect.height, 220);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 5.0);

    // Warm Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xf5f3ee, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff6ea, 1.7);
    keyLight.position.set(3.2, 4.8, 3.8);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xdbe4f0, 0.85);
    fillLight.position.set(-3.5, 2.2, 2.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(new THREE.Color(accentRef.current), 1.9);
    rimLight.position.set(0, 3.5, -4.0);
    scene.add(rimLight);

    const stageRoot = new THREE.Group();
    scene.add(stageRoot);

    // Resource tracking for disposal
    const geos: THREE.BufferGeometry[] = [];
    const mats: THREE.Material[] = [];
    const geo = <T extends THREE.BufferGeometry>(g: T) => {
      geos.push(g);
      return g;
    };
    const mat = <T extends THREE.Material>(m: T) => {
      mats.push(m);
      return m;
    };

    // Styling Materials: Human PBR Skin, Techwear Fabric, and Glowing Accents
    const skinMat = mat(
      new THREE.MeshStandardMaterial({
        color: 0xdeb394,
        roughness: 0.6,
        metalness: 0.05,
      })
    );
    const hairMat = mat(
      new THREE.MeshStandardMaterial({
        color: 0x181a22,
        roughness: 0.8,
        metalness: 0.1,
      })
    );
    const hoodieMat = mat(
      new THREE.MeshStandardMaterial({
        color: 0x161a24,
        roughness: 0.7,
        metalness: 0.08,
      })
    );
    const pantsMat = mat(
      new THREE.MeshStandardMaterial({
        color: 0x1f2636,
        roughness: 0.75,
        metalness: 0.05,
      })
    );
    const sneakerWhiteMat = mat(
      new THREE.MeshStandardMaterial({
        color: 0xf4f1ea,
        roughness: 0.35,
        metalness: 0.08,
      })
    );
    const darkMetalMat = mat(
      new THREE.MeshStandardMaterial({
        color: 0x12151d,
        roughness: 0.35,
        metalness: 0.8,
      })
    );
    const frameMetalMat = mat(
      new THREE.MeshStandardMaterial({
        color: 0x2c3444,
        roughness: 0.25,
        metalness: 0.85,
      })
    );
    const goldMat = mat(
      new THREE.MeshStandardMaterial({
        color: 0xffb547,
        emissive: 0xffb547,
        emissiveIntensity: 0.28,
        roughness: 0.3,
        metalness: 0.7,
      })
    );
    const accentMat = mat(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(accentRef.current),
        emissive: new THREE.Color(accentRef.current),
        emissiveIntensity: 0.8,
        roughness: 0.22,
        metalness: 0.3,
      })
    );
    const glassMat = mat(
      new THREE.MeshStandardMaterial({
        color: 0x111622,
        emissive: new THREE.Color(accentRef.current),
        emissiveIntensity: 0.5,
        roughness: 0.15,
        metalness: 0.4,
      })
    );

    // =========================================================================
    // 1. HUMAN DEVELOPER SKELETAL RIG
    // =========================================================================
    const human = new THREE.Group();
    stageRoot.add(human);

    // Pelvis / Hips (Root anchor for spine and legs)
    const pelvis = new THREE.Group();
    pelvis.position.set(0, -0.22, 0);
    human.add(pelvis);

    const pelvisMesh = new THREE.Mesh(
      geo(new THREE.CylinderGeometry(0.18, 0.16, 0.22, 14)),
      pantsMat
    );
    pelvis.add(pelvisMesh);

    // Torso (waist + chest + hoodie details)
    const spine = new THREE.Group();
    spine.position.set(0, 0.11, 0);
    pelvis.add(spine);

    const waistMesh = new THREE.Mesh(
      geo(new THREE.CylinderGeometry(0.22, 0.19, 0.28, 16)),
      hoodieMat
    );
    waistMesh.position.y = 0.14;
    spine.add(waistMesh);

    const chestMesh = new THREE.Mesh(
      geo(new THREE.CylinderGeometry(0.27, 0.22, 0.38, 16)),
      hoodieMat
    );
    chestMesh.scale.set(1.05, 1, 0.75);
    chestMesh.position.y = 0.45;
    spine.add(chestMesh);

    // Kangaroo pouch pocket + zipper line
    const pouch = new THREE.Mesh(
      geo(new THREE.BoxGeometry(0.28, 0.14, 0.05)),
      darkMetalMat
    );
    pouch.position.set(0, 0.22, 0.18);
    spine.add(pouch);

    const zip = new THREE.Mesh(
      geo(new THREE.BoxGeometry(0.02, 0.52, 0.02)),
      accentMat
    );
    zip.position.set(0, 0.4, 0.19);
    spine.add(zip);

    // Relaxed hoodie cowl around the back of the neck
    const hoodCowl = new THREE.Mesh(
      geo(new THREE.TorusGeometry(0.17, 0.065, 8, 18)),
      hoodieMat
    );
    hoodCowl.rotation.x = Math.PI / 2.2;
    hoodCowl.position.set(0, 0.65, -0.05);
    spine.add(hoodCowl);

    // Neck & Head
    const neckPivot = new THREE.Group();
    neckPivot.position.set(0, 0.7, 0);
    spine.add(neckPivot);

    const neck = new THREE.Mesh(
      geo(new THREE.CylinderGeometry(0.08, 0.09, 0.16, 12)),
      skinMat
    );
    neck.position.y = 0.05;
    neckPivot.add(neck);

    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.22, 0.02);
    neckPivot.add(headGroup);

    // Sculpted head & jaw
    const headMesh = new THREE.Mesh(
      geo(new THREE.SphereGeometry(0.22, 22, 18)),
      skinMat
    );
    headMesh.scale.set(0.9, 1.08, 0.95);
    headGroup.add(headMesh);

    // Stylish haircut (layered textured top & taper)
    const hair = new THREE.Mesh(
      geo(new THREE.SphereGeometry(0.23, 18, 14, 0, Math.PI * 2, 0, Math.PI * 0.58)),
      hairMat
    );
    hair.scale.set(0.94, 1.1, 1.0);
    hair.rotation.x = -0.15;
    hair.position.set(0, 0.04, -0.02);
    headGroup.add(hair);

    const hairFringe = new THREE.Mesh(
      geo(new THREE.CapsuleGeometry(0.06, 0.22, 6, 10)),
      hairMat
    );
    hairFringe.rotation.z = Math.PI / 2 + 0.14;
    hairFringe.position.set(0.02, 0.14, 0.16);
    headGroup.add(hairFringe);

    // Developer Eyeglasses (refined dark wireframe with reflective cyber lenses)
    [-0.075, 0.075].forEach((ex) => {
      const eyeFrame = new THREE.Mesh(
        geo(new THREE.BoxGeometry(0.1, 0.065, 0.02)),
        darkMetalMat
      );
      eyeFrame.position.set(ex, 0.015, 0.21);
      headGroup.add(eyeFrame);

      const lens = new THREE.Mesh(
        geo(new THREE.BoxGeometry(0.085, 0.05, 0.022)),
        accentMat
      );
      lens.position.set(ex, 0.015, 0.211);
      lens.scale.z = 0.35;
      headGroup.add(lens);
    });
    const glassesBridge = new THREE.Mesh(
      geo(new THREE.BoxGeometry(0.055, 0.015, 0.018)),
      darkMetalMat
    );
    glassesBridge.position.set(0, 0.02, 0.21);
    headGroup.add(glassesBridge);

    // Over-Ear Studio Headphones (over ears or resting stylishly around neck)
    const headphones = new THREE.Group();
    headGroup.add(headphones);
    const band = new THREE.Mesh(
      geo(new THREE.TorusGeometry(0.235, 0.024, 8, 20, Math.PI)),
      darkMetalMat
    );
    band.position.y = 0.03;
    headphones.add(band);
    [-0.23, 0.23].forEach((hx) => {
      const earCup = new THREE.Mesh(
        geo(new THREE.CylinderGeometry(0.07, 0.07, 0.05, 14)),
        darkMetalMat
      );
      earCup.rotation.z = Math.PI / 2;
      earCup.position.set(hx, 0, -0.01);
      const glowRing = new THREE.Mesh(
        geo(new THREE.TorusGeometry(0.05, 0.01, 6, 16)),
        accentMat
      );
      glowRing.rotation.y = Math.PI / 2;
      glowRing.position.set(hx + (hx > 0 ? 0.026 : -0.026), 0, -0.01);
      headphones.add(earCup, glowRing);
    });

    // Academic Graduation Cap (worn during Factory mode)
    const gradCap = new THREE.Group();
    gradCap.position.set(0, 0.22, 0);
    headGroup.add(gradCap);
    const capSkull = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.18, 0.19, 0.08, 16)), darkMetalMat);
    const mortarBoard = new THREE.Mesh(geo(new THREE.BoxGeometry(0.6, 0.032, 0.6)), darkMetalMat);
    mortarBoard.position.y = 0.05;
    mortarBoard.rotation.y = Math.PI / 4;
    const goldTrim = new THREE.Mesh(geo(new THREE.BoxGeometry(0.62, 0.015, 0.62)), goldMat);
    goldTrim.position.y = 0.042;
    goldTrim.rotation.y = Math.PI / 4;
    const tassel = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.012, 0.024, 0.25, 8)), goldMat);
    tassel.position.set(0.3, -0.05, 0.08);
    tassel.rotation.z = -0.15;
    gradCap.add(capSkull, mortarBoard, goldTrim, tassel);

    // Articulated Arms (Shoulder -> Bicep -> Elbow -> Forearm -> Hand)
    const makeArm = (side: -1 | 1) => {
      const shoulder = new THREE.Group();
      shoulder.position.set(side * 0.31, 0.62, 0);
      spine.add(shoulder);

      const upperArm = new THREE.Mesh(
        geo(new THREE.CapsuleGeometry(0.07, 0.24, 6, 10)),
        hoodieMat
      );
      upperArm.position.y = -0.14;
      shoulder.add(upperArm);

      const elbow = new THREE.Group();
      elbow.position.set(0, -0.28, 0);
      shoulder.add(elbow);

      const forearm = new THREE.Mesh(
        geo(new THREE.CapsuleGeometry(0.062, 0.22, 6, 10)),
        hoodieMat
      );
      forearm.position.y = -0.13;
      elbow.add(forearm);

      const hand = new THREE.Mesh(geo(new THREE.SphereGeometry(0.06, 12, 10)), skinMat);
      hand.position.y = -0.28;
      elbow.add(hand);

      return { shoulder, elbow, hand };
    };
    const armL = makeArm(-1);
    const armR = makeArm(1);

    // Props attached to hands
    const wrench = new THREE.Group();
    wrench.position.set(0, -0.02, 0.08);
    wrench.rotation.x = Math.PI / 2;
    const wrenchBar = new THREE.Mesh(geo(new THREE.BoxGeometry(0.03, 0.28, 0.02)), sneakerWhiteMat);
    wrenchBar.position.y = 0.12;
    const wrenchHead = new THREE.Mesh(
      geo(new THREE.TorusGeometry(0.05, 0.016, 6, 14, Math.PI * 1.4)),
      goldMat
    );
    wrenchHead.position.y = 0.27;
    wrench.add(wrenchBar, wrenchHead);
    armR.hand.add(wrench);

    const diploma = new THREE.Group();
    diploma.position.set(0, 0, 0.08);
    diploma.rotation.x = Math.PI / 2.3;
    const roll = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.034, 0.034, 0.32, 12)), sneakerWhiteMat);
    const tie = new THREE.Mesh(geo(new THREE.TorusGeometry(0.038, 0.01, 6, 14)), accentMat);
    tie.rotation.x = Math.PI / 2;
    diploma.add(roll, tie);
    armR.hand.add(diploma);

    // Articulated Legs (Hip -> Thigh -> Knee -> Shin -> Ankle -> Sneaker)
    const THIGH_L = 0.42;
    const SHIN_L = 0.42;
    const makeLeg = (side: -1 | 1) => {
      const hip = new THREE.Group();
      hip.position.set(side * 0.13, -0.06, 0);
      pelvis.add(hip);

      const thigh = new THREE.Mesh(
        geo(new THREE.CapsuleGeometry(0.084, THIGH_L - 0.1, 6, 12)),
        pantsMat
      );
      thigh.position.y = -THIGH_L / 2;
      hip.add(thigh);

      const knee = new THREE.Group();
      knee.position.set(0, -THIGH_L, 0);
      hip.add(knee);

      const shin = new THREE.Mesh(
        geo(new THREE.CapsuleGeometry(0.07, SHIN_L - 0.1, 6, 12)),
        pantsMat
      );
      shin.position.y = -SHIN_L / 2;
      knee.add(shin);

      const ankle = new THREE.Group();
      ankle.position.set(0, -SHIN_L, 0);
      knee.add(ankle);

      // High-top Streetwear Sneaker (thick cream sole + dark upper + accent stripe)
      const sole = new THREE.Mesh(
        geo(new THREE.BoxGeometry(0.135, 0.055, 0.26)),
        sneakerWhiteMat
      );
      sole.position.set(0, -0.045, 0.045);
      const upper = new THREE.Mesh(
        geo(new THREE.BoxGeometry(0.128, 0.08, 0.22)),
        darkMetalMat
      );
      upper.position.set(0, 0.015, 0.03);
      const stripe = new THREE.Mesh(
        geo(new THREE.BoxGeometry(0.134, 0.024, 0.16)),
        accentMat
      );
      stripe.position.set(0, 0, 0.04);
      ankle.add(sole, upper, stripe);

      return { hip, knee, ankle };
    };
    const legL = makeLeg(-1);
    const legR = makeLeg(1);

    // =========================================================================
    // 2. REALISTIC 3D ROAD BICYCLE (Diamond frame, drop bars, spoked 700c wheels)
    // =========================================================================
    // Bicycle is oriented along world X axis (rides forward along The Street!)
    const bike = new THREE.Group();
    stageRoot.add(bike);

    const wheelF = new THREE.Group();
    wheelF.position.set(0.68, -0.46, 0);
    const wheelR = new THREE.Group();
    wheelR.position.set(-0.68, -0.46, 0);
    bike.add(wheelF, wheelR);

    const tireGeo = geo(new THREE.TorusGeometry(0.35, 0.038, 10, 32));
    const rimGeo = geo(new THREE.TorusGeometry(0.32, 0.016, 8, 28));
    const spokeGeo = geo(new THREE.CylinderGeometry(0.007, 0.007, 0.63, 6));
    const hubGeo = geo(new THREE.CylinderGeometry(0.035, 0.035, 0.1, 10));

    [wheelF, wheelR].forEach((wGroup) => {
      wGroup.add(new THREE.Mesh(tireGeo, darkMetalMat));
      wGroup.add(new THREE.Mesh(rimGeo, accentMat));
      const hub = new THREE.Mesh(hubGeo, sneakerWhiteMat);
      hub.rotation.x = Math.PI / 2;
      wGroup.add(hub);
      for (let s = 0; s < 4; s++) {
        const spoke = new THREE.Mesh(spokeGeo, sneakerWhiteMat);
        spoke.rotation.z = (s * Math.PI) / 4;
        wGroup.add(spoke);
      }
    });

    // Frame tubes helper
    const frameTube = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      radius: number,
      m: THREE.Material
    ) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.hypot(dx, dy);
      const mesh = new THREE.Mesh(geo(new THREE.CylinderGeometry(radius, radius, len, 10)), m);
      mesh.position.set((x1 + x2) / 2, (y1 + y2) / 2, 0);
      mesh.rotation.z = Math.atan2(dy, dx) - Math.PI / 2;
      bike.add(mesh);
    };

    // Realistic Bicycle Geometry Coordinates
    const BB_X = -0.06;
    const BB_Y = -0.46;
    const SEAT_X = -0.28;
    const SEAT_Y = 0.08;
    const HEAD_TOP_X = 0.44;
    const HEAD_TOP_Y = 0.06;
    const HEAD_BOT_X = 0.52;
    const HEAD_BOT_Y = -0.12;

    frameTube(BB_X, BB_Y, SEAT_X, SEAT_Y, 0.028, accentMat); // Seat tube
    frameTube(SEAT_X, SEAT_Y, HEAD_TOP_X, HEAD_TOP_Y, 0.028, frameMetalMat); // Top tube
    frameTube(BB_X, BB_Y, HEAD_BOT_X, HEAD_BOT_Y, 0.032, frameMetalMat); // Down tube
    frameTube(HEAD_TOP_X, HEAD_TOP_Y, HEAD_BOT_X, HEAD_BOT_Y, 0.03, accentMat); // Head tube
    frameTube(HEAD_BOT_X, HEAD_BOT_Y, 0.68, -0.46, 0.024, sneakerWhiteMat); // Fork
    frameTube(BB_X, BB_Y, -0.68, -0.46, 0.018, frameMetalMat); // Chainstay
    frameTube(SEAT_X, SEAT_Y, -0.68, -0.46, 0.018, frameMetalMat); // Seatstay

    // Saddle
    frameTube(SEAT_X, SEAT_Y, SEAT_X - 0.05, SEAT_Y + 0.12, 0.02, sneakerWhiteMat);
    const saddle = new THREE.Mesh(geo(new THREE.BoxGeometry(0.24, 0.05, 0.12)), darkMetalMat);
    saddle.position.set(SEAT_X - 0.05, SEAT_Y + 0.14, 0);
    bike.add(saddle);

    // Drop Handlebars
    frameTube(HEAD_TOP_X, HEAD_TOP_Y, HEAD_TOP_X + 0.06, HEAD_TOP_Y + 0.12, 0.02, sneakerWhiteMat);
    const bar = new THREE.Mesh(
      geo(new THREE.CylinderGeometry(0.018, 0.018, 0.38, 8)),
      darkMetalMat
    );
    bar.rotation.x = Math.PI / 2;
    bar.position.set(HEAD_TOP_X + 0.08, HEAD_TOP_Y + 0.12, 0);
    bike.add(bar);

    // Crankset + Pedals
    const crankRadius = 0.18;
    const chainring = new THREE.Mesh(
      geo(new THREE.TorusGeometry(0.095, 0.015, 6, 24)),
      goldMat
    );
    chainring.position.set(BB_X, BB_Y, 0.04);
    bike.add(chainring);

    const crankGroup = new THREE.Group();
    crankGroup.position.set(BB_X, BB_Y, 0);
    bike.add(crankGroup);
    const crankBar = new THREE.Mesh(
      geo(new THREE.BoxGeometry(0.028, crankRadius * 2, 0.018)),
      sneakerWhiteMat
    );
    crankGroup.add(crankBar);
    const pedalL = new THREE.Mesh(geo(new THREE.BoxGeometry(0.09, 0.025, 0.08)), darkMetalMat);
    pedalL.position.set(0, crankRadius, -0.15);
    const pedalR = new THREE.Mesh(geo(new THREE.BoxGeometry(0.09, 0.025, 0.08)), darkMetalMat);
    pedalR.position.set(0, -crankRadius, 0.15);
    crankGroup.add(pedalL, pedalR);

    // =========================================================================
    // 3. SCENE ACCESSORIES (COMPANION BOT, ORBIT, WORKSTATION, BENCH)
    // =========================================================================

    // A) 4-Discipline Orbital Satellites (Overview)
    const orbitGroup = new THREE.Group();
    stageRoot.add(orbitGroup);
    const orbitTorus = new THREE.Mesh(
      geo(new THREE.TorusGeometry(1.4, 0.012, 6, 64)),
      mat(new THREE.MeshBasicMaterial({ color: 0xf4f1ea, transparent: true, opacity: 0.22 }))
    );
    orbitTorus.rotation.x = Math.PI / 2.3;
    orbitGroup.add(orbitTorus);
    const satColors = [0xea1d0f, 0xffb547, 0x22d3ee, 0xa78bfa];
    const sats = satColors.map((c) => {
      const s = new THREE.Mesh(
        geo(new THREE.OctahedronGeometry(0.1, 0)),
        mat(new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.85 }))
      );
      orbitGroup.add(s);
      return s;
    });

    // B) Companion AI Bot (Leashed in AI, Open Neural Brain in ML Mechanic)
    const drone = new THREE.Group();
    stageRoot.add(drone);
    const droneBody = new THREE.Mesh(geo(new THREE.BoxGeometry(0.34, 0.26, 0.28)), darkMetalMat);
    drone.add(droneBody);
    const droneVisor = new THREE.Mesh(
      geo(new THREE.BoxGeometry(0.26, 0.1, 0.02)),
      mat(new THREE.MeshBasicMaterial({ color: 0x0a0d14 }))
    );
    droneVisor.position.set(0, 0.02, 0.145);
    drone.add(droneVisor);
    [-0.055, 0.055].forEach((dx) => {
      const droneEye = new THREE.Mesh(
        geo(new THREE.SphereGeometry(0.028, 8, 8)),
        mat(new THREE.MeshBasicMaterial({ color: 0x22d3ee }))
      );
      droneEye.position.set(dx, 0.02, 0.155);
      drone.add(droneEye);
    });

    // Hinged Skull Cap + Spinning Neural Core (ML Mechanic)
    const droneHingedLid = new THREE.Group();
    droneHingedLid.position.set(-0.17, 0.13, 0);
    drone.add(droneHingedLid);
    const droneLidMesh = new THREE.Mesh(
      geo(new THREE.BoxGeometry(0.36, 0.05, 0.3)),
      sneakerWhiteMat
    );
    droneLidMesh.position.set(0.17, 0.025, 0);
    droneHingedLid.add(droneLidMesh);

    const brainCore = new THREE.Mesh(
      geo(new THREE.IcosahedronGeometry(0.11, 1)),
      mat(new THREE.MeshBasicMaterial({ color: 0xa78bfa, wireframe: true }))
    );
    brainCore.position.set(0, 0.15, 0);
    drone.add(brainCore);

    // Glowing Leash
    const leashLine = new THREE.Line(
      geo(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0.35, 0, 0.15),
          new THREE.Vector3(0.8, -0.15, 0.25),
        ])
      ),
      mat(new THREE.LineBasicMaterial({ color: 0x22d3ee }))
    );
    stageRoot.add(leashLine);

    // C) Dual-Monitor Curved Battlestation Workstation (Desk Chat)
    const desk = new THREE.Group();
    stageRoot.add(desk);
    const deskSurface = new THREE.Mesh(geo(new THREE.BoxGeometry(1.65, 0.05, 0.68)), darkMetalMat);
    deskSurface.position.set(0, -0.22, 0.58);
    desk.add(deskSurface);
    [-0.72, 0.72].forEach((lx) => {
      const leg = new THREE.Mesh(geo(new THREE.BoxGeometry(0.045, 0.9, 0.045)), frameMetalMat);
      leg.position.set(lx, -0.69, 0.58);
      desk.add(leg);
    });
    const monL = new THREE.Mesh(geo(new THREE.BoxGeometry(0.66, 0.42, 0.03)), glassMat);
    monL.position.set(-0.3, 0.08, 0.68);
    monL.rotation.y = -0.18;
    const monR = new THREE.Mesh(geo(new THREE.BoxGeometry(0.66, 0.42, 0.03)), glassMat);
    monR.position.set(0.32, 0.08, 0.68);
    monR.rotation.y = 0.18;
    const coffeeMug = new THREE.Mesh(
      geo(new THREE.CylinderGeometry(0.05, 0.045, 0.11, 12)),
      sneakerWhiteMat
    );
    coffeeMug.position.set(0.64, -0.14, 0.52);
    desk.add(monL, monR, coffeeMug);

    // Resize Observer
    const onResize = () => {
      if (!host) return;
      const r = host.getBoundingClientRect();
      const w = Math.max(r.width, 180);
      const h = Math.max(r.height, 180);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(host);

    const onPointerMove = (e: MouseEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointerRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onPointerMove, { passive: true });

    const clock = new THREE.Clock();
    const curColor = new THREE.Color(accentRef.current);
    const targetColor = new THREE.Color(accentRef.current);
    let rafId = 0;

    // Weight smooth transitions
    const blend = {
      orbit: 1,
      bike: 0,
      drone: 0,
      wrench: 0,
      desk: 0,
      grad: 0,
    };

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const m = moodRef.current;

      // Color lerp
      targetColor.set(accentRef.current);
      curColor.lerp(targetColor, 0.12);
      accentMat.color.copy(curColor);
      accentMat.emissive.copy(curColor);
      glassMat.emissive.copy(curColor);
      rimLight.color.copy(curColor);

      // Activity goals
      const goals = {
        orbit: m === "orbit" ? 1 : 0,
        bike: m === "bicycle" ? 1 : 0,
        drone: m === "ai-leash" || m === "ml-mechanic" ? 1 : 0,
        wrench: m === "ml-mechanic" ? 1 : 0,
        desk: m === "desk-chat" ? 1 : 0,
        grad: m === "graduation" ? 1 : 0,
      };
      (Object.keys(goals) as Array<keyof typeof goals>).forEach((k) => {
        blend[k] += (goals[k] - blend[k]) * 0.14;
      });

      // Camera framing per mode
      const camZ = m === "bicycle" ? 5.4 : 4.9;
      const camY = m === "bicycle" ? 0.05 : 0.28;
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, camZ, 0.1);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, camY, 0.1);

      // Facing orientation: Clean side profile view riding across The Street!
      // Both human & bike share local +Z forward (via bike.rotation.y = -Math.PI/2),
      // so stageRoot.rotation.y = Math.PI/2 frames the complete rider in crisp profile riding right!
      bike.rotation.y = -Math.PI / 2;
      const targetRotY =
        m === "bicycle"
          ? Math.PI / 2
          : pointerRef.current.x * 0.26 + (m === "graduation" ? 0.15 : 0);
      stageRoot.rotation.y = THREE.MathUtils.lerp(stageRoot.rotation.y, targetRotY, 0.12);
      stageRoot.rotation.x = THREE.MathUtils.lerp(
        stageRoot.rotation.x,
        m === "bicycle" ? 0 : -pointerRef.current.y * 0.12,
        0.1
      );

      // =======================================================================
      // KINEMATIC POSTURES & ARTICULATED CYCLING IK
      // =======================================================================
      if (m === "bicycle") {
        // Both human & bike share +Z forward (`bike` rotated -PI/2 puts saddle at z=-0.33, y=0.22; BB at z=-0.06, y=-0.46)
        pelvis.position.lerp(new THREE.Vector3(0, 0.22, -0.33), 0.18);
        spine.rotation.set(THREE.MathUtils.lerp(spine.rotation.x, 0.56, 0.16), 0, 0);
        neckPivot.rotation.set(THREE.MathUtils.lerp(neckPivot.rotation.x, -0.42, 0.16), 0, 0);

        // Arms reach forward (+Z) onto drop handlebars!
        armL.shoulder.rotation.set(-1.12, 0.08, 0.06);
        armL.elbow.rotation.set(-0.32, 0, 0);
        armR.shoulder.rotation.set(-1.12, -0.08, -0.06);
        armR.elbow.rotation.set(-0.32, 0, 0);

        // Continuous wheel & crank rotation linked directly to horizontal scroll
        const crankAngle = (scrollRotRef.current * Math.PI) / 180;
        wheelF.rotation.z = -crankAngle;
        wheelR.rotation.z = -crankAngle;
        crankGroup.rotation.z = -crankAngle;

        // EXACT 2-BONE CLOSED-FORM CYCLING INVERSE KINEMATICS (IK) in Y-Z plane
        const hipBaseZ = -0.33;
        const hipBaseY = 0.16;
        const R = crankRadius;

        const solveCyclingLeg = (
          leg: typeof legL,
          offsetRad: number,
          sideX: number
        ) => {
          const theta = -crankAngle + offsetRad;
          // Pedal position in shared Y-Z bike space (BB sits at z = -0.06, y = -0.46)
          const pedZ = BB_X + Math.cos(theta) * R;
          const pedY = BB_Y + Math.sin(theta) * R;

          const dz = pedZ - hipBaseZ;
          const dy = pedY - hipBaseY;
          const dist = Math.min(THIGH_L + SHIN_L - 0.015, Math.hypot(dz, dy));

          const cosKnee = THREE.MathUtils.clamp(
            (THIGH_L * THIGH_L + SHIN_L * SHIN_L - dist * dist) / (2 * THIGH_L * SHIN_L),
            -0.98,
            0.98
          );
          const kneeFlex = Math.PI - Math.acos(cosKnee);

          const cosHip = THREE.MathUtils.clamp(
            (THIGH_L * THIGH_L + dist * dist - SHIN_L * SHIN_L) / (2 * THIGH_L * dist),
            -0.98,
            0.98
          );
          const rayAngle = Math.atan2(dz, -dy);
          const hipAngle = rayAngle + Math.acos(cosHip);

          leg.hip.position.set(sideX, -0.06, 0);
          leg.hip.rotation.set(-hipAngle, 0, 0);
          leg.knee.rotation.set(kneeFlex, 0, 0);
          leg.ankle.rotation.set(hipAngle - kneeFlex * 0.72, 0, 0);
        };

        solveCyclingLeg(legL, Math.PI, -0.14); // Left pedal
        solveCyclingLeg(legR, 0, 0.14); // Right pedal
      } else {
        // Restore normal hip X spread when standing/sitting
        legL.hip.position.set(-0.13, -0.06, 0);
        legR.hip.position.set(0.13, -0.06, 0);
      }

      if (m === "bicycle") {
        // Handled above
      } else if (m === "desk-chat") {
        // Seated comfortably at the curved workstation desk
        pelvis.position.lerp(new THREE.Vector3(0, -0.32, -0.05), 0.15);
        spine.rotation.set(0.12, 0, 0);
        neckPivot.rotation.set(0.04, 0, 0);

        legL.hip.rotation.set(-1.38, 0, 0.08);
        legL.knee.rotation.set(1.42, 0, 0);
        legL.ankle.rotation.set(0, 0, 0);
        legR.hip.rotation.set(-1.38, 0, -0.08);
        legR.knee.rotation.set(1.42, 0, 0);
        legR.ankle.rotation.set(0, 0, 0);

        armL.shoulder.rotation.set(-0.75 + Math.sin(t * 8) * 0.04, 0.2, 0.1);
        armL.elbow.rotation.set(-0.85, 0, 0);
        armR.shoulder.rotation.set(-0.75 + Math.cos(t * 8) * 0.04, -0.2, -0.1);
        armR.elbow.rotation.set(-0.85, 0, 0);
      } else if (m === "ml-mechanic") {
        // Leaning in at repair bench tuning open AI bot skull
        pelvis.position.lerp(new THREE.Vector3(-0.18, -0.22, 0), 0.15);
        spine.rotation.set(0.24, 0, 0);
        neckPivot.rotation.set(0.14, 0, 0);

        legL.hip.rotation.set(-0.06, 0, 0.06);
        legL.knee.rotation.set(0.08, 0, 0);
        legR.hip.rotation.set(0.06, 0, -0.06);
        legR.knee.rotation.set(0.06, 0, 0);

        armL.shoulder.rotation.set(-0.42, 0.1, 0.15);
        armL.elbow.rotation.set(-0.55, 0, 0);
        armR.shoulder.rotation.set(-0.8 + Math.sin(t * 7) * 0.14, -0.24, -0.1);
        armR.elbow.rotation.set(-0.6, 0, 0);
      } else if (m === "ai-leash") {
        pelvis.position.lerp(new THREE.Vector3(-0.16, -0.22, 0), 0.15);
        spine.rotation.set(0.05, 0, 0);
        neckPivot.rotation.set(0, 0, 0);

        legL.hip.rotation.set(-0.05, 0, 0.05);
        legL.knee.rotation.set(0.08, 0, 0);
        legR.hip.rotation.set(0.05, 0, -0.05);
        legR.knee.rotation.set(0.05, 0, 0);

        armL.shoulder.rotation.set(0.08, 0, 0.12);
        armL.elbow.rotation.set(-0.24, 0, 0);
        armR.shoulder.rotation.set(-0.54, -0.25, -0.15);
        armR.elbow.rotation.set(-0.35 + Math.sin(t * 2.5) * 0.06, 0, 0);
      } else if (m === "graduation") {
        pelvis.position.lerp(new THREE.Vector3(0, -0.22, 0), 0.15);
        spine.rotation.set(0, 0, 0);
        neckPivot.rotation.set(0, Math.sin(t * 1.5) * 0.05, 0);

        legL.hip.rotation.set(0, 0, 0.05);
        legL.knee.rotation.set(0, 0, 0);
        legR.hip.rotation.set(0, 0, -0.05);
        legR.knee.rotation.set(0, 0, 0);

        armL.shoulder.rotation.set(0.08, 0, 0.14);
        armL.elbow.rotation.set(-0.2, 0, 0);
        armR.shoulder.rotation.set(-0.62, -0.15, -0.12);
        armR.elbow.rotation.set(-0.55, 0, 0);
      } else {
        // Natural human breathing idle (Overview / Backend / DS)
        const breathe = Math.sin(t * 2.2) * 0.018;
        pelvis.position.lerp(new THREE.Vector3(0, -0.22 + breathe, 0), 0.15);
        spine.rotation.set(0, 0, 0);
        neckPivot.rotation.set(0, 0, 0);

        legL.hip.rotation.set(0, 0, 0.05);
        legL.knee.rotation.set(0, 0, 0);
        legR.hip.rotation.set(0, 0, -0.05);
        legR.knee.rotation.set(0, 0, 0);

        const armPose = m === "backend-ops" ? -0.65 : m === "ds-graph" ? -0.42 : 0.04;
        armL.shoulder.rotation.set(armPose + Math.sin(t * 3) * 0.04, 0.1, 0.14);
        armL.elbow.rotation.set(m === "orbit" ? -0.2 : -0.65, 0, 0);
        armR.shoulder.rotation.set(armPose + Math.cos(t * 3) * 0.04, -0.1, -0.14);
        armR.elbow.rotation.set(m === "orbit" ? -0.2 : -0.65, 0, 0);
      }

      // === PROPS VISIBILITY & DYNAMICS ===
      bike.visible = blend.bike > 0.02;
      bike.scale.setScalar(Math.max(0.001, blend.bike));

      orbitGroup.visible = blend.orbit > 0.02;
      orbitGroup.scale.setScalar(Math.max(0.001, blend.orbit));
      orbitTorus.rotation.z = t * 0.35;
      sats.forEach((sat, idx) => {
        const a = t * 0.75 + (idx * Math.PI) / 2;
        sat.position.set(Math.cos(a) * 1.4, Math.sin(a * 1.3) * 0.28, Math.sin(a) * 0.95);
        sat.rotation.y = t * 1.5;
      });

      drone.visible = blend.drone > 0.02;
      drone.scale.setScalar(Math.max(0.001, blend.drone));
      if (m === "ml-mechanic") {
        drone.position.lerp(new THREE.Vector3(0.48, -0.26, 0.38), 0.14);
        droneHingedLid.rotation.z = THREE.MathUtils.lerp(droneHingedLid.rotation.z, 0.85, 0.12);
        brainCore.visible = true;
        brainCore.rotation.y = t * 2.5;
        leashLine.visible = false;
      } else {
        drone.position.lerp(
          new THREE.Vector3(0.72, 0.06 + Math.sin(t * 2.8) * 0.12, 0.34),
          0.14
        );
        droneHingedLid.rotation.z = THREE.MathUtils.lerp(droneHingedLid.rotation.z, 0, 0.12);
        brainCore.visible = false;
        leashLine.visible = blend.drone > 0.3;
      }

      wrench.visible = blend.wrench > 0.1;
      diploma.visible = blend.grad > 0.1;
      gradCap.visible = blend.grad > 0.02;
      gradCap.scale.setScalar(Math.max(0.001, blend.grad));
      headphones.visible = blend.grad < 0.4;
      tassel.rotation.z = -0.15 + Math.sin(t * 2.2) * 0.08;

      desk.visible = blend.desk > 0.02;
      desk.scale.setScalar(Math.max(0.001, blend.desk));

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener("mousemove", onPointerMove);
      geos.forEach((g) => g.dispose());
      mats.forEach((mt) => mt.dispose());
      renderer.dispose();
      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (webglFailed) {
    return (
      <DevBotAvatar
        mood={mood}
        accentColor={accentColor}
        secondaryAccent={secondaryAccent}
        badgeText={badgeText}
        rotationDeg={scrollRotation}
        className={className}
      />
    );
  }

  return (
    <div
      ref={hostRef}
      className={`relative select-none ${className}`}
      aria-label={`Articulated 3D developer character in ${mood} mode`}
    />
  );
}
