<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Use_Case_Entity extends Model
{
    use HasFactory;
    public $table = 'use_case_entities';
    public $timestamps = false;
}
