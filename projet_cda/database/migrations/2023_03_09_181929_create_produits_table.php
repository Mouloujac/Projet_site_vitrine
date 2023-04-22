<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::disableForeignKeyConstraints();

        Schema::create('produits', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 300);
            $table->longText('description');
            $table->longText('image');
            $table->integer('prix');
            $table->boolean('stock');
            $table->foreignId('type_id')->constrained();
            $table->foreignId('taille_id')->constrained();
            $table->timestamps();
        });

        Schema::enableForeignKeyConstraints();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produits');
    }
};
