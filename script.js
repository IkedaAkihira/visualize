const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let mouseX = 0,mouseY = 0;

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

function func(y,x){
    const z = Math.floor(5000/Math.hypot(y-250,x-250)+5000/Math.hypot(y-mouseY,x-mouseX));
    return (z-((z>>3)<<3))*10;
}

const draw = ()=>{
    ctx.putImageData(func2ImageData(func,500,500),0,0);
}

onmousemove = (e)=>{
    mouseX = e.clientX;
    mouseY = e.clientY;
}

ontouchmove = (e)=>{
    console.log(e);
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
}

setInterval(draw,30);