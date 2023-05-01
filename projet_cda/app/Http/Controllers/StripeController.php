<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Charge;

class StripeController extends Controller
{
    public function makePayment(Request $request)
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));

        $charge = Charge::create([
            'amount' => $request->input('amount'),
            'currency' => 'eur',
            'source' => $request->input('stripeToken'),
        ]);

        return response()->json([
            'message' => 'Payment processed successfully',
        ]);
    }
}
