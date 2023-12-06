<?php 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $brukernavn       = $_POST["brukernavn"];
    $passord     = $_POST["passord"];
    
    try {
        require_once "dbh.inc.php";

        $query = "INSERT INTO bruker (brukernavn, passord) 
                  VALUES (:brukernavn, :passord);";

        $stmt = $pdo->prepare($query);

        $stmt->bindParam(":brukernavn", $brukernavn);
        $stmt->bindParam(":passord", $passord);

        $stmt->execute();

        //$pdo = null;
        $stmt = null;

        header("location: ../index.php");

        die();
    } catch (PDOException $e) {
        die("Query failed:". $e->getMessage());
    }
} else {
    header("location: ../index.php");
}