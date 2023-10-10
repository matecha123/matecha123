/////////////////////////////////////////////////
////////////////Written by Steve Hudak///////////
/////////////////////////////////////////////////

let serial;                            // variable to hold an instance of the serialport library     // set baudrate to 9600; must match Arduino baudrate
var portName = '/dev/tty.usbmodem14201'; // fill in your serial port name here
//var portName = 'COM3'; // fill in your serial port name here
let inData = 0;                            // for incoming serial data
var outData = 0;

var clicked = false;

function mousePressed() {
    clicked = true;
};
function mouseReleased() {
  clicked = false;
};


function setupSerial(){
  serial = new p5.SerialPort();
  serial.open(serialPort);
}

//// declares 2 button variables
var myButton1;
var myButton2;

///// declares the outData variable and defines it to start at zero
var outData = '0';

function setup() {
    //// make the canvas whatever size you require
    createCanvas(800, 240);

    serial = new p5.SerialPort();       // make a new instance of the serialport library
    serial.on('list', printList);       // set a callback function for the serialport list event
    serial.on('connected', serverConnected); // callback for connecting to the server
    serial.on('open', portOpen);        // callback for the port opening
    serial.on('data', serialEvent);     // callback for when new data arrives
    serial.on('error', serialError);    // callback for errors
    serial.on('close', portClose);      // callback for the port closing

  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
}

function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
      // Display the list the console:
      console.log(i + " " + portList[i]);
    }
  }

function draw() {
  outData = '0';
    //// sets the colour of the background and redraws it each frame    
    background("#28d1d1");

    //// declares and defines a variable to hold color values
    var col = color(200, 255, 255);

    //// defines button1 attributes
    myButton1 = createButton("LED1!");
    myButton1.style('font-size', '20px');
    myButton1.style('background-color', col);
    myButton1.position(width / 3, height / 2);

    //// defines button2 attributes
    myButton2 = createButton("LED2!");
    myButton2.style('font-size', '20px');
    myButton2.style('background-color', col);
    myButton2.position(width - width / 3, height / 2);

    //// declaring and defining two variables that check for
    //// distance using same locations as buttons and 
    //// also mouse position
    var d1 = dist(width / 3, height / 2, mouseX, mouseY);
    var d2 = dist(width - width / 3, height / 2, mouseX, mouseY);


    //// Then LED1 and LED2 Button uses the above variable and a mouseclicked event conditions

    //// to identify if someone has clicked inside the LED1 Button location 
    if (d1 < 50 && clicked == true) {
        //// delaring and defining a new colour variable indicating a button1 click
        let col = color(255, 0, 0);
        //// red color
        myButton1.style('background-color', col);
             outData = '1';
             console.log(outData);
             
        } else {
            col = col;
        }
       
    //// duplicates the above logic to identify if someone has clicked inside the LED2 Buttonlocation 
    if (d2 < 50 && clicked == true) {
        //// delaring and defining a new local colour variable indicating a button2 click
        let col = color(0, 0, 255);
        //// blue color
        myButton2.style('background-color', col);
        outData = '2';
        console.log(outData);
       
        } else {
            col = col;   
    }
    serial.write(outData);
  }

  
function serverConnected() {
  console.log('connected to server.');
}

function portOpen() {
  console.log('the serial port opened.')
}

function serialEvent() {
  // read a byte from the serial port:
  var inByte = serial.read();
  // store it in a global variable:
  inData = inByte;
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function portClose() {
  console.log('The serial port closed.');
}

