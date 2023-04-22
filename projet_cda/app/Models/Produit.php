<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Produit extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nom',
        'description',
        'image',
        'prix',
        'stock',
        'type_id',
        'taille_id',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'stock' => 'boolean',
        'type_id' => 'integer',
        'taille_id' => 'integer',
    ];

    public function type(): BelongsTo
    {
        return $this->belongsTo(Type::class);
    }

    public function taille(): BelongsTo
    {
        return $this->belongsTo(Taille::class);
    }


    public function panier(): HasOne
    {
        return $this->hasOne(Panier::class);
    }
}
