<?php

include_once 'Service/Database.php';
include_once 'Model/User.php';
include_once 'Model/Ticket.php';
include_once 'Controller/TicketController.php';


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
            $result = ['tickets' => Ticket::get($user->getUsername())];
            $result += ['username' => $user->getUsername()];

            http_response_code(200);
            echo json_encode($result);
        }
        else {
            http_response_code(401);
        }
    }

}