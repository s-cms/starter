<?php

use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/{slug?}/{second_slug?}/{third_slug?}/{fourth_slug?}', [PageController::class, 'handle'])
    ->where('slug', '^(?!admin|api|_debugbar|.well-known).*$')
    ->where('lang', '[a-zA-Z]{2}')
    ->middleware(['web', 'maintenance', 'uuid', 'lang'])
    ->name('cms.inertia-page')
    ->multilingual();
