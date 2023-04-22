<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Produit;
use App\Models\Taille;
use App\Models\Type;

class ProduitFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Produit::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'nom' => $this->faker->regexify('[A-Za-z0-9]{300}'),
            'description' => $this->faker->text,
            'image' => $this->faker->text,
            'prix' => $this->faker->numberBetween(-10000, 10000),
            'stock' => $this->faker->boolean,
            'type_id' => Type::factory(),
            'taille_id' => Taille::factory(),
        ];
    }
}
