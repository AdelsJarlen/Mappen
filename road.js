class Road {
    constructor(x,width,laneCount = 3) {
        this.x = x;
        this.width = width;
        this.laneCount = this.laneCount;

        this.left = x - width / 2;
        this.right = x + width / 2;

        const infinity = 1.0e7;
        this.top = -infinity;
        this.bottom = infinity;
    }

    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "White";

        for(let i = 0; i <= this.laneCount; i++) {
            // linear interpolation
            /**
             * function lerp(A,B,t) {
             *      return A + (B - A) * t;
             * }
             */

            const x = lerp(
                this.left,
                this.right,
                i / this.laneCount
            );
        }
        ctx.beginPath();
        ctx.moveTo(this.left,this.top);
        ctx.lineTo(this.left,this.bottom);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.right,this.top);
        ctx.lineTo(this.right,this.bottom);
        ctx.stroke();
    }
}

function lerp(A,B,t) {
    return A + (B - A) * t;
}