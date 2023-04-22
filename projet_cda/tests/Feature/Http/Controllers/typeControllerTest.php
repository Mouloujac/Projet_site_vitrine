<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Type;
use App\Models\type;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\typeController
 */
class typeControllerTest extends TestCase
{
    use AdditionalAssertions, RefreshDatabase, WithFaker;

    /**
     * @test
     */
    public function index_displays_view(): void
    {
        $types = type::factory()->count(3)->create();

        $response = $this->get(route('type.index'));

        $response->assertOk();
        $response->assertViewIs('type.index');
        $response->assertViewHas('types');
    }


    /**
     * @test
     */
    public function create_displays_view(): void
    {
        $response = $this->get(route('type.create'));

        $response->assertOk();
        $response->assertViewIs('type.create');
    }


    /**
     * @test
     */
    public function store_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\typeController::class,
            'store',
            \App\Http\Requests\typeStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves_and_redirects(): void
    {
        $nom = $this->faker->word;

        $response = $this->post(route('type.store'), [
            'nom' => $nom,
        ]);

        $types = Type::query()
            ->where('nom', $nom)
            ->get();
        $this->assertCount(1, $types);
        $type = $types->first();

        $response->assertRedirect(route('type.index'));
        $response->assertSessionHas('type.id', $type->id);
    }


    /**
     * @test
     */
    public function show_displays_view(): void
    {
        $type = type::factory()->create();

        $response = $this->get(route('type.show', $type));

        $response->assertOk();
        $response->assertViewIs('type.show');
        $response->assertViewHas('type');
    }


    /**
     * @test
     */
    public function edit_displays_view(): void
    {
        $type = type::factory()->create();

        $response = $this->get(route('type.edit', $type));

        $response->assertOk();
        $response->assertViewIs('type.edit');
        $response->assertViewHas('type');
    }


    /**
     * @test
     */
    public function update_uses_form_request_validation(): void
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\typeController::class,
            'update',
            \App\Http\Requests\typeUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_redirects(): void
    {
        $type = type::factory()->create();
        $nom = $this->faker->word;

        $response = $this->put(route('type.update', $type), [
            'nom' => $nom,
        ]);

        $type->refresh();

        $response->assertRedirect(route('type.index'));
        $response->assertSessionHas('type.id', $type->id);

        $this->assertEquals($nom, $type->nom);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_redirects(): void
    {
        $type = type::factory()->create();
        $type = Type::factory()->create();

        $response = $this->delete(route('type.destroy', $type));

        $response->assertRedirect(route('type.index'));

        $this->assertModelMissing($type);
    }
}
