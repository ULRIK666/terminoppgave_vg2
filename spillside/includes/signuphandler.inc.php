<?php 
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // henter infylt brukernavn og passord
    $brukernavn       = $_POST["brukernavn"];
    $passord     = $_POST["passord"];
    
    try {
        require_once "dbh.inc.php";

        // skriver in brukernavn og passord in i databasen 
        $query = "INSERT INTO bruker (brukernavn, passord) 
                  VALUES (:brukernavn, :passord);";

        $stmt = $pdo->prepare($query);

        $stmt->bindParam(":brukernavn", $brukernavn);
        $stmt->bindParam(":passord", $passord);

        $stmt->execute();

        //$pdo = null;
        $stmt = null;

        // sender deg tilbake osv
        header("location: ../index.php");

        die();
    } catch (PDOException $e) {
        die("Query failed:". $e->getMessage());
    }
} else {
    header("location: ../index.php");
}