<?php

namespace ca;

class db
{
    private $DB_HOST = "localhost";
    private $DB_USER = "root";
    private $DB_PASSWORD = "";
    private $DB_NAME = "test";
    private $DB_PORT = 3306;
    private $_db;

    private static $instance = null;


    private function __construct()
    {

        $this->_db = new \mysqli($this->DB_HOST, $this->DB_USER, $this->DB_PASSWORD, $this->DB_NAME, $this->DB_PORT);

        if ($this->_db->connect_error) {
            echo $this->_db->connect_error;
        }
    }


    private function __clone()
    {
        return false;
    }


    public static function getInstance()
    {

        if (!self::$instance instanceof self) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    public function signup($username, $password)
    {
        $password = md5($password . "ca");
        $sql = "INSERT catest (username,password) VALUES('$username','$password')";
        $res = $this->_db->query($sql);
        if (!$res) {
            echo $this->_db->error;
        }
    }

    public function login($username, $password)
    {
        $username = htmlspecialchars($username);
        $password = md5($password . "ca");
        $sql = "SELECT password FROM catest WHERE username='$username';";
        $res = $this->_db->query($sql);
        if (!$res) {
            echo $this->_db->error;
        } else {
            $row = $res->fetch_array();
            if ($row == null) {
                echo "No person.";
            } else {
                if ($row['password'] != $password) {
                    echo "Wrong password";
                } else {
                    return 0;
                }
            }
        }
    }
}
