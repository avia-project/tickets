<?php

include_once 'Service/Database.php';
include_once 'Service/Router.php';
include_once  'Service/Utils.php';


function register($body) {
    $con = Database::getConnection();

    $statement = $con->prepare(
        'SELECT * FROM `users` WHERE username=:username'
    );
    $statement->bindParam('username', $body['username']);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);

    if (!count($result)) {
        $statement = $con->prepare(
            'INSERT INTO `users` (`username`, `password`)' .
            'VALUES(:username, :password) ');
        $statement->bindParam('username', $body['username']);
        $statement->bindParam('password', $body['password']);
        $statement->execute();
        http_response_code(200);
        echo json_encode(['username' => $body['username']]);
    }
    else {
        http_response_code(401);
    }
}

function login($body) {
    $con = Database::getConnection();
    $statement = $con->prepare(
        'SELECT * FROM `users` WHERE username=:username AND password=:password'
    );
    $statement->bindParam('username', $body['username']);
    $statement->bindParam('password', $body['password']);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    if (count($result)) {
        http_response_code(200);$body['password'] = hash( 'ripemd160', $body["password"]);
        echo json_encode(['username' => $body['username']]);
    }
    else {
        http_response_code(401);
    }
}

Router::add('/register', function() {
    try {
        $body = json_decode(file_get_contents('php://input'), true);
        $body['password'] = hash( 'ripemd160', $body["password"]);

        cors();
        register($body);
    } catch(Exception $e) {
        cors();
        http_response_code(400);
    }
}, 'post');



Router::add('/login' , function() {
    try {
        $body = json_decode(file_get_contents('php://input'), true);
       /* $body = [
            "username" => $_GET["username"],
            "password" => hash( 'ripemd160',$_GET["password"])
        ];*/
        $body['password'] = hash( 'ripemd160', $body["password"]);
        cors();
        login($body);
    } catch(Exception $e) {
        cors();
        http_response_code(400);
    }
}, 'post');

try {
    Router::run('/');
} catch(Exception $e) {
    var_dump($e);
}