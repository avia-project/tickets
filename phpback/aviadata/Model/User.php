<?php

include_once 'Service/Database.php';
include_once 'Model/Entity.php';


class User extends Entity
{

    private $username;

    private $password;

    private static $db_conn = null;

    public function __construct($username, $password) {

        $this->username = $username;
        $this->password = hash( 'ripemd160', $password);
    }

    public function setUsername($username) {
        $this->username = $username;
    }

    public function setPassword($password) {
        $this->password = hash( 'ripemd160', $password);
    }

    public function getUsername() {
        return $this->username;
    }

    public function getPassword() {
        return $this->password;
    }

    public static function get($params) {
        self::checkConnection();

        if (!empty($params['username'])) {
            $query = 'SELECT * FROM `users` WHERE username=:username';
            $statement = self::$connection->prepare($query);
            $statement->bindParam('username', $params['username']);
        }
        else if (!empty($params['id'])) {
            $query = 'SELECT * FROM `users` WHERE id=:id';
            $statement = self::$connection->prepare($query);
            $statement->bindParam('id', $params['id']);
        }
        else {
            return '';
        }

        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function save() {
        self::checkConnection();

        $statement = self::$connection->prepare('INSERT INTO `users` (`username`, `password`)' .
            'VALUES(:username, :password) ');
        $statement->bindParam('username', $this->username);
        $statement->bindParam('password', $this->password);
        $statement->execute();
    }

    public static function isExisted($user)
    {
        self::checkConnection();

        $statement = self::$connection->prepare('SELECT * FROM `users` WHERE username=:username' .
            ' AND password=:password');
        $statement->bindParam('username', $user->username);
        $statement->bindParam('password', $user->password);
        $statement->execute();

        if (count($statement->fetchAll(PDO::FETCH_ASSOC))) {
            return true;
        }
        else {
            return false;
        }
    }
}