useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(10, 5);

    const createWall = (image, position, rotation) => {
        const texture = new THREE.TextureLoader().load(image);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const wall = new THREE.Mesh(geometry, material);
        wall.position.set(position.x, position.y, position.z);
        wall.rotation.set(rotation.x, rotation.y, rotation.z);
        scene.add(wall);
        return wall;
    };

    const leftWall = createWall('project1-thumbnail.jpg', { x: -5, y: 0, z: 0 }, { x: 0, y: Math.PI / 2, z: 0 });
    const rightWall = createWall('project2-thumbnail.jpg', { x: 5, y: 0, z: 0 }, { x: 0, y: -Math.PI / 2, z: 0 });
    const frontWall = createWall('project3-thumbnail.jpg', { x: 0, y: 0, z: -5 }, { x: 0, y: 0, z: 0 });
    const backWall = createWall('project4-thumbnail.jpg', { x: 0, y: 0, z: 5 }, { x: 0, y: Math.PI, z: 0 });

    camera.position.z = 10;  // Position the camera further back
    camera.lookAt(0, 0, 0);  // Ensure the camera is pointing towards the scene

    const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        mountRef.current.removeChild(renderer.domElement);
    };
}, []);
