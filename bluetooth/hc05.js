// hc05.js

// Define variables for UI elements
const connectBtn = document.getElementById('connectBtn');
const disconnectBtn = document.getElementById('disconnectBtn');
const messageInput = document.getElementById('message');
const sendBtn = document.getElementById('sendBtn');
const outputDiv = document.getElementById('output');

// Define variables for Bluetooth communication
let deviceName = document.getElementById('deviceName').value;
let server = null;
let serviceUuid = '00001101-0000-1000-8000-00805f9b34fb';
let characteristicUuid = '00001101-0000-1000-8000-00805f9b34fb';
let characteristic = null;
let connected = false;

// Function to connect to the Bluetooth device
function connect() {
  if (connected) {
    return;
  }

  // Search for the device by name
  navigator.bluetooth.requestDevice({
    filters: [{ name: deviceName }],
  })
  .then(device => {
    // Connect to the device
    return device.gatt.connect();
  })
  .then(serverObj => {
    // Save a reference to the server object
    server = serverObj;
    // Get the primary service
    return server.getPrimaryService(serviceUuid);
  })
  .then(service => {
    // Get the characteristic for the communication
    return service.getCharacteristic(characteristicUuid);
  })
  .then(characteristicObj => {
    // Save a reference to the characteristic
    characteristic = characteristicObj;
    // Enable the UI elements for sending messages
    messageInput.disabled = false;
    sendBtn.disabled = false;
    // Disable the connect button and enable the disconnect button
    connectBtn.disabled = true;
    disconnectBtn.disabled = false;
    // Set the connected flag to true
    connected = true;
    // Log the connection status
    output('Connected');
  })
  .catch(error => {
    console.error('Bluetooth error:', error);
    // Log the connection status
    output('Connection error');
  });
}

// Function to disconnect from the Bluetooth device
