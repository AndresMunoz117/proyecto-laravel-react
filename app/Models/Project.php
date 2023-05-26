<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Requirement;
use App\Models\Actor;
use App\Models\Entity;
use App\Models\Process;
use App\Models\Use_Case;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_name',
        'user_name',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function requirements()
    {
        return $this->hasMany(Requirement::class);
    }

    public function actors()
    {
        return $this->hasMany(Actor::class);
    }

    public function entities()
    {
        return $this->hasMany(Entity::class);
    }

    public function processes()
    {
        return $this->hasMany(Process::class);
    }

    public function UseCase()
    {
        return $this->hasMany(Use_Case::class);
    }
}
