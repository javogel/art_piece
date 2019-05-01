const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes')

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  const palette = random.pick(palettes)

  const createGrid = () =>{
    const points = [];
    const count = 100;
    debugger;
    for (let x = 0; x < count; x++){
      for (let y = 0; y < count; y++){
        const u = x/(count-1);
        const v = y/(count-1);
        const radius = Math.abs(random.noise2D(u,v)) * 0.025;
        points.push({
          color: random.pick(palette),
          radius,
          rotation: random.noise2D(u,v),
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

      const {position, radius, color, rotation } = data;
      const [u,v] = position;
      const x=lerp(margin, width - margin, u);
      const y=lerp(margin, height - margin, v)

      // context.beginPath();
      // context.arc(x,y, radius * width,0,Math.PI*2, false);

      // context.strokeStyle = color;
      // context.fillStyle = color;
      // context.lineWidth = 4;
      // context.stroke();
      // context.fill();

      context.save()
      context.fillStyle = color;
      context.font = `${radius * width}px Helvetica`
      context.translate(x,y);
      context.rotate(rotation);
      context.fillText('+', 0, 0)
      context.restore()

    })
  };
};

canvasSketch(sketch, settings);
