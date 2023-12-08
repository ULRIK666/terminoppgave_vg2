<?php 
// lager connection til databasen, logger inn for følgende bruker som har begrensa rettigheter
$dsn = "mysql:host=localhost;dbname=terminoppgave2023";
$dbusername = "termin2023";
$dbpassword = "Jule3Kule.";

try {
    $pdo = new PDO($dsn, $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "connection failed: " . $e->getMessage();
}
