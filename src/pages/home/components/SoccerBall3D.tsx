import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ─── Icosahedron vertex positions = pentagon face centres on a soccer ball ─── */
const PHI = (1 + Math.sqrt(5)) / 2;
const ICOSA_NORM = Math.sqrt(1 + PHI * PHI);

const RAW_PENT_NORMALS: [number, number, number][] = [
  [0, 1, PHI],  [0, 1, -PHI],  [0, -1, PHI],  [0, -1, -PHI],
  [1, PHI, 0],  [1, -PHI, 0],  [-1, PHI, 0],  [-1, -PHI, 0],
  [PHI, 0, 1],  [PHI, 0, -1],  [-PHI, 0, 1],  [-PHI, 0, -1],
];

function makePentagonShape(r: number): THREE.Shape {
  const s = new THREE.Shape();
  for (let i = 0; i < 5; i++) {
    const a = (i * 2 * Math.PI) / 5 - Math.PI / 10;
    if (i === 0) s.moveTo(r * Math.cos(a), r * Math.sin(a));
    else s.lineTo(r * Math.cos(a), r * Math.sin(a));
  }
  s.closePath();
  return s;
}

function makeSeamLines(r: number): THREE.BufferGeometry {
  const pts: THREE.Vector3[] = [];
  const verts: [number, number][] = [];
  for (let i = 0; i < 5; i++) {
    const a = (i * 2 * Math.PI) / 5 - Math.PI / 10;
    verts.push([r * Math.cos(a), r * Math.sin(a)]);
  }
  for (let i = 0; i < 5; i++) {
    const [x1, y1] = verts[i];
    const [x2, y2] = verts[(i + 1) % 5];
    pts.push(new THREE.Vector3(x1, y1, 0.001), new THREE.Vector3(x2, y2, 0.001));
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2;
    pts.push(new THREE.Vector3(mx, my, 0.001), new THREE.Vector3(mx * 1.38, my * 1.38, 0.001));
  }
  return new THREE.BufferGeometry().setFromPoints(pts);
}

interface Props {
  size?: number;
}

export default function SoccerBall3D({ size = 480 }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef({ y: 0, x: 0 });
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = size;
    const H = size;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    /* ── Scene / Camera ── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, W / H, 0.1, 100);
    camera.position.set(0, 0.05, 3.2);

    /* ── Lighting ── */
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));

    const keyLight = new THREE.DirectionalLight(0xfff8f0, 3.0);
    keyLight.position.set(-3, 5, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x4da6ff, 8, 18);
    rimLight.position.set(3.5, -2.5, -3);
    scene.add(rimLight);

    const fillLight = new THREE.DirectionalLight(0x99ccff, 0.9);
    fillLight.position.set(-2, -2, 2);
    scene.add(fillLight);

    const topBack = new THREE.PointLight(0xffffff, 2.0, 14);
    topBack.position.set(0, 4, -3);
    scene.add(topBack);

    /* ── Ball group ── */
    const ballGroup = new THREE.Group();
    scene.add(ballGroup);

    /* ── Base sphere ── */
    const sphereMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 128, 64),
      new THREE.MeshPhongMaterial({ color: 0xf4f4f4, shininess: 120, specular: 0xbbbbbb })
    );
    sphereMesh.castShadow = true;
    ballGroup.add(sphereMesh);

    /* ── Pentagon patches + seams ── */
    const pentGeo = new THREE.ShapeGeometry(makePentagonShape(0.328), 6);
    const pentMat = new THREE.MeshPhongMaterial({ color: 0x0a0a0a, shininess: 90, specular: 0x222222 });
    const seamMat = new THREE.LineBasicMaterial({ color: 0x1a1a1a });
    const Z_AXIS = new THREE.Vector3(0, 0, 1);

    RAW_PENT_NORMALS.forEach(([nx, ny, nz], idx) => {
      const normal = new THREE.Vector3(nx, ny, nz).divideScalar(ICOSA_NORM).normalize();

      const patch = new THREE.Mesh(pentGeo, pentMat);
      patch.position.copy(normal.clone().multiplyScalar(1.003));
      const q = new THREE.Quaternion().setFromUnitVectors(Z_AXIS, normal);
      patch.quaternion.copy(q);
      const localSpin = new THREE.Quaternion().setFromAxisAngle(Z_AXIS, (idx / 12) * Math.PI * 2 + Math.PI / 10);
      patch.quaternion.multiply(localSpin);
      ballGroup.add(patch);

      const seams = new THREE.LineSegments(makeSeamLines(0.328), seamMat);
      seams.position.copy(patch.position);
      seams.quaternion.copy(patch.quaternion);
      ballGroup.add(seams);
    });

    /* ── Glow shells ── */
    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.07, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x2266ff, transparent: true, opacity: 0.06, side: THREE.BackSide, depthWrite: false })
    ));
    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.35, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x1144cc, transparent: true, opacity: 0.03, side: THREE.BackSide, depthWrite: false })
    ));

    /* ── Animation — rotation only on scroll delta ── */
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      ballGroup.rotation.y = rotationRef.current.y;
      ballGroup.rotation.x = rotationRef.current.x;
      renderer.render(scene, camera);
    };
    animate();

    const onScroll = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScrollRef.current;
      lastScrollRef.current = currentScroll;

      rotationRef.current.y += delta * 0.005;
      rotationRef.current.x += delta * 0.0015;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [size]);

  return (
    <div ref={mountRef} style={{ width: `${size}px`, height: `${size}px` }} />
  );
}
