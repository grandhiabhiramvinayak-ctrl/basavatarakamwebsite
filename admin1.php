<?php
session_start();

// Get form inputs safely
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

// DB credentials
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
$db_name = 'adminlogin';
$db_port = 3307;

// Connect to MySQL
$conn = mysqli_connect($db_host, $db_user, $db_pass, $db_name, $db_port);
if (!$conn) {
    die("❌ Connection failed: " . mysqli_connect_error());
}

// Escape inputs
$email_safe = mysqli_real_escape_string($conn, $email);

// Query for user
$sql = "SELECT * FROM admins WHERE email = '$email_safe' LIMIT 1";
$result = mysqli_query($conn, $sql);

// Check if user found
if ($result && mysqli_num_rows($result) === 1) {
    $user = mysqli_fetch_assoc($result);

    // ✅ Use plain text comparison for now
    if ($password === $user['password']) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['name'];

        header("Location: admin_dashboard.php");
        exit();
    } else {
        echo "<script>alert('❌ Invalid password'); window.location.href='adminlogin.html';</script>";
    }
} else {
    echo "<script>alert('❌ No user found with that email'); window.location.href='adminlogin.html';</script>";
}

mysqli_close($conn);
?>
