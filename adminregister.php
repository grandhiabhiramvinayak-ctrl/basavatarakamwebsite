<?php
// Basic input validation
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name     = trim($_POST['name']);
    $email    = trim($_POST['emaild']);
    $dob      = $_POST['dob'];
    $password = $_POST['pass'];
    $confirm  = $_POST['confirm_password'];

    // Check if passwords match
    if ($password !== $confirm) {
        echo "❌ Error: Passwords do not match.";
        exit;
    }

    // Optional: Check password length
    if (strlen($password) < 6) {
        echo "❌ Error: Password must be at least 6 characters.";
        exit;
    }

    // Hash the password securely
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Optional: Save to database
    $conn = new mysqli("localhost", "root", "", "your_database_name"); // Replace DB name

    if ($conn->connect_error) {
        die("❌ Database connection failed: " . $conn->connect_error);
    }

    // Check if email already exists
    $checkEmail = $conn->prepare("SELECT * FROM admins WHERE email = ?");
    $checkEmail->bind_param("s", $email);
    $checkEmail->execute();
    $checkEmail->store_result();

    if ($checkEmail->num_rows > 0) {
        echo "❌ Error: Email already registered.";
        $checkEmail->close();
        $conn->close();
        exit;
    }

    $checkEmail->close();

    // Insert user into database
    $stmt = $conn->prepare("INSERT INTO admins (name, email, dob, password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $dob, $hashedPassword);

    if ($stmt->execute()) {
        echo "✅ Registration successful!";
        // Redirect to login page (optional):
        // header("Location: adminlogin.html");
    } else {
        echo "❌ Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
} else {
    echo "⚠️ Invalid request.";
}
?>
