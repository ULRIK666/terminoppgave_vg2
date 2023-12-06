<?php
session_start();
    $_SESSION['bruker_id'] = 0;
    header("location: ../index.php");
?>