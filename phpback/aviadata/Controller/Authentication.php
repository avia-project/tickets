<?php

include_once 'Service/Database.php';
include_once 'Model/User.php';


class Authentication
{
    public static function register($body) {
        $statement = ['username' => $body['username']];

        $existed = User::get($statement);
        if (!count($existed)) {
            $user = new User($body['username'], $body['password']);
            $user->save();

            http_response_code(200);
            echo json_encode(['username' => $user->getUsername()]);
        }
        else {
            http_response_code(401);
        }
    }

    public static function login($body) {
        $user = new User($body['username'], $body['password']);
        if (User::isExisted($user)) {
            http_response_code(200);
            echo json_encode(['username' => $user->getUsername()]);
        }
        else {
            http_response_code(401);
        }
    }

}