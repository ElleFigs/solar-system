import * as THREE from 'three';

class Nebula {
  constructor(scene) {
    this.scene = scene;
    this.createNebula();
  }

  createNebula() {
    const nebulaCount = 10000;
    const nebulaPositions = new Float32Array(nebulaCount * 3);
    const nebulaColors = new Float32Array(nebulaCount * 3);

    // Define the center of the nebula
    const nebulaCenterX = -300;
    const nebulaCenterY = 0;
    const nebulaCenterZ = 0;

    // Define the radius of the nebula
    const nebulaRadius = 100;

    for (let i = 0; i < nebulaCount; i++) {
      // Generate a random angle in the range [0, 2*PI)
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      // Calculate the x, y, and z coordinates using the parametric equation of a sphere
      const x = nebulaCenterX + nebulaRadius * Math.sin(phi) * Math.cos(theta) * Math.random();
      const y = nebulaCenterY + nebulaRadius * Math.sin(phi) * Math.sin(theta) * Math.random();
      const z = nebulaCenterZ + nebulaRadius * Math.cos(phi) * Math.random();

      nebulaPositions[i * 3] = x;
      nebulaPositions[i * 3 + 1] = y;
      nebulaPositions[i * 3 + 2] = z;

      // Set the color of the nebula particle
      nebulaColors[i * 3] = 0.8; // Red
      nebulaColors[i * 3 + 1] = 0.2; // Green
      nebulaColors[i * 3 + 2] = 0.6; // Blue
    }

    const nebulaGeometry = new THREE.BufferGeometry();
    nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
    nebulaGeometry.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));

    const nebulaMaterial = new THREE.PointsMaterial({
      vertexColors: true, // This tells Three.js to use the color attribute
      size: 0.5, // Set the size of the points
      sizeAttenuation: true // Make the points smaller as they get farther away from the camera
    });

    const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
    this.scene.add(nebula);
  }
}

export default Nebula;