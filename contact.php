<?php
// Allow POST requests only
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    die("405 Method Not Allowed");
}

// Database credentials
$servername = "localhost";
$username = "root";
$password = " ";
$dbname = "basavatarakam";

// Connect to MySQL server (without selecting DB yet)
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database if it doesn't exist
$sql_create_db = "CREATE DATABASE IF NOT EXISTS $dbname";
if (!$conn->query($sql_create_db)) {
    die("Error creating database: " . $conn->error);
}

// Select the newly created database
$conn->select_db($dbname);

// Create table if not exists
$sql_create_table = "
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";
if (!$conn->query($sql_create_table)) {
    die("Error creating table: " . $conn->error);
}

// Get form data safely
$name = $_POST['name'] ?? '';
$telephone = $_POST['telephone'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

// Validate required fields
if (empty($name) || empty($telephone) || empty($email) || empty($message)) {
    echo "<script>alert('Error: All fields are required.'); window.history.back();</script>";
    exit;
}

// Prepare and bind
$stmt = $conn->prepare("INSERT INTO contacts (name, telephone, email, message) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $telephone, $email, $message);

// Execute and handle result
if ($stmt->execute()) {
    echo "<script>alert('Message sent successfully!'); window.location.href='contact.html';</script>";
} else {
    echo "<script>alert('Error: Unable to send message.'); window.history.back();</script>";
}

// Close resources
$stmt->close();
$conn->close();
?>
