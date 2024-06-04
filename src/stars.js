import * as THREE from 'three';

class Stars {
  constructor(scene) {
    this.scene = scene;
    this.createStars();
  }

  createStars() {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 10000;
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);

    // Define the radii of the ellipses
    const radiusX = 100;
    const radiusY = 50;
    const radiusZ = 200;

    for (let i = 0; i < starCount; i++) {
      // Generate a random angle in the range [0, 2*PI)
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      // Calculate the x, y, and z coordinates using the parametric equation of an ellipses
      const x = radiusX * Math.sin(phi) * Math.cos(theta);
      const y = radiusY * Math.sin(phi) * Math.sin(theta);
      const z = radiusZ * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Set the color of the star
      if (x > 0 && y > 0 && z > 0) {
        // Stars in the first quadrant have a green/blue hue
        colors[i * 3] = 0.2; // Red
        colors[i * 3 + 1] = 0.8; // Green
        colors[i * 3 + 2] = 0.8; // Blue
      } else if (x < 0 && y < 0 && z < 0) {
        // Stars in the third quadrant have a green/blue hue
        colors[i * 3] = 0.2; // Red
        colors[i * 3 + 1] = 0.8; // Green
        colors[i * 3 + 2] = 0.8; // Blue
      } else {
        // Other stars have a white color
        colors[i * 3] = 1.0; // Red
        colors[i * 3 + 1] = 1.0; // Green
        colors[i * 3 + 2] = 1.0; // Blue
      }
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 1,
      sizeAttenuation: false,
      vertexColors: true // This tells Three.js to use the color attribute
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    this.scene.add(stars);
  }
}

export default Stars;