<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class tailleUpdateRequest extends FormRequest
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
            'nom' => ['required', 'string', 'max:100'],
            'description' => ['required', 'string'],
        ];
    }
}