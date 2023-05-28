<?php

namespace App\Http\Controllers;

use App\Models\Actor;
use App\Models\Entity;
use App\Models\Requirement;
use App\Models\Use_Case;
use App\Models\Use_Case_Actor;
use App\Models\Use_Case_Entity;
use App\Models\Use_Case_Requirement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UseCaseController extends Controller
{
    public function index(string $project)
    {
        $use_cases = Use_Case::where('project_id', $project)->get();

        $infoActor = [];
        foreach ($use_cases as $use_case){
            $use_case_actors = Use_Case_Actor::where('use_case_id', $use_case->id)->get();
            foreach ($use_case_actors as $use_case_actor) {
                $actor = Actor::find($use_case_actor->actors_id);
                $infoActor[] = (object) [
                    'use_case' => $use_case->id,
                    'actor' => $actor->id,
                    'key' => $actor->key,
                    'name' => $actor->name
                ];
            }
        }
        $actorID = collect($infoActor)->groupBy('use_case')->map(function ($actorID) {
            return [
                'use_case' => $actorID->first(),
                'actors' => $actorID->pluck('actor')
            ];
        });

        $infoEntity = [];
        foreach ($use_cases as $use_case){
            $use_case_entities = Use_Case_Entity::where('use_case_id', $use_case->id)->get();
            foreach ($use_case_entities as $use_case_entity) {
                $entity = Entity::find($use_case_entity->entities_id);
                $infoEntity[] = (object) [
                    'use_case' => $use_case->id,
                    'entity' => $entity->id,
                    'key' => $entity->key,
                    'name' => $entity->name
                ];
            }
        }
        $entityID = collect($infoEntity)->groupBy('use_case')->map(function ($entityID) {
            return [
                'use_case' => $entityID->first(),
                'entities' => $entityID->pluck('entity')
            ];
        });

        $infoReq = [];
        foreach ($use_cases as $use_case){
            $use_case_reqs = Use_Case_Requirement::where('use_case_id', $use_case->id)->get();
            foreach ($use_case_reqs as $use_case_req) {
                $requirement = Requirement::find($use_case_req->requirements_id);
                $infoReq[] = (object) [
                    'use_case' => $use_case->id,
                    'requirement' => $requirement->id,
                    'key' => $requirement->key,
                    'description' => $requirement->description
                ];
            }
        }
        $reqID = collect($infoReq)->groupBy('use_case')->map(function ($reqID) {
            return [
                'use_case' => $reqID->first(),
                'requirements' => $reqID->pluck('requirement')
            ];
        });

        return Inertia::render('Principal/UseCases/Index',[
            'project' => $project,
            'use_cases' => $use_cases,
            'infoActor' => $infoActor,
            'actorID' => $actorID,
            'infoEntity' => $infoEntity,
            'entityID' => $entityID,
            'infoReq' => $infoReq,
            'reqID' => $reqID,
            'actors' => Actor::where('project_id', $project)->get(),
            'entities' => Entity::where('project_id', $project)->get(),
            'requirements' => Requirement::where('project_id', $project)->get(),
        ]);
    }

    public function create(string $project)
    {
        return Inertia::render('Principal/UseCases/New',[
            'project' => $project,
            'actors' => Actor::where('project_id', $project)->get(),
            'entities' => Entity::where('project_id', $project)->get(),
            'requirements_F' => Requirement::where('project_id', $project)->where('is_functional', 1)->get(),
            'requirements_NF' => Requirement::where('project_id', $project)->where('is_functional', 0)->get()
        ]);
    }

    public function store(Request $request)
    {
        //data validation
        $request->validate([
            'key' => 'required|string|max:100',
            'name' => 'required|string|max:100',
            'description' => 'required|string',
            'precondition' => 'required|string',
            'sequence' => 'required',
            'postcondition' => 'required',
            'exceptions' => 'required',
            'image' => 'required|image',
            'actors' =>  'required',
            'entities' =>  'required',
            'requirements' =>  'required',
            'project_id' => 'required'
        ]);

        $image = $request->file('image')->store('public/ui');
        $url = Storage::url($image);

        $use_case = new Use_Case();
        $use_case->key = $request->key;
        $use_case->name = $request->name;
        $use_case->description = $request->description;
        $use_case->precondition = $request->precondition;
        $use_case->sequence = $request->sequence;
        $use_case->postcondition = $request->postcondition;
        $use_case->exceptions = $request->exceptions;
        $use_case->image = $url;
        $use_case->project_id = $request->project_id;

        $use_case->save();

        $use_case_id = Use_Case::where('key', $use_case->key)->pluck('id');

        $actors = $request->actors;
        foreach ($actors as $actor) {
            $use_case_actor = new Use_Case_Actor();
            $use_case_actor->actors_id = +$actor;
            $use_case_actor->use_case_id = $use_case_id[0];

            $use_case_actor->save();
        }

        $entities = $request->entities;
        foreach ($entities as $entity) {
            $use_case_entity = new Use_Case_Entity();
            $use_case_entity->entities_id = +$entity;
            $use_case_entity->use_case_id = $use_case_id[0];

            $use_case_entity->save();
        }

        $requirements = $request->requirements;
        foreach ($requirements as $requirement) {
            $use_case_req = new Use_Case_Requirement();
            $use_case_req->requirements_id = +$requirement;
            $use_case_req->use_case_id = $use_case_id[0];

            $use_case_req->save();
        }

        return redirect(route('use_cases_index', $use_case->project_id));
    }

    public function update(Request $request, string $id)
    {
        //data validation
        $request->validate([
            'key' => 'required|string|max:100',
            'name' => 'required|string|max:100',
            'description' => 'required|string',
            'precondition' => 'required|string',
            'sequence' => 'required',
            'postcondition' => 'required',
            'exceptions' => 'required',
            'image' => 'required|image',
            'actors' =>  'required',
            'entities' =>  'required',
            'requirements' =>  'required',
            'project_id' => 'required'
        ]);

        $use_case = Use_Case::find($id);
        $use_case->delete();

        $image = $request->file('image')->store('public/ui');
        $url = Storage::url($image);

        $use_case2 = new Use_Case();
        $use_case2->key = $request->key;
        $use_case2->name = $request->name;
        $use_case2->description = $request->description;
        $use_case2->precondition = $request->precondition;
        $use_case2->sequence = $request->sequence;
        $use_case2->postcondition = $request->postcondition;
        $use_case2->exceptions = $request->exceptions;
        $use_case2->image = $url;
        $use_case2->project_id = $request->project_id;

        $use_case2->save();

        $use_case_id = Use_Case::where('key', $use_case->key)->pluck('id');
        $use_case_pid = Use_Case::where('key', $use_case->key)->pluck('project_id');

        // Use_Case::where('id', $id)->update([
        //     'key' => $request->key,
        //     'name' => $request->name,
        //     'description' => $request->description,
        //     'precondition' => $request->precondition,
        //     'sequence' => $request->sequence,
        //     'postcondition' => $request->postcondition,
        //     'exceptions' => $request->exceptions,
        //     'image' => $url,
        //     'project_id' => $request->project_id
        // ]);

        //Use_Case_Actor::where('use_case_id', $id)->delete();
        $actors = $request->actors;
        foreach ($actors as $actor) {
            $use_case_actor = new Use_Case_Actor();
            $use_case_actor->actors_id = +$actor;
            $use_case_actor->use_case_id = $use_case_id[0];

            $use_case_actor->save();
        }

        //Use_Case_Entity::where('use_case_id', $id)->delete();
        $entities = $request->entities;
        foreach ($entities as $entity) {
            $use_case_entity = new Use_Case_Entity();
            $use_case_entity->entities_id = +$entity;
            $use_case_entity->use_case_id = $use_case_id[0];

            $use_case_entity->save();
        }

        //Use_Case_Requirement::where('use_case_id', $id)->delete();
        $requirements = $request->requirements;
        foreach ($requirements as $requirement) {
            $use_case_req = new Use_Case_Requirement();
            $use_case_req->requirements_id = +$requirement;
            $use_case_req->use_case_id = $use_case_id[0];

            $use_case_req->save();
        }

        $use_case = Use_Case::find($id);

        return redirect(route('use_cases_index', $use_case_pid[0]));
    }

    public function destroy(string $id)
    {
        $use_case = Use_Case::find($id);
        $use_case->delete();

        return redirect(route('use_cases_index', $use_case->project_id));
    }
}
