<?php

require_once("conn.php");

use ca\db;

$db = db::getInstance();
if($_POST['name']!="admin"){
    echo "用户被禁止上传。";
    exit() ;
}
$res = $db->login($_POST["name"], $_POST["password"]);
if ($res !== null) {
    $file = base64_decode(substr($_POST['file'], strpos($_POST['file'], "base64") + 7));
    file_put_contents("./uploads/" . $_POST['fileName'], $file, FILE_BINARY);
    echo "上传成功。";
}
