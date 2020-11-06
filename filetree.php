<?php
$filetree=scandir('./uploads/');
array_shift($filetree);
array_shift($filetree);
echo json_encode($filetree);