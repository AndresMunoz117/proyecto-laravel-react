<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Project;
use App\Models\Actor_Process;
use App\Models\Process;
use App\Models\Use_Case;
use App\Models\Use_Case_Actor;

class Actor extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'name',
        'description',
        'characteristics',
        'relations',
        'responsability',
        'entry_activities',
        'exit_activities',
        'project_id'
    ];

    public function project(){
        return $this->belongsTo(Project::class);
    }

    public function processes()
    {
        return $this->hasManyThrough(Process::class, Actor_Process::class);
    }

    public function pivot_actors_processes()
    {
        return $this->hasMany(Actor_Process::class);
    }

    public function use_cases()
    {
        return $this->hasManyThrough(Use_Case::class, Use_Case_Actor::class);
    }

    public function pivot_use_cases()
    {
        return $this->hasMany(Use_Case_Actor::class);
    }
}
