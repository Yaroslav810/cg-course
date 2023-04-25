import * as THREE from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 )
const renderer = new THREE.WebGLRenderer()

camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild( renderer.domElement )

// const geometry = new THREE.BoxGeometry( 1, 1, 1 )
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
// const cube = new THREE.Mesh( geometry, material )
// scene.add( cube )
// camera.position.z = 5;

// const points = [];
// points.push( new THREE.Vector3( - 10, 0, 0 ) );
// points.push( new THREE.Vector3( 0, 10, 0 ) );
// points.push( new THREE.Vector3( 10, 0, 0 ) );
// const geometry = new THREE.BufferGeometry().setFromPoints( points );
// const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
// const line = new THREE.Line( geometry, material );
// scene.add( line );

// const geometry = new THREE.SphereGeometry(1, 8, 6)
// const material = new THREE.MeshNormalMaterial();
// const shpere = new THREE.Mesh(geometry, material)
// scene.add(shpere)

const spotLight = new THREE.SpotLight(0xeeeece);
spotLight.position.set(1000, 1000, 1000);
const spotLight2 = new THREE.SpotLight(0xffffff);
spotLight2.position.set( -200, -200, -200);
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshPhongMaterial( {
    color: 0xdaa520,
    specular: 0xbcbcbc,
} );
const torus = new THREE.Mesh(geometry, material)

scene.add(spotLight)
scene.add(spotLight2)
scene.add(torus)

function animate() {
    renderer.render( scene, camera )
    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
    requestAnimationFrame( animate )
}

animate()
