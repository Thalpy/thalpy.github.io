import './style.css';
//import * as THREE from 'three';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';
//import { GLTFLoader } from './node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'https://cdn.jsdelivr.net/gh/mrdoob/three.js/examples/jsm/loaders/OBJLoader.js';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(6);
camera.position.setX(3);
camera.position.setY(-1.5);

renderer.render(scene, camera);


//Models section of the code
//const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
//const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
//const torus = new THREE.Mesh(geometry, material);

//const loader = new GLTFLoader(); //The loader for models (use g.ITF file format)
const objLoader = new OBJLoader();
//const objLoader = new GLTFLoader(); //The loader for models (use g.ITF file format)

//Materials
const glassMaterial = new THREE.MeshPhongMaterial({
  color: 0x8282d2,
//      envMap: that.textureCube,
  refractionRatio: 0.8,
  transparent: true,
  opacity: 0.9,
  shininess: 75,
  envMap: scene.background
});

const StopperMaterial = new THREE.MeshStandardMaterial({
  color: 0xB25252,
});


//Loading outside models
/*
const flask =  await loader.load( 'models/flask.glb', function ( gltf ) {
  scene.add( gltf.scene );
  gltf.material = new THREE.MeshStandardMaterial({ color: 0xff6347 });;
  //flask = gltf;
  //gltf.color = 0xf2f2f2;
  //flask = gltf.Mesh;
  //return gltf.Mesh;
}, undefined, function ( error ) {

  console.error( error );

} );
*/

  //objLoader.setMaterials(glassMaterial);
var flask = await objLoader.load('models/flask.obj', function (object) {
    object.name = "flask";

    object.traverse( function ( child ) {
      if ( child instanceof THREE.Mesh ) {
          child.material = glassMaterial;
      }
    });
    scene.add(object);
    //object.position.x = -2;
    object.position.y = 10;
    //object.position.z = 25;
    flask = object;
});

var beaker = await objLoader.load('models/beaker.obj', function (object) {
  object.name = "beaker";

  object.traverse( function ( child ) {
    if ( child instanceof THREE.Mesh ) {
        child.material = glassMaterial;
    }
  });
  scene.add(object);
  object.position.x = 5.5;
  object.position.y = -2.2;
  object.position.z = 2;
  object.rotation.y = 1.25;
  beaker = object;
});

var liebig = await objLoader.load('models/liebig.obj', function (object) {
  object.name = "liebig";

  object.traverse( function ( child ) {
    if ( child instanceof THREE.Mesh ) {
        child.material = glassMaterial;
    }
  });
  scene.add(object);
  object.position.x = 1.8;
  object.position.y = -0.2;
  object.position.z = 1;
  object.rotation.y = 159.95;
  liebig = object;
});

var sidearm = await objLoader.load('models/sidearm.obj', function (object) {
  object.name = "sidearm";

  object.traverse( function ( child ) {
    if ( child instanceof THREE.Mesh ) {
        child.material = glassMaterial;
    }
  });
  scene.add(object);
  object.position.x = -1.7;
  object.position.y = 0.3;
  //object.position.z = 25;
  sidearm = object;
});

var stopper = await objLoader.load('models/stopper.obj', function (object) {
  object.name = "stopper";

  object.traverse( function ( child ) {
    if ( child instanceof THREE.Mesh ) {
        child.material = StopperMaterial;
    }
  });
  scene.add(object);
  object.position.x = -2;
  object.position.y = 2;
  //object.position.z = 25;
  stopper = object;
});

function loadOBJ(name){

  return null
}

//Loading outside models
// load a resource
/*
const thing = objLoader.load(
	// resource URL
	'models/flask.obj',
	// called when resource is loaded
	function ( object ) {

		object.material = glassMaterial;
    object.position.x += 5;
    scene.add( object );
    
    flask = object.geometry;
    return object;
	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);
*/

//scene.add(flask);
//flask.material = glassMaterial;
 
//scene.add(torus);
//var flask = scene.getObjectByName("Flask");
//flask.material = glassMaterial;

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

//Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('background_lab.png');
scene.background = spaceTexture;

// Avatar

const jeffTexture = new THREE.TextureLoader().load('PolyCat.png');

const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));

scene.add(jeff);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;

// Scroll Animation

function moveCamera() {
  

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  if(flask != null){

    
  }

  
  //const t = document.body.getBoundingClientRect().top;
  //camera.position.z = t * -0.01;
  //camera.position.x = t * -0.0002;
  //camera.rotation.y = t * -0.0002;
}

//document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  var scrollpos = document.body.getBoundingClientRect().top;
  //var wholepos = document.body.height;
  //console.log("scroll position:" + wholepos);
  //-4867 total size

  
  if(flask != null){
    //Target position -2, -1
    flask.position.x = Math.max(scrollpos/200, -2);
    flask.position.y = Math.min(-5 + (-scrollpos/100), -1);
    //flask.position.x = Math.max(Math.min(flask.position.x + scrollpos, -2), 0);
  }

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
