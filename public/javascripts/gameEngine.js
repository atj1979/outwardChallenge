var THREE = require('three');
var ctrl = require('three-orbit-controls');
THREE.OrbitControls = ctrl(THREE);
var GLTFLoader = require('three-gltf-loader');

// if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
var container, controls;
var camera, scene, renderer, light; 

init();
animate();
function init() {
    debugger
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.25, 20 );
    camera.position.set( -1.8, 300.9, 2.7 );
    // controls.target.set(new THREE.Vector3(0,0,0));

    controls = new THREE.OrbitControls( camera );
    // controls.target.set( 0, -0.2, -0.2 );
    controls.update();
    // envmap
    // var path = 'textures/cube/Bridge2/';
    // var format = '.jpg';
    // var envMap = new THREE.CubeTextureLoader().load( [
    // 	path + 'posx' + format, path + 'negx' + format,
    // 	path + 'posy' + format, path + 'negy' + format,
    // 	path + 'posz' + format, path + 'negz' + format
    // ] );
    scene = new THREE.Scene();
    // scene.background = envMap;
    light = new THREE.HemisphereLight( 0xbbbbff, 0x444422, 1 );
    var helper = new THREE.HemisphereLightHelper( light, 5 );
    scene.add(helper);
    light.position.set( 0, 300, 0 );
    // scene.add( light );
    // model
    var loader = new GLTFLoader();
    loader.load( './assets/littlest_tokyo/scene.gltf', function ( gltf ) {
        gltf.scene.traverse( function ( child ) {
            // if ( child.isMesh ) {
            // 	child.material.envMap = envMap;
            // }
        } );
        window.controls = controls;
        window.camera = camera;
        window.light = light;
        window.gltf = gltf.scene;

        gltf.scene.scale.setScalar(.01);
        scene.add( gltf.scene );
        var bbox = new THREE.Box3().setFromObject(scene);
        console.log(bbox);
    }, undefined, function ( e ) {
        console.error( e );
    } );
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.gammaOutput = true;
    container.appendChild( renderer.domElement );
    window.addEventListener( 'resize', onWindowResize, false );
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