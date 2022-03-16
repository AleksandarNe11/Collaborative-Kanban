<?php

require 'connect.php'; 

define('CARD_ID', "CardID");
define('BOARD_ID', 'BoardID');
define('TITLE', 'Title');
define('COLUMN_NAME', 'ColoumnName');

$cards = []; 

// $sql = "SELECT " . CARD_ID . ", " . BOARD_ID . "FROM CARDS"; 
$sql = "SELECT * FROM CARDS";

if($result = mysqli_query($con, $sql)) { 
    $cr = 0; 
    while($row = mysqli_fetch_assoc($result))
    { 
        $cards[$cr][CARD_ID] = $row[CARD_ID];
        $cards[$cr][BOARD_ID] = $row[BOARD_ID];
        $cards[$cr][TITLE] = $row[TITLE];
        $cards[$cr][COLUMN_NAME] = $row[COLUMN_NAME];

        $cr++;
    }
    echo json_encode(['data' => $cards]);
} else { 
    http_response_code(404);
}

?>