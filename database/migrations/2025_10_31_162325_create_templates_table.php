<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use SmartCms\TemplateBuilder\Models\Section;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create(config('template-builder.templates_table_name'), function (Blueprint $table): void {
            $table->id();
            $table->boolean('status')->default(true);
            $table->integer('sorting')->default(0);
            $table->foreignIdFor(Section::class);
            $table->morphs('entity');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(config('template-builder.templates_table_name'));
    }
};
