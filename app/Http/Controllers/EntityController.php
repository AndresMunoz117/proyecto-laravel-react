<?php

namespace App\Http\Controllers;

use App\Models\Entity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EntityController extends Controller
{
    public function index(string $project)
    {
        return Inertia::render('Principal/Entity/Index', [
            'project' => $project,
            'entities' => Entity::where('project_id', $project)->get()
        ]);
    }

    public function create(string $project)
    {
        return Inertia::render('Principal/Entity/New',[
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
            'project_id' => 'required'
        ]);

        $entity = new Entity();
        $entity->key = $request->key;
        $entity->name = $request->name;
        $entity->description = $request->description;
        $entity->project_id = $request->project_id;

        $entity->save();

        return redirect(route('entities_index', $entity->project_id));
    }

    public function update(Request $request, string $id)
    {
        //data validation
        $validated = $request->validate([
            'key' => 'required|string|max:100',
            'name' => 'required|string|max:100',
            'description' => 'required|string',
            'project_id' => 'required'
        ]);

        $entity = Entity::find($id);
        $entity->update($validated);

        return redirect(route('entities_index', $entity->project_id));
    }

    public function destroy(string $id)
    {
        $entity = Entity::find($id);
        $entity->delete();

        return redirect(route('entities_index', $entity->project_id));
    }
}
