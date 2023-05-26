<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        return Inertia::render('Principal/Project/Index', [
            'projects' => Project::with('user:id,name')->get()
        ]);
    }

    public function store(Request $request)
    {
        //data validation
        $validated = $request->validate([
            'project_name' => 'required|string|max:100',
            'user_name' => 'required|string|max:100'
        ]);

        $request->user()->projects()->create($validated);
        return redirect(route('projects.index'));
    }

    public function show(Project $project)
    {
        return Inertia::render('Principal/Project/Show', [
            'projects' => Project::find($project->id)
        ]);
    }

    public function update(Request $request, Project $project)
    {
        //data validation
        $validated = $request->validate([
            'project_name' => 'required|string|max:100',
            'user_name' => 'required|string|max:100'
        ]);

        $project->update($validated);
        return redirect(route('projects.index'));
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return redirect(route('projects.index'));
    }
}
