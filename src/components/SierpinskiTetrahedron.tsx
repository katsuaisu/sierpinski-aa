import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import pic1 from "@/assets/gallery/pic1.png";
import pic2 from "@/assets/gallery/pic2.png";
import pic3 from "@/assets/gallery/pic3.png";
import pic4 from "@/assets/gallery/pic4.png";
import pic5 from "@/assets/gallery/pic5.png";
import pic6 from "@/assets/gallery/pic6.png";
import pic7 from "@/assets/gallery/pic7.png";
import pic8 from "@/assets/gallery/pic8.png";
import pic9 from "@/assets/gallery/pic9.png";
import pic10 from "@/assets/gallery/pic10.png";
import pic11 from "@/assets/gallery/pic11.png";
import pic12 from "@/assets/gallery/pic12.png";
import pic13 from "@/assets/gallery/pic13.png";
import pic14 from "@/assets/gallery/pic14.png";
import pic15 from "@/assets/gallery/pic15.png";
import pic16 from "@/assets/gallery/pic16.png";
import pic17 from "@/assets/gallery/pic17.png";
import pic18 from "@/assets/gallery/pic18.png";
import pic19 from "@/assets/gallery/pic19.png";
import pic20 from "@/assets/gallery/pic20.png";
import pic21 from "@/assets/gallery/pic21.png";
import pic22 from "@/assets/gallery/pic22.png";
import pic23 from "@/assets/gallery/pic23.png";
import pic24 from "@/assets/gallery/pic24.png";
import pic25 from "@/assets/gallery/pic25.png";
import pic26 from "@/assets/gallery/pic26.png";
import pic27 from "@/assets/gallery/pic27.png";

interface TetraData {
  vertices: [THREE.Vector3, THREE.Vector3, THREE.Vector3, THREE.Vector3];
  id: number;
}

// Generate 4 midpoints and recurse into 4 corner tetrahedra
function sierpinskiTetra(
  v0: THREE.Vector3, v1: THREE.Vector3, v2: THREE.Vector3, v3: THREE.Vector3,
  level: number, counter: { current: number }
): TetraData[] {
  if (level === 0) {
    counter.current++;
    return [{ vertices: [v0, v1, v2, v3], id: counter.current }];
  }

  const mid = (a: THREE.Vector3, b: THREE.Vector3) =>
    new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);

  const m01 = mid(v0, v1);
  const m02 = mid(v0, v2);
  const m03 = mid(v0, v3);
  const m12 = mid(v1, v2);
  const m13 = mid(v1, v3);
  const m23 = mid(v2, v3);

  return [
    ...sierpinskiTetra(v0, m01, m02, m03, level - 1, counter),
    ...sierpinskiTetra(m01, v1, m12, m13, level - 1, counter),
    ...sierpinskiTetra(m02, m12, v2, m23, level - 1, counter),
    ...sierpinskiTetra(m03, m13, m23, v3, level - 1, counter),
  ];
}

const TEXTURE_PATHS = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9, pic10, pic11, pic12, pic13, pic14, pic15, pic16, pic17, pic18, pic19, pic20, pic21, pic22, pic23, pic24, pic25, pic26, pic27];

function createTetraGeometry(verts: [THREE.Vector3, THREE.Vector3, THREE.Vector3, THREE.Vector3]) {
  const [v0, v1, v2, v3] = verts;
  const geo = new THREE.BufferGeometry();

  // 4 faces, each a triangle
  const positions = new Float32Array([
    // face 0: v0, v1, v2
    v0.x, v0.y, v0.z, v1.x, v1.y, v1.z, v2.x, v2.y, v2.z,
    // face 1: v0, v1, v3
    v0.x, v0.y, v0.z, v1.x, v1.y, v1.z, v3.x, v3.y, v3.z,
    // face 2: v0, v2, v3
    v0.x, v0.y, v0.z, v2.x, v2.y, v2.z, v3.x, v3.y, v3.z,
    // face 3: v1, v2, v3
    v1.x, v1.y, v1.z, v2.x, v2.y, v2.z, v3.x, v3.y, v3.z,
  ]);

  const uvs = new Float32Array([
    // face 0
    0.5, 1, 0, 0, 1, 0,
    // face 1
    0.5, 1, 0, 0, 1, 0,
    // face 2
    0.5, 1, 0, 0, 1, 0,
    // face 3
    0.5, 1, 0, 0, 1, 0,
  ]);

  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geo.computeVertexNormals();
  return geo;
}

interface SingleTetraProps {
  data: TetraData;
  onClickFace: (id: number, position: THREE.Vector3) => void;
}

const SingleTetra = ({ data, onClickFace }: SingleTetraProps) => {
  const [hovered, setHovered] = useState(false);
  const textures = useTexture(TEXTURE_PATHS);
  const textureIndex = (data.id - 1) % TEXTURE_PATHS.length;
  const texture = textures[textureIndex];
  const geo = useMemo(() => createTetraGeometry(data.vertices), [data.vertices]);

  const center = useMemo(() => {
    const c = new THREE.Vector3();
    for (const v of data.vertices) c.add(v);
    c.multiplyScalar(0.25);
    return c;
  }, [data.vertices]);

  return (
    <mesh
      geometry={geo}
      onClick={(e) => { e.stopPropagation(); onClickFace(data.id, center); }}
      onPointerEnter={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "pointer"; }}
      onPointerLeave={() => { setHovered(false); document.body.style.cursor = "default"; }}
    >
      <meshPhysicalMaterial
        map={texture}
        color="#ffffff"
        metalness={0.08}
        roughness={hovered ? 0.3 : 0.45}
        transparent
        opacity={0.96}
        side={THREE.DoubleSide}
        toneMapped={false}
      />
    </mesh>
  );
};

// Wireframe edges for each tetrahedron
const TetraEdges = ({ data }: { data: TetraData }) => {
  const geo = useMemo(() => {
    const [v0, v1, v2, v3] = data.vertices;
    const points = [
      v0, v1, v1, v2, v2, v0,
      v0, v3, v1, v3, v2, v3,
    ];
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(points.flatMap((p) => [p.x, p.y, p.z]), 3)
    );
    return g;
  }, [data.vertices]);

  return (
    <lineSegments geometry={geo}>
      <lineBasicMaterial color="#555" linewidth={1} />
    </lineSegments>
  );
};

interface SierpinskiTetrahedronProps {
  onClickFace: (id: number, position: THREE.Vector3) => void;
  level?: number;
}

const SierpinskiTetrahedron = ({ onClickFace, level = 3 }: SierpinskiTetrahedronProps) => {
  const groupRef = useRef<THREE.Group>(null);

  const tetrahedra = useMemo(() => {
    const s = 4;
    const h = s * Math.sqrt(2 / 3);
    const r = s / Math.sqrt(3);

    // Regular tetrahedron vertices centered at origin
    const v0 = new THREE.Vector3(0, h * 0.75, 0);                          // top
    const v1 = new THREE.Vector3(-s / 2, -h * 0.25, r / 2);               // front-left
    const v2 = new THREE.Vector3(s / 2, -h * 0.25, r / 2);                // front-right
    const v3 = new THREE.Vector3(0, -h * 0.25, -r);                       // back

    const counter = { current: 0 };
    return sierpinskiTetra(v0, v1, v2, v3, level, counter);
  }, [level]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {tetrahedra.map((t) => (
        <group key={t.id}>
          <SingleTetra data={t} onClickFace={onClickFace} />
          <TetraEdges data={t} />
        </group>
      ))}
    </group>
  );
};

export default SierpinskiTetrahedron;
