<?php
// Database connection settings
$host = 'localhost';    // Hostname of your database (usually localhost for local development)
$username = 'root';     // Your database username (usually 'root' on local setups)
$password = '';         // Your database password (leave empty if using default settings on localhost)
$dbname = 'image_likes'; // The name of your database

// Create connection
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// echo "Connected successfully"; // Uncomment to test the connection
?>
<?php
require_once('db.php'); // Include the database connection script
?>
<?php
// Assuming the database connection (db.php) has been included above

// Example: Insert or update the like count for image with id = 1
$image_id = 1; // For example, the image ID

// Check if there's already a record for this image
$checkQuery = "SELECT * FROM likes WHERE id = ?";
$stmt = $conn->prepare($checkQuery);
$stmt->bind_param("i", $image_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Record exists, update the like count
    $updateQuery = "UPDATE likes SET like_count = like_count + 1 WHERE id = ?";
    $stmt = $conn->prepare($updateQuery);
    $stmt->bind_param("i", $image_id);
    $stmt->execute();
    echo "Like count updated!";
} else {
    // Record doesn't exist, insert a new like count
    $insertQuery = "INSERT INTO likes (id, like_count) VALUES (?, 1)";
    $stmt = $conn->prepare($insertQuery);
    $stmt->bind_param("i", $image_id);
    $stmt->execute();
    echo "New like count added!";
}
?>
<?php
require_once('db.php'); // Include the database connection script

$image_id = 1; // Example image ID

// Query to get the current like count
$query = "SELECT like_count FROM likes WHERE id = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $image_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo "Like count for image " . $image_id . ": " . $row['like_count'];
} else {
    echo "No likes found for image " . $image_id;
}
?>
