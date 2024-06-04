import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

class Labels {
  constructor(scene, loader, planetsData, planets) {
    this.scene = scene;
    this.loader = loader;
    this.planetsData = planetsData;
    this.planetTextMeshes = [];
    this.moonTextMeshes = [];
    this.planetInfoTextMesh = null;
    this.planets = planets;
  }
  loadFonts(url) {
    this.loader.load(url, (font) => {
      this.addTextMeshes(font);
    });
  }

  addTextMeshes(font) {
    this.planetsData.forEach((data, index) => {
      const textGeometry = new TextGeometry(data.name, {
        font: font,
        size: 0.5,
        depth: 0.1,
        curveSegments: 6
      });
      const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const text = new THREE.Mesh(textGeometry, textMaterial);
      text.position.set(data.distance, 0, 0);
      text.rotation.x = Math.PI / 2;
      this.scene.add(text);
  
      // Add the text mesh to the planetTextMeshes array
      this.planetTextMeshes.push(text);
  
      data.moons.forEach((moonData, moonIndex) => {
        const textGeometry = new TextGeometry(moonData.name, {
          font: font,
          size: 0.2,
          depth: 0.1,
          curveSegments: 6
        });
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const text = new THREE.Mesh(textGeometry, textMaterial);
    
        // Assuming 'moons' is an array of moon objects in your 'planets' object
        const moonObject = this.planets.moons[moonIndex];
    
        // Set the position of the moon label relative to its parent moon object
        text.position.set(
          moonData.distance,
          0,
          0
        );
    
        text.rotation.x = Math.PI / 2;
    
        // Add the moon label to the planet object, not the scene
        this.planets.planets[index].add(text);
    
        // Add the text mesh to the moonTextMeshes array
        this.moonTextMeshes.push(text);
      });
    });
  
    this.planetInfoTextMesh = new THREE.Mesh(new TextGeometry('', {
      font: font,
      size: 0.5,
      depth: 0.1,
      curveSegments: 6
    }), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    this.scene.add(this.planetInfoTextMesh);
  }
  togglePlanetLabels() {
    this.planetTextMeshes.forEach((textMesh) => {
      textMesh.visible = !textMesh.visible;
    });
    this.planets.togglePlanetOrbitLines()
  }
  
  toggleMoonLabels() {
    this.moonTextMeshes.forEach((textMesh) => {
      textMesh.visible = !textMesh.visible;
    });
    this.planets.toggleMoonOrbitLines();
  }
  
  update(camera) {
    this.planetTextMeshes.forEach((textMesh) => {
      textMesh.quaternion.copy(camera.quaternion);
    });
  
    this.moonTextMeshes.forEach((textMesh) => {
      textMesh.quaternion.copy(camera.quaternion);
    });
  }
}


export default Labels;