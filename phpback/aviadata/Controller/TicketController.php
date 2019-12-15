<?php

include_once 'Model/Ticket.php';

class TicketController
{
    public static function add($ticketData) {
        $ticket = new Ticket($ticketData);

        if (Ticket::isExisted($ticket) == 0) {
            $ticket->save();
        }
        else {
            $ticket->addOne();
        }

        http_response_code(200);
    }
}