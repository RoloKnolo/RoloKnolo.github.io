let slices, r, button;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let span = createElement("h1", "Cantidad de trozos de pizza a parti?");
  span.position((width / 2) - (100 / 2) - 300 , 100);
  span.style('border', 'solid black');
  span.style('text-align', 'center');
  slices = prompt("Ingrese el número de partes:");
  button = createButton('Ingresar partes:');
  button.position(20, 20);
  button.mousePressed(changeSlices);
}

function draw() {
  r = 100;
  let p1 = new Ellipse(((width / 2) - (100 / 2)) - r*2 - 20, (height / 2) - (100 / 2), r);
  let p2 = new Ellipse((width / 2) - (100 / 2), (height / 2) - (100 / 2), 100);
  let p3 = new Ellipse(((width / 2) - (100 / 2)) + r*2 + 20, (height / 2) - (100 / 2), r);
  
p1.pmEllipse();
p2.pmEllipse();
p3.pmEllipse();
p1.splitPP(slices);
p2.splitDDA(slices);
p3.splitBresenham(slices);
}

function changeSlices() {
slices = prompt("Ingrese el número de partes:");
}