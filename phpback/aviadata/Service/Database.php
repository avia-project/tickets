<?php

include_once 'Service/Config.php';


class Database
{
    private $con;
    private static $instance;
    private function __construct(){
        $this->сonnect();
    }

    public static function getConnection() {
        if (empty(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance->con;
    }

    private function сonnect() {
        try {
            $this->con = new PDO('mysql:/host=' . host . ';dbname=' . db_name, username, password );
            $this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    private function __clone()
    {
        throw new Exception();
    }
}