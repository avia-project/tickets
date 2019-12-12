<?php
//include_once '\lib\Route.php';
//include_once 'db/config.php';
//include_once 'db/db.php';

const host = 'localhost';
const db_name = 'avia';
const username = 'root';
const password = 'rootroot';

class Database {
    private $con;
    private static $instance;
    private function __construct(){
        $this->connect();
    }

    public static function getConnection() {
        if (empty(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance->con;
    }

    private function connect() {
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

class Route{

    private static $routes = Array();
    private static $pathNotFound = null;
    private static $methodNotAllowed = null;

    public static function add($expression, $function, $method = 'get'){
        array_push(self::$routes,Array(
            'expression' => $expression,
            'function' => $function,
            'method' => $method
        ));
    }

    public static function pathNotFound($function){
        self::$pathNotFound = $function;
    }

    public static function methodNotAllowed($function){
        self::$methodNotAllowed = $function;
    }

    public static function run($basepath){
        $parsed_url = parse_url($_SERVER['REQUEST_URI']);

        if(isset($parsed_url['path'])){
            $path = $parsed_url['path'];
        }else{
            $path = '/';
        }

        $method = $_SERVER['REQUEST_METHOD'];

        $path_match_found = false;

        $route_match_found = false;

        foreach(self::$routes as $route) {
            if($basepath!=''&&$basepath!='/'){
                $route['expression'] = '('.$basepath.')'.$route['expression'];
            }

            $route['expression'] = '^'.$route['expression'];

            $route['expression'] = $route['expression'].'$';


            if(preg_match('#'.$route['expression'].'#',$path,$matches)){

                $path_match_found = true;

                if(strtolower($method) == strtolower($route['method'])){

                    array_shift($matches);

                    if($basepath!=''&&$basepath!='/'){
                        array_shift($matches);
                    }

                    call_user_func_array($route['function'], $matches);
                    cors();

                    $route_match_found = true;

                    break;
                }
            }
        }

        if(!$route_match_found){

            if($path_match_found){
                header("HTTP/1.0 405 Method Not Allowed");
                if(self::$methodNotAllowed){
                    call_user_func_array(self::$methodNotAllowed, Array($path,$method));
                }
            }else{
                header("HTTP/1.0 404 Not Found");
                if(self::$pathNotFound){
                    call_user_func_array(self::$pathNotFound, Array($path));
                }
            }

        }

    }

}


function cors() {

    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    
    }

    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

        exit(0);
    }
}


function register($body) {
    $con = Database::getConnection();
    $statement = $con->prepare(
        'INSERT INTO `users` (`username`, `password`)' .
        'VALUES(:username, :password) ');
    $statement->bindParam('username', $body['username']);
    $statement->bindParam('password', $body['password']);
    $statement->execute();
    http_response_code(200);
    echo json_encode(['username' => $body['username']]);
}

function login($body) {
    $con = Database::getConnection();
    $username = $body['username'];
    $password = $body['password'];
    ///////////////////////////////////////ERROR HERE////////////////////////////////
    $statement = $con->prepare(
        'SELECT * FROM `users` WHERE username=:username AND password=:password'
    );
    $statement->bindParam('username', $body['username']);
    $statement->bindParam('password', $body['password']);
    $statement->execute();
    $result = $statement->fetchAll(PDO::FETCH_ASSOC);
    if (count($result)) {
        http_response_code(200);
        echo json_encode(['username' => $body['username']]);
    }
    else {
        http_response_code(401);
    }
}

Route::add('/register', function() {
    try {
      //  $body = json_decode(file_get_contents('php://input'), true);
        $body = [
          "username" => $_GET["username"],
          "password" => $_GET["password"]
        ];
        cors();
        register($body);
    } catch(Exception $e) {
        cors();
        http_response_code(400);
    }
    cors();
}, 'get');



Route::add('/login' , function() {
    try {
        //$body = json_decode(file_get_contents('php://input'), true);
        $body = [
            "username" => $_GET["username"],
            "password" => $_GET["password"]
        ];
        cors();
        login($body);
    } catch(Exception $e) {
        cors();
        http_response_code(400);
    }
   // cors();*/

}, 'get');

try {
    //echo(Route);
    Route::run('/');
} catch(Exception $e) {
    var_dump($e);
}