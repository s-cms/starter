<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create(config('forms.forms_table_name', 'forms'), function (Blueprint $table): void {
            $table->id();
            $table->string('name');
            $table->json('title')->nullable();
            $table->json('button')->nullable();
            $table->json('notification')->nullable();
            $table->json('fields')->nullable();
            $table->json('content')->nullable();
            $table->timestamps();
        });
    }
};
