<?php

include_once 'Service/Router.php';
include_once 'Service/Utils.php';
include_once 'Controller/Authentication.php';

Router::add('/register', function() {
    try {
        $body = json_decode(file_get_contents('php://input'), true);
        cors();
        Authentication::register($body);
    } catch(Exception $e) {
        cors();
        http_response_code(400);
    }
}, 'post');
Router::add('/login' , function() {
    try {
        $body = json_decode(file_get_contents('php://input'), true);
        cors();
        Authentication::login($body);
    } catch(Exception $e) {
        cors();
        http_response_code(400);
    }
}, 'post');

Router::run('/');