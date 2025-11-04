<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create(config('model-translate.table_name'), function (Blueprint $table): void {
            $table->id();
            $table->string('value');
            $table->unsignedBigInteger('language_id');
            $table->foreign('language_id')->references('id')->on(config('lang.table_name'));
            $table->morphs('entity');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(config('model-translate.table_name'));
    }
};
