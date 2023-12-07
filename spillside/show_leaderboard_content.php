
<?php
require "includes/dbh.inc.php";

// gjøre dynamisk 

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $spill_id = $_GET["spill_id"];
} 

$query = "SELECT * FROM user_highscore inner join bruker on user_highscore.bruker_id = bruker.id and spill_id = :spill_id ORDER BY poeng desc limit 5";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":spill_id", $spill_id);
$stmt->execute();
$result = $stmt->fetchAll(PDO::FETCH_ASSOC);

if (empty($result)) {
    echo "<div class='center'>";
    echo "<h2>Ingen leaderboard for dette spillet</h2>";
    echo "</div>";
    return;
}

echo "<div class='center'>";
echo "<div class='scoreboard'>";
echo "<table>";
echo "<tr>";
echo "<td class='poengliste_top'>Plassering</td>";
echo "<td class='poengliste_top'>Bruker</td>";
echo "<td class='poengliste_top'>poeng</td>";
echo "</tr>\n";

$placement = 0;
foreach ($result as $row) {
    $placement++;
    echo "<tr>";
    echo "<td class='poengliste'>$placement</td>";
    echo "<td class='poengliste'>${row['brukernavn']}</td>";
    echo "<td class='poengliste'>${row['poeng']}</td>";
    echo "</tr>\n";
}
echo "</table>";
echo "</div>";
echo "</div>";
?>
