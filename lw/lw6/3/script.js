import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js'
import {ParametricGeometry} from 'three/addons/geometries/ParametricGeometry.js'

const CAMERA = {
    FOV: 30,
    MIN: 1,
    MAX: 500,
}

const vertexShader = `
uniform float time;
uniform float a;
uniform float b;
uniform float transitionDuration;

void main() {
  float ellipticalZ = (position.x * position.x / (a * a) + position.y * position.y / (b * b)) / 2.0;
  float hyperbolicZ = (position.x * position.x / (a * a) - position.y * position.y / (b * b)) / 2.0;
  float timeRatio = mod(time, transitionDuration) / transitionDuration;
  
  float positionZ;
  if (mod(floor(time / transitionDuration), 2.0) == 0.0) {
    positionZ = mix(ellipticalZ, hyperbolicZ, timeRatio);
  } else {
    positionZ = mix(hyperbolicZ, ellipticalZ, timeRatio);
  }

  gl_Position = 
    projectionMatrix * 
    modelViewMatrix * 
    vec4(
        position.x, 
        position.y, 
        positionZ, 
        1.0
    );
}`

const fragmentShader = `
void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}`

function createPlane() {
    const geometry = new THREE.PlaneGeometry(10, 10, 20, 20)
    const customShaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: {
                value: Date.now(),
            },
            a: {
                value: 3.0,
            },
            b: {
                value: 2.0,
            },
            transitionDuration: {
                value: 2000.0,
            },
        },
        vertexShader,
        fragmentShader,
        wireframe: true,
    })

    return new THREE.Mesh(geometry, customShaderMaterial)
}

function animation(scene, camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.maxPolarAngle = Math.PI * 0.49
    const plane = createPlane()
    plane.rotateX((-90 * Math.PI) / 180)
    scene.add(plane)

    const startTime = Date.now()
    requestAnimationFrame(function animate() {
        controls.update()
        plane.material.uniforms.time.value = Date.now() - startTime
        renderer.render(scene, camera)
        requestAnimationFrame(animate)
    })
}

function init() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
        CAMERA.FOV,
        window.innerWidth / window.innerHeight,
        CAMERA.MIN,
        CAMERA.MAX
    )
    const renderer = new THREE.WebGLRenderer()
    camera.position.set( 0, 0, 50 )
    renderer.setSize( window.innerWidth, window.innerHeight )
    renderer.setClearColor( 0xffffff, 1 )
    document.body.appendChild( renderer.domElement )

    animation(scene, camera, renderer)
}

init()
