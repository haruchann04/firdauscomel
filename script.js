// Sample parking data (you can replace this with your actual data)
const parkingSpots = [
    { level: 1, id: "A1", x: 355, y: 105 },
    { level: 1, id: "A2", x: 430, y: 105 },
    { level: 1, id: "A3", x: 505, y: 105 },
    { level: 1, id: "A4", x: 745, y: 105 },
    { level: 1, id: "A5", x: 820, y: 105 },
    { level: 1, id: "A6", x: 895, y: 105 },
    { level: 1, id: "A7", x: 505, y: 275 },
    { level: 1, id: "A8", x: 580, y: 275 },
    { level: 1, id: "A9", x: 655, y: 275 },
    { level: 1, id: "A10", x: 730, y: 275 },
    { level: 1, id: "A11", x: 505, y: 435 },
    { level: 1, id: "A12", x: 580, y: 435 },
    { level: 1, id: "A13", x: 655, y: 435 },
    { level: 1, id: "A14", x: 740, y: 435 },
    { level: 1, id: "A15", x: 815, y: 435 },
    { level: 1, id: "A16", x: 900, y: 435 },
    { level: 2, id: "B1", x: 355, y: 105 },
    { level: 2, id: "B2", x: 430, y: 105 },
    { level: 2, id: "B3", x: 505, y: 105 },
    { level: 2, id: "B4", x: 745, y: 105 },
    { level: 2, id: "B5", x: 820, y: 105 },
    { level: 2, id: "B6", x: 895, y: 105 },
    { level: 2, id: "B7", x: 505, y: 275 },
    { level: 2, id: "B8", x: 580, y: 275 },
    { level: 2, id: "B9", x: 655, y: 275 },
    { level: 2, id: "B10", x: 730, y: 275 },
	{ level: 2, id: "B11", x: 505, y: 435 },
	{ level: 2, id: "B12", x: 580, y: 435 },
	{ level: 2, id: "B13", x: 650, y: 435 },
	{ level: 2, id: "TANDAS", x: 740, y: 435 },
	{ level: 2, id: "SURAU", x: 850, y: 435 },
    // Add more parking spots...
];

function navigate() {
    const levelInput = document.getElementById('level');
    const level = parseInt(levelInput.value);

    if (isNaN(level) || level < 1 || level > 2) {
        alert('Invalid level. Please enter 1 or 2.');
        return;
    }

    updateMapImage(level); // Update the map image based on the entered level

    const parkingSpot = document.getElementById('parkingSpot').value.toUpperCase();
    const validSpot = findParkingSpotByLevelAndId(level, parkingSpot);
    if (validSpot) {


        // Calculate the position of the red dot on the map based on the parking spot coordinates
        const redDot = document.getElementById('red-dot');
        redDot.style.left = `${validSpot.x}px`;
        redDot.style.top = `${validSpot.y}px`;
        redDot.style.opacity = 1; // Show the red dot

        // Simulated current location (replace this with real-time tracking coordinates in a real application)
        const userLocation = { x: 625, y: 105 }; // Change the coordinates as needed

        // Calculate the position of the blue dot on the map based on the user's current location
        const blueDot = document.getElementById('blue-dot');
        blueDot.style.left = `${userLocation.x}px`;
        blueDot.style.top = `${userLocation.y}px`;
        blueDot.style.opacity = 1; // Show the blue dot

        const qrCodeData = `Level: ${validSpot.level}, Parking Spot: ${validSpot.id}`;
        generateQRCode(qrCodeData); // Generate QR code for the destination information

        // Show the map and other elements
        document.getElementById('map-container').classList.remove('hidden');
        document.getElementById('dot-container').classList.remove('hidden');
        document.getElementById('qrcode-container').classList.remove('hidden');
        document.getElementById('search-container').classList.add('hidden');
		document.getElementById('done-container').classList.remove('hidden');
        document.getElementById('search-container').classList.add('hidden');
    } else {
        alert('Invalid destination or parking spot not found!');
    }
}

function findParkingSpotByLevelAndId(level, id) {
    return parkingSpots.find(spot => spot.level === level && spot.id === id);
}
function toggleContactUs() {
    const contactUsContainer = document.getElementById('contact-us-container');
    contactUsContainer.classList.toggle('hidden');
}




function generateQRCode(data) {
    const qrCodeDiv = document.getElementById('qrcode');

    // Clear previous QR code (if any)
    qrCodeDiv.innerHTML = '';

    // Create the QR code using qrcode.js library
    const qrCode = new QRCode(qrCodeDiv, {
        text: data,
        width: 128,
        height: 128,
    });
	
	qrCodeDiv.style.display = 'flex';
    qrCodeDiv.style.justifyContent = 'center';
    qrCodeDiv.style.alignItems = 'center';
}

function updateMapImage(level) {
  const mapImage = document.getElementById('map-image');
  if (level === 1) {
    mapImage.src = 'indoor_map_level1.png'; // Use level 1 map image
  } else if (level === 2) {
    mapImage.src = 'indoor_map_level2.png'; // Use level 2 map image
  } else {
    // Handle invalid levels or other levels as needed
    mapImage.src = '';
  }
}
