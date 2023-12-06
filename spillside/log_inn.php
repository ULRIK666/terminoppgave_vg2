<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/6.8.1/css/foundation.min.css"
        integrity="sha512-QuI0HElOtzmj6o/bXQ52phfzjVFRAhtxy2jTqsp85mdl1yvbSQW0Hf7TVCfvzFjDgTrZostqgM5+Wmb/NmqOLQ=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="css/logg_inn.css">
    <link rel="stylesheet" href="css/style.css">
    <title>Loginn</title>
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
            <div class="icon"><a href="log_inn.php"><img class="maxwidth" src="images/logginicon.png"></a>
                <b>
                    <?php
                    session_start();

                    $id = $_SESSION["bruker_id"];

                    if ($id == 0) {
                        $melding = "Ikke logget inn";


                    } else {


                        try {
                            require_once "includes/dbh.inc.php";



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
                </b>
            </div>

        </div>


    </div>
    <div class="center">
        <a href="index.php">Tilbake til spill</a>
    </div>

    <div class="center">
        <div class="box">
            <div class="innhold_plassering">

                <h3>Login</h3>

                <form action="includes/loginhandler.inc.php" method="POST">
                    <input class="input_width" type="text" name="brukernavn" placeholder="Username" requierd>
                    <input class="input_width" type="password" name="passord" placeholder="Password" requiered>
                    <button class="button">Login</button> <br>
                    <a href="signup.php">Har ikke bruker? <br> Signup</a>
                </form>
            </div>
        </div>
    </div>


</body>

</html>