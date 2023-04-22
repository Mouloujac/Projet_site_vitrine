<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class produitStoreRequest extends FormRequest
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
            'nom' => ['required', 'string', 'max:300'],
            'description' => ['required', 'string'],
            'image' => ['required', 'string'],
            'prix' => ['required', 'integer'],
            'type_id' => ['required', 'integer', 'exists:types,id'],
            'taille_id' => ['required', 'integer', 'exists:tailles,id'],
        ];
    }
}
