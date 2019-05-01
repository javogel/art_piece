const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {

  const createGrid = () =>{
    const points = [];
    const count = 10;
    for (let x = 0; x < count; x++){
      for (let y = 0; y < count; y++){
        const u = x/(count-1);
        const v = y/(count-1);

        points.push({
          radius: Math.abs(random.gaussian()*0.2),
          position:  [u,v]
        })
      }
    }
    return points;
  }

  random.setSeed(6)
  const points = createGrid().filter(()=> random.value() > 0.6)
  const margin = 100;

  console.log(points)

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach((data)=>{

      const {position, radius } = data;
      const [u,v] = position;
      const x=lerp(margin, width - margin, u);
      const y=lerp(margin, height - margin, v)

      context.beginPath();
      context.arc(x,y, radius * width,0,Math.PI*2, false);
      const colorList = ["rgb(255,66, 14, 0.2)", "rgb(137,218, 89, 0.2)", "rgb(55,94, 151, 0.2)"]
      const colorIndex = Math.floor(random.value() * colorList.length)
      const color  =  colorList[colorIndex]
      context.strokeStyle = "rgb(1, 1, 1, 0)";
      context.fillStyle = color;
      context.lineWidth = 4;
      context.stroke();
      context.fill();

    })
  };
};

canvasSketch(sketch, settings);
