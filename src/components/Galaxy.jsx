"use client";

import { Renderer, Program, Mesh, Color, Triangle } from "ogl";
import { useEffect, useRef } from "react";
import "./Galaxy.css";

const vertex = `
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main(){
 vUv=uv;
 gl_Position=vec4(position,0.,1.);
}
`;

const fragment = `
precision mediump float;

uniform float uTime;
uniform vec3 uResolution;
varying vec2 vUv;

#define NUM_LAYER 2.0
#define MAT45 mat2(0.707,-0.707,0.707,0.707)

float Hash21(vec2 p){
 p=fract(p*vec2(123.3,456.2));
 p+=dot(p,p+45.3);
 return fract(p.x*p.y);
}

float tri(float x){
 return abs(fract(x)*2.-1.);
}

float Star(vec2 uv){
 float d=max(length(uv),0.05);

 float m=.015/d;

 uv*=MAT45;

 m+=0.08/(1.+abs(uv.x*uv.y*200.));

 return m*smoothstep(1.,0.1,d);
}

vec3 StarLayer(vec2 uv){

 vec3 col=vec3(0.);

 vec2 gv=fract(uv)-.5;
 vec2 id=floor(uv);

 for(int y=0;y<=1;y++){
 for(int x=0;x<=1;x++){

 vec2 off=vec2(float(x),float(y));

 vec2 cell=id+off;

 float seed=Hash21(cell);

 float size=fract(seed*100.);

 vec2 shift=
 vec2(
 tri(seed*20.+uTime*.2),
 tri(seed*40.+uTime*.1)
 )-.5;

 float s=
 Star(
 gv-off-shift
 );

 vec3 color=
 vec3(
 .6+seed*.4,
 .6,
 1.
 );

 col+=
 s*
 size*
 color;

 }
 }

 return col;

}

void main(){

 vec2 uv=
 (
 vUv*uResolution.xy
 -
 .5*uResolution.xy
 )
 /
 uResolution.y;

 vec3 col=vec3(0.);

 for(
 float i=0.;
 i<1.;
 i+=1./NUM_LAYER
 ){

 float depth=
 fract(
 i+
 uTime*.02
 );

 float scale=
 mix(
 10.,
 .8,
 depth
 );

 col+=
 StarLayer(
 uv*scale+
 i*100.
 )
 *
 depth;

 }

 float alpha=
 smoothstep(
 0.,
 .25,
 length(col)
 );

 gl_FragColor=
 vec4(
 col,
 alpha
 );

}
`;

export default function Galaxy({ transparent = true, ...rest }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const renderer = new Renderer({
      alpha: transparent,
    });

    const gl = renderer.gl;

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: {
          value: 0,
        },
        uResolution: {
          value: new Color(1, 1, 1),
        },
      },
    });

    const mesh = new Mesh(gl, {
      geometry: new Triangle(gl),

      program,
    });

    let visible = true;

    const observer = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });

    observer.observe(ref.current);

    function resize() {
      const scale = 0.5;

      renderer.setSize(
        ref.current.offsetWidth * scale,

        ref.current.offsetHeight * scale,
      );

      gl.canvas.style.width = "100%";

      gl.canvas.style.height = "100%";

      program.uniforms.uResolution.value = new Color(
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height,
      );
    }

    resize();

    window.addEventListener("resize", resize);

    ref.current.appendChild(gl.canvas);

    let frame;

    let last = 0;

    function render(t) {
      frame = requestAnimationFrame(render);

      if (!visible) return;

      if (t - last < 33) return;

      last = t;

      program.uniforms.uTime.value = t * 0.001;

      renderer.render({
        scene: mesh,
      });
    }

    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);

      observer.disconnect();

      window.removeEventListener("resize", resize);

      if (ref.current && gl.canvas) {
        ref.current.removeChild(gl.canvas);
      }

      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [transparent]);

  return <div ref={ref} className="galaxy-container" {...rest} />;
}
