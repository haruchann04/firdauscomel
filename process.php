<?php
// Sample database connection (replace with your actual database details)
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "indoor_parking_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$level = intval($_POST['level']);
$parkingSpot = strtoupper($_POST['parkingSpot']);

if ($level < 1 || $level > 2) {
    die("Invalid level. Please enter 1 or 2.");
}

$query = "SELECT * FROM parking_spots WHERE level = $level AND id = '$parkingSpot'";
$result = mysqli_query($conn, $query);
$destination = mysqli_fetch_assoc($result);

mysqli_close($conn);
?>

<!DOCTYPE html>
<html>
<head>
    <title>Indoor Navigation Parking</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
    <script src="qrcode.min.js"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Zbc5Izx6JorwpDqfVY8Qwz23zQiUJ30IJN+HZwWqhtF6jg7fI8ntllOgxN2eZPz9UhjU75jVXZjNBnnJpENZg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
	<style>
        body {
            font-family: "Garamond", serif;
        }
    <!-- Add your other script and style links here -->
</head>
<body>

<div class="navigation">
        <div class="logo">
            <i class="fas fa-map-marked-alt"></i>
            <h1>Indoor Navigation Parking </h1>
        </div>
        <ul class="nav-links">
            <ul class="nav-links">
    <			li><a href="#welcome-container"><i class="fas fa-home"></i> Home</a></li>
				li><a href="#about.html" onclick="toggleAboutUs()"><i class="fas fa-envelope"></i> Company</a></li>
    <			li><a href="#contact-us-container" onclick="toggleContactUs()"><i class="fas fa-envelope"></i> Contact Us</a></li>

</ul>
        </ul>
</div>

<div class="main-content">
    <div id="welcome-container">
        <h1 id="welcome-message">WELCOME</h1>
        <!-- Display the destination details -->
        <p>Destination: Level <?php echo $destination['level']; ?>, Parking Spot <?php echo $destination['id']; ?></p>
        <!-- Your existing form fields here -->
        <form method="post" action="process.php">
            <input type="text" name="level" placeholder="Enter level">
            <input type="text" name="parkingSpot" placeholder="Enter parking spot or facilities">
            <button type="submit">Navigate</button>
        </form>
    </div>
    <!-- Your existing content here -->
</div>

<!-- Your JavaScript code here -->

</body>
</html>
