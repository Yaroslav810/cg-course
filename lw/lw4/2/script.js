import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const CAMERA = {
    FOV: 25,
    MIN: 1,
    MAX: 500,
}

function createTorusGeometry() {
    const geometry = new THREE.TorusGeometry( 10, 3, 16, 100)
    const material = new THREE.MeshPhongMaterial( {
        color: 0xdaa520,
        specular: 0xbcbcbc,
    } )
    return new THREE.Mesh( geometry, material )
}

function createLights() {
    const spotLight = new THREE.SpotLight( 0xeeeece )
    spotLight.position.set(1000, 1000, 1000)
    const spotLight2 = new THREE.SpotLight( 0xffffff )
    spotLight2.position.set( -200, -200, -200)
    return [ spotLight, spotLight2 ]
}

function animation(scene, camera, renderer) {
    scene.add( createTorusGeometry() )
    scene.add( ...createLights() )
    const controls = new OrbitControls(camera, renderer.domElement)

    requestAnimationFrame(function animate() {
        controls.update()
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
    camera.position.set( 0, 0, 100 )
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )

    animation(scene, camera, renderer)
}

init()
