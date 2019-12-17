<?php

include_once 'Model/Ticket.php';

class TicketController
{
    public static function add($ticketData) {
        $ticket = new Ticket($ticketData);

        $sameTicketId = Ticket::isExisted($ticket);

        if ($sameTicketId == 0) {
            $ticket->save();
        }
        else {
            $ticket->addOne($sameTicketId);
        }

        http_response_code(200);
    }
}