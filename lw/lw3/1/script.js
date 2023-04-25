import * as THREE from 'three'

const CAMERA = {
    FOV: 125,
    MIN: 1,
    MAX: 500,
}

function getCubicBezierCurve({v0, v1, v2, v3}) {
    const p1 = new THREE.Vector2( v0.x, v0.y )
    const p2 = new THREE.Vector2( v1.x, v1.y )
    const p3 = new THREE.Vector2( v2.x, v2.y )
    const p4 = new THREE.Vector2( v3.x, v3.y )
    const curve = new THREE.CubicBezierCurve( p1, p2, p3, p4 )
    const geometry = new THREE.BufferGeometry().setFromPoints( curve.getPoints( 50 ) )
    const material = new THREE.LineBasicMaterial( { color: 0xff0000 } )
    return new THREE.Line(geometry, material)
}

function getConnectingLines({v0, v1, v2, v3}) {
    const points = [];
    points.push( new THREE.Vector2( v0.x, v0.y ) )
    points.push( new THREE.Vector2( v1.x, v1.y ) )
    points.push( new THREE.Vector2( v2.x, v2.y ) )
    points.push( new THREE.Vector2( v3.x, v3.y ) )
    const geometry = new THREE.BufferGeometry().setFromPoints( points )
    const material = new THREE.LineDashedMaterial({
        color: 0x0000ff,
        dashSize: 1,
        gapSize: 2
    })
    const line = new THREE.Line( geometry, material )
    line.computeLineDistances()
    return line
}

function getPoint(v) {
    const geometry = new THREE.BoxGeometry( 5, 5, 0 )
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} )
    const point = new THREE.Mesh( geometry, material )
    point.position.set(v.x, v.y)
    return point
}

function getPoints({v1, v2}) {
    return [
        getPoint(v1),
        getPoint(v2),
    ]
}

function draw(scene, data) {
    scene.clear()

    const curveObject = getCubicBezierCurve(data)
    const connectingLines = getConnectingLines(data)
    const points = getPoints(data)

    scene.add(curveObject)
    scene.add(connectingLines)
    scene.add(...points)
}

function animation(scene, camera, renderer) {
    const data = {
        v0: { x: -80, y: 0 },
        v1: { x: -40, y: 100 },
        v2: { x: 40, y: 100 },
        v3: { x: 80, y: 0 },
    }
    requestAnimationFrame(function animate() {
        draw(scene, data)
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
