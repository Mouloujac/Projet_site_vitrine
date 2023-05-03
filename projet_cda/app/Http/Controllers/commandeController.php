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
    public function index(Request $request): View
    {
        $commandes = Commande::all();

        return view('commande.index', compact('commandes'));
    }

    public function create(Request $request): View
    {
        return view('commande.create');
    }

    public function store(commandeStoreRequest $request): RedirectResponse
    {
        $commande = Commande::create($request->validated());


        return redirect()->route('commande.index');
    }

    public function show(Request $request, commande $commande): View
    {
        return view('commande.show', compact('commande'));
    }

    public function edit(Request $request, commande $commande): View
    {
        return view('commande.edit', compact('commande'));
    }

    public function update(commandeUpdateRequest $request, commande $commande): RedirectResponse
    {
        $commande->update($request->validated());

       

        return redirect()->route('commande.index');
    }

    public function destroy(Request $request, commande $commande): RedirectResponse
    {
        $commande->delete();

        return redirect()->route('commande.index');
    }
}
