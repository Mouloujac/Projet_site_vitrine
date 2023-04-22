<?php

namespace App\Http\Controllers;

use App\Http\Requests\produitStoreRequest;
use App\Http\Requests\produitUpdateRequest;
use App\Models\Produit;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $produits = Produit::all();
        return response()->json($produits);
    }

    public function create(Request $request): View
    {
        return view('admin.produits.create');
    }

    public function store(produitStoreRequest $request): RedirectResponse
    {
        $produit = Produit::create($request->validated());
        return redirect()->route('admin.produits.index');
    }

    public function show(Request $request, Produit $produit): View
    {
        return view('admin.produits.show', compact('produit'));
    }

    public function edit(Request $request, Produit $produit): View
    {
        return view('admin.produits.edit', compact('produit'));
    }

    public function update(produitUpdateRequest $request, Produit $produit): RedirectResponse
    {
        $produit->update($request->validated());
        return redirect()->route('admin.produits.index');
    }

    public function destroy(Request $request, Produit $produit): RedirectResponse
    {
        $produit->delete();
        return redirect()->route('admin.produits.index');
    }
}
