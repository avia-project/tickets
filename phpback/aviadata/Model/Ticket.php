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

    public function setPrice($price) {
        $this->price = $price;
    }

    public function getPrice() {
        return $this->price;
    }

    public function setCurrency($currency) {
        $this->currency = $currency;
    }

    public function getCurrency() {
        return $this->currency;
    }

    public function setTransfers($transfers) {
        $this->transfers = $transfers;
    }

    public function getTransfers() {
        return $this->transfers;
    }

    public function setUser($user) {
        $this->user = $user;
    }

    public function getUser() {
        return $this->user;
    }

    public function setQuantity($quantity) {
        $this->quantity = $quantity;
    }

    public function getQuantity() {
        return $this->quantity;
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
            'AND user=:user ');
        $statement->bindParam('airline',        $entity->airline);
        $statement->bindParam('origin',         $entity->origin);
        $statement->bindParam('destination',    $entity->destination);
        $statement->bindParam('departureDate',  $entity->departureDate);
        $statement->bindParam('price',          $entity->price);
        $statement->bindParam('transfers',      $entity->transfers);
        $statement->bindParam('user',           $entity->user);

        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        echo "Check for existing.";

        if (count($result)) {
            echo "Ticket existed";
            $entity->setQuantity($result[0]['quantity']);
            echo "id = " . $result[0]['id'];
            return $result[0]['id'];
        }
        else {
            return 0;
        }
    }

    public function addOne($sameTicketId) {
        self::checkConnection();

        $this->quantity++;

        $statement = self::$connection->prepare('UPDATE `tickets` ' .
                            'SET quantity=:quantity WHERE id=:id ');
        $statement->bindParam('quantity', $this->quantity);
        $statement->bindParam('id', $sameTicketId);

        $statement->execute();
    }
}