<?php
require_once("conn.php");
use ca\db;

$db = db::getInstance();
$db->login($_POST["name"], $_POST["password"]);
