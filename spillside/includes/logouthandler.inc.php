<?php
//logger ut bruker ved å sette bruker_id til null
session_start();
    $_SESSION['bruker_id'] = 0;
    header("location: ../index.php");
?>