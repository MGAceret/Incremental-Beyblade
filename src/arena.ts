export class Arena {
    centerX: number;
    centerY: number;
    radius: number;

    constructor(centerX: number, centerY: number, radius: number) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        // Canvas drawing commands (arcs, gradients, strokes)
        const gradient = ctx.createRadialGradient(
            this.centerX, this.centerY, 0,
            this.centerX, this.centerY, this.radius
        );
        gradient.addColorStop(0, '#f2efe9');
        gradient.addColorStop(1, '#c8c2b7');
        
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        ctx.strokeStyle = '#4a2e18';
        ctx.lineWidth = 14;
        ctx.stroke();

        ctx.save();
        ctx.setLineDash([6, 6]);
        ctx.strokeStyle = '#8c287a';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.radius * 0.4, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.radius * 0.7, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(this.centerX - 10, this.centerY);
        ctx.lineTo(this.centerX + 10, this.centerY);
        ctx.moveTo(this.centerX, this.centerY - 10);
        ctx.lineTo(this.centerX, this.centerY + 10);
        ctx.stroke();
    }


}