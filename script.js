const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const select = document.getElementById('select');

const canvasSize = 300;

let touchChoords = [];


canvas.width = canvas.height = canvasSize;

function getSize(){
    return Math.min(window.innerHeight,window.innerWidth);
}

const maxColor = [128,128,255,255];
const minColor = [255,255,0,255];

function func2ImageData(func,w,h){
    const data = new ImageData(w,h);
    for(let i=0;i<h;i++){
        for(let j=0;j<w;j++){
            const start = 4 * (i * w + j);
            const n = Math.min(255,Math.max(func(i,j),0));
            for(let k=0;k<4;k++){
                data.data[start+k] = minColor[k] + Math.floor((maxColor[k] - minColor[k]) * n / 255);
            }
        }
    }
    return data;
}

function volt(y,x){
    const k = 5000;
    let z = 0;
    for(const choord of touchChoords){
        z += k/Math.hypot(x-choord[0],y-choord[1]);
    }
    return (z-((z>>3)<<3))*32;
}

function wave(y,x){
    const lambda = 5;
    const t = 500;
    const a = 20;
    const now = Date.now();
    let z = 0;
    for(const choord of touchChoords){
        z += Math.sin(now/t-Math.hypot(x-choord[0],y-choord[1])/lambda);
    }

    z *= a;

    z += 128;

    return z;
}

function draw(){
    ctx.putImageData(func2ImageData((select.value=='volt')?volt:wave,canvasSize,canvasSize),0,0);
}

function updateTouches(event){
    touchChoords = [];
    for(const touch of event.touches){
        touchChoords.push([touch.clientX * canvasSize / getSize(),touch.clientY * canvasSize / getSize()])
    }
}

ontouchstart = ontouchmove = ontouchend = updateTouches;


setInterval(draw,30);