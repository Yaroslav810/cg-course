import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const CAMERA = {
    FOV: 25,
    MIN: 1,
    MAX: 500,
}

function createIcosahedronGeometry() {
    const geometry = new THREE.IcosahedronGeometry(10)
    const material = new THREE.MeshNormalMaterial({})
    return new THREE.Mesh( geometry, material )
}

function animation(scene, camera, renderer) {
    scene.add( createIcosahedronGeometry() )
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
    renderer.setClearColor( 0xffffff, 1 );
    document.body.appendChild( renderer.domElement )

    animation(scene, camera, renderer)
}

init()
