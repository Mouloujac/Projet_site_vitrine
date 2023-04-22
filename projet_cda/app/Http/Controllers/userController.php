<?php

namespace App\Http\Controllers;

use App\Http\Requests\userStoreRequest;
use App\Http\Requests\userUpdateRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

class userController extends Controller
{
    public function index(Request $request): View
    {
        $users = User::all();

        return view('user.index', compact('users'));
    }

    public function create(Request $request): View
    {
        return view('user.create');
    }

    public function store(userStoreRequest $request): RedirectResponse
    {
        $user = User::create($request->validated());

       

        return redirect()->route('user.index');
    }

    public function show(Request $request, user $user): View
    {
        return view('user.show', compact('user'));
    }

    public function edit(Request $request, user $user): View
    {
        return view('user.edit', compact('user'));
    }

    public function update(userUpdateRequest $request, user $user): RedirectResponse
    {
        $user->update($request->validated());

        

        return redirect()->route('user.index');
    }

    public function destroy(Request $request, user $user): RedirectResponse
    {
        $user->delete();

        return redirect()->route('user.index');
    }
}
