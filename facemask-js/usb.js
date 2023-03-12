navigator.usb.requestDevice({ filters: [{ vendorId: 0x2341 }] })
  .then(device => {
    console.log("Device connected:", device.productName);
    return device.open();
  })
  .then(device => device.selectConfiguration(1))
  .then(device => device.claimInterface(2))
  .then(device => {
    // Send data to the Arduino board
    device.transferOut(3, new Uint8Array([0x01, 0x02, 0x03]))
      .then(() => console.log("Data sent successfully"))
      .catch(error => console.log("Error sending data:", error));
    
    // Receive data from the Arduino board
    device.transferIn(4, 64)
      .then(result => {
        const data = new TextDecoder().decode(result.data);
        console.log("Data received:", data);
      })
      .catch(error => console.log("Error receiving data:", error));
  })
  .catch(error => console.log("Error connecting to device:", error));
