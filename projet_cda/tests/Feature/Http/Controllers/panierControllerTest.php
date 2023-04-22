<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Panier;
use App\Models\Produit;
use App\Models\User;
use App\Models\panier;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\panierController
 */
class panierControllerTest extends TestCase
{
    use AdditionalAssertions, RefreshDatabase, WithFaker;

    /**
     * @test
     */
    public function index_displays_view(): void
    {
        $paniers = panier::factory()->count(3)->create();

        $response = $this->get(route('panier.index'));

        $response->assertOk();
        $response->assertViewIs('panier.index');
        $response->assertViewHas('paniers');
    }


    /**
     * @test
     */
    public function create_displays_view(): void
    {
        $response = $this->get(route('panier.create'));

        $response->assertOk();
        $response->assertViewIs('panier.create');
    }


    /**
     * @test
     */
    public function store_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\panierController::class,
            'store',
            \App\Http\Requests\panierStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves_and_redirects(): void
    {
        $produit = Produit::factory()->create();
        $user = User::factory()->create();
        $statut = $this->faker->boolean;

        $response = $this->post(route('panier.store'), [
            'produit_id' => $produit->id,
            'user_id' => $user->id,
            'statut' => $statut,
        ]);

        $paniers = Panier::query()
            ->where('produit_id', $produit->id)
            ->where('user_id', $user->id)
            ->where('statut', $statut)
            ->get();
        $this->assertCount(1, $paniers);
        $panier = $paniers->first();

        $response->assertRedirect(route('panier.index'));
        $response->assertSessionHas('panier.id', $panier->id);
    }


    /**
     * @test
     */
    public function show_displays_view(): void
    {
        $panier = panier::factory()->create();

        $response = $this->get(route('panier.show', $panier));

        $response->assertOk();
        $response->assertViewIs('panier.show');
        $response->assertViewHas('panier');
    }


    /**
     * @test
     */
    public function edit_displays_view(): void
    {
        $panier = panier::factory()->create();

        $response = $this->get(route('panier.edit', $panier));

        $response->assertOk();
        $response->assertViewIs('panier.edit');
        $response->assertViewHas('panier');
    }


    /**
     * @test
     */
    public function update_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\panierController::class,
            'update',
            \App\Http\Requests\panierUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_redirects(): void
    {
        $panier = panier::factory()->create();
        $produit = Produit::factory()->create();
        $user = User::factory()->create();
        $statut = $this->faker->boolean;

        $response = $this->put(route('panier.update', $panier), [
            'produit_id' => $produit->id,
            'user_id' => $user->id,
            'statut' => $statut,
        ]);

        $panier->refresh();

        $response->assertRedirect(route('panier.index'));
        $response->assertSessionHas('panier.id', $panier->id);

        $this->assertEquals($produit->id, $panier->produit_id);
        $this->assertEquals($user->id, $panier->user_id);
        $this->assertEquals($statut, $panier->statut);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_redirects(): void
    {
        $panier = panier::factory()->create();
        $panier = Panier::factory()->create();

        $response = $this->delete(route('panier.destroy', $panier));

        $response->assertRedirect(route('panier.index'));

        $this->assertModelMissing($panier);
    }
}
