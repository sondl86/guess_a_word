<?php
//randomNumber
$randNum = mt_rand(1,845);
echo($randNum);

//get random word from db
try{
    $sql= "SELECT begriff FROM begriffe_en WHERE id = $randNum ";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);

    //print_r($result[0]);
    // change array into string
    $word = implode(" ",$result[0]);
    echo($word);
    
}
catch(PDOException $e){
    echo 'Error: ' . htmlspecialchars($e->getMessage());
}



?>


<script>
    

    const newWord = '<?=$word?>';
    console.log(newWord);
</script>