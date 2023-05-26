<?php

namespace App\Http\Controllers;

use App\Models\Actor;
use App\Models\Actor_Process;
use App\Models\Process;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProcessController extends Controller
{
    public function index(string $project)
    {
        return Inertia::render('Principal/Process/Index', [
            'project' => $project,
            'processes' => Process::where('project_id', $project)->get(),
            'actors' => Actor::where('project_id', $project)->get(),
            'actors_processes' => Actor_Process::all()
        ]);
    }

    public function create(string $project)
    {
        return Inertia::render('Principal/Process/New',[
            'project' => $project,
            'actors' => Actor::where('project_id', $project)->get()
        ]);
    }

    public function store(Request $request)
    {
        //data validation
        $request->validate([
            'template_name' => 'required|string|max:100',
            'name' => 'required|string|max:100',
            'description' => 'required|string|max:100',
            'entry' => 'required|string|max:100',
            'image' => 'required|image',
            'actors' => 'required',
            'project_id' => 'required'
        ]);

        $image = $request->file('image')->store('public/ui');
        $url = Storage::url($image);

        $process = new Process();
        $process->template_name = $request->template_name;
        $process->name = $request->name;
        $process->description = $request->description;
        $process->entry = $request->entry;
        $process->image = $url;
        $process->project_id = $request->project_id;

        $process->save();

        $process_id = Process::where('template_name', $process->template_name)->pluck('id');

        $actors = $request->actors;

        foreach ($actors as $actor) {
            $process_actor = new Actor_Process();
            $process_actor->actor_id = +$actor;
            $process_actor->process_id = $process_id[0];

            $process_actor->save();
        }

        return redirect(route('processes_index', $process->project_id));
    }

    public function update(Request $request, string $id)
    {
        //data validation
        $validated = $request->validate([
            'key' => 'required|string|max:100',
            'name' => 'required|string|max:100',
            'description' => 'required|string|max:100',
            'characteristics' => 'required|string|max:100',
            'relations' => 'required|string|max:100',
            'responsability' => 'required|string|max:100',
            'entry_activities' => 'required|string|max:100',
            'exit_activities' => 'required|string|max:100',
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
