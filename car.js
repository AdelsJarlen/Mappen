class Car {
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angle = 0;

        this.controls = new Controls();
    }

    update() {

        // FORWARD AND BACKWARDS
        if(this.controls.forward) {
            this.speed += this.acceleration;
        }
        if(this.controls.reverse) {
            this.speed -= this.acceleration; 
        }

        if(this.speed>this.maxSpeed) {
            this.speed = this.maxSpeed;
        }

        if(this.speed< -this.maxSpeed/2) {
            this.speed = -this.maxSpeed/2
        }

        if(this.speed > 0) {
            this.speed -= this.friction;
        }

        if(this.speed < 0) {
            this.speed += this.friction
        }

        if(Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        
        // LEFT AND RIGHT       ref rotated unit circle
        if(this.controls.left && this.controls.forward) {
            this.angle += 0.03;
        }
        if(this.controls.left && this.controls.reverse) {
            this.angle -= 0.03;
        }
        
        if(this.controls.right && this.controls.forward) {
            this.angle -= 0.03;
        }
        if(this.controls.right && this.controls.reverse) {
            this.angle += 0.03;
        }
        
        // Using the unit circle we change the direction of movement according to the angle of the car
        this.x -= Math.sin(this.angle)*this.speed;
        this.y -= Math.cos(this.angle)*this.speed;

        // - [ ] How do I change the anchor of the rotation.  
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill();

        ctx.restore();
    }
}