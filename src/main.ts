import './style.css'
import { Arena } from './arena.ts'
import { Beyblade } from './beyblade.ts'

// [ Arena ]
const canvas = document.querySelector<HTMLCanvasElement>('#arena-canvas')!;
const ctx = canvas.getContext('2d')!;

const arena = new Arena(canvas.width / 2, canvas.height / 2, 250)

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  arena.draw(ctx);

  beyblade.update();
  arena.handleBoundary(beyblade);
  beyblade.draw(ctx);  

  requestAnimationFrame(animate);
}

// [ Beyblade ]
const beyblade = new Beyblade(
  canvas.width / 2,
  canvas.height / 2,
  1.5,
  1.0,
  500,
  500,
  0.05
);

animate();
