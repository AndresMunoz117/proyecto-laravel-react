<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Actor_Process extends Model
{
    use HasFactory;
    public $table = 'actor_processes';
    public $timestamps = false;

    protected $fillable = [
        'process_id',
        'actor_id',
    ];
}
