<?php

namespace App\Http\Controllers;

use App\Http\Requests\produitStoreRequest;
use App\Http\Requests\produitUpdateRequest;
use App\Models\Produit;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class produitController extends Controller
{
    public function index(Request $request)
    {
        $produits = Produit::with('taille')->orderBy('created_at', 'desc')->get();
        return response()->json($produits);
    }

    public function store(produitStoreRequest $request)
    {
        $produit = Produit::create($request->validated());

        return response()->json($produit);
    }

    public function show(Request $request, $id)
    {
        $produit = Produit::with('taille', 'type')->findOrFail($id);
        return response()->json($produit);
    }

    public function update(produitUpdateRequest $request, produit $produit)
    {
        $produit->update($request->validated());

        return response()->json($produit);
    }

    public function destroy(Request $request, produit $produit)
    {
        $produit->delete();

        return response()->json($produit);
    }
}
