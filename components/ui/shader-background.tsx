"use client";

import { useEffect, useRef } from "react";

const vsSource = `
  attribute vec4 aVertexPosition;
  void main() {
    gl_Position = aVertexPosition;
  }
`;

// Adapted for plomberie: sky-400 lines on deep navy background
const fsSource = `
  precision highp float;
  uniform vec2  iResolution;
  uniform float iTime;

  const float overallSpeed      = 0.2;
  const float gridSmoothWidth   = 0.015;
  const float axisWidth         = 0.05;
  const float majorLineWidth    = 0.025;
  const float minorLineWidth    = 0.0125;
  const float majorLineFrequency = 5.0;
  const float minorLineFrequency = 1.0;
  const float scale             = 5.0;
  const vec4  lineColor         = vec4(0.22, 0.74, 0.97, 1.0); /* sky-400 #38BDF8 */
  const float minLineWidth      = 0.01;
  const float maxLineWidth      = 0.18;
  const float lineSpeed         = 1.0  * overallSpeed;
  const float lineAmplitude     = 1.0;
  const float lineFrequency     = 0.2;
  const float warpSpeed         = 0.2  * overallSpeed;
  const float warpFrequency     = 0.5;
  const float warpAmplitude     = 1.0;
  const float offsetFrequency   = 0.5;
  const float offsetSpeed       = 1.33 * overallSpeed;
  const float minOffsetSpread   = 0.6;
  const float maxOffsetSpread   = 2.0;
  const int   linesPerGroup     = 16;

  #define drawCircle(pos, radius, coord)  smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
  #define drawSmoothLine(pos, hw, t)      smoothstep(hw, 0.0, abs(pos - (t)))
  #define drawCrispLine(pos, hw, t)       smoothstep(hw + gridSmoothWidth, hw, abs(pos - (t)))
  #define drawPeriodicLine(freq, w, t)    drawCrispLine(freq / 2.0, w, abs(mod(t, freq) - (freq) / 2.0))

  float random(float t) {
    return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
  }

  float getPlasmaY(float x, float horizontalFade, float offset) {
    return random(x * lineFrequency + iTime * lineSpeed) * horizontalFade * lineAmplitude + offset;
  }

  void main() {
    vec2 uv    = gl_FragCoord.xy / iResolution.xy;
    vec2 space = (gl_FragCoord.xy - iResolution.xy / 2.0) / iResolution.x * 2.0 * scale;

    float horizontalFade = 1.0 - (cos(uv.x * 6.28) * 0.5 + 0.5);
    float verticalFade   = 1.0 - (cos(uv.y * 6.28) * 0.5 + 0.5);

    space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + horizontalFade);
    space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * horizontalFade;

    /* Deep navy backgrounds — matches #080C10 plomberie theme */
    vec4 bgColor1 = vec4(0.02, 0.04, 0.07, 1.0);
    vec4 bgColor2 = vec4(0.02, 0.06, 0.12, 1.0);

    vec4 lines = vec4(0.0);

    for (int l = 0; l < linesPerGroup; l++) {
      float nli          = float(l) / float(linesPerGroup);
      float offsetTime   = iTime * offsetSpeed;
      float offsetPos    = float(l) + space.x * offsetFrequency;
      float rand         = random(offsetPos + offsetTime) * 0.5 + 0.5;
      float halfWidth    = mix(minLineWidth, maxLineWidth, rand * horizontalFade) / 2.0;
      float offset       = random(offsetPos + offsetTime * (1.0 + nli)) * mix(minOffsetSpread, maxOffsetSpread, horizontalFade);
      float linePos      = getPlasmaY(space.x, horizontalFade, offset);
      float line         = drawSmoothLine(linePos, halfWidth, space.y) / 2.0
                         + drawCrispLine(linePos, halfWidth * 0.15, space.y);

      float circleX      = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
      vec2  circlePos    = vec2(circleX, getPlasmaY(circleX, horizontalFade, offset));
      float circle       = drawCircle(circlePos, 0.01, space) * 4.0;

      lines += (line + circle) * lineColor * rand;
    }

    vec4 color  = mix(bgColor1, bgColor2, uv.x);
    color      *= verticalFade;
    color.a     = 1.0;
    color      += lines;

    gl_FragColor = color;
  }
`;

function loadShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function initShaderProgram(
  gl: WebGLRenderingContext,
  vs: string,
  fs: string
): WebGLProgram | null {
  const vert = loadShader(gl, gl.VERTEX_SHADER,   vs);
  const frag = loadShader(gl, gl.FRAGMENT_SHADER, fs);
  if (!vert || !frag) return null;

  const program = gl.createProgram()!;
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Shader link error:", gl.getProgramInfoLog(program));
    return null;
  }
  return program;
}

interface ShaderBackgroundProps {
  /** opacity 0-1, default 1 */
  opacity?: number;
}

export function ShaderBackground({ opacity = 1 }: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) { console.warn("WebGL not supported"); return; }

    const program = initShaderProgram(gl, vsSource, fsSource);
    if (!program) return;

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const vtxLoc = gl.getAttribLocation(program,  "aVertexPosition");
    const resLoc = gl.getUniformLocation(program, "iResolution");
    const timLoc = gl.getUniformLocation(program, "iTime");

    const resize = () => {
      const parent = canvas.parentElement;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent ? parent.clientWidth  : window.innerWidth;
      const h = parent ? parent.clientHeight : window.innerHeight;
      canvas.width  = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    window.addEventListener("resize", resize);
    resize();

    let raf: number;
    const startTime = Date.now();

    const render = () => {
      const t = (Date.now() - startTime) / 1000;
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.uniform1f(timLoc, t);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(vtxLoc, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vtxLoc);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ opacity }}
      className="absolute inset-0 w-full h-full"
    />
  );
}

export default ShaderBackground;
