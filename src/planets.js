import * as THREE from 'three';

class Planets {
  constructor(scene, planetsData) {
    this.scene = scene;
    this.planetsData = planetsData;
    this.planets = [];
    this.orbitLines = [];
    this.moons = [];
    this.moonOrbitLines = [];

    this.addPlanets();
  }

  addPlanets() {
    this.planetsData.forEach((data, index) => {
      const planetGeometry = new THREE.SphereGeometry(data.radius, 16, 16);
      const planetMaterial = new THREE.MeshBasicMaterial({ color: data.color });
      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      planet.position.set(data.distance, 0, 0);
      
      this.scene.add(planet);
      this.planets.push(planet);

      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(
        new THREE.Path().absarc(0, 0, data.distance, 0, Math.PI * 2, false).getPoints(64)
      );
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
      const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
      orbitLine.rotation.x = Math.PI / 2 - data.inclination; // Update the rotation to match the inclination
      this.scene.add(orbitLine);
      this.orbitLines.push(orbitLine);

      // Add moons
      data.moons.forEach((moonData, moonIndex) => {
        const moonGeometry = new THREE.SphereGeometry(moonData.radius, 16, 16);
        const moonMaterial = new THREE.MeshBasicMaterial({ color: moonData.color });
        const moon = new THREE.Mesh(moonGeometry, moonMaterial);
        moon.position.set(moonData.distance, 0, 0);
        planet.add(moon);
        this.moons.push(moon);

        const moonOrbitGeometry = new THREE.BufferGeometry().setFromPoints(
          new THREE.Path().absarc(0, 0, moonData.distance, 0, Math.PI * 2, false).getPoints(64)
        );
        const moonOrbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
        const moonOrbitLine = new THREE.Line(moonOrbitGeometry, moonOrbitMaterial);
        moonOrbitLine.rotation.x = Math.PI / 2;
        planet.add(moonOrbitLine);
        this.moonOrbitLines.push(moonOrbitLine);
      });
    });
  }

  togglePlanetOrbitLines() {
    this.orbitLines.forEach((line) => {
      line.visible = !line.visible;
    });
  }

  toggleMoonOrbitLines() {
    this.moonOrbitLines.forEach((line) => {
      line.visible = !line.visible;
    });
  }
}

export default Planets;