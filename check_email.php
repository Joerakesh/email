<?php
$servername = "localhost";
$username = "root";
$password = "0000";
$dbname = "magazine_data"; // Replace with your actual DB name

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'];

$sql = "SELECT * FROM subscribers WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

$response = ['exists' => false];
if ($result->num_rows > 0) {
    $response['exists'] = true;
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>
