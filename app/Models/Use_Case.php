<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Project;
use App\Models\Use_Case_Requirement;
use App\Models\Requirement;
use App\Models\Use_Case_Actor;
use App\Models\Actor;
use App\Models\Use_Case_Entity;
use App\Models\Entity;

class Use_Case extends Model
{
    use HasFactory;
    public $table = 'use_cases';

    public function project(){
        return $this->belongsTo(Project::class);
    }

    public function requirements()
    {
        return $this->hasManyThrough(Requirement::class, Use_Case_Requirement::class);
    }

    public function pivot_requirements()
    {
        return $this->hasMany(Use_Case_Requirement::class);
    }

    public function actors()
    {
        return $this->hasManyThrough(Actor::class, Use_Case_Actor::class);
    }

    public function pivot_actors()
    {
        return $this->hasMany(Use_Case_Actor::class);
    }

    public function entities()
    {
        return $this->hasManyThrough(Entity::class, Use_Case_Entity::class);
    }

    public function pivot_entities()
    {
        return $this->hasMany(Use_Case_Entity::class);
    }
}
