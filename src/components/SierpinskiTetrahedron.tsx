import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ExtrudeGeometry, Shape } from "three";

interface TriangleData {
  vertices: [THREE.Vector2, THREE.Vector2, THREE.Vector2];
  id: number;
}

function subdivide(
  v0: THREE.Vector2,
  v1: THREE.Vector2,
  v2: THREE.Vector2,
  level: number,
  counter: { current: number }
): TriangleData[] {
  if (level === 0) {
    counter.current++;
    return [{ vertices: [v0, v1, v2], id: counter.current }];
  }

  const m01 = new THREE.Vector2().addVectors(v0, v1).multiplyScalar(0.5);
  const m12 = new THREE.Vector2().addVectors(v1, v2).multiplyScalar(0.5);
  const m02 = new THREE.Vector2().addVectors(v0, v2).multiplyScalar(0.5);

  return [
    ...subdivide(v0, m01, m02, level - 1, counter),   // bottom-left
    ...subdivide(m01, v1, m12, level - 1, counter),   // top
    ...subdivide(m02, m12, v2, level - 1, counter),   // bottom-right
    // center triangle is removed (the hole)
  ];
}

function createTriangleGeometry(
  v0: THREE.Vector2,
  v1: THREE.Vector2,
  v2: THREE.Vector2,
  thickness: number
): THREE.ExtrudeGeometry {
  const shape = new Shape();
  shape.moveTo(v0.x, v0.y);
  shape.lineTo(v1.x, v1.y);
  shape.lineTo(v2.x, v2.y);
  shape.closePath();

  return new ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.01,
    bevelSegments: 1,
  });
}

interface SingleTriangleProps {
  data: TriangleData;
  thickness: number;
  onClickFace: (id: number, position: THREE.Vector3) => void;
}

const SingleTriangle = ({ data, thickness, onClickFace }: SingleTriangleProps) => {
  const [hovered, setHovered] = useState(false);

  const geometry = useMemo(
    () => createTriangleGeometry(data.vertices[0], data.vertices[1], data.vertices[2], thickness),
    [data, thickness]
  );

  const center = useMemo(() => {
    const c = new THREE.Vector2()
      .add(data.vertices[0])
      .add(data.vertices[1])
      .add(data.vertices[2])
      .multiplyScalar(1 / 3);
    return new THREE.Vector3(c.x, c.y, thickness / 2);
  }, [data, thickness]);

  return (
    <mesh
      geometry={geometry}
      onClick={(e) => {
        e.stopPropagation();
        onClickFace(data.id, center);
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
      <meshPhysicalMaterial
        color={hovered ? "#007AFF" : "#e0e0e5"}
        metalness={0.05}
        roughness={0.4}
        transparent
        opacity={hovered ? 1 : 0.92}
        envMapIntensity={0.4}
      />
    </mesh>
  );
};

interface SierpinskiTetrahedronProps {
  onClickFace: (id: number, position: THREE.Vector3) => void;
  level?: number;
}

const SierpinskiTetrahedron = ({ onClickFace, level = 5 }: SierpinskiTetrahedronProps) => {
  const groupRef = useRef<THREE.Group>(null);

  const triangles = useMemo(() => {
    const size = 4;
    const h = size * Math.sqrt(3) / 2;

    const v0 = new THREE.Vector2(-size / 2, -h / 3);
    const v1 = new THREE.Vector2(0, (2 * h) / 3);
    const v2 = new THREE.Vector2(size / 2, -h / 3);

    const counter = { current: 0 };
    return subdivide(v0, v1, v2, level, counter);
  }, [level]);

  const thickness = 0.15;

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  // Wireframe outline of the main triangle
  const outlinePoints = useMemo(() => {
    const size = 4;
    const h = size * Math.sqrt(3) / 2;
    return [
      new THREE.Vector3(-size / 2, -h / 3, -0.01),
      new THREE.Vector3(0, (2 * h) / 3, -0.01),
      new THREE.Vector3(size / 2, -h / 3, -0.01),
      new THREE.Vector3(-size / 2, -h / 3, -0.01),
    ];
  }, []);

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* Edge outline */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array(outlinePoints.flatMap(p => [p.x, p.y, p.z])), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#1a1a1a" linewidth={2} />
      </line>

      {/* Fractal triangles */}
      {triangles.map((t) => (
        <SingleTriangle
          key={t.id}
          data={t}
          thickness={thickness}
          onClickFace={onClickFace}
        />
      ))}
    </group>
  );
};

export default SierpinskiTetrahedron;
