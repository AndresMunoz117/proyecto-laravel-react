<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Use_Case_Requirement extends Model
{
    use HasFactory;
    public $table = 'use_case_requirements';
    public $timestamps = false;

    protected $fillable = [
        'use_case_id',
        'requirements_id',
    ];
}
