'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js';

export default function Home({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: any;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current === null) return;

    let currentTargetIndex = 2;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.set(0, 0, 0);

    const light = new THREE.SpotLight(0xffffff, 10000, 0, Math.PI / 8, 1);
    light.position.set(0, 0, 5);
    camera.add(light);
    scene.add(camera);

    const target: THREE.Vector3[] = [];

    function getRandomPosition(minDistance: number) {
      let x, y, z, distance;
      do {
        x = Math.random() * 150 - 75;
        y = Math.random() * 150 - 75;
        z = Math.random() * 150 - 75;
        distance = Math.sqrt(x * x + y * y + z * z);
      } while (distance < minDistance);
      return new THREE.Vector3(x, y, z);
    }

    for (let i = 0; i < 1000; i++) {
      let sphereGeometric = new THREE.SphereGeometry(0.1, 32, 32);
      let sphereMaterial = new THREE.MeshBasicMaterial({
        color: THREE.Color.NAMES['white'],
      });
      let sphere = new THREE.Mesh(sphereGeometric, sphereMaterial);
      sphere.position.copy(getRandomPosition(75));
      scene.add(sphere);
    }

    const radius = 10;
    const numSections = 4;
    const textArray = [
      '감사합니다',
      'Email\nnsrbsg\n@\ngmail.com',
      '안녕하세요',
      '이곳은\n일상을 담은\n블로그입니다',
    ];
    const loader = new FontLoader();

    loader.load('/Grandiflora One_Regular.json', (font) => {
      document.body.style.overflow = 'hidden';
      document.body.style.display = 'fixed';
      document.body.style.top = '0';
      document.body.style.left = '0';
      animate();
      window.addEventListener('resize', resizeUpdate);
      window.addEventListener('wheel', wheelUpdate);
      window.addEventListener('touchstart', touchUpdate);
      window.addEventListener('touchend', touchUpdate);
      setLoading(false);
      for (let i = 0; i < numSections; i++) {
        const text = new TextGeometry(textArray[i], {
          font: font,
          size: 0.75,
          height: 0.25,
        });

        const angle = (i / numSections) * Math.PI * 2;
        const sectionPosition = new THREE.Vector3(
          0,
          radius * Math.sin(angle),
          radius * Math.cos(angle)
        );
        const newSection = new THREE.Mesh(
          text,
          new THREE.MeshLambertMaterial({ color: 0x787878 })
        );
        const textBounds = new THREE.Box3().setFromObject(newSection);
        const textCenter = textBounds.getCenter(new THREE.Vector3());

        newSection.position.copy(sectionPosition);
        newSection.rotateX((-i / numSections) * Math.PI * 2);
        newSection.rotateZ(Math.PI);
        newSection.rotateY(Math.PI);

        newSection.geometry.translate(-textCenter.x, -textCenter.y, 0);

        scene.add(newSection);
        target.push(newSection.position);
      }
    });

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    function resizeUpdate() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }

    let eventStart = false;

    function lookAtTarget(target: THREE.Vector3) {
      let rafId: number;
      const acc = 0.05;

      function animate() {
        // 카메라의 현재 방향 계산
        let currentDirection = new THREE.Vector3();
        camera.getWorldDirection(currentDirection);

        // 목표 방향 계산
        let targetDirection = target.clone().sub(camera.position).normalize();

        // 현재 방향과 목표 사이를 보간
        let newDirection = currentDirection
          .lerp(targetDirection, acc)
          .normalize();

        //새로운 방향으로 카메라를 업데이트
        camera.lookAt(camera.position.clone().add(newDirection));

        // 카메라 뒤집힘 계산
        let currentUp = new THREE.Vector3(0, 1, 0);
        let currentRight = new THREE.Vector3();
        camera.getWorldDirection(currentRight);
        currentRight.cross(currentUp);

        if (currentRight.x < 0) {
          camera.rotateZ(Math.PI);
        }

        rafId = requestAnimationFrame(animate);

        if (currentDirection.angleTo(targetDirection) < 0.01) {
          cancelAnimationFrame(rafId);
          eventStart = false;
        }
      }

      rafId = requestAnimationFrame(animate);
    }

    function wheelUpdate(event: WheelEvent) {
      if (eventStart) return;

      if (event.deltaY > 0) {
        currentTargetIndex++;
        if (currentTargetIndex >= target.length) currentTargetIndex = 0;
      } else if (event.deltaY < 0) {
        currentTargetIndex--;
        if (currentTargetIndex < 0) currentTargetIndex = target.length - 1;
      } else {
        return;
      }

      eventStart = true;

      lookAtTarget(target[currentTargetIndex]);
    }

    let startY: number;

    function touchUpdate(event: TouchEvent) {
      if (eventStart) return;

      if (event.type === 'touchstart') {
        startY = event.changedTouches[0].clientY;
        return;
      }

      if (event.type === 'touchend') {
        const endY = event.changedTouches[0].clientY;
        if (startY - endY > 0) {
          currentTargetIndex++;
          if (currentTargetIndex >= target.length) currentTargetIndex = 0;
        } else if (startY - endY < 0) {
          currentTargetIndex--;
          if (currentTargetIndex < 0) currentTargetIndex = target.length - 1;
        } else {
          return;
        }

        eventStart = true;

        lookAtTarget(target[currentTargetIndex]);
      }
    }

    return () => {
      window.removeEventListener('resize', resizeUpdate);
      window.removeEventListener('wheel', wheelUpdate);
      document.body.style.display = 'block';
      document.body.style.overflow = 'auto';
      document.body.style.top = 'auto';
    };
  }, [setLoading]);

  return (
    <canvas className={loading ? 'hidden' : 'block'} ref={canvasRef}></canvas>
  );
}
