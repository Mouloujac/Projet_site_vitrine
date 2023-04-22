<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Produit;
use App\Models\Taille;
use App\Models\Type;
use App\Models\produit;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\produitController
 */
class produitControllerTest extends TestCase
{
    use AdditionalAssertions, RefreshDatabase, WithFaker;

    /**
     * @test
     */
    public function index_displays_view(): void
    {
        $produits = produit::factory()->count(3)->create();

        $response = $this->get(route('produit.index'));

        $response->assertOk();
        $response->assertViewIs('produit.index');
        $response->assertViewHas('produits');
    }


    /**
     * @test
     */
    public function create_displays_view(): void
    {
        $response = $this->get(route('produit.create'));

        $response->assertOk();
        $response->assertViewIs('produit.create');
    }


    /**
     * @test
     */
    public function store_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\produitController::class,
            'store',
            \App\Http\Requests\produitStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves_and_redirects(): void
    {
        $nom = $this->faker->word;
        $description = $this->faker->text;
        $image = $this->faker->text;
        $prix = $this->faker->numberBetween(-10000, 10000);
        $stock = $this->faker->boolean;
        $type = Type::factory()->create();
        $taille = Taille::factory()->create();

        $response = $this->post(route('produit.store'), [
            'nom' => $nom,
            'description' => $description,
            'image' => $image,
            'prix' => $prix,
            'stock' => $stock,
            'type_id' => $type->id,
            'taille_id' => $taille->id,
        ]);

        $produits = Produit::query()
            ->where('nom', $nom)
            ->where('description', $description)
            ->where('image', $image)
            ->where('prix', $prix)
            ->where('stock', $stock)
            ->where('type_id', $type->id)
            ->where('taille_id', $taille->id)
            ->get();
        $this->assertCount(1, $produits);
        $produit = $produits->first();

        $response->assertRedirect(route('produit.index'));
        $response->assertSessionHas('produit.id', $produit->id);
    }


    /**
     * @test
     */
    public function show_displays_view(): void
    {
        $produit = produit::factory()->create();

        $response = $this->get(route('produit.show', $produit));

        $response->assertOk();
        $response->assertViewIs('produit.show');
        $response->assertViewHas('produit');
    }


    /**
     * @test
     */
    public function edit_displays_view(): void
    {
        $produit = produit::factory()->create();

        $response = $this->get(route('produit.edit', $produit));

        $response->assertOk();
        $response->assertViewIs('produit.edit');
        $response->assertViewHas('produit');
    }


    /**
     * @test
     */
    public function update_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\produitController::class,
            'update',
            \App\Http\Requests\produitUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_redirects(): void
    {
        $produit = produit::factory()->create();
        $nom = $this->faker->word;
        $description = $this->faker->text;
        $image = $this->faker->text;
        $prix = $this->faker->numberBetween(-10000, 10000);
        $stock = $this->faker->boolean;
        $type = Type::factory()->create();
        $taille = Taille::factory()->create();

        $response = $this->put(route('produit.update', $produit), [
            'nom' => $nom,
            'description' => $description,
            'image' => $image,
            'prix' => $prix,
            'stock' => $stock,
            'type_id' => $type->id,
            'taille_id' => $taille->id,
        ]);

        $produit->refresh();

        $response->assertRedirect(route('produit.index'));
        $response->assertSessionHas('produit.id', $produit->id);

        $this->assertEquals($nom, $produit->nom);
        $this->assertEquals($description, $produit->description);
        $this->assertEquals($image, $produit->image);
        $this->assertEquals($prix, $produit->prix);
        $this->assertEquals($stock, $produit->stock);
        $this->assertEquals($type->id, $produit->type_id);
        $this->assertEquals($taille->id, $produit->taille_id);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_redirects(): void
    {
        $produit = produit::factory()->create();
        $produit = Produit::factory()->create();

        $response = $this->delete(route('produit.destroy', $produit));

        $response->assertRedirect(route('produit.index'));

        $this->assertModelMissing($produit);
    }
}
