<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Panier;
use App\Models\Produit;
use App\Models\User;

class PanierFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Panier::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'produit_id' => Produit::factory(),
            'user_id' => User::factory(),
            'statut' => $this->faker->boolean,
        ];
    }
}
