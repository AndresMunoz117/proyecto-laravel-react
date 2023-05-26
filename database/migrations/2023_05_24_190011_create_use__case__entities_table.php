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
        Schema::create('use_case_entities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('use_case_id')->constrained()->cascadeOnDelete();
            $table->foreignId('entities_id')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('use__case__entities');
    }
};
