import * as THREE from 'three'

const CAMERA = {
    FOV: 30,
    MIN: 1,
    MAX: 500,
}
// TODO: Добавить управление через uniform шейдерами
const RADIUS = 100
const WIDTH = 10

const fragmentShader = `
void main() {
  vec3 center = vec3(500.0, 360.0, 0.0);
  vec3 position = vec3(gl_FragCoord) - center;

  if (length(position) <= ${RADIUS - WIDTH}.0 || length(position) >= ${RADIUS}.0) 
  {
    gl_FragColor = vec4(0, 0, 0, 0);
  }
  else 
  {
    gl_FragColor = vec4(0, 0, 1, 1);
  }
}`

function createStar() {
    const geometry = new THREE.PlaneGeometry(3, 3)
    const customShaderMaterial = new THREE.ShaderMaterial({
        fragmentShader,
    })

    return new THREE.Mesh(geometry, customShaderMaterial)
}

function animation(scene, camera, renderer) {
    scene.add(createStar())

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
    camera.position.set( 0, 0, 10 )
    renderer.setSize( window.innerWidth, window.innerHeight )
    renderer.setClearColor( 0xffffff, 1 )
    document.body.appendChild( renderer.domElement )

    animation(scene, camera, renderer)
}

init()
