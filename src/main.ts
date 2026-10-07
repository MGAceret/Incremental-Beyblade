import './style.css'
import { Arena } from './arena.ts'
import { Beyblade } from './beyblade.ts'

// [ Canvas and its Context ]
const canvas = document.querySelector<HTMLCanvasElement>('#arena-canvas')!;
const ctx = canvas.getContext('2d')!;

// [ Arena ]
const arena = new Arena(canvas.width / 2, canvas.height / 2, 250)

// [ Beyblade ]
const beyblade = new Beyblade(
  canvas.width / 2,
  canvas.height / 2,
  6.0,
  3.5,
  500,
  500,
  0.05
);

// [ Animation of Canvas ]
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  arena.draw(ctx);

  arena.handleSlope(beyblade);
  beyblade.update();
  arena.handleBoundary(beyblade);
  beyblade.draw(ctx);  

  requestAnimationFrame(animate);
}

animate();
