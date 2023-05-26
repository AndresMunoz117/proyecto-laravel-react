<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Project;
use App\Models\Actor_Process;
use App\Models\Actor;

class Process extends Model
{
    use HasFactory;

    protected $fillable = [
        'template_name',
        'name',
        'description',
        'entry',
        'image',
        'project_id'
    ];

    public function project(){
        return $this->belongsTo(Project::class);
    }

    public function pivot_actors_processes()
    {
        return $this->hasMany(Actor_Process::class);
    }

    public function actors()
    {
        return $this->hasManyThrough(Actor::class, Actor_Process::class);
    }
}
