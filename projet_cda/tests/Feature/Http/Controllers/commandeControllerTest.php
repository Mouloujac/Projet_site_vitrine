<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Commande;
use App\Models\Panier;
use App\Models\User;
use App\Models\commande;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\commandeController
 */
class commandeControllerTest extends TestCase
{
    use AdditionalAssertions, RefreshDatabase, WithFaker;

    /**
     * @test
     */
    public function index_displays_view(): void
    {
        $commandes = commande::factory()->count(3)->create();

        $response = $this->get(route('commande.index'));

        $response->assertOk();
        $response->assertViewIs('commande.index');
        $response->assertViewHas('commandes');
    }


    /**
     * @test
     */
    public function create_displays_view(): void
    {
        $response = $this->get(route('commande.create'));

        $response->assertOk();
        $response->assertViewIs('commande.create');
    }


    /**
     * @test
     */
    public function store_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\commandeController::class,
            'store',
            \App\Http\Requests\commandeStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves_and_redirects(): void
    {
        $panier = Panier::factory()->create();
        $user = User::factory()->create();
        $statut = $this->faker->boolean;

        $response = $this->post(route('commande.store'), [
            'panier_id' => $panier->id,
            'user_id' => $user->id,
            'statut' => $statut,
        ]);

        $commandes = Commande::query()
            ->where('panier_id', $panier->id)
            ->where('user_id', $user->id)
            ->where('statut', $statut)
            ->get();
        $this->assertCount(1, $commandes);
        $commande = $commandes->first();

        $response->assertRedirect(route('commande.index'));
        $response->assertSessionHas('commande.id', $commande->id);
    }


    /**
     * @test
     */
    public function show_displays_view(): void
    {
        $commande = commande::factory()->create();

        $response = $this->get(route('commande.show', $commande));

        $response->assertOk();
        $response->assertViewIs('commande.show');
        $response->assertViewHas('commande');
    }


    /**
     * @test
     */
    public function edit_displays_view(): void
    {
        $commande = commande::factory()->create();

        $response = $this->get(route('commande.edit', $commande));

        $response->assertOk();
        $response->assertViewIs('commande.edit');
        $response->assertViewHas('commande');
    }


    /**
     * @test
     */
    public function update_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\commandeController::class,
            'update',
            \App\Http\Requests\commandeUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_redirects(): void
    {
        $commande = commande::factory()->create();
        $panier = Panier::factory()->create();
        $user = User::factory()->create();
        $statut = $this->faker->boolean;

        $response = $this->put(route('commande.update', $commande), [
            'panier_id' => $panier->id,
            'user_id' => $user->id,
            'statut' => $statut,
        ]);

        $commande->refresh();

        $response->assertRedirect(route('commande.index'));
        $response->assertSessionHas('commande.id', $commande->id);

        $this->assertEquals($panier->id, $commande->panier_id);
        $this->assertEquals($user->id, $commande->user_id);
        $this->assertEquals($statut, $commande->statut);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_redirects(): void
    {
        $commande = commande::factory()->create();
        $commande = Commande::factory()->create();

        $response = $this->delete(route('commande.destroy', $commande));

        $response->assertRedirect(route('commande.index'));

        $this->assertModelMissing($commande);
    }
}
