import * as THREE from 'three';

//optional size supplied as optimization for getting dimensions
export function centerModel(mesh: THREE.Mesh, size?: THREE.Vector3): THREE.Mesh {
  var bbox = new THREE.Box3().setFromObject(mesh);
  var cent = bbox.getCenter(new THREE.Vector3());
  if (!size) {
    size = bbox.getSize(new THREE.Vector3());
  }
  //Rescale the object to normalized space
  var maxAxis = Math.max(size.x, size.y, size.z);
  mesh.scale.multiplyScalar(1.0 / maxAxis);
  bbox.setFromObject(mesh);
  bbox.getCenter(cent);
  bbox.getSize(size);

  //Reposition to 0,halfY,0
  mesh.position.copy(cent).multiplyScalar(-1);
  //mesh.position.y -= (size.y * 0.5);
  bbox.setFromObject(mesh);
  bbox.getCenter(cent);
  bbox.getSize(size);
  return mesh;
}

//Returns mm^3 of volume
export function getVolume(geometry: THREE.BufferGeometry) {
  if (!geometry.isBufferGeometry) {
    console.log("'geometry' must be an indexed or non-indexed buffer geometry");
    return 0;
  }
  var isIndexed = geometry.index !== null;
  let position = geometry.attributes.position;
  let sum = 0;
  let p1 = new THREE.Vector3(),
    p2 = new THREE.Vector3(),
    p3 = new THREE.Vector3();
  if (!isIndexed) {
    let faces = position.count / 3;
    for (let i = 0; i < faces; i++) {
      p1.fromBufferAttribute(position, i * 3 + 0);
      p2.fromBufferAttribute(position, i * 3 + 1);
      p3.fromBufferAttribute(position, i * 3 + 2);
      sum += signedVolumeOfTriangle(p1, p2, p3);
    }
  }
  else {
    let index = geometry.index;
    if (index == null) {
      console.log("Index buffer is null");
      return 0;
    }
    let faces = index.count / 3;
    for (let i = 0; i < faces; i++) {
      p1.fromBufferAttribute(position, index.array[i * 3 + 0]);
      p2.fromBufferAttribute(position, index.array[i * 3 + 1]);
      p3.fromBufferAttribute(position, index.array[i * 3 + 2]);
      sum += signedVolumeOfTriangle(p1, p2, p3);
    }
  }
  return parseFloat(sum.toFixed(3));
}

function signedVolumeOfTriangle(p1: THREE.Vector3, p2: THREE.Vector3, p3: THREE.Vector3) {
  return p1.dot(p2.cross(p3)) / 6.0;
}