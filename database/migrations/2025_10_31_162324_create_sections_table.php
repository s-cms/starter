<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create(config('template-builder.sections_table_name'), function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->boolean('status')->default(true);
            $table->string('path')->nullable();
            $table->json('value')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(config('template-builder.sections_table_name'));
    }
};
