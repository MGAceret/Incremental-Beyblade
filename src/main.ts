import './style.css'
import { Arena } from './arena.ts'


const canvas = document.querySelector<HTMLCanvasElement>('#arena-canvas')!;
const ctx = canvas.getContext('2d')!;

const arena = new Arena(canvas.width / 2, canvas.height / 2, 250)

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  arena.draw(ctx);
  requestAnimationFrame(animate);
}

animate();
