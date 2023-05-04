import * as THREE from 'three'

const CAMERA = {
    FOV: 3,
    MIN: 1,
    MAX: 500,
}

const vertexShader = `
void main() {
    float R = (1.0 + sin(position.x)) 
        * (1.0 + 0.9 * cos(8.0 * position.x)) 
        * (1.0 + 0.1 * cos(24.0 * position.x)) 
        * (0.5 + 0.05 * cos(140.0 * position.x));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(R * cos(position.x), R * sin(position.x), position.z, 1);
}`

const fragmentShader = `
void main() {
    gl_FragColor = vec4(0, 0, 1, 1);
}`

function createCannabis() {
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    for (let i = 0; i < 2 * Math.PI; i += Math.PI / 1000) {
        vertices.push(i, 0, 0)
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

    const customShaderMaterial = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
    })

    return new THREE.Line(geometry, customShaderMaterial)
}

function animation(scene, camera, renderer) {
    scene.add(createCannabis())

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
    renderer.setClearColor( 0xffffff, 1 );
    document.body.appendChild( renderer.domElement )

    animation(scene, camera, renderer)
}

init()
