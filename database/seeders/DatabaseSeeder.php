<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use SmartCms\Kit\Models\Admin;
use SmartCms\Kit\Models\Page;
use SmartCms\Kit\Support\Contracts\PageStatus;
use SmartCms\Lang\Database\Factories\LanguageFactory;
use SmartCms\Lang\Models\Language;
use SmartCms\Settings\Models\Setting;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        LanguageFactory::new()->create([
            'name' => 'English',
            'slug' => 'en',
            'locale' => 'en_US',
            'is_default' => true,
            'is_admin_active' => true,
            'is_frontend_active' => true,
        ]);
        Page::query()->updateOrCreate([
            'id' => 1,
        ], [
            'name' => [
                'en' => 'Home',
            ],
            'slug' => '',
            'status' => PageStatus::Published,
            'is_system' => true,
        ]);
        $languages = Language::all();
        if ($languages->count() == 0) {
            return;
        }

        Setting::query()->updateOrCreate([
            'key' => 'main_language',
        ], [
            'value' => $languages->where('is_default', true)->first()->id,
        ]);
        $name = config('app.name', 'Laravel');
        if ($name && $name != 'Laravel') {
            Setting::query()->updateOrCreate([
                'key' => 'company_name',
            ], [
                'value' => $name,
            ]);
        }

        Admin::query()->updateOrCreate([
            'username' => env('ADMIN_USERNAME', 'superadmin'),
        ], [
            'email' => env('ADMIN_EMAIL', 'superadmin@example.com'),
            'password' => Hash::make(env('ADMIN_PASSWORD', 'password')),
        ]);
    }
}
