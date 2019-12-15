<?php

include_once 'Service/Database.php';


abstract class Entity
{
    protected static $connection = null;

    public static abstract function get($params);

    public abstract function save();

    public static abstract function isExisted($entity);

    public static function checkConnection() {
        if (self::$connection == null) {
            self::$connection = Database::getConnection();
        }
    }
}