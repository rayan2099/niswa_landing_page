import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

// iPhone proportions (roughly 71.5 x 147 x 7.8 mm), in scene units.
const PHONE_W = 1.43;
const PHONE_H = 2.94;
const PHONE_D = 0.16;
const BEZEL = 0.06;
const SCREEN_W = PHONE_W - BEZEL * 2;
const SCREEN_H = PHONE_H - BEZEL * 2;

type PhoneSlot = {
  group: THREE.Group;
  screen: THREE.MeshBasicMaterial;
  base: THREE.Vector3;
  baseRot: THREE.Euler;
  phase: number;
  /** Main screen, plus an optional alternate screen shown when the phone is clicked. */
  urls: string[];
  showAlt: boolean;
  /** URL most recently requested for this phone; older loads are ignored. */
  url?: string;
  /** Clock time when the last flip started, for the spin animation. */
  flipAt: number;
};

function roundedRectShape(w: number, h: number, r: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function screenGeometry() {
  const geo = new THREE.ShapeGeometry(roundedRectShape(SCREEN_W, SCREEN_H, 0.19), 24);
  // ShapeGeometry UVs are in shape space; normalise them to 0..1 so the screenshot fills the screen.
  const pos = geo.attributes.position;
  const uv = geo.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    uv.setXY(i, pos.getX(i) / SCREEN_W + 0.5, pos.getY(i) / SCREEN_H + 0.5);
  }
  uv.needsUpdate = true;
  return geo;
}

function buildPhone(frameColor: number, material: THREE.MeshBasicMaterial) {
  const group = new THREE.Group();

  const body = new THREE.Mesh(
    new RoundedBoxGeometry(PHONE_W, PHONE_H, PHONE_D, 8, 0.22),
    new THREE.MeshPhysicalMaterial({
      color: frameColor,
      metalness: 0.85,
      roughness: 0.28,
      clearcoat: 1,
      clearcoatRoughness: 0.2,
    }),
  );
  group.add(body);

  // Black glass around the display.
  const glass = new THREE.Mesh(
    new THREE.ShapeGeometry(roundedRectShape(PHONE_W - 0.03, PHONE_H - 0.03, 0.21), 24),
    new THREE.MeshPhysicalMaterial({ color: 0x050505, roughness: 0.05, metalness: 0, clearcoat: 1 }),
  );
  glass.position.z = PHONE_D / 2 + 0.001;
  group.add(glass);

  const screen = new THREE.Mesh(screenGeometry(), material);
  screen.position.z = PHONE_D / 2 + 0.003;
  group.add(screen);

  // Dynamic Island.
  const island = new THREE.Mesh(
    new THREE.ShapeGeometry(roundedRectShape(0.36, 0.105, 0.0525), 12),
    new THREE.MeshBasicMaterial({ color: 0x000000 }),
  );
  island.position.set(0, SCREEN_H / 2 - 0.1, PHONE_D / 2 + 0.004);
  group.add(island);

  // Side buttons.
  const btnMat = new THREE.MeshStandardMaterial({ color: frameColor, metalness: 0.9, roughness: 0.3 });
  const addButton = (x: number, y: number, h: number) => {
    const b = new THREE.Mesh(new RoundedBoxGeometry(0.03, h, 0.07, 2, 0.012), btnMat);
    b.position.set(x, y, 0);
    group.add(b);
  };
  addButton(PHONE_W / 2 + 0.008, 0.55, 0.42);
  addButton(-PHONE_W / 2 - 0.008, 0.85, 0.16);
  addButton(-PHONE_W / 2 - 0.008, 0.5, 0.28);
  addButton(-PHONE_W / 2 - 0.008, 0.15, 0.28);

  return group;
}

export type ScreenSlot = { main: string; alt?: string };

export type Showcase = {
  setScreens: (slots: ScreenSlot[]) => void;
  setDirection: (rtl: boolean) => void;
};

export function createShowcase(canvas: HTMLCanvasElement): Showcase | null {
  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(3, 5, 6);
  scene.add(key, new THREE.AmbientLight(0xffe4ea, 0.6));

  const loader = new THREE.TextureLoader();
  const stage = new THREE.Group();
  scene.add(stage);

  // Three phones: one front and centre, two angled behind it.
  const layout = [
    { pos: new THREE.Vector3(-1.75, -0.15, -1.1), rot: new THREE.Euler(0.04, 0.42, 0.06), color: 0xe9d5d0 },
    { pos: new THREE.Vector3(0, 0.05, 0), rot: new THREE.Euler(0, -0.08, 0), color: 0x2a2224 },
    { pos: new THREE.Vector3(1.75, -0.2, -1.1), rot: new THREE.Euler(0.04, -0.42, -0.06), color: 0xdcc7b8 },
  ];
  const phones: PhoneSlot[] = layout.map((l, i) => {
    const material = new THREE.MeshBasicMaterial({ color: 0xfdfcfb, toneMapped: false });
    const group = buildPhone(l.color, material);
    group.position.copy(l.pos);
    group.rotation.copy(l.rot);
    stage.add(group);
    return {
      group,
      screen: material,
      base: l.pos.clone(),
      baseRot: l.rot.clone(),
      phase: i * 1.7,
      urls: [],
      showAlt: false,
      flipAt: -Infinity,
    };
  });

  // Soft crescent of glowing particles behind the phones, echoing the Niswah moon logo.
  const count = 900;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const a = Math.PI * 0.15 + Math.random() * Math.PI * 1.55;
    const r = 3.1 + (Math.random() - 0.5) * 0.7 * Math.sin(a * 0.9);
    positions[i * 3] = Math.cos(a) * r + (Math.random() - 0.5) * 0.25;
    positions[i * 3 + 1] = Math.sin(a) * r + (Math.random() - 0.5) * 0.25;
    positions[i * 3 + 2] = -2.6 + (Math.random() - 0.5) * 1.2;
    sizes[i] = Math.random();
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  pGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  const pMat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { uTime: { value: 0 }, uPixel: { value: renderer.getPixelRatio() } },
    vertexShader: /* glsl */ `
      attribute float size;
      uniform float uTime;
      uniform float uPixel;
      varying float vTwinkle;
      void main() {
        vec3 p = position;
        p.y += sin(uTime * 0.6 + position.x * 2.0) * 0.04;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        vTwinkle = 0.55 + 0.45 * sin(uTime * 1.5 + size * 40.0);
        gl_PointSize = (4.0 + size * 10.0) * uPixel * (6.0 / -mv.z);
      }`,
    fragmentShader: /* glsl */ `
      varying float vTwinkle;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d);
        vec3 col = mix(vec3(0.75, 0.07, 0.24), vec3(0.98, 0.65, 0.72), vTwinkle);
        gl_FragColor = vec4(col, a * 0.55 * vTwinkle);
      }`,
  });
  const particles = new THREE.Points(pGeo, pMat);
  scene.add(particles);

  const clock = new THREE.Clock();
  const pointer = new THREE.Vector2();
  window.addEventListener('pointermove', (e) => {
    pointer.set((e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1);
  });

  const showSlot = (slot: PhoneSlot) => {
    const url = slot.urls[slot.showAlt && slot.urls[1] ? 1 : 0];
    if (!url) return;
    slot.url = url;
    loader.load(url, (tex) => {
      if (slot.url !== url) {
        tex.dispose();
        return;
      }
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      slot.screen.map?.dispose();
      slot.screen.map = tex;
      slot.screen.color.set(0xffffff);
      slot.screen.needsUpdate = true;
    });
  };

  // Clicking a phone that has an alternate screen flips it to that screen and back.
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const phoneAt = (e: PointerEvent | MouseEvent) => {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const hit = raycaster.intersectObjects(phones.map((p) => p.group), true)[0];
    if (!hit) return undefined;
    return phones.find((p) => p.urls[1] && p.group.getObjectById(hit.object.id));
  };
  canvas.addEventListener('pointermove', (e) => {
    canvas.style.cursor = phoneAt(e) ? 'pointer' : '';
  });
  canvas.addEventListener('click', (e) => {
    const slot = phoneAt(e);
    if (!slot) return;
    slot.showAlt = !slot.showAlt;
    slot.flipAt = clock.getElapsedTime();
    showSlot(slot);
  });

  let mirror = 1;
  let visible = true;
  new IntersectionObserver(([entry]) => (visible = entry.isIntersecting)).observe(canvas);

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Pull the camera back on narrow screens so all three phones fit.
    camera.position.z = w / h < 0.9 ? 10.5 : w / h < 1.2 ? 8.6 : 7.4;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(canvas);
  resize();

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const smooth = new THREE.Vector2();

  renderer.setAnimationLoop(() => {
    if (!visible) return;
    const now = clock.getElapsedTime();
    const t = reduceMotion ? 0 : now;
    smooth.lerp(pointer, 0.05);

    stage.rotation.y = smooth.x * 0.18;
    stage.rotation.x = smooth.y * 0.08;

    phones.forEach((p) => {
      p.group.position.set(
        p.base.x * mirror,
        p.base.y + Math.sin(t * 0.8 + p.phase) * 0.08,
        p.base.z,
      );
      p.group.rotation.set(
        p.baseRot.x + Math.sin(t * 0.5 + p.phase) * 0.03,
        p.baseRot.y * mirror + Math.sin(t * 0.4 + p.phase) * 0.05 + flipAngle(now - p.flipAt),
        p.baseRot.z * mirror,
      );
    });
    particles.rotation.z = t * 0.03;
    pMat.uniforms.uTime.value = t;
    renderer.render(scene, camera);
  });

  // One full turn over 0.9s with ease-in-out; none when reduced motion is preferred.
  function flipAngle(elapsed: number) {
    if (reduceMotion || elapsed < 0 || elapsed > 0.9) return 0;
    const k = elapsed / 0.9;
    return Math.PI * 2 * (k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2);
  }

  return {
    setScreens(slots) {
      slots.forEach((s, i) => {
        const slot = phones[i];
        if (!slot) return;
        slot.urls = s.alt ? [s.main, s.alt] : [s.main];
        showSlot(slot);
      });
    },
    setDirection(rtl) {
      mirror = rtl ? -1 : 1;
    },
  };
}
