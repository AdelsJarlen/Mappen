class Road {
    constructor(x,width,laneCount = 3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - width / 2;
        this.right = x + width / 2;

        const infinity = 1.0e7;
        this.top = -infinity;
        this.bottom = infinity;
    }

    getLaneCenter(laneIndex) {
        laneIndex = laneIndex < 0 ? 0 : laneIndex;
        laneIndex = laneIndex > this.laneCount ? this.laneCount - 1 : laneIndex;

        const laneWidth = this.width/this.laneCount;
        return this.left + laneWidth / 2 + laneIndex * laneWidth;
    }

    draw(ctx) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = "White";

        for(let i = 0; i <= this.laneCount; i++) {
            const x = lerp(
                this.left,
                this.right,
                i / this.laneCount
            );
            if (i > 0 && i < this.laneCount) {
                ctx.setLineDash([20,20]);
            } else {
                ctx.setLineDash([]);
            }
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();
        }
    }
}