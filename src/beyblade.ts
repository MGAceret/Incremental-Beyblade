export class Beyblade {
    // Position & Velocity
    x: number;
    y: number;
    vx: number;
    vy: number;

    // Spin / Health
    rpm: number;
    maxRpm: number;
    decayRate: number;

    // Misc
    radius: number = 20;
    angle: number = 0;

    constructor(x:number, y: number, vx: number, vy: number, rpm: number, maxRpm: number, decayRate: number) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.rpm = rpm;
        this.maxRpm = maxRpm;
        this.decayRate = decayRate;
    }

    update(): void {
        this.x += this.vx;
        this.y += this.vy;

        // Spin Rotation
        this.angle += (this.rpm / 60) * 0.05;

        // Friction: Decay RPM to 0
        this.rpm = Math.max(0, this.rpm - this.decayRate);
    }

    // Draw the Beyblade
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Outer Body Circle
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#d97706';
        ctx.fill();
        ctx.strokeStyle = '#451a03';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(-this.radius, 0);
        ctx.lineTo(this.radius, 0);
        ctx.moveTo(0, -this.radius);
        ctx.lineTo(0, this.radius);
        ctx.strokeStyle = '#451a03';
        ctx.stroke();

        // Core
        ctx.beginPath();
        ctx.arc(0, 0, this.radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.stroke();


        ctx.restore();
    }
}