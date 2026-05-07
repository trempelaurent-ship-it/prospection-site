"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";

/**
 * MountainScene
 * Dark luxury mountain landscape — solid mesh + wireframe overlay.
 * Adapté pour le thème plomberie (fond sombre, lignes sky-400).
 */
export function MountainScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // ── Scene ──────────────────────────────────────────────
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      62,
      el.clientWidth / el.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 2.2, 4.5);
    camera.rotation.x = -0.38;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // ── Shared geometry ────────────────────────────────────
    const geometry = new THREE.PlaneGeometry(18, 12, 180, 120);

    // ── Shared vertex shader (Perlin noise displacement) ───
    const vertexShader = /* glsl */ `
      uniform float time;
      varying vec3  vNormal;
      varying float vDisp;

      vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
      vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
      vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
      float snoise(vec3 v){
        const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
        vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
        vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;
        vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
        vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
        i=mod289(i);
        vec4 p=permute(permute(permute(
          i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
        float n_=.142857142857;vec3 ns=n_*D.wyz-D.xzx;
        vec4 j=p-49.*floor(p*ns.z*ns.z);
        vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
        vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;
        vec4 h=1.-abs(x)-abs(y);
        vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
        vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;
        vec4 sh=-step(h,vec4(0.));
        vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
        vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);
        vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
        vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
        p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
        vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
        m=m*m;
        return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
      }

      void main(){
        vNormal = normal;
        float d  = snoise(vec3(position.x*.65, position.y*.65 - time*.14, 0.)) * .72;
              d += snoise(vec3(position.x*1.3, position.y*1.3 - time*.14, .4)) * .36;
        vDisp = d;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position + normal * d, 1.);
      }
    `;

    // ── Solid material — dark navy base ────────────────────
    const solidMat = new THREE.ShaderMaterial({
      wireframe: false,
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        time:  { value: 0 },
        color: { value: new THREE.Color("#08152A") },
      },
      vertexShader,
      fragmentShader: /* glsl */ `
        uniform vec3 color;
        varying vec3  vNormal;
        varying float vDisp;
        void main(){
          vec3 n = normalize(vNormal);
          float fresnel = pow(1. - abs(dot(n, vec3(0.,0.,1.))), 2.8);
          float edge    = fresnel * .25;
          float ridge   = max(vDisp, 0.) * .06;
          vec3  col     = color + vec3(edge*.1, edge*.18, edge*.4) + ridge;
          float alpha   = .55 + vDisp * .1;
          gl_FragColor  = vec4(col, clamp(alpha, .3, .75));
        }
      `,
    });

    // ── Wireframe material — sky-400 grid ──────────────────
    const wireMat = new THREE.ShaderMaterial({
      wireframe: true,
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        time:  { value: 0 },
        color: { value: new THREE.Color("#38BDF8") },
      },
      vertexShader,
      fragmentShader: /* glsl */ `
        uniform vec3 color;
        varying float vDisp;
        void main(){
          float alpha = .10 + max(vDisp, 0.) * .06;
          gl_FragColor = vec4(color, clamp(alpha, .05, .20));
        }
      `,
    });

    // ── Meshes ─────────────────────────────────────────────
    const solidMesh = new THREE.Mesh(geometry, solidMat);
    solidMesh.rotation.x = -Math.PI / 2;
    scene.add(solidMesh);

    const wireMesh = new THREE.Mesh(geometry, wireMat);
    wireMesh.rotation.x = -Math.PI / 2;
    wireMesh.position.y = 0.003; // avoid z-fighting
    scene.add(wireMesh);

    // ── Animation loop ─────────────────────────────────────
    let frameId: number;
    const animate = (ts: number) => {
      const t = ts * 0.00018;
      solidMat.uniforms.time.value = t;
      wireMat.uniforms.time.value  = t;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);

    // ── Resize handler ─────────────────────────────────────
    const handleResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // ── Subtle mouse parallax on light ─────────────────────
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth)  * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      camera.position.x = x * 0.3;
      camera.position.y = 2.2 + y * 0.15;
      camera.lookAt(0, 0, 0);
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      geometry.dispose();
      solidMat.dispose();
      wireMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}

export default MountainScene;
