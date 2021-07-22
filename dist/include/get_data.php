<?php
require 'connect.php';

//randomNumber
$randNum = mt_rand(1,845);

//get random word from db
try{
    $sql= "SELECT begriff FROM begriffe_en WHERE id = $randNum ";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

    //print_r($result[0]);
    // change array into string
    $word = implode(" ",$result[0]);
    
    
}
catch(PDOException $e){
    echo 'Error: ' . htmlspecialchars($e->getMessage());
}

echo json_encode($word); 
?>


