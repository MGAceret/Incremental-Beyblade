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
    }
}