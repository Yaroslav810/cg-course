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

function getMainDoorTexture() {
    const textureLoader = new THREE.TextureLoader()
    return textureLoader.load('./assets/mainDoor.jpg')
}

function getVerandaDoorTexture() {
    const textureLoader = new THREE.TextureLoader()
    return textureLoader.load('./assets/verandaDoor.jpg')
}

function getGatesTexture() {
    const textureLoader = new THREE.TextureLoader()
    return textureLoader.load('./assets/gates.jpg')
}

function getRoofTexture() {
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load('./assets/roof.jpg')
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(10, 10)
    return texture
}

function getFloorTexture() {
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load('./assets/floor.jpg')
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(10, 10)
    return texture
}

function getFrameTexture() {
    const textureLoader = new THREE.TextureLoader()
    return textureLoader.load('./assets/frame.jpg')
}

function getBushTexture() {
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load('./assets/bush.jpg')
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(5, 5)
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

function createFloor() {
    const floor = new THREE.Mesh(
        new THREE.BoxGeometry(3, 1 / 8, 3),
        new THREE.MeshPhongMaterial({
            map: getFloorTexture(),
        })
    )
    floor.position.set(3.5, 2 - 1 / 18, 0.5)
    return floor
}

function createVeranda() {
    return [
        createVeranda1(),
        createVeranda2(),
        createVeranda3(),
        createFloor(),
    ]
}

function createMainDoor() {
    const door = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 1, 1 / 16),
        new THREE.MeshPhongMaterial({
            map: getMainDoorTexture(),
        })
    )
    door.position.set(-1, 1 / 2, 2)
    return door
}

function createVerandaDoor() {
    const door = new THREE.Mesh(
        new THREE.BoxGeometry(1 / 16, 0.75, 1.5),
        new THREE.MeshPhongMaterial({
            map: getVerandaDoorTexture(),
        })
    )
    door.position.set(2, 2 + 0.75 / 2, 0.5)
    return door
}

function createGates() {
    const door = new THREE.Mesh(
        new THREE.BoxGeometry(2, 2, 1 / 16),
        new THREE.MeshPhongMaterial({
            map: getGatesTexture(),
        })
    )
    door.position.set(3.5, 1 / 2, 2)
    return door
}

function createWindow1() {
    const window = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 1 / 16),
        new THREE.MeshPhongMaterial({
            map: getFrameTexture(),
        })
    )
    window.position.set(0, 1.25, 2)
    return window
}

function createWindow2() {
    const window = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 1 / 16),
        new THREE.MeshPhongMaterial({
            map: getFrameTexture(),
        })
    )
    window.position.set(1, 1.25, 2)
    return window
}

function createWindow3() {
    const window = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 1 / 16),
        new THREE.MeshPhongMaterial({
            map: getFrameTexture(),
        })
    )
    window.position.set(1, 2.5, 2)
    return window
}

function createWindow4() {
    const window = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 1 / 16),
        new THREE.MeshPhongMaterial({
            map: getFrameTexture(),
        })
    )
    window.position.set(0, 2.5, 2)
    return window
}

function createWindow5() {
    const window = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 1 / 16),
        new THREE.MeshPhongMaterial({
            map: getFrameTexture(),
        })
    )
    window.position.set(-1, 2.5, 2)
    return window
}

function createWindow6() {
    const window = new THREE.Mesh(
        new THREE.BoxGeometry(1 / 16, 0.5, 0.5),
        new THREE.MeshPhongMaterial({
            map: getFrameTexture(),
        })
    )
    window.position.set(-2, 2.5, 1)
    return window
}

function createWindow7() {
    const window = new THREE.Mesh(
        new THREE.BoxGeometry(1 / 16, 0.5, 0.5),
        new THREE.MeshPhongMaterial({
            map: getFrameTexture(),
        })
    )
    window.position.set(-2, 2.5, 0)
    return window
}

function createWindow8() {
    const window = new THREE.Mesh(
        new THREE.BoxGeometry(1 / 16, 0.5, 0.5),
        new THREE.MeshPhongMaterial({
            map: getFrameTexture(),
        })
    )
    window.position.set(-2, 2.5, -1)
    return window
}

function createWindow9() {
    const window = new THREE.Mesh(
        new THREE.BoxGeometry(1 / 16, 0.5, 0.5),
        new THREE.MeshPhongMaterial({
            map: getFrameTexture(),
        })
    )
    window.position.set(-2, 1.25, 1)
    return window
}

function createWindow10() {
    const window = new THREE.Mesh(
        new THREE.BoxGeometry(1 / 16, 0.5, 0.5),
        new THREE.MeshPhongMaterial({
            map: getFrameTexture(),
        })
    )
    window.position.set(-2, 1.25, 0)
    return window
}

function createWindow11() {
    const window = new THREE.Mesh(
        new THREE.BoxGeometry(1 / 16, 0.5, 0.5),
        new THREE.MeshPhongMaterial({
            map: getFrameTexture(),
        })
    )
    window.position.set(-2, 1.25, -1)
    return window
}

function createWindow12() {
    const window = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 1 / 16),
        new THREE.MeshPhongMaterial({
            map: getFrameTexture(),
        })
    )
    window.position.set(1, 1.25, -2)
    return window
}

function createWindow13() {
    const window = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 1 / 16),
        new THREE.MeshPhongMaterial({
            map: getFrameTexture(),
        })
    )
    window.position.set(0, 1.25, -2)
    return window
}

function createWindow14() {
    const window = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 1 / 16),
        new THREE.MeshPhongMaterial({
            map: getFrameTexture(),
        })
    )
    window.position.set(-1, 1.25, -2)
    return window
}

function createWindow15() {
    const window = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 1 / 16),
        new THREE.MeshPhongMaterial({
            map: getFrameTexture(),
        })
    )
    window.position.set(1, 2.5, -2)
    return window
}

function createWindow16() {
    const window = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 1 / 16),
        new THREE.MeshPhongMaterial({
            map: getFrameTexture(),
        })
    )
    window.position.set(-1, 2.5, -2)
    return window
}

function createWindow17() {
    const window = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 1 / 16),
        new THREE.MeshPhongMaterial({
            map: getFrameTexture(),
        })
    )
    window.position.set(0, 2.5, -2)
    return window
}

function createWindows() {
    return [
        createWindow1(),
        createWindow2(),
        createWindow3(),
        createWindow4(),
        createWindow5(),
        createWindow6(),
        createWindow7(),
        createWindow8(),
        createWindow9(),
        createWindow10(),
        createWindow11(),
        createWindow12(),
        createWindow13(),
        createWindow14(),
        createWindow15(),
        createWindow16(),
        createWindow17(),
    ]
}

function createPorch() {
    const porch = new THREE.Object3D
    const roof = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 1 / 16, 0.8),
        new THREE.MeshPhongMaterial({
            color: '#36170a',
        })
    )
    roof.position.set(-1, 1.1, 2.2)
    const leftSupport = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.05, 0.05, 1.1, 16 ),
        new THREE.MeshBasicMaterial({
            color: '#36170a',
        })
    )
    leftSupport.position.set(-1.35, 0.55, 2.55)
    const rightSupport = new THREE.Mesh(
        new THREE.CylinderGeometry( 0.05, 0.05, 1.1, 16 ),
        new THREE.MeshBasicMaterial({
            color: '#36170a',
        })
    )
    rightSupport.position.set(-0.65, 0.55, 2.55)

    porch.add(roof)
    porch.add(leftSupport)
    porch.add(rightSupport)
    return porch
}

function createHouse() {
    const house = new THREE.Group()

    const walls = createWalls()
    const roofs = createRoofs()
    const veranda = createVeranda()
    const mainDoor = createMainDoor()
    const verandaDoor = createVerandaDoor()
    const gates = createGates()
    const windows = createWindows()
    const porch = createPorch()
    house.add( ...walls )
    house.add( ...roofs )
    house.add( ...veranda )
    house.add( ...windows )
    house.add( mainDoor )
    house.add( verandaDoor )
    house.add( gates )
    house.add( porch )

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

function createBushMesh(r, x, y, z) {
    const bush = new THREE.Mesh(
        new THREE.SphereGeometry(r, 32, 16),
        new THREE.MeshBasicMaterial({
            map: getBushTexture(),
        })
    )
    bush.position.set(x, y, z)
    return bush
}

function createBush() {
    const bush = new THREE.Group()
    bush.add(createBushMesh(0.35, 0.25, 0.2, 2.3))
    bush.add(createBushMesh(0.3, 0.8, 0.2, 2.3))
    bush.add(createBushMesh(0.35, 1.8, 0.2, 2.3))
    bush.add(createBushMesh(0.35, 5.4, 0.2, 1.5))
    bush.add(createBushMesh(0.35, 5.4, 0.2, 0.5))
    bush.add(createBushMesh(0.35, 5.4, 0.2, -0.5))
    return bush
}

function createScene() {
    const scene = new THREE.Scene()
    scene.add(createGround())
    scene.add(createHouse())
    scene.add(createBush())
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
    camera.position.set( 0, 15, 250 )
    renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( renderer.domElement )

    animation(scene, camera, renderer)
}

init()
