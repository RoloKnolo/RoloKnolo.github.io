class Ellipse {
  constructor(x1, y1, radius) {
    this.x1 = x1;
    this.y1 = y1;
    this.radius = radius;
  }

  pmEllipse() {
    let x = this.radius;
    let y = 0;
    let err = 0;

    strokeWeight(3);
    stroke(204, 204, 0);

    while (x >= y) {
      point(this.x1 + x, this.y1 + y);
      point(this.x1 + y, this.y1 + x);
      point(this.x1 - y, this.y1 + x);
      point(this.x1 - x, this.y1 + y);
      point(this.x1 - x, this.y1 - y);
      point(this.x1 - y, this.y1 - x);
      point(this.x1 + y, this.y1 - x);
      point(this.x1 + x, this.y1 - y);

      if (err <= 0) {
        y += 1;
        err += 2 * y + 1;
      }

      if (err > 0) {
        x -= 1;
        err -= 2 * x + 1;
      }
    }
  }

  splitPP(num) {
    const angle = (2 * Math.PI) / num;

    for (let i = 0; i < num; i++) {
      let x2 = this.x1 + this.radius * Math.cos(angle * i);
      let y2 = this.y1 + this.radius * Math.sin(angle * i);
      this.pp(this.x1, this.y1, x2, y2);
    }
  }

  splitDDA(num) {
    const angle = (2 * Math.PI) / num;

    for (let i = 0; i < num; i++) {
      let x2 = this.x1 + this.radius * Math.cos(angle * i);
      let y2 = this.y1 + this.radius * Math.sin(angle * i);
      this.DDA(this.x1, this.y1, x2, y2);
    }
  }

  splitBresenham(num) {
    const angle = (2 * Math.PI) / num;

    for (let i = 0; i < num; i++) {
      let x2 = this.x1 + this.radius * Math.cos(angle * i);
      let y2 = this.y1 + this.radius * Math.sin(angle * i);
      this.Bresenham(this.x1, this.y1, x2, y2);
    }
  }

  DDA(xStart, yStart, xEnd, yEnd) {
    let steps;
    let deltaX = xEnd - xStart;
    let deltaY = yEnd - yStart;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      steps = Math.abs(deltaX);
    } else {
      steps = Math.abs(deltaY);
    }

    let xStep = deltaX / steps;
    let yStep = deltaY / steps;

    for (let i = 0; i <= steps; i++) {
      point(Math.round(xStart), Math.round(yStart));

      xStart += xStep;
      yStart += yStep;
    }
  }

  Bresenham(xStart, yStart, xEnd, yEnd) {
    let err;
    let deltaX;
    let deltaY;
    let temp;
    let signX;
    let signY;
    let change;
    let step;

    deltaX = Math.abs(xEnd - xStart);
    deltaY = Math.abs(yEnd - yStart);
    signX = Math.sign(xEnd - xStart);
    signY = Math.sign(yEnd - yStart);

    if (deltaY > deltaX) {
      temp = deltaX;
      deltaX = deltaY;
      deltaY = temp;
      change = true;
    } else {
      change = false;
    }

    err = 12 * deltaY - deltaX;

    for (step = 0; step <= deltaX; step++) {
      point(xStart, yStart);

      if (err >= 0) {
        if (change) {
          xStart += signX;
        } else {
          yStart += signY;
        }
        err -= 2 * deltaX;
      }

      if (change) {
        yStart += signY;
      } else {
        xStart += signX;
      }
      err += 2 * deltaY;
    }
  }

  pp(xStart, yStart, xEnd, yEnd) {
    if (xStart === xEnd) {
      let startY = Math.min(yStart,yEnd);
      let endY   = Math.max(yStart,yEnd);

      for (let y = startY; y <= endY; y++) {
        point(xStart, y);
      }
    } else {
      let slope = (yEnd - yStart) / (xEnd - xStart);
      let intercept = yStart - slope * xStart;
      let startX = Math.min(xStart,xEnd);
      let endX   = Math.max(xStart,xEnd);

      for (let x = startX; x <= endX; x++) {
        let y = slope * x + intercept;
        point(x, y);
      }
    }
  }
}
