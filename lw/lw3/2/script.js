import * as THREE from 'three'
import { DragControls } from 'three/addons/controls/DragControls.js'

const CAMERA = {
    FOV: 75,
    MIN: 1,
    MAX: 500,
}

const MAIN_COLOR = 0x5ebdd9

function getBody() {
    const geometry = new THREE.CircleGeometry( 20, 50 )
    const material = new THREE.MeshBasicMaterial( { color: MAIN_COLOR } )
    return new THREE.Mesh( geometry, material )
}

function getLeftEar() {
    const ear = new THREE.Shape( [ new THREE.Vector2( -5, 19 ) ] )
    ear.lineTo(-8, 30)
    ear.bezierCurveTo( -20, 55, -3, 65, -1, 30 )
    ear.lineTo(-1, 20)
    const geometry = new THREE.ShapeGeometry( ear )
    const material = new THREE.MeshBasicMaterial( { color: MAIN_COLOR } )
    return new THREE.Mesh( geometry, material )
}

function getRightEar() {
    const ear = new THREE.Shape( [ new THREE.Vector2( 5, 19 ) ] )
    ear.lineTo(8, 30)
    ear.bezierCurveTo( 20, 55, 3, 65, 1, 30 )
    ear.lineTo(1, 20)
    const geometry = new THREE.ShapeGeometry( ear )
    const material = new THREE.MeshBasicMaterial( { color: MAIN_COLOR } )
    return new THREE.Mesh( geometry, material )
}

function getLeftLeg() {
    const leg = new THREE.Shape( [ new THREE.Vector2( -5, -19 ) ] )
    leg.splineThru([
        new THREE.Vector2( -10, -21 ),
        new THREE.Vector2( -15, -25 ),
        new THREE.Vector2( -12, -28 ),
        new THREE.Vector2( -2, -28 ),
        new THREE.Vector2( 0, -25 ),
        new THREE.Vector2( -2, -20 ),
    ])
    const geometry = new THREE.ShapeGeometry( leg )
    const material = new THREE.MeshBasicMaterial( { color: MAIN_COLOR } )
    return new THREE.Mesh( geometry, material )
}

function getRightLeg() {
    const leg = new THREE.Shape( [ new THREE.Vector2( 5, -19 ) ] )
    leg.splineThru([
        new THREE.Vector2( 10, -21 ),
        new THREE.Vector2( 15, -25 ),
        new THREE.Vector2( 12, -28 ),
        new THREE.Vector2( 2, -28 ),
        new THREE.Vector2( 0, -25 ),
        new THREE.Vector2( 2, -20 ),
    ])
    const geometry = new THREE.ShapeGeometry( leg )
    const material = new THREE.MeshBasicMaterial( { color: MAIN_COLOR } )
    return new THREE.Mesh( geometry, material )
}

function getLeftArm() {
    const arm = new THREE.Shape( [ new THREE.Vector2( -19, -2 ) ] )
    arm.splineThru([
        new THREE.Vector2( -23, -12 ),
        new THREE.Vector2( -21, -17.5 ),
        new THREE.Vector2( -18.5, -16 ),
        new THREE.Vector2( -18, -10 ),
        new THREE.Vector2( -15, -2 ),
    ])
    const geometry = new THREE.ShapeGeometry( arm )
    const material = new THREE.MeshBasicMaterial( { color: MAIN_COLOR } )
    return new THREE.Mesh( geometry, material )
}

function getRightArm() {
    const arm = new THREE.Shape( [ new THREE.Vector2( 19, -2 ) ] )
    arm.splineThru([
        new THREE.Vector2( 23, -12 ),
        new THREE.Vector2( 21, -17.5 ),
        new THREE.Vector2( 18.5, -16 ),
        new THREE.Vector2( 18, -10 ),
        new THREE.Vector2( 15, -2 ),
    ])
    const geometry = new THREE.ShapeGeometry( arm )
    const material = new THREE.MeshBasicMaterial( { color: MAIN_COLOR } )
    return new THREE.Mesh( geometry, material )
}

function getLeftEye() {
    const heartShape = new THREE.Shape()
    heartShape.moveTo( -5, 0 )
    heartShape.bezierCurveTo( 0, 0, 0, 10, -5, 10 )
    heartShape.bezierCurveTo( -10, 10, -10, 0, -5, 0 )
    const geometry = new THREE.ExtrudeGeometry( heartShape )
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff } )
    return new THREE.Mesh( geometry, material )
}

function getRightEye() {
    const heartShape = new THREE.Shape()
    heartShape.moveTo( 5, 0 )
    heartShape.bezierCurveTo( 0, 0, 0, 12, 5, 12 )
    heartShape.bezierCurveTo( 10, 12, 10, 0, 5, 0 )
    const geometry = new THREE.ExtrudeGeometry( heartShape )
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff } )
    return new THREE.Mesh( geometry, material )
}

function getLeftIris() {
    const heartShape = new THREE.Shape()
    heartShape.moveTo( -3, 2 )
    heartShape.bezierCurveTo( -1, 2, -1, 6, -3, 6 )
    heartShape.bezierCurveTo( -5, 6, -5, 2, -3, 2 )
    const geometry = new THREE.ExtrudeGeometry( heartShape )
    const material = new THREE.MeshBasicMaterial( { color: 0x000000 } )
    return new THREE.Mesh( geometry, material )
}

function getRightIris() {
    const heartShape = new THREE.Shape()
    heartShape.moveTo( 3, 2 )
    heartShape.bezierCurveTo( 1, 2, 1, 6, 3, 6 )
    heartShape.bezierCurveTo( 5, 6, 5, 2, 3, 2 )
    const geometry = new THREE.ExtrudeGeometry( heartShape )
    const material = new THREE.MeshBasicMaterial( { color: 0x000000 } )
    return new THREE.Mesh( geometry, material )
}

function getLeftPupil() {
    const heartShape = new THREE.Shape()
    heartShape.moveTo( -2, 4 )
    heartShape.bezierCurveTo( -1.5, 4, -1.5, 5, -2, 5 )
    heartShape.bezierCurveTo( -2.5, 5, -2.5, 4, -2, 4 )
    const geometry = new THREE.ExtrudeGeometry( heartShape )
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff } )
    return new THREE.Mesh( geometry, material )
}

function getRightPupil() {
    const heartShape = new THREE.Shape()
    heartShape.moveTo( 4, 4 )
    heartShape.bezierCurveTo( 4.5, 4, 4.5, 5, 4, 5 )
    heartShape.bezierCurveTo( 3.5, 5, 3.5, 4, 4, 4 )
    const geometry = new THREE.ExtrudeGeometry( heartShape )
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff } )
    return new THREE.Mesh( geometry, material )
}

function getNose() {
    const geometry = new THREE.CircleGeometry( 2, 20 )
    const material = new THREE.MeshBasicMaterial( { color: 0xe26970 } )
    return new THREE.Mesh( geometry, material )
}

function getMouth() {
    const p1 = new THREE.Vector2(-12, -3)
    const p2 = new THREE.Vector2(0, -12)
    const p3 = new THREE.Vector2(12, -2)
    const curve = new THREE.QuadraticBezierCurve(p1, p2, p3)
    const geometry = new THREE.BufferGeometry().setFromPoints( curve.getPoints( 50 ) )
    const material = new THREE.LineBasicMaterial( { color: 0x036c9b } )
    return new THREE.Line( geometry, material )
}

function getLeftTooth() {
    const heartShape = new THREE.Shape()
    heartShape.moveTo( -3, -7.27 )
    heartShape.bezierCurveTo( -3, -8, 0, -12, 0, -7.5 )
    const geometry = new THREE.ExtrudeGeometry( heartShape )
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff } )
    return new THREE.Mesh( geometry, material )
}

function getRightTooth() {
    const heartShape = new THREE.Shape()
    heartShape.moveTo( 3, -7 )
    heartShape.bezierCurveTo( 3, -7.5, 0.5, -11.5, 0.5, -7.5 )
    const geometry = new THREE.ExtrudeGeometry( heartShape )
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff } )
    return new THREE.Mesh( geometry, material )
}

function getLeftEyebrow() {
    const leg = new THREE.Shape( [ new THREE.Vector2( -6, 13 ) ] )
    leg.splineThru([
        new THREE.Vector2( -6.5, 14 ),
        new THREE.Vector2( -3.5, 16.5  ),
        new THREE.Vector2( -2.5, 15  ),
    ])
    const geometry = new THREE.ShapeGeometry( leg )
    const material = new THREE.MeshBasicMaterial( { color: 0x004170 } )
    return new THREE.Mesh( geometry, material )
}

function getRightEyebrow() {
    const leg = new THREE.Shape( [ new THREE.Vector2( 3, 15.5 ) ] )
    leg.splineThru([
        new THREE.Vector2( 3, 17 ),
        new THREE.Vector2( 7, 15.5  ),
        new THREE.Vector2( 7, 14.5  ),
    ])
    const geometry = new THREE.ShapeGeometry( leg )
    const material = new THREE.MeshBasicMaterial( { color: 0x004170 } )
    return new THREE.Mesh( geometry, material )
}

function getShapes() {
    return [
        getBody(),
        getLeftEar(),
        getRightEar(),
        getLeftLeg(),
        getRightLeg(),
        getLeftArm(),
        getRightArm(),
        getLeftEye(),
        getRightEye(),
        getLeftIris(),
        getRightIris(),
        getLeftPupil(),
        getRightPupil(),
        getNose(),
        getMouth(),
        getLeftTooth(),
        getRightTooth(),
        getLeftEyebrow(),
        getRightEyebrow(),
    ]
}

function initListeners(camera, renderer, shapes) {
    const controls = new DragControls( shapes, camera, renderer.domElement )
    controls.addEventListener( 'drag', event => {
        shapes.forEach(shape => {
            shape.position.x = event.object.position.x
            shape.position.y = event.object.position.y
        })
    } )
}

function animation(scene, camera, renderer) {
    const shapes = getShapes(scene)
    initListeners(camera, renderer, shapes)
    scene.add( ...shapes )
    requestAnimationFrame(function animate() {
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
    renderer.setClearColor( 0xffffff, 1 )
    document.body.appendChild( renderer.domElement )

    animation(scene, camera, renderer)
}

init()
