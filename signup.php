<?php
require_once("conn.php");
use ca\db;

$db = db::getInstance();
$db->signup($_POST["name"], $_POST["password"]);
