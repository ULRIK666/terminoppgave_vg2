<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Game</title>
</head>

<body>
    <div class="header">
        <div class="logo-container">
            <div id="logo"><a href="index.php"><img class="maxwidth" src="images/alien_logo.png" alt=""></a></div>
        </div>
        <div class="center" id="tittel-container">
            <h1 id="butikknavn">StarStruckArcade</h1>
        </div>
        <div class="icons-container">
            <div class="icon"><a href="settings.php"><img class="maxwidth" src="images/settings.png"></a><b></b></div>
            <div class="icon"><a href="log_inn.php"><img class="maxwidth" src="images/logginicon.png"></a><b>

                    <?php
                    session_start();

                    $id = $_SESSION["bruker_id"];

                    if ($id == 0) {
                        $melding = "Ikke logget inn";


                    } else {


                        try {
                            require "includes/dbh.inc.php";



                            $query = "select brukernavn from bruker where id = :id";

                            $stmt = $pdo->prepare($query);

                            $stmt->bindParam(":id", $id);

                            $stmt->execute();

                            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);


                            if (empty($result)) {
                                $melding = "<p>Ukjent brukernavn!</p>";
                                return;
                            } else {
                                $row = $result[0];
                                $brukernavn = $row["brukernavn"];
                                $melding = "Logget inn som $brukernavn <br><a href='includes/logouthandler.inc.php'>logg ut</a>";

                            }

                            $pdo = null;
                            $stmt = null;


                        } catch (PDOException $e) {
                            die("Query failed:" . $e->getMessage());
                        }
                    }
                    echo $melding;


                    ?>
                </b></div>
        </div>

    </div>

    <div class="center">
        <div class="center">
            <div class="spill-container">

                <?php
                require "includes/dbh.inc.php";

                $query = "SELECT * FROM game order by navn";
                $stmt = $pdo->prepare($query);
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if (empty($result)) {
                    echo "<p>Ingen spill i databasen</p>";
                    return;
                }

                foreach ($result as $game) {
                    echo "<div class='spill-box'>";
                    echo "${game['navn']} <br>";
                    echo "<div class='center'>";
                    echo "<div class='img-box'>";
                    echo "<a href='../p5testspill/${game['spill_url']}'><img class='spill-img' src='images/spill_bilder/${game['bilde_url']}' alt='Game Image'></a>\n";
                    echo "</div>";
                    echo "</div>";
                    echo "<a href='../p5testspill/${game['spill_url']}' class='play_button'>Spill</a>";
                    echo "</div>";

                    echo "<br>";
                }
                ?>
            </div>
        </div>
    </div>


    <div class="center">
        <div id="leaderboard_title">
            <div class="center">
                <h1>LEADERBOARDS</h1>
            </div>
        </div>
    </div>

    <div class="center">

        <div id="leaderboard">
            <div class="center">

                Leaderboard for
                <?php
                echo "<select name='spill'>";

                require "includes/dbh.inc.php";

                $query = "SELECT id, navn FROM game";
                $stmt = $pdo->prepare($query);
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if (empty($result)) {
                    echo "<p>Ingen spill i databasen</p>";
                    return;
                }

                foreach ($result as $game) {
                    echo "    <option value='spill'>${game['navn']}</option>";
                }
                echo "</select>";




                echo "</div>";
                echo "<div class='rekorder'>";


                require "includes/dbh.inc.php";

                // gjøre dynamisk 
                $spill_id =  3;
                $query = "SELECT * FROM user_highscore inner join bruker on user_highscore.bruker_id = bruker.id and spill_id = :spill_id ORDER BY poeng desc limit 5";
                $stmt = $pdo->prepare($query);
                $stmt->bindParam(":spill_id", $spill_id);
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if (empty($result)) {
                    echo "<p>Ingen resultater for spill med id $spill_id i databasen</p>";
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
            </div>
        </div>
    </div>
</body>

</html>