<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use SmartCms\Forms\Enums\ContactFormStatusesEnum;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create(config('forms.contact_forms_table_name', 'contact_forms'), function (Blueprint $table): void {
            $table->id();
            $table->string('prefix')->nullable();
            $table->string('status')->default(ContactFormStatusesEnum::NEW->value);
            $table->text('comment')->nullable();
            $table->json('data')->nullable();
            $table->string('ip')->nullable();
            $table->string('user_agent')->nullable();
            $table->string('referer_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists(config('kit.contact_forms_table_name'));
    }
};
