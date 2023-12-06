<?php

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $poeng = $_GET["poeng"];
    $spill = $_GET["spill"];

    try {
        require_once "dbh.inc.php";


        # 1 - finn bruker

        $query = "select id from game where navn = :spill";

        $stmt = $pdo->prepare($query);

        $stmt->bindParam(":spill", $spill);

        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);


        if (empty($result)) {
            echo "<p>Ukjent spill</p>";
            return;
        } else {
            $row = $result[0];
            $spill_id = $row["id"];
        }

        # 2 - sjekk passord
        session_start();
        $bruker_id = $_SESSION['bruker_id'];

        if (!$bruker_id > 0) {
            echo "<p>Ikke logget inn</p>";
            return;
        }



//echo "insert into user_highscore values(:bruker_id, :spill_id, curdate(), :poeng)";
        $query = "insert into user_highscore values(:bruker_id, :spill_id, curdate(), :poeng)";

        $stmt = $pdo->prepare($query);

        $stmt->bindParam(":bruker_id", $bruker_id);
        $stmt->bindParam(":spill_id", $spill_id);
        $stmt->bindParam(":poeng", $poeng);
        $stmt->execute();

        $pdo = null;
        $stmt = null;

        echo "highscore er oppdatert med $poeng";



        die();
    } catch (PDOException $e) {
        die("Query failed:" . $e->getMessage());
    }
} else {
    echo "bare get method er støttet";   
}