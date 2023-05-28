<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Actor;
use Inertia\Inertia;

class ActorController extends Controller
{
    public function index(string $project)
    {
        return Inertia::render('Principal/Actor/Index', [
            'project' => $project,
            'actors' => Actor::where('project_id', $project)->get()
        ]);
    }

    public function create(string $project)
    {
        return Inertia::render('Principal/Actor/New',[
            'project' => $project
        ]);
    }

    public function store(Request $request)
    {
        //data validation
        $request->validate([
            'key' => 'required|string|max:100',
            'name' => 'required|string|max:100',
            'description' => 'required|string',
            'characteristics' => 'required|string',
            'relations' => 'required|string',
            'responsability' => 'required|string',
            'entry_activities' => 'required|string',
            'exit_activities' => 'required|string',
            'project_id' => 'required'
        ]);

        $actor = new Actor();
        $actor->key = $request->key;
        $actor->name = $request->name;
        $actor->description = $request->description;
        $actor->characteristics = $request->characteristics;
        $actor->relations = $request->relations;
        $actor->responsability = $request->responsability;
        $actor->entry_activities = $request->entry_activities;
        $actor->exit_activities = $request->exit_activities;
        $actor->project_id = $request->project_id;

        $actor->save();

        return redirect(route('actors_index', $actor->project_id));
    }

    public function update(Request $request, string $id)
    {
        //data validation
        $validated = $request->validate([
            'key' => 'required|string|max:100',
            'name' => 'required|string|max:100',
            'description' => 'required|string',
            'characteristics' => 'required|string',
            'relations' => 'required|string',
            'responsability' => 'required|string',
            'entry_activities' => 'required|string',
            'exit_activities' => 'required|string',
            'project_id' => 'required'
        ]);

        $actor = Actor::find($id);
        $actor->update($validated);

        return redirect(route('actors_index', $actor->project_id));
    }

    public function destroy(string $id)
    {
        $actor = Actor::find($id);
        $actor->delete();

        return redirect(route('actors_index', $actor->project_id));
    }
}
