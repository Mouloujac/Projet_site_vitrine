<?php

namespace App\Http\Controllers;

use App\Http\Requests\panierStoreRequest;
use App\Http\Requests\panierUpdateRequest;
use App\Models\Panier;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;
use App\Models\Produit;

class panierController extends Controller
{
    public function index(Request $request)
{
    /** @var User $user */
    $user = auth()->user();
    
    $produitIds = $request->input('produitIds', []);
    $produits = Produit::whereIn('id', json_decode($produitIds))->get();

    return response()->json($produits);
}



    public function create(Request $request): View
    {
        return view('panier.create');
    }

    public function store(panierStoreRequest $request)
    {
        $panier = Panier::create($request->validated());

        

        return response()->json($panier);
    }

    public function show(Request $request, panier $panier): View
    {
        return view('panier.show', compact('panier'));
    }

    public function edit(Request $request, panier $panier): View
    {
        return view('panier.edit', compact('panier'));
    }

    public function update(panierUpdateRequest $request, panier $panier): RedirectResponse
    {
        $panier->update($request->validated());

       
        return redirect()->route('panier.index');
    }

    public function destroy(Request $request, panier $panier): RedirectResponse
    {
        $panier->delete();

        return redirect()->route('panier.index');
    }
}
