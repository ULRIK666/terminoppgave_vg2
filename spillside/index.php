<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Spillside</title>
    <script>
        function update_leaderboard() {
            let select_option = document.getElementById("spill");
            let spill_id = select_option.options[select_option.selectedIndex].value;
            let url = "show_leaderboard_content.php?spill_id=" + spill_id;

            fetch(url)
                .then(response => {
                    // finner ut om svaret hvar suksess 
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    
                    return response.text();
                })
                .then(data => {
                    // oppdaterer innholde fra hentet data
                    document.getElementById('leaderboard_table').innerHTML = data;
                })
                .catch(error => {
                    // henter error data
                    console.error('Error fetching data:', error);
                });
        }
    </script>

    </body>

</html>


</script>
</head>

<body>
    <div class="header">
        <div class="logo-container">
            <div id="logo"><a href="index.php"><img class="maxwidth" src="images/alien_logo.png" alt="logo"></a></div>
        </div>
        <div class="center" id="tittel-container">
            <h1 id="spillside_navn">StarStruckArcade</h1>
        </div>
        <div class="icons-container">
            <div class="icon"><a href="settings.php"><img class="maxwidth" src="images/settings.png" alt="innstillinger ikon"></a><b></b></div>
            <div class="icon"><a href="log_inn.php"><img class="maxwidth" src="images/logginicon.png" alt="logg in ikon"></a><b>

                    <?php
                    // den følgende koden vil skrive ut om du er logget in eller ikke og hvem du er logget inn som

                    session_start();
                    if (isset($_SESSION["bruker_id"])) {
                        $id = $_SESSION["bruker_id"];
                    } else {
                        //id = 0 betyr ikke logget inn
                        $id = 0;
                    }

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

                            // hvis den ikke finner id-en i queryen skriver den ut meldingen under
                            // hvis ikke vil den skrive ut hvem som er logget in og lenke for å logge ut
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

                // hvis queryen ikke finner noen spill i databasen skriver den ut det under 
                if (empty($result)) {
                    echo "<p>Ingen spill i databasen</p>";
                    return;
                }

                // skriver ut spill boksene ut ifra informasjon fra databasen
                foreach ($result as $game) {
                    echo "<div class='spill-box'>";
                    echo "${game['navn']} <br>";
                    echo "<div class='center'>";
                    echo "<div class='img-box'>";
                    echo "<a href='../p5testspill/${game['spill_url']}'><img class='spill-img' src='images/spill_bilder/${game['bilde_url']}' alt='Game Image'></a>\n";
                    echo "</div>";
                    echo "</div>";
                    echo "<a href='../p5testspill/${game['spill_url']}' class='play_button' alt='spill knapp'>Spill</a>";
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
                
                // tenker å lage en select som gjør at man kan velge leaderboard for ett spill av gangen
                echo "<select name='spill' id = 'spill' onchange='update_leaderboard()'>";

                require "includes/dbh.inc.php";

                // vil hente spill som faktisk har highscore og sorterer dem alfabetisk. ikke alle spill kan ha highscore 
                $query ="SELECT DISTINCT spill_id, navn from user_highscore inner join game on user_highscore.spill_id = game.id order by game.navn";
                $stmt = $pdo->prepare($query);
                $stmt->execute();
                $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

                if (empty($result)) {
                    echo "<p>Ingen spill i databasen</p>";
                    return;
                }

                // lager option for hvert av spillene vi fant
                foreach ($result as $game) {
                    echo "    <option value='${game['spill_id']}'>${game['navn']}</option>";
                }
                echo "</select>";




                echo "</div>";
                echo "<div class='rekorder' id='leaderboard_table'>";

                echo "</div>"
                    ?>
            </div>
        </div>
    </div>
</body>

</html>