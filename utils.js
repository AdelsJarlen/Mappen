// Function for linear interpolation between two values.
function lerp(A, B, t) {
    // Interpolates the value by a factor of t between A and B.
    return A + (B - A) * t;
}

// Function to find the point of intersection between two line segments.
function getIntersection(A, B, C, D) {
    // Calculate the numerator for the t parameter of the line equation.
    const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
    // Calculate the numerator for the u parameter of the line equation.
    const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
    // Calculate the denominator for both t and u parameters.
    const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);
    
    // Check if the bottom part of the fraction is not zero (lines are not parallel).
    if (bottom != 0) {
        // Calculate the t parameter for the line equation.
        const t = tTop / bottom;
        // Calculate the u parameter for the line equation.
        const u = uTop / bottom;
        
        // Check if the intersection point lies within both line segments.
        if (t > 0 && t <= 1 && u >= 0 && u <= 1) {
            // Use linear interpolation to calculate the x and y coordinates of the intersection.
            return {
                x: lerp(A.x, B.x, t),
                y: lerp(A.y, B.y, t),
                offset: t // Return the offset along AB where the intersection occurs.
            };
        }
    }

    // Return null if there's no intersection.
    return null;
}
