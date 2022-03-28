
<?php

// call the connect file
require 'connect.php'; 

define('CARD_ID', "CardID");
define('BOARD_ID', 'BoardID');
define('TITLE', 'Title');
define('COLUMN_NAME', 'ColumnName');

// Get the posted data.
$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){

    // Extract the data.
    $request = json_decode($postdata);   

    $cards = []; 
    // -------------- SQL Prepared Statements --------------

    $sqlSelect = $con->prepare("SELECT * FROM CARDS WHERE BoardID = ?");
    $sqlSelect->bind_param("i", $request->{"data"});
    
    // -------------- SQL Prepared Statements --------------

    if($sqlSelect->execute()){

        if($result = $sqlSelect->get_result()) { 

            http_response_code(201);

            $cr = 0;

            // loop through the data selected from the datebase
            // and add it to the list that get returned
            while($row = mysqli_fetch_assoc($result)){

                $cards[$cr][CARD_ID] = $row[CARD_ID];
                $cards[$cr][BOARD_ID] = $row[BOARD_ID];
                $cards[$cr][TITLE] = $row[TITLE];
                $cards[$cr][COLUMN_NAME] = $row[COLUMN_NAME];

                $cr++;
            }

            // return data
            echo json_encode(['data' => $cards]);
        } else { 
            http_response_code(404);
        }

    }
}

?>




