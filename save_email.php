<?php
error_reporting(E_ALL);
ini_set('display_errors', 1); // Enable error reporting for debugging

$dsn = 'libsql://magazinedata-joerakesh.turso.io';

try {
    $pdo = new PDO($dsn);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Could not connect to the database " . $e->getMessage());
}

$email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

// Check if the email already exists
$sql = "SELECT * FROM subscribers WHERE email = :email";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':email', $email);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    echo json_encode(["exists" => true]);
} else {
    // Insert the email if not already exists
    $insert_sql = "INSERT INTO subscribers (email) VALUES (:email)";
    $insert_stmt = $pdo->prepare($insert_sql);
    $insert_stmt->bindParam(':email', $email);
    if ($insert_stmt->execute()) {
        echo json_encode(["exists" => false]);
    } else {
        echo json_encode(["error" => "Failed to save email"]);
    }
}

$pdo = null; // Close the connection
?>
