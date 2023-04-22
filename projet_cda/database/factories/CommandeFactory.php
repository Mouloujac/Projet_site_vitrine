<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Commande;
use App\Models\Panier;
use App\Models\User;

class CommandeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Commande::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'panier_id' => Panier::factory(),
            'user_id' => User::factory(),
            'statut' => $this->faker->boolean,
        ];
    }
}
