<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create(config('seo.table_name', 'seos'), function (Blueprint $table): void {
            $table->id();
            $table->string('title')->nullable();
            $table->string('heading')->nullable();
            $table->text('summary')->nullable();
            $table->longText('content')->nullable();
            $table->string('description')->nullable();
            $table->morphs('seoable');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(config('seo.table_name', 'seos'));
    }
};
