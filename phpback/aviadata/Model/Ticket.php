<?php

include_once 'Model/Entity.php';
include_once 'Model/User.php';

class Ticket extends Entity
{
    private $airline;

    private $origin;

    private $destination;

    private $departureDate;

    private $price;

    private $currency;

    private $transfers;

    private $user;

    private $quantity;

    public function __construct($params) {
        $this->airline       = $params['airline_name'];
        $this->origin        = $params['origin_name'];
        $this->destination   = $params['destination_name'];
        $this->departureDate = $params['departure_at'];
        $this->price         = $params['price'];
        $this->currency      = $params['currency'];
        $this->transfers     = $params['transfers'];
        $this->user          = $params['username'];

        if (!empty($params['quantity'])) {
            $this->quantity = $params['quantity'];
        }
        else {
            $this->quantity = 1;
        }
    }

    public static function get($username) {
        self::checkConnection();

        $statement = self::$connection->prepare('SELECT * FROM `tickets`' .
                        'WHERE user=:user');
        $statement->bindParam('user', $username);
        $statement->execute();

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function save() {
        self::checkConnection();

        $statement = self::$connection->prepare('INSERT INTO `tickets`' .
            '(`airline`, `origin`, `destination`, `departure_date`, `price`, `transfers`, `user`, `quantity`, `currency`)' .
            'VALUES(:airline, :origin, :destination, :departureDate, :price, :transfers, :user, :quantity, :currency) ');
        $statement->bindParam('airline',        $this->airline);
        $statement->bindParam('origin',         $this->origin);
        $statement->bindParam('destination',    $this->destination);
        $statement->bindParam('departureDate',  $this->departureDate);
        $statement->bindParam('price',          $this->price);
        $statement->bindParam('transfers',      $this->transfers);
        $statement->bindParam('user',           $this->user);
        $statement->bindParam('quantity',       $this->quantity);
        $statement->bindParam('currency',       $this->currency);

        $statement->execute();
    }

    public static function isExisted($entity) {
        self::checkConnection();

        $statement = self::$connection->prepare('SELECT * FROM `tickets` ' .
            'WHERE airline=:airline AND origin=:origin AND destination=:destination ' .
            'AND departure_date=:departureDate AND price=:price AND transfers=:transfers ' .
            'AND user=:user AND quantity=:quantity AND currency=:currency');
        $statement->bindParam('airline',        $entity->airline);
        $statement->bindParam('origin',         $entity->origin);
        $statement->bindParam('destination',    $entity->destination);
        $statement->bindParam('departureDate',  $entity->departureDate);
        $statement->bindParam('price',          $entity->price);
        $statement->bindParam('transfers',      $entity->transfers);
        $statement->bindParam('user',           $entity->user);
        $statement->bindParam('quantity',       $entity->quantity);
        $statement->bindParam('currency',       $entity->currency);

        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        if (count($result)) {
            return $result['id'];
        }
        else {
            return 0;
        }
    }

    public function addOne() {
        self::checkConnection();

        $id = self::isExisted($this); // get current object id
        $this->quantity++;

        $statement = self::$connection->prepare('UPDATE `tickets` ' .
                            'SET quantity=:quantity WHERE id=:id ');
        $statement->bindParam('quantity', $this->quantity);
        $statement->bindParam('id', $id);

        $statement->execute();
    }
}