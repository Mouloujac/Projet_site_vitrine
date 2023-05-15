<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class panierStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        return [
            'produit_id' => ['required', 'integer', 'exists:produits,id'],
            'commande_id' => ['required', 'integer', 'exists:commandes,id'],
            'statut' => ['required'],
        ];
    }
}
