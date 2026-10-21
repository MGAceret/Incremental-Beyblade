import { Beyblade } from "./beyblade";

export class Rivals extends Beyblade {
    partsReward = 1;
    damage = 50;

    // Draw the Rival Beyblade
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Outer Body Circle
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#32363c';
        ctx.fill();
        ctx.strokeStyle = '#ca2828';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(-this.radius, 0);
        ctx.lineTo(this.radius, 0);
        ctx.moveTo(0, -this.radius);
        ctx.lineTo(0, this.radius);
        ctx.strokeStyle = '#ca2828';
        ctx.stroke();

        // Core
        ctx.beginPath();
        ctx.arc(0, 0, this.radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = '#ca2828';
        ctx.fill();
        ctx.stroke();


        ctx.restore();
    }
}