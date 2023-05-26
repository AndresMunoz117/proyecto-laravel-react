<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Project;
use App\Models\Use_Case;
use App\Models\Use_Case_Entity;

class Entity extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'name',
        'description',
        'project_id'
    ];

    public function project(){
        return $this->belongsTo(Project::class);
    }

    public function use_cases()
    {
        return $this->hasManyThrough(Use_Case::class, Use_Case_Entity::class);
    }

    public function pivot_use_cases()
    {
        return $this->hasMany(Use_Case_Entity::class);
    }
}
