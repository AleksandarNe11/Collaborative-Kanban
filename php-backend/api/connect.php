<?php

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'CP476login2022');
define('DB_NAME', 'kanban_db');

function connect() { 
    $connect = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if ($connect->connect_error) { 
        die("Failed to connect: " . $connect->connect_error);
    }

    // mysqli_set_charset($connect, "utf8");

    return $connect; 
}

$con = connect();

?>