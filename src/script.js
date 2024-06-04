import * as THREE from 'three';
import { GUI } from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import Nebula from './nebula.js';
import Stars from './stars.js'
import Labels from './labels.js'
import Planets from './planets.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
  antialias: true
});
camera.position.z = 40;
camera.position.y = 25
renderer.setSize(window.innerWidth, window.innerHeight);

const gui = new GUI({ closeFolders: true});

const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

const planetsData = [
  { name: 'Mercury', radius: 0.5, distance: 5, color: 0xff0000, speed: 0.001, inclination: 0.15, moons: [] },
  { name: 'Venus', radius: 0.8, distance: 8, color: 0x00ff00, speed: 0.0008, inclination: 0.05, moons: [] },
  { name: 'Earth', radius: 1.2, distance: 11, color: 0x0000ff, speed: 0.0006, inclination: 0.1, moons: [{ name: 'Moon', radius: 0.2, distance: 2, color: 0xffffff }] },
  { name: 'Mars', radius: 0.3, distance: 14, color: 0xffff00, speed: 0.0004, inclination: 0.08, moons: [{ name: 'Phobos', radius: 0.1, distance: 1.5, color: 0xffffff }, { name: 'Deimos', radius: 0.1, distance: 2.5, color: 0xffffff }] },
  { name: 'Jupiter', radius: 0.9, distance: 17, color: 0xff00ff, speed: 0.0002, inclination: 0.03, moons: [{ name: 'Io', radius: 0.2, distance: 2.5, color: 0xffffff }, { name: 'Europa', radius: 0.2, distance: 3.5, color: 0xffffff }, { name: 'Ganymede', radius: 0.2, distance: 4.5, color: 0xffffff }, { name: 'Callisto', radius: 0.2, distance: 5.5, color: 0xffffff }] },
  { name: 'Saturn', radius: 1.5, distance: 20, color: 0x00ffff, speed: 0.0001, inclination: 0.02, moons: [{ name: 'Titan', radius: 0.2, distance: 3, color: 0xffffff }, { name: 'Enceladus', radius: 0.1, distance: 4, color: 0xffffff }, { name: 'Dione', radius: 0.1, distance: 5, color: 0xffffff }, { name: 'Rhea', radius: 0.1, distance: 6, color: 0xffffff }] },
  { name: 'Uranus', radius: 0.6, distance: 23, color: 0x808080, speed: 0.00008, inclination: 0.06, moons: [{ name: 'Miranda', radius: 0.1, distance: 2, color: 0xffffff }, { name: 'Ariel', radius: 0.1, distance: 3, color: 0xffffff }, { name: 'Umbriel', radius: 0.1, distance: 4, color: 0xffffff }, { name: 'Titania', radius: 0.1, distance: 5, color: 0xffffff }, { name: 'Oberon', radius: 0.1, distance: 6, color: 0xffffff }] },
  { name: 'Neptune', radius: 1.0, distance: 26, color: 0x008000, speed: 0.00006, inclination: 0.015, moons: [{ name: 'Triton', radius: 0.2, distance: 3, color: 0xffffff }] },
  { name: 'Pluto', radius: 0.4, distance: 29, color: 0x800000, speed: 0.00004, inclination: 0.09, moons: [{ name: 'Charon', radius: 0.1, distance: 1.5, color: 0xffffff }, { name: 'Nix', radius: 0.05, distance: 2.5, color: 0xffffff }, { name: 'Hydra', radius: 0.05, distance: 3.5, color: 0xffffff }, { name: 'Kerberos', radius: 0.05, distance: 4.5, color: 0xffffff }, { name: 'Styx', radius: 0.05, distance: 5.5, color: 0xffffff }] }
];

const planets = new Planets(scene, planetsData);
const stars = new Stars(scene)
const nebula = new Nebula(scene)

const loader = new FontLoader();
const labels = new Labels(scene, loader, planetsData, planets);
labels.loadFonts('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/helvetiker_bold.typeface.json', planetsData, planets);

gui.add(labels, 'togglePlanetLabels').name('Toggle Planet Labels');
gui.add(labels, 'toggleMoonLabels').name('Toggle Moon Labels');

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

function animate() {
  requestAnimationFrame(animate);
  planets.planets.forEach((planet, index) => {
    const angle = Date.now() * planetsData[index].speed + index;
    const radius = planetsData[index].distance;
    const inclination = planetsData[index].inclination;
    planet.position.x = Math.cos(angle) * radius;
    planet.position.z = Math.sin(angle) * Math.cos(inclination) * radius; // Update z position to account for inclination
    planet.position.y = Math.sin(angle) * Math.sin(inclination) * radius; // Update y position to account for inclination
  });

  let moonIndex = 0;
  planetsData.forEach((planet, planetIndex) => {
    planet.moons.forEach((moon, index) => {
      const angle = Date.now() * 0.01 + moonIndex;
      const radius = moon.distance;
      planets.moons[moonIndex].position.x = Math.cos(angle) * radius;
      planets.moons[moonIndex].position.z = Math.sin(angle) * radius;
      moonIndex++;
    });
  });

  controls.update();

  labels.update(camera)

  renderer.render(scene, camera);
}
animate()