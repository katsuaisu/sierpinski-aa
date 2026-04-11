import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TetrahedronData {
  position: [number, number, number];
  scale: number;
  id: number;
}

function generateSierpinski(
  center: [number, number, number],
  size: number,
  level: number,
  idCounter: { current: number }
): TetrahedronData[] {
  if (level === 0) {
    idCounter.current++;
    return [{ position: center, scale: size, id: idCounter.current }];
  }

  const h = size * Math.sqrt(2 / 3);
  const halfSize = size / 2;
  const hHalf = h / 2;

  // 4 vertices of the parent tetrahedron
  const offsets: [number, number, number][] = [
    [0, hHalf, 0],
    [-halfSize / 2, -hHalf / 2, halfSize * Math.sqrt(3) / 4],
    [halfSize / 2, -hHalf / 2, halfSize * Math.sqrt(3) / 4],
    [0, -hHalf / 2, -halfSize * Math.sqrt(3) / 4],
  ];

  const results: TetrahedronData[] = [];
  for (const offset of offsets) {
    results.push(
      ...generateSierpinski(
        [center[0] + offset[0], center[1] + offset[1], center[2] + offset[2]],
        halfSize,
        level - 1,
        idCounter
      )
    );
  }
  return results;
}

// Equilateral tetrahedron geometry
function createTetrahedronGeometry(size: number): THREE.BufferGeometry {
  const h = size * Math.sqrt(2 / 3);
  const r = size / Math.sqrt(3);

  const v0 = new THREE.Vector3(0, h / 2, -r);
  const v1 = new THREE.Vector3(-size / 2, -h / 2, r / 2);
  const v2 = new THREE.Vector3(size / 2, -h / 2, r / 2);
  const v3 = new THREE.Vector3(0, h / 2 * 0.3, r * 0.5);

  // Use built-in TetrahedronGeometry but scaled
  const geo = new THREE.TetrahedronGeometry(size * 0.55, 0);
  return geo;
}

interface SingleTetrahedronProps {
  data: TetrahedronData;
  onClickFace: (id: number, position: THREE.Vector3) => void;
}

const SingleTetrahedron = ({ data, onClickFace }: SingleTetrahedronProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <mesh
      ref={meshRef}
      position={data.position}
      scale={data.scale * 0.55}
      onClick={(e) => {
        e.stopPropagation();
        onClickFace(data.id, new THREE.Vector3(...data.position));
      }}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerLeave={() => {
        setHovered(false);
        document.body.style.cursor = "default";
      }}
    >
      <tetrahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        color={hovered ? "#007AFF" : "#e8e8ed"}
        metalness={0.1}
        roughness={0.3}
        transparent
        opacity={hovered ? 0.95 : 0.85}
        envMapIntensity={0.5}
      />
    </mesh>
  );
};

interface SierpinskiTetrahedronProps {
  onClickFace: (id: number, position: THREE.Vector3) => void;
  level?: number;
}

const SierpinskiTetrahedron = ({ onClickFace, level = 3 }: SierpinskiTetrahedronProps) => {
  const groupRef = useRef<THREE.Group>(null);

  const tetrahedrons = useMemo(() => {
    const counter = { current: 0 };
    return generateSierpinski([0, 0, 0], 3, level, counter);
  }, [level]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {tetrahedrons.map((t) => (
        <SingleTetrahedron key={t.id} data={t} onClickFace={onClickFace} />
      ))}
    </group>
  );
};

export default SierpinskiTetrahedron;
