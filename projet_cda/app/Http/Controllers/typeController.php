<?php

namespace App\Http\Controllers;

use App\Http\Requests\typeStoreRequest;
use App\Http\Requests\typeUpdateRequest;
use App\Models\Type;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class typeController extends Controller
{
    public function index(Request $request)
    {
        $types = Type::all();

        return response()->json($types);
    }

    public function create(Request $request): View
    {
        return view('type.create');
    }

    public function store(typeStoreRequest $request): RedirectResponse
    {
        $type = Type::create($request->validated());

        

        return redirect()->route('type.index');
    }

    public function show(Request $request, type $type): View
    {
        return view('type.show', compact('type'));
    }

    public function edit(Request $request, type $type): View
    {
        return view('type.edit', compact('type'));
    }

    public function update(typeUpdateRequest $request, type $type): RedirectResponse
    {
        $type->update($request->validated());

       

        return redirect()->route('type.index');
    }

    public function destroy(Request $request, type $type): RedirectResponse
    {
        $type->delete();

        return redirect()->route('type.index');
    }
}
