<?php

include_once 'Service/Config.php';


class Database
{
    private static $connection = null;

    public static function getConnection() {
        if (self::$connection == null) {
            try {
                self::$connection = new PDO(db_type .':/host=' . host . ';dbname=' . db_name,
                    username,
                    password);
                self::$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            } catch (PDOException $e) {
                echo "Connection failed: " . $e->getMessage();
            }
        }
        return self::$connection;
    }
}