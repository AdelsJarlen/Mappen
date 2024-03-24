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

        this.sensor = new Sensor(this);
        this.controls = new Controls();
    }

    update(roadBorders) {
        this.#move();
        this.polygon = this.#createPolygon();
        this.sensor.update(roadBorders);
    }

    // Method to calculate the vertices of a polygon, specifically designed to create a rectangle or square based on the object's width and height.
    #createPolygon() {
        // Initialize an empty array to hold the points of the polygon.
        const points = [];
        
        // Calculate the radius of the circle that circumscribes the polygon.
        // This is found by computing the hypotenuse of a right triangle with sides equal to half the object's width and height.
        const rad = Math.hypot(this.width, this.height) / 2;
        
        // Calculate the angle (in radians) from the center of the polygon to a corner.
        // This angle is used to adjust the orientation of the points based on the object's dimensions.
        const alpha = Math.atan2(this.width, this.height);
        
        // Calculate and add the first vertex of the polygon.
        // It is positioned by rotating a point on the circumscribing circle by 'this.angle - alpha'.
        points.push({
            x: this.x - Math.sin(this.angle - alpha) * rad,
            y: this.y - Math.cos(this.angle - alpha) * rad
        });
        
        // Calculate and add the second vertex of the polygon.
        // Similar to the first, but the angle is adjusted by adding 'alpha' to 'this.angle'.
        points.push({
            x: this.x - Math.sin(this.angle + alpha) * rad,
            y: this.y - Math.cos(this.angle + alpha) * rad
        });
        
        // Calculate and add the third vertex of the polygon.
        // The point is placed opposite to the first vertex by adding π to 'this.angle - alpha'.
        // This effectively rotates the point 180 degrees to the opposite side of the polygon.
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad
        });
        
        // Calculate and add the fourth vertex of the polygon.
        // This vertex is opposite to the second vertex, achieved by adding π to 'this.angle + alpha'.
        points.push({
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad
        });
        
        // Note: The method now creates a polygon by calculating four points.
        // These points are determined by the object's position, the angle of orientation,
        // and the dimensions (width and height) of the object.
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

        this.sensor.draw(ctx);
    }

    #move() {
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
        if(this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1; // Shorthand if statement
            if(this.controls.left) {
                this.angle += 0.03 * flip;
            }
            if(this.controls.right) {
                this.angle -= 0.03 * flip;
            }
        }
        
        // Using the unit circle we change the direction of movement according to the angle of the car
        this.x -= Math.sin(this.angle)*this.speed;
        this.y -= Math.cos(this.angle)*this.speed;

        // - [ ] How do I change the anchor of the rotation. 
    }
}