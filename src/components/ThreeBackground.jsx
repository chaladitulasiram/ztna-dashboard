import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // --- SETUP ---
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.02);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 8;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Clear container before appending to prevent duplicates
        while (containerRef.current.firstChild) {
            containerRef.current.removeChild(containerRef.current.firstChild);
        }
        containerRef.current.appendChild(renderer.domElement);

        // --- OBJECTS ---
        const coreGeo = new THREE.IcosahedronGeometry(1.5, 0);
        const coreMat = new THREE.MeshPhysicalMaterial({
            color: 0x111111, emissive: 0x2997FF, emissiveIntensity: 0.5, wireframe: true
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        scene.add(core);

        // Particles - Defensive Initialization
        const particlesCount = 1500;
        const particlesGeo = new THREE.BufferGeometry();
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            // Ensure we never get NaN
            const val = (Math.random() - 0.5) * 20;
            posArray[i] = isNaN(val) ? 0 : val;
        }

        particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMat = new THREE.PointsMaterial({ size: 0.02, color: 0x2997FF });
        const particles = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particles);

        // --- ANIMATION ---
        let frameId;
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            if (!renderer || !scene || !camera) return;

            core.rotation.y += 0.002;
            core.rotation.x += 0.001;
            particles.rotation.y -= 0.001;

            renderer.render(scene, camera);
        };
        animate();

        // --- RESIZE ---
        const handleResize = () => {
            if (!camera || !renderer) return;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // --- CLEANUP ---
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(frameId); // STOP loop immediately

            // Dispose everything to free GPU memory
            coreGeo.dispose();
            coreMat.dispose();
            particlesGeo.dispose();
            particlesMat.dispose();
            renderer.dispose();

            if (containerRef.current) {
                containerRef.current.innerHTML = '';
            }
        };
    }, []);

    return <div ref={containerRef} className="fixed top-0 left-0 w-full h-full -z-10 bg-black pointer-events-none" />;
};

export default ThreeBackground;