import * as THREE from 'three'
import {OrbitControls} from "three/addons/controls/OrbitControls";

const CAMERA = {
    FOV: 3,
    MIN: 1,
    MAX: 500,
}

function createWall1() {
    const wall = new THREE.Mesh(
        new THREE.BoxGeometry(4, 3, 4),
        new THREE.MeshPhongMaterial({color: '#D5713F'})
    )
    wall.position.y = 3 / 2
    return wall
}

function createWall2() {
    const wall = new THREE.Mesh(
        new THREE.BoxGeometry(4, 2, 3),
        new THREE.MeshPhongMaterial({color: '#D5713F'})
    )
    wall.position.set(3, 2 / 2, 0.5)
    return wall
}

function createWalls() {
    return [
        createWall1(),
        createWall2(),
    ]
}

function createRoof1() {
    const roof = new THREE.Mesh(
        new THREE.ConeGeometry(3.5, 2, 4),
        new THREE.MeshPhongMaterial({color: '#ac8e82'})
    )
    roof.position.y = 3 + 2 / 2
    roof.rotation.y = Math.PI / 4
    return roof
}

function createRoofs() {
    return [
        createRoof1(),
    ]
}

function createVeranda1() {
    const veranda = new THREE.Mesh(
        new THREE.BoxGeometry(3, 0.5, 1 / 16),
        new THREE.MeshPhongMaterial({color: '#D5713F'})
    )
    veranda.position.set(3.5, 1.25 + 2 / 2, 2 - 1 / 32)
    return veranda
}

function createVeranda2() {
    const veranda = new THREE.Mesh(
        new THREE.BoxGeometry(1 / 16, 0.5, 3),
        new THREE.MeshPhongMaterial({color: '#D5713F'})
    )
    veranda.position.set(5 - 1 / 32, 1.25 + 2 / 2, 0.5)
    return veranda
}

function createVeranda3() {
    const veranda = new THREE.Mesh(
        new THREE.BoxGeometry(3, 0.5, 1 / 16),
        new THREE.MeshPhongMaterial({color: '#D5713F'})
    )
    veranda.position.set(3.5, 1.25 + 2 / 2, -1 + 1 / 32)
    return veranda
}

function createVeranda() {
    return [
        createVeranda1(),
        createVeranda2(),
        createVeranda3(),
    ]
}

function createHouse() {
    const house = new THREE.Group()

    const walls = createWalls()
    const roofs = createRoofs()
    const veranda = createVeranda()
    house.add( ...walls )
    house.add( ...roofs )
    house.add( ...veranda )

    return house
}

function createGround() {
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(20, 20),
        new THREE.MeshPhongMaterial({color: 0xa9c388})
    )
    ground.rotation.x = -Math.PI * 0.5
    ground.position.y = 0
    return ground
}

function createScene() {
    const scene = new THREE.Scene()
    scene.add(createGround())
    scene.add(createHouse())
    return scene
}

function createLight() {
    const light = new THREE.SpotLight('#ffffff')
    light.position.set( 100, 100, 80)
    return light
}

function createPointLight1() {
    const light = new THREE.PointLight('#ffffff', 1, 5)
    light.position.set( -1, 3, -2.2)
    return light
}

function createPointLight2() {
    const light = new THREE.PointLight('#ffffff', 1, 5)
    light.position.set( 1, 3, -2.3)
    return light
}

function createPointLight3() {
    const light = new THREE.PointLight('#ffffff', 1, 5)
    light.position.set( -2.2, 3, -1)
    return light
}

function createPointLight4() {
    const light = new THREE.PointLight('#ffffff', 1, 5)
    light.position.set( -2.2, 3, 1)
    return light
}

function createAllLight() {
    return [
        createLight(),
        createPointLight1(),
        createPointLight2(),
        createPointLight3(),
        createPointLight4(),
    ]
}

function animation(scene, camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement)
    scene.add(...createAllLight())
    scene.add(createScene())

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
    camera.position.set( 0, 10, -200 )
    renderer.setSize( window.innerWidth, window.innerHeight )
    // renderer.setClearColor( 0xffffff, 1 )
    document.body.appendChild( renderer.domElement )

    animation(scene, camera, renderer)
}

init()
