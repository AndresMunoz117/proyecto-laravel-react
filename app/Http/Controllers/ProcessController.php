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
        $info = [];
        $processes = Process::where('project_id', $project)->get();
        foreach ($processes as $process){
            $actors_processes = Actor_Process::where('process_id', $process->id)->get();
            foreach ($actors_processes as $actor_process) {
                $actor = Actor::find($actor_process->actor_id);
                $info[] = (object) [
                    'process' => $process->id,
                    'actor' => $actor->id,
                    'key' => $actor->key,
                    'name' => $actor->name
                ];
            }
        }

        $actorID = collect($info)->groupBy('process')->map(function ($actorID) {
            return [
                'process' => $actorID->first(),
                'actors' => $actorID->pluck('actor')
            ];
        });

        return Inertia::render('Principal/Process/Index', [
            'project' => $project,
            'processes' => $processes,
            'info' => $info,
            'actorID' => $actorID,
            'actors' => Actor::where('project_id', $project)->get(),
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
            'description' => 'required|string',
            'entry' => 'required|string',
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
        $request->validate([
            'template_name' => 'required|string|max:100',
            'name' => 'required|string|max:100',
            'description' => 'required|string',
            'entry' => 'required|string',
            'image' => 'required|image',
            'actors' => 'required',
            'project_id' => 'required'
        ]);

        $image = $request->file('image')->store('public/ui');
        $url = Storage::url($image);
        Process::where('id', $id)->update([
            'template_name' => $request->template_name,
            'name' => $request->name,
            'description' => $request->description,
            'entry' => $request->entry,
            'image' => $url,
            'project_id' => $request->project_id
        ]);

        Actor_Process::where('process_id', $id)->delete();

        $actors = $request->actors;
        foreach ($actors as $actor) {
            $process_actor = new Actor_Process();
            $process_actor->actor_id = +$actor;
            $process_actor->process_id = $id;

            $process_actor->save();
        }

        $process = Process::find($id);

        return redirect(route('processes_index', $process->project_id));
    }

    public function destroy(string $id)
    {
        $process = Process::find($id);
        $process->delete();

        return redirect(route('processes_index', $process->project_id));
    }
}
