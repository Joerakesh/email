<?php
$servername = "libsql://magazinedata-joerakesh.turso.io";
$username = "root";  // Default XAMPP MySQL username
$password = "0000";      // Default XAMPP MySQL password (empty)
$dbname = "magazine_data";  // Your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch all subscriber emails
$sql = "SELECT id, email, subscription_date FROM subscribers";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subscriber List</title>
    <style>
        table {
            width: 80%;
            margin: 20px auto;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 10px;
            text-align: center;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <h1 style="text-align:center;">Subscriber List</h1>
    <table>
        <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Subscription Date</th>
        </tr>

        <?php
        if ($result->num_rows > 0) {
            // Output data of each row
            while($row = $result->fetch_assoc()) {
                echo "<tr>
                        <td>" . $row["id"]. "</td>
                        <td>" . $row["email"]. "</td>
                        <td>" . $row["subscription_date"]. "</td>
                      </tr>";
            }
        } else {
            echo "<tr><td colspan='3'>No subscribers found</td></tr>";
        }
        ?>
    </table>

</body>
</html>

<?php
$conn->close();
?>
