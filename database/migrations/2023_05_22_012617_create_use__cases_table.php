<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('use_cases', function (Blueprint $table) {
            $table->id();
            $table->string('key');
            $table->string('name');
            $table->string('description');
            $table->string('precondition');
            $table->string('sequence');
            $table->string('postcondition');
            $table->string('exceptions');
            $table->longText('image');
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('use__cases');
    }
};
