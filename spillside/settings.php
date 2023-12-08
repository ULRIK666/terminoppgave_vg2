<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/style.css">
    <title>Settings</title>
</head>

<body>
    <div class="header">
        <div class="logo-container">
            <div id="logo"><a href="index.php"><img class="maxwidth" src="images/alien_logo.png" alt=""></a></div>
        </div>
        <div class="center" id="tittel-container">
            <h1 id="spillside_navn">StarStruckArcade</h1>
        </div>
        <div class="icons-container">
            <div class="icon"><a href="settings.php"><img class="maxwidth" src="images/settings.png"></a><b></b></div>
            <div class="icon"><a href="log_inn.php"><img class="maxwidth" src="images/logginicon.png"></a><b></b></div>
        </div>

    </div>

    <div class="center">
        <a href="index.php">Tilbake til spill</a>
    </div>
    <div class="center">
        <div class="container">
            <h2>Settings:</h2>
            <?php
            echo "<p class='settings_overskrift'>Darkmode</p>";
            echo "Lightmode: <img width='50px' src='images/on.png' alt='på knapp'>Darkmode";
            echo "<p class='settings_overskrift'>Volum: </p>";
            ?>
            <!-- dette er bare et eksempel og jeg har ikke laget denne følgene koden selv -->
            <!-- eksempel på hvordan lyden vill ha sett ut hvis jeg hadde mere tid -->
            <div id="soundAdjuster">
                <div id="soundDot"></div>
            </div>

            <div id="soundPercentage">Sound: <span id="percentageValue">0%</span></div>

            <script>
                document.addEventListener('DOMContentLoaded', function () {
                    const soundAdjuster = document.getElementById('soundAdjuster');
                    const soundDot = document.getElementById('soundDot');
                    const percentageValue = document.getElementById('percentageValue');

                    let isDragging = false;

                    soundDot.addEventListener('mousedown', function (e) {
                        isDragging = true;
                        adjustSound(e);
                    });

                    document.addEventListener('mousemove', function (e) {
                        if (isDragging) {
                            adjustSound(e);
                        }
                    });

                    document.addEventListener('mouseup', function () {
                        isDragging = false;
                    });

                    function adjustSound(e) {
                        const rect = soundAdjuster.getBoundingClientRect();
                        let x = e.clientX - rect.left;

                        x = Math.max(0, Math.min(x, soundAdjuster.offsetWidth));

                        soundDot.style.left = x - soundDot.offsetWidth / 2 + 'px';

                        const percentage = (x / soundAdjuster.offsetWidth) * 100;

                        //  skriver ut prosent og runder til en desimal
                        percentageValue.textContent = percentage.toFixed(1) + '%';
                        console.log('Sound Adjusted:', percentage.toFixed(1) + '%');
                    }
                });
            </script>


            <!-- <?php

            echo "<p class='settings_overskrift'>Spill kontrollere: </p>";
            echo "<br>";
            echo "<p class='settings_overskrift'>Dodge Red</p>";
            echo "<p>Opp: pil opp</p>";
            echo "<p>Ned: pil ned</p>";
            echo "<p>Høyere: pil høyere</p>";
            echo "<p>Venstre: pil venstre</p>";
            echo "<br>";

            echo "<p class='settings_overskrift'>Kengeru hopp</p>";
            echo "<p>Hopping: mellomrom</p>";
            echo "<br>";

            echo "<p class='settings_overskrift'>Flipperspill</p>";
            echo "<p>Høyere flipp: pil høyere</p>";
            echo "<p>Venstre flipp: pil venstre</p>";
            echo "<br>";

            echo "<p class='settings_overskrift'>Grabb'm all</p>";
            echo "<p>Gå mot høyere: pil høyere</p>";
            echo "<p>Gå mot venstre: pil venstre</p>";
            echo "<p>Dash/gå fortere: shift</p>";
            echo "<br>";

            echo "<p class='settings_overskrift'>Aim trainer</p>";
            echo "<p>Sikting: bevegelse av mus</p>";
            echo "<p>Skyting: left klikk</p>";
            echo "<br>";

            echo "<p class='settings_overskrift'>Flipperspill</p>";
            echo "<p>Hopping: mellomrom</p>";
            echo "<p>Hopping: mellomrom</p>";
            echo "<br>";
            ?> -->

</div>
    </div>
</body>

</html>