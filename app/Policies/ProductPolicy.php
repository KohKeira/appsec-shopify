<?php

namespace App\Policies;

use App\Models\Product;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ProductPolicy
{



    public function update(User $user, Product $product)
    {
        return $user->id === $product->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }


    public function delete(User $user, Product $product)
    {
        return $user->id === $product->user_id
            ? Response::allow()
            : Response::denyAsNotFound();
    }


}
