<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create(config('template-builder.layouts_table_name'), function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->string('path');
            $table->json('value');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(config('template-builder.layouts_table_name'));
    }
};
