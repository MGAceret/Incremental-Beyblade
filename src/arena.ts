import { Beyblade } from './beyblade.ts'

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

    // Arena Boundary (Beyblade should bounce off upon contact)
    handleBoundary(top: Beyblade, restitution = 0.8): void {
        // Distance from Arena's Center
        const dx = top.x - this.centerX;
        const dy = top.y - this.centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        
        const maxAllowedDist = this.radius - top.radius;

        
        // Collision check (Beyblade bounces off)
        if (dist >= maxAllowedDist) {
            const ux = dx / dist;
            const uy = dy / dist;

            top.x = this.centerX + ux * maxAllowedDist;
            top.y = this.centerY + uy * maxAllowedDist;

            const dot = top.vx * ux + top.vy * uy
            
            // Reflect Velocity upon collision
            if (dot > 0) {
                top.vx = (top.vx - 2 * dot * ux) * restitution;
                top.vy = (top.vy - 2 * dot * uy) * restitution;
            }
        }
    }

    // Arena Slope
    handleSlope(top: Beyblade, strength = 0.015): void {
        const dx = top.x - this.centerX;
        const dy = top.y - this.centerY;

        // Inward Acceleration / Gravity
        top.vx -= (dx / this.radius) * strength;
        top.vy -= (dy / this.radius) * strength;
            
        // Damping / Friction
        top.vx *= 0.995;
        top.vy *= 0.995;
    }

    handleCollision(top1: Beyblade, top2: Beyblade, restitution = 1.3): void {
        const dx = top2.x - top1.x;
        const dy = top2.y - top1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const minDist = top1.radius + top2.radius;

        const vx = dx / dist;
        const vy = dy / dist;
        const overlap = minDist - dist;
        const totalMass = top1.mass + top2.mass;

        const relVx = top1.vx - top2.vx;
        const relVy = top1.vy - top2.vy;

        const impactSpeed = relVx * vx + relVy * vy;
        const impulse = impactSpeed * restitution;

        // Collision check
        if (dist < minDist) {
            // Position Seperation (Prevents overlapping)
            top1.x -= vx * overlap * (top2.mass / totalMass);
            top1.y -= vy * overlap * (top2.mass / totalMass);

            top2.x += vx * overlap * (top1.mass / totalMass);
            top2.y += vy * overlap * (top1.mass / totalMass);

            // Knockback Check based on velocity
            if (impactSpeed > 0) {
                // Knockback execution (Bouncy~)
                top1.vx -= vx * impulse * (top2.mass / totalMass);
                top1.vy -= vy * impulse * (top2.mass / totalMass);

                top2.vx += vx * impulse * (top1.mass / totalMass);
                top2.vy += vy * impulse * (top1.mass / totalMass);

                // RPM damage
                top1.rpm = Math.max(0, top1.rpm - top2.damage)
                top2.rpm = Math.max(0, top2.rpm - top1.damage)
            }
        }
    }
}