import * as THREE from 'three'
import {OrbitControls} from "three/addons/controls/OrbitControls";

const CAMERA = {
    FOV: 3,
    MIN: 1,
    MAX: 5000,
}

function getHouseTexture() {
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load('./assets/house.jpg')
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(5, 5)
    return texture
}

function getGrassTexture() {
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load('./assets/grass.jpg')
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(30, 30)
    return texture
}

function getSkyTexture() {
    const textureLoader = new THREE.TextureLoader()
    return textureLoader.load('./assets/sky.jpg')
}

function getRoofTexture() {
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load('./assets/roof.jpg')
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(10, 10)
    return texture
}

function getVerandaMaterialSettings() {
    return {
        color: '#D5713F',
        opacity: 0.4,
        transparent: true,
    }
}

function createWall1() {

    const wall = new THREE.Mesh(
        new THREE.BoxGeometry(4, 3, 4),
        new THREE.MeshPhongMaterial({
            map: getHouseTexture(),
            color: '#D5713F'
        })
    )
    wall.position.y = 3 / 2
    return wall
}

function createWall2() {
    const wall = new THREE.Mesh(
        new THREE.BoxGeometry(3, 2, 3),
        new THREE.MeshPhongMaterial({
            map: getHouseTexture(),
            color: '#D5713F'
        })
    )
    wall.position.set(3.5, 2 / 2, 0.5)
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
        new THREE.MeshPhongMaterial({
            map: getRoofTexture(),
            color: '#ac8e82',
        })
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
        new THREE.MeshPhongMaterial(getVerandaMaterialSettings())
    )
    veranda.position.set(3.5, 1.25 + 2 / 2, 2 - 1 / 32)
    return veranda
}

function createVeranda2() {
    const veranda = new THREE.Mesh(
        new THREE.BoxGeometry(1 / 16, 0.5, 3),
        new THREE.MeshPhongMaterial(getVerandaMaterialSettings())
    )
    veranda.position.set(5 - 1 / 32, 1.25 + 2 / 2, 0.5)
    return veranda
}

function createVeranda3() {
    const veranda = new THREE.Mesh(
        new THREE.BoxGeometry(3, 0.5, 1 / 16),
        new THREE.MeshPhongMaterial(getVerandaMaterialSettings())
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
        new THREE.PlaneGeometry(50, 50),
        new THREE.MeshPhongMaterial({
            map: getGrassTexture(),
            color: '#a9c388',
        })
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
    const light = new THREE.PointLight('#ffffff', 1, 10)
    light.position.set( -1, 3, -2.5)
    return light
}

function createPointLight2() {
    const light = new THREE.PointLight('#ffffff', 1, 10)
    light.position.set( 1, 3, -2.3)
    return light
}

function createPointLight3() {
    const light = new THREE.PointLight('#ffffff', 1, 10)
    light.position.set( -2.2, 3, -1)
    return light
}

function createPointLight4() {
    const light = new THREE.PointLight('#ffffff', 1, 10)
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
    controls.maxPolarAngle = Math.PI * 0.49
    controls.autoRotate = true
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
    scene.background = getSkyTexture()
    camera.position.set( 0, 10, 250 )
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )

    animation(scene, camera, renderer)
}

init()
