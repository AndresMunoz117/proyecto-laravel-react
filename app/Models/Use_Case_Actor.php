<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Use_Case_Actor extends Model
{
    use HasFactory;
    public $table = 'use_case_actors';
    public $timestamps = false;

    protected $fillable = [
        'use_case_id',
        'actors_id',
    ];
}
