<?php

namespace App\Http\Controllers;
use App\Models\Requirement;
use Inertia\Inertia;

use Illuminate\Http\Request;

class RequirementController extends Controller
{
    public function index(string $project)
    {
        return Inertia::render('Principal/Requirement/Index', [
            'project' => $project,
            'requirements' => Requirement::where('project_id', $project)->get()
        ]);
    }

    public function create(string $project)
    {
        return Inertia::render('Principal/Requirement/New',[
            'project' => $project
        ]);
    }

    public function store(Request $request)
    {
        //data validation
        $request->validate([
            'key' => 'required|string|max:100',
            'description' => 'required|string',
            'is_functional' => 'required',
            'project_id' => 'required'
        ]);

        $requirement = new Requirement();
        $requirement->key = $request->key;
        $requirement->description = $request->description;
        $requirement->is_functional = $request->is_functional;
        $requirement->project_id = $request->project_id;

        $requirement->save();

        return redirect(route('requirements_index', $requirement->project_id));
    }

    public function update(Request $request, string $id)
    {
        //data validation
        $validated = $request->validate([
            'key' => 'required|string|max:100',
            'description' => 'required|string',
            'is_functional' => 'required',
            'project_id' => 'required'
        ]);

        $requirement = Requirement::find($id);
        $requirement->update($validated);

        return redirect(route('requirements_index', $requirement->project_id));
    }

    public function destroy(string $id)
    {
        $requirement = Requirement::find($id);
        $requirement->delete();

        return redirect(route('requirements_index', $requirement->project_id));
    }
}
