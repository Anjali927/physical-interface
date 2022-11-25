let serial;                             // variable to hold an instance of the serialport library
// let portName = '/dev/cu.usbmodem1412301';  // fill in your serial port name here
let inData;                             // for incoming serial data
let portSelector;

let dataMode;
let buttonData;
let potentiometerData;

function setup() {
  createCanvas(600, 600);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);       // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing

  serial.list();                      // list the serial ports
  // serial.openPort(portName);              // open a serial port
}

function draw() {
  // black background, white text:
  // background(0);
  // fill(255);
  // // display the incoming serial data as a string:
  // text("sensor value: " + inData, 30, 50);
  // text("pot data:" + potentiometerData, 30, 90)

  // fill(potentiometerData, 128, 128);
  // if(buttonData === 0) {
  //   ellipse(300, 300, potentiometerData * 2);
  // } else {
  //   rectMode(CENTER)
  //   rect(300, 300, potentiometerData * 2, potentiometerData * 2)
  // }

  fill(1, 40, 60);
  rect(105, 100, 30, 90); //left ear
  
  fill(1, 40, 60);
  rect(260, 110, 30, 90); //right ear
  
  fill(1, 40, 60);
  rect(170, 270, 60, 130); //neck
  
  fill(255, 255, 0, 90);
  rect(200, 270, 30, 130); //neck
  
  fill(1, 40, 60, 130); //right shoulder
  rect(200, 345, 215, 300, 0, 200, 0, 0);
  
  fill(152,105,96);
  ellipse(200, 100, 150, 400); //face
  
  fill(1, 40, 60, 130);
  rect(100, -40, 100, 400, 200, 0, 0, 200);
  
  fill(220, 20, 60); //left shoulder
  rect(0, 345, 200, 300, 0, 0, 0, 200);
  
  fill(255, 255, 0);
  ellipse(130, 190, potentiometerData * 2, potentiometerData * 2); //left earring
  noStroke();
  
  fill(220,20,60);
  ellipse(270, 180, potentiometerData * 2, potentiometerData * 2); //right earring
  noStroke();
  
  fill(220,20,60); //necklace
  ellipse(180, 330, potentiometerData * 2, potentiometerData * 2);
  fill(255, 255, 0); //necklace
  ellipse(190, 330, potentiometerData * 2, potentiometerData * 2);
  fill(220,20,60); //necklace
  ellipse(200, 330, potentiometerData * 2, potentiometerData * 2);
  fill(255, 255, 0); //necklace
  ellipse(210, 330, potentiometerData * 2, potentiometerData * 2);
  fill(220,20,60); //necklace
  ellipse(220, 330, potentiometerData * 2, potentiometerData * 2);
  
  fill(255, 255, 0, 150); //eyeshadow
  rect(220, 50, 55, 35);
  
  fill(101, 67, 33); //eyebrow
  rect(220, 50, 80, 15);
  
  fill(1, 40, 60); //nose
  rect(185, 0, 15, 170);
  
  fill(1, 40, 60, 200); //fringe
  ellipse(140, 0, 80, 80);
  ellipse(190, 0, 80, 80);
  ellipse(240, 0, 80, 80);
  
  fill(101, 67, 33); //eye
  translate(250,85);
  beginShape();
  vertex(-40,0);
  bezierVertex(-10, -20, 0, -30, 40, 0);
  endShape();
  
  fill(0); //eyeball
  ellipse(0, -11, potentiometerData * 2, potentiometerData * 2);
  
}

// make a serial port selector object:
function printList(portList) {
  // create a select object:
  portSelector = createSelect();
  portSelector.position(10, 10);
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // add this port name to the select object:
    portSelector.option(portList[i]);
  }
  // set an event listener for when the port is changed:
  portSelector.changed(mySelectEvent);
}

function mySelectEvent() {
  let item = portSelector.value();
  // if there's a port open, close it:
  if (serial.serialport != null) {
    serial.close();
  }
  // open the new port:
  serial.openPort(item);
}

function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  // read a byte from the serial port, convert it to a number:
  inString = serial.readLine();

  if (inString === "potentiometer") {
    dataMode = "potentiometer"
  } else if (inString === "button") {
    dataMode = "button"
  } else if (dataMode === "potentiometer") {
    potentiometerData = inString
  } else if (dataMode === "button") {
    buttonData = inString
  }
 
  inData = inString
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}