<?php

namespace App\Http\Controllers;

use App\Http\Requests\tailleStoreRequest;
use App\Http\Requests\tailleUpdateRequest;
use App\Models\Taille;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class tailleController extends Controller
{
    public function index(Request $request)
    {
        $tailles = Taille::all();

        return response()->json($tailles);
    }

    public function create(Request $request): View
    {
        return view('taille.create');
    }

    public function store(tailleStoreRequest $request): RedirectResponse
    {
        $taille = Taille::create($request->validated());


        return redirect()->route('taille.index');
    }

    public function show(Request $request, taille $taille): View
    {
        return view('taille.show', compact('taille'));
    }

    public function edit(Request $request, taille $taille): View
    {
        return view('taille.edit', compact('taille'));
    }

    public function update(tailleUpdateRequest $request, taille $taille): RedirectResponse
    {
        $taille->update($request->validated());

      

        return redirect()->route('taille.index');
    }

    public function destroy(Request $request, taille $taille): RedirectResponse
    {
        $taille->delete();

        return redirect()->route('taille.index');
    }
}
