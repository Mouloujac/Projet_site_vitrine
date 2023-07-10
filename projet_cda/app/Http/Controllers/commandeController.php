<?php

namespace App\Http\Controllers;

use App\Http\Requests\commandeStoreRequest;
use App\Http\Requests\commandeUpdateRequest;
use App\Models\Commande;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class commandeController extends Controller
{
    public function index(Request $request)
    {
        $commandes = Commande::with('paniers.produit')->get();
        return response()->json($commandes);
    }

    public function create(Request $request): View
    {
        return view('commande.create');
    }

    public function store(commandeStoreRequest $request)
    {
        $data = $request->validated();
        $commande = Commande::create($data);

        return response()->json($commande);
    }

    public function show(Request $request, Commande $commande): View
    {
        $commande->load('paniers');

        return view('commande.show', compact('commande'));
    }

    public function edit(Request $request, Commande $commande): View
    {
        return view('commande.edit', compact('commande'));
    }

    public function update(commandeUpdateRequest $request, Commande $commande)
    {
        $commande->update($request->validated());

        return response()->json($commande);
    }

    public function destroy(Request $request, Commande $commande): RedirectResponse
    {
        $commande->delete();

        return redirect()->route('commande.index');
    }
}
