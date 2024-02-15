document.addEventListener('DOMContentLoaded', function () {
    // Sample parking data
    const parkingSpots = [
        { id: 'G1', x: 87, y: 185 },
        { id: 'G2', x: 146, y: 185 },
        { id: 'G3', x: 205, y: 185 },
        { id: 'G4', x: 264, y: 185 },
        { id: 'G5', x: 264, y: 230 },
        { id: 'G6', x: 205, y: 230 },
        { id: 'G7', x: 146, y: 230 },
        { id: 'G8', x: 87, y: 230 },
        { id: 'KFC', x: 446, y: 79 },
        { id: 'A&W', x: 588, y: 79 },
        { id: 'LIFT', x: 730, y: 5 },
        { id: 'WATSON', x: 446, y: 330 },
        { id: 'GUARDIAN', x: 588, y: 330 },
        { id: 'H&M', x: 730, y: 330 },
        // Add more parking spots as needed
    ];

    // Function to initialize the parking map
    function initializeMap() {
        // Get the current location and destination
        const currentLocation = document.getElementById('current-location').value.toUpperCase();
        const destination = document.getElementById('destination').value.toUpperCase();

        // Clear the symbols container
        const symbolsContainer = document.getElementById('parking-symbols-container');
        symbolsContainer.innerHTML = '';

        // Filter parking spots for the current location and destination
        const filteredSpots = parkingSpots.filter(spot => spot.id === currentLocation || spot.id === destination);

        // Add parking spot symbols dynamically
        filteredSpots.forEach(spot => {
            const spotElement = document.createElement('div');
            spotElement.classList.add('parking-symbol');
            spotElement.textContent = spot.id;
            spotElement.style.left = spot.x + 'px';
            spotElement.style.top = spot.y + 'px';

            // Apply different colors based on current location or destination
            if (spot.id === currentLocation) {
                spotElement.classList.add('current-location');
            } else if (spot.id === destination) {
                spotElement.classList.add('destination');
            }

            spotElement.addEventListener('click', () => navigateToParkingSpot(spot.id));
            symbolsContainer.appendChild(spotElement);
        });

        // Hide the input fields
        document.getElementById('controls').style.display = 'none';

        // Show the "Done" button
        document.getElementById('done-button').style.display = 'block';
    }

    // Function to simulate navigation to a parking spot
    function navigateToParkingSpot(destination) {
        const currentLocation = document.getElementById('current-location').value.toUpperCase();
        
        if (currentLocation === destination) {
            alert(`You are already at ${currentLocation}`);
        } else {
            alert(`Navigating from ${currentLocation} to ${destination}`);
            // Draw navigation line (you can add this function if needed)
        }
    }

    // Function to handle "Done" button click
    function handleDone() {
        // Show the input fields
        document.getElementById('controls').style.display = 'flex';

        // Hide the "Done" button
        document.getElementById('done-button').style.display = 'none';

        // Hide the map container
        document.getElementById('map-container').style.display = 'none';
    }

    // Function to handle navigation button click
    function handleNavigation() {
        // Show the map container when the "Navigate" button is clicked
        document.getElementById('map-container').style.display = 'block';

        // Initialize the map with the current location and destination
        initializeMap();

        // Clear canvas before drawing new route
        clearCanvas();

        // Draw the appropriate route based on current location and destination
        const currentLocation = document.getElementById('current-location').value.toUpperCase();
        const destination = document.getElementById('destination').value.toUpperCase();

        if (currentLocation === 'G1' && destination === 'KFC') {
            drawRouteFromG1ToKFC();
        } else if (currentLocation === 'KFC' && destination === 'G1') {
            drawRouteFromKFCtoG1();
        } else if (currentLocation === 'G1' && destination === 'G7') {
            drawRouteFromG1ToG7();
        } else if (currentLocation === 'A&W' && destination === 'H&M') {
            drawRouteFromAnWtoHnM();
        } else {
            console.error('Invalid route selected');
        }
    }

    // Function to clear the canvas
    function clearCanvas() {
        const canvas = document.getElementById('route-canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Add event listeners for the buttons
    document.getElementById('navigate-button').addEventListener('click', handleNavigation);
    document.getElementById('done-button').addEventListener('click', handleDone);

    // Add event listener for the "Start" button
    document.getElementById('start-button').addEventListener('click', function() {
        const currentLocation = document.getElementById('current-location').value.toUpperCase();
        const destination = document.getElementById('destination').value.toUpperCase();

        if (currentLocation === 'G1' && destination === 'KFC') {
            drawRouteFromG1ToKFC();
        } else if (currentLocation === 'KFC' && destination === 'G1') {
            drawRouteFromKFCtoG1();
        } else if (currentLocation === 'G1' && destination === 'G7') {
            drawRouteFromG1ToG7();
        } else if (currentLocation === 'A&W' && destination === 'H&M') {
            drawRouteFromAnWtoHnM();
        } else {
            console.error('Invalid route selected');
        }
    });

    // Add event listeners for the dropdown search
    document.getElementById('current-location').addEventListener('input', function () {
        filterParkingSpots(this.value, 'current-location-list');
    });

    document.getElementById('destination').addEventListener('input', function () {
        filterParkingSpots(this.value, 'destination-list');
    });

    // Function to filter parking spots based on input
    function filterParkingSpots(input, listId) {
        const dropdownList = document.getElementById(listId);
        dropdownList.classList.remove('show'); // Hide the dropdown initially

        const filteredSpots = parkingSpots.filter(spot => spot.id.toLowerCase().includes(input.toLowerCase()));

        dropdownList.innerHTML = '';

        filteredSpots.forEach(spot => {
            const listItem = document.createElement('li');
            listItem.textContent = spot.id;
            listItem.addEventListener('click', () => {
                document.getElementById(listId.replace('-list', '')).value = spot.id;
                dropdownList.innerHTML = '';
                dropdownList.classList.remove('show'); // Hide the dropdown after selecting an option
            });
            dropdownList.appendChild(listItem);
        });

        // Show the dropdown if there are suggestions
        if (filteredSpots.length > 0) {
            dropdownList.classList.add('show');
        }
    }


    // Function to draw a route from G1 to KFC
    function drawRouteFromG1ToKFC() {
        const canvas = document.getElementById('route-canvas');
        const ctx = canvas.getContext('2d');
        
        // Clear previous drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Coordinates for G1
        const g1X = 87;
        const g1Y = 185;
        
        // Coordinates for KFC
        const kfcX = 446;
        const kfcY = 79;
        
        // Intermediate points for the route
        const bend1X = 87;
        const bend1Y = 150; // The y-coordinate of the first bend
        const bend2X = 350;
        const bend2Y = 150; // The y-coordinate of the second bend
        const bend3X = 350;
        const bend3Y = 230;
        const bend4X = 446;
        const bend4Y = 230;
        
        // Draw the route line incrementally
        let currentPointIndex = 0;
        const routePoints = [
            { x: g1X, y: g1Y },
            { x: bend1X, y: bend1Y },
            { x: bend2X, y: bend2Y },
            { x: bend3X, y: bend3Y },
            { x: bend4X, y: bend4Y },
            { x: kfcX, y: kfcY }
        ];
        
        // Start the animation
        const animationInterval = setInterval(drawNextPoint, 150);
        
        function drawNextPoint() {
            if (currentPointIndex >= routePoints.length - 1) {
                clearInterval(animationInterval); // Stop the animation when all points are drawn
                return;
            }
            
            const startPoint = routePoints[currentPointIndex];
            const endPoint = routePoints[currentPointIndex + 1];
            
            // Draw line segment from current point to the next point
            ctx.beginPath();
            ctx.moveTo(startPoint.x, startPoint.y);
            ctx.lineTo(endPoint.x, endPoint.y);
            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.closePath();
            
            currentPointIndex++; // Move to the next point
        }
    }

    // Function to draw a route from KFC to G1
    function drawRouteFromKFCtoG1() {
        const canvas = document.getElementById('route-canvas');
        const ctx = canvas.getContext('2d');
        
        // Clear previous drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Coordinates for G1
        const g1X = 87;
        const g1Y = 185;
        
        // Coordinates for KFC
        const kfcX = 446;
        const kfcY = 79;
        
        // Intermediate points for the route
        const bend1X = 87;
        const bend1Y = 150; // The y-coordinate of the first bend
        const bend2X = 350;
        const bend2Y = 150; // The y-coordinate of the second bend
        const bend3X = 350;
        const bend3Y = 230;
        const bend4X = 446;
        const bend4Y = 230;
        
        // Draw the route line incrementally
        let currentPointIndex = 0;
        const routePoints = [
            { x: kfcX, y: kfcY },
            { x: bend4X, y: bend4Y },
            { x: bend3X, y: bend3Y },
            { x: bend2X, y: bend2Y },
            { x: bend1X, y: bend1Y },
            { x: g1X, y: g1Y }
        ];
        
        // Start the animation
        const animationInterval = setInterval(drawNextPoint, 150);
        
        function drawNextPoint() {
            if (currentPointIndex >= routePoints.length - 1) {
                clearInterval(animationInterval); // Stop the animation when all points are drawn
                return;
            }
            
            const startPoint = routePoints[currentPointIndex];
            const endPoint = routePoints[currentPointIndex + 1];
            
            // Draw line segment from current point to the next point
            ctx.beginPath();
            ctx.moveTo(startPoint.x, startPoint.y);
            ctx.lineTo(endPoint.x, endPoint.y);
            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.closePath();
            
            currentPointIndex++; // Move to the next point
        }
    }

    // Function to draw a route from KFC to G1
    function drawRouteFromAnWtoHnM() {
        const canvas = document.getElementById('route-canvas');
        const ctx = canvas.getContext('2d');
        
        // Clear previous drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Coordinates for G1
        const AnWX = 588;
        const AnWY = 79;
        
        // Coordinates for KFC
        const HnMX = 730;
        const HnMY = 330;
        
        // Intermediate points for the route
        const bend1X = 588;
        const bend1Y = 230; // The y-coordinate of the first bend
        const bend2X = 730;
        const bend2Y = 230; // The y-coordinate of the second bend
        
        // Draw the route line incrementally
        let currentPointIndex = 0;
        const routePoints = [
            { x: AnWX, y: AnWY },
            { x: bend1X, y: bend1Y },
            { x: bend2X, y: bend2Y },
            { x: HnMX, y: HnMY }
        ];
        
        // Start the animation
        const animationInterval = setInterval(drawNextPoint, 150);
        
        function drawNextPoint() {
            if (currentPointIndex >= routePoints.length - 1) {
                clearInterval(animationInterval); // Stop the animation when all points are drawn
                return;
            }
            
            const startPoint = routePoints[currentPointIndex];
            const endPoint = routePoints[currentPointIndex + 1];
            
            // Draw line segment from current point to the next point
            ctx.beginPath();
            ctx.moveTo(startPoint.x, startPoint.y);
            ctx.lineTo(endPoint.x, endPoint.y);
            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.closePath();
            
            currentPointIndex++; // Move to the next point
        }
    }

    // Function to draw a route from G1 to G7
    function drawRouteFromG1ToG7() {
        const canvas = document.getElementById('route-canvas');
        const ctx = canvas.getContext('2d');
        
        // Clear previous drawings
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Coordinates for G1
        const g1X = 87;
        const g1Y = 185;
        
        // Coordinates for G7
        const g7X = 146;
        const g7Y = 230;
        
        // Intermediate points for the route
        const bend1X = 87;
        const bend1Y = 150; // The y-coordinate of the first bend
        const bend2X = 350;
        const bend2Y = 150; // The y-coordinate of the second bend
        const bend3X = 350;
        const bend3Y = 230;
        const bend4X = 350;
        const bend4Y = 300;
        const bend5X = 146;
        const bend5Y = 300;
        
        // Draw the route line incrementally
        let currentPointIndex = 0;
        const routePoints = [
            { x: g1X, y: g1Y },
            { x: bend1X, y: bend1Y },
            { x: bend2X, y: bend2Y },
            { x: bend3X, y: bend3Y },
            { x: bend4X, y: bend4Y },
            { x: bend5X, y: bend5Y },
            { x: g7X, y: g7Y }
        ];
        
        // Start the animation
        const animationInterval = setInterval(drawNextPoint, 150);
        
        function drawNextPoint() {
            if (currentPointIndex >= routePoints.length - 1) {
                clearInterval(animationInterval); // Stop the animation when all points are drawn
                return;
            }
            
            const startPoint = routePoints[currentPointIndex];
            const endPoint = routePoints[currentPointIndex + 1];
            
            // Draw line segment from current point to the next point
            ctx.beginPath();
            ctx.moveTo(startPoint.x, startPoint.y);
            ctx.lineTo(endPoint.x, endPoint.y);
            ctx.strokeStyle = '#3498db';
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.closePath();
            
            currentPointIndex++; // Move to the next point
        }
    }
});



