<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Preference;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PreferenceController extends Controller
{
    public function edit()
    {
        $client = Client::where('user_id', auth()->id())->first();

        $preference = $client
            ? Preference::where('client_id', $client->id)->first()
            : null;

        $categories = Category::orderBy('name')->get();

        return Inertia::render('Preferences/Edit', [
            'preference' => $preference,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'preferred_budget'   => 'nullable|numeric|min:0',
            'preferred_duration' => 'nullable|integer|min:1|max:30',
            'preferred_category' => 'nullable|string|max:100',
            'preferred_activity' => 'nullable|string|max:100',
            'preferred_destinations' => 'nullable|array',
            'preferred_destinations.*' => 'nullable|string',
            'traveler_type' => 'nullable|in:adventurer,cultural,relaxed,gastronomic,spiritual,ecotourist',
            'activity_level' => 'nullable|in:low,moderate,high,extreme',
        ]);

        $client = Client::where('user_id', auth()->id())->first();

        if (!$client) {
            $client = Client::create([
                'user_id'         => auth()->id(),
                'first_name'      => auth()->user()->name,
                'last_name'       => '',
                'document_type'   => 'DNI',
                'document_number' => '00000000',
            ]);
        }

        $data = $request->only([
            'preferred_budget',
            'preferred_duration',
            'preferred_category',
            'preferred_activity',
        ]);

        if ($request->has('preferred_destinations')) {
            $data['preferred_destinations'] = json_encode($request->preferred_destinations);
        }

        if ($request->has('traveler_type')) {
            $data['traveler_type'] = $request->traveler_type;
        }

        if ($request->has('activity_level')) {
            $data['activity_level'] = $request->activity_level;
        }

        Preference::updateOrCreate(
            ['client_id' => $client->id],
            $data
        );

        return redirect()->route('travel-match')
            ->with('success', '¡Preferencias guardadas! Aquí tienes tus recomendaciones personalizadas 🎯');
    }
}