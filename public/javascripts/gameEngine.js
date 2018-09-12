var THREE = require('three');
var ctrl = require('three-orbit-controls');
THREE.OrbitControls = ctrl(THREE);
var GLTFLoader = require('three-gltf-loader');

var container, controls;
var camera, scene, renderer, light, mixer; 

init();
animate();
function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
    camera.position.set( -1.8, 10.9, 2.7 );

    controls = new THREE.OrbitControls( camera );
    controls.update();
    
    scene = new THREE.Scene();
    light = new THREE.HemisphereLight( 0xbbbbff, 0x444422, 1 );
    scene.add(light);
    // model
    var loader = new GLTFLoader();
    loader.load( './assets/littlest_tokyo/scene.gltf', function ( gltf ) {
        window.controls = controls;
        window.camera = camera;
        window.light = light;
        window.gltf = gltf;

        mixer = new THREE.AnimationMixer(gltf);
        gltf.scene.scale.setScalar(.01);
        scene.add( gltf.scene );
        var bbox = new THREE.Box3().setFromObject(scene);
        console.log(bbox);
    }, undefined, function ( e ) {
        console.error( e );
    } );
    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    scene.add( directionalLight );
    directionalLight.position.set(2,10,2);
    directionalLight.lookAt(0,0,0);

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.gammaOutput = true;
    container.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );
    window.addEventListener('keypress', () => {
        mixer.clipAction(gltf.animations[0]).play();
    });

}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
//
function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}