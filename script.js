const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const select = document.getElementById('select');

const mouse0 = [0,0];
const mouse1 = [250,250];

const canvasSize = 300;

function getSize(){
    return Math.min(window.innerHeight,window.innerWidth);
}

function func2ImageData(func,w,h){
    const data = new ImageData(w,h);
    for(let i=0;i<h;i++){
        for(let j=0;j<w;j++){
            const start = 4 * (i * w + j);
            const n = func(i,j);
            data.data[start] = Math.max(255-n,0);
            data.data[start+1] = Math.max(255-n,0);
            data.data[start+2] = Math.max(255-n,0);
            data.data[start+3] = 255;
        }
    }
    return data;
}

function volt(y,x){
    const z = Math.floor(5000/Math.hypot(y-mouse1[1],x-mouse1[0])+5000/Math.hypot(y-mouse0[1],x-mouse0[0]));
    return (z-((z>>3)<<3))*10;
}

function wave(y,x){
    const lambda = 5;
    const t = 2000;
    const a = 60;
    const now = Date.now();
    const wave1 = a*Math.sin(now/t-Math.hypot(y-mouse1[1],x-mouse1[0])/lambda);
    const wave2 = a*Math.sin(now/t-Math.hypot(y-mouse0[1],x-mouse0[0])/lambda);

    return Math.floor(128+wave1+wave2);
}

const draw = ()=>{
    ctx.putImageData(func2ImageData((select.value=='volt')?volt:wave,canvasSize,canvasSize),0,0);
}

onmousemove = (e)=>{
    mouse0[0] = e.clientX * canvasSize / getSize();
    mouse0[1] = e.clientY * canvasSize / getSize();
}

ontouchmove = (e)=>{
    console.log(e);
    mouse0[0] = e.touches[0].clientX * canvasSize / getSize();
    mouse0[1] = e.touches[0].clientY * canvasSize / getSize();
    if(e.touches.length>=2){
        mouse1[0] = e.touches[1].clientX * canvasSize / getSize();
        mouse1[1] = e.touches[1].clientY * canvasSize / getSize();
    }
}

setInterval(draw,30);