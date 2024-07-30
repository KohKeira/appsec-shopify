<?php

namespace App\Policies;

use App\Models\Delivery;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class DeliveryPolicy
{
    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Delivery $delivery)
    {
        return $user->id === $delivery->user_id ? Response::allow() : Response::denyAsNotFound();
    }

    public function view(User $user, Delivery $delivery)
    {
        return $user->id === $delivery->user_id ? Response::allow() : Response::denyAsNotFound();

    }

}
