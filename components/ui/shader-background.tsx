'use client'
import React, { useEffect, useRef } from 'react';

const ShaderBackground = ({ className = "absolute inset-0 w-full h-full -z-10 opacity-30" }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Vertex shader source code
  const vsSource = `
    attribute vec4 aVertexPosition;
    void main() {
      gl_Position = aVertexPosition;
    }
  `;

  // Fragment shader source code - Mind-blowing Cyber-Acid Topographic Fluid Matrix
  const fsSource = `
    precision highp float;
    uniform vec2 iResolution;
    uniform float iTime;

    // 2D Random generator
    float random(in vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    // 2D Noise based on Morgan McGuire @morgan3d
    float noise(in vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);

        // Four corners in 2D of a tile
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));

        // Smooth Interpolation
        vec2 u = f*f*(3.0-2.0*f);

        // Mix 4 corners percentages
        return mix(a, b, u.x) +
                (c - a)* u.y * (1.0 - u.x) +
                (d - b) * u.x * u.y;
    }

    void main() {
        vec2 uv = gl_FragCoord.xy / iResolution.xy;
        vec2 st = uv * 4.0; // zoom scale
        st.x *= iResolution.x / iResolution.y; // aspect ratio correction

        // Global ambient fluid flow
        st.y += iTime * 0.15;
        st.x -= iTime * 0.05;
        
        // Multi-level Domain warping
        vec2 q = vec2(0.0);
        q.x = noise(st + 0.0 * iTime);
        q.y = noise(st + vec2(1.0));
        
        vec2 r = vec2(0.0);
        r.x = noise(st + 1.2 * q + vec2(1.7, 9.2) + 0.1 * iTime);
        r.y = noise(st + 1.2 * q + vec2(8.3, 2.8) + 0.15 * iTime);
        
        float f = noise(st + r * 2.0);

        // Create sharp topographic elevation lines with intense math
        float lines = fract(f * 25.0); // Density of the topographical lines
        lines = smoothstep(0.12, 0.0, abs(lines - 0.5)); // Creates the crisp glowing edges
        
        // Background matrix distortion
        float microGrid = smoothstep(0.48, 0.5, fract(st.x * 20.0)) + smoothstep(0.48, 0.5, fract(st.y * 20.0));
        microGrid *= 0.05; // Keep it subtle

        // VΞLT Theme Colors
        vec3 volt = vec3(0.8, 1.0, 0.0);    // #ccff00
        vec3 cyan = vec3(0.0, 1.0, 1.0);    // #00ffff
        // Ultra Brutalist Black background
        vec3 bg = vec3(0.005, 0.005, 0.005); 
        
        // Mix neon colors based on the chaotic warped coordinates
        vec3 colorMix = mix(cyan, volt, r.x);
        
        // Start composing the final color
        vec3 finalColor = bg;
        
        // Add intense pulsing flash to the topographic rings
        float pulse = sin(iTime * 4.0 - f * 30.0) * 0.5 + 0.5;
        finalColor += colorMix * lines * (1.0 + pulse * 2.5); // Add glowing lines
        
        // Add soft underlying ambient aura
        finalColor += colorMix * f * 0.2;
        
        // Mix in the subtle cyber grid
        finalColor += vec3(0.5) * microGrid * (1.0 - lines);
        
        // Aggressive Vignette to frame the lookbook hologram
        float vig = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
        vig = pow(vig, 0.2) * 2.0;

        gl_FragColor = vec4(finalColor * vig, 1.0);
    }
  `;

  // Helper function to compile shader
  const loadShader = (gl: WebGLRenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error: ', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  };

  // Initialize shader program
  const initShaderProgram = (gl: WebGLRenderingContext, vsSource: string, fsSource: string) => {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    if (!vertexShader || !fragmentShader) return null;

    const shaderProgram = gl.createProgram();
    if (!shaderProgram) return null;
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error('Shader program link error: ', gl.getProgramInfoLog(shaderProgram));
      return null;
    }

    return shaderProgram;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.warn('WebGL not supported.');
      return;
    }

    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    if (!shaderProgram) return;
    
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
       1.0,  1.0,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      },
      uniformLocations: {
        resolution: gl.getUniformLocation(shaderProgram, 'iResolution'),
        time: gl.getUniformLocation(shaderProgram, 'iTime'),
      },
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
         canvas.width = parent.clientWidth;
         canvas.height = parent.clientHeight;
      } else {
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const startTime = Date.now();
    let animationFrameId: number;

    const render = () => {
      const currentTime = (Date.now() - startTime) / 1000;

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(programInfo.program);

      if (programInfo.uniformLocations.resolution) {
        gl.uniform2f(programInfo.uniformLocations.resolution, canvas.width, canvas.height);
      }
      if (programInfo.uniformLocations.time) {
        gl.uniform1f(programInfo.uniformLocations.time, currentTime);
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas ref={canvasRef} className={className} />
  );
};

export default ShaderBackground;
