<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Taille;
use App\Models\taille;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\tailleController
 */
class tailleControllerTest extends TestCase
{
    use AdditionalAssertions, RefreshDatabase, WithFaker;

    /**
     * @test
     */
    public function index_displays_view(): void
    {
        $tailles = taille::factory()->count(3)->create();

        $response = $this->get(route('taille.index'));

        $response->assertOk();
        $response->assertViewIs('taille.index');
        $response->assertViewHas('tailles');
    }


    /**
     * @test
     */
    public function create_displays_view(): void
    {
        $response = $this->get(route('taille.create'));

        $response->assertOk();
        $response->assertViewIs('taille.create');
    }


    /**
     * @test
     */
    public function store_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\tailleController::class,
            'store',
            \App\Http\Requests\tailleStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves_and_redirects(): void
    {
        $nom = $this->faker->word;
        $description = $this->faker->text;

        $response = $this->post(route('taille.store'), [
            'nom' => $nom,
            'description' => $description,
        ]);

        $tailles = Taille::query()
            ->where('nom', $nom)
            ->where('description', $description)
            ->get();
        $this->assertCount(1, $tailles);
        $taille = $tailles->first();

        $response->assertRedirect(route('taille.index'));
        $response->assertSessionHas('taille.id', $taille->id);
    }


    /**
     * @test
     */
    public function show_displays_view(): void
    {
        $taille = taille::factory()->create();

        $response = $this->get(route('taille.show', $taille));

        $response->assertOk();
        $response->assertViewIs('taille.show');
        $response->assertViewHas('taille');
    }


    /**
     * @test
     */
    public function edit_displays_view(): void
    {
        $taille = taille::factory()->create();

        $response = $this->get(route('taille.edit', $taille));

        $response->assertOk();
        $response->assertViewIs('taille.edit');
        $response->assertViewHas('taille');
    }


    /**
     * @test
     */
    public function update_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\tailleController::class,
            'update',
            \App\Http\Requests\tailleUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_redirects(): void
    {
        $taille = taille::factory()->create();
        $nom = $this->faker->word;
        $description = $this->faker->text;

        $response = $this->put(route('taille.update', $taille), [
            'nom' => $nom,
            'description' => $description,
        ]);

        $taille->refresh();

        $response->assertRedirect(route('taille.index'));
        $response->assertSessionHas('taille.id', $taille->id);

        $this->assertEquals($nom, $taille->nom);
        $this->assertEquals($description, $taille->description);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_redirects(): void
    {
        $taille = taille::factory()->create();
        $taille = Taille::factory()->create();

        $response = $this->delete(route('taille.destroy', $taille));

        $response->assertRedirect(route('taille.index'));

        $this->assertModelMissing($taille);
    }
}
