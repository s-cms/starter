<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\File;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $file = lang_path(App::currentLocale().'.json');

        return [
            ...parent::share($request),
            'host' => [
                'title' => hostname(),
                'type' => 'link',
                'is_external' => false,
                'url' => host(),
            ],
            'hostname' => hostname(),
            'company_name' => company_name(),
            'logo' => logo(),
            'default_image' => no_image(),
            'locale' => App::getLocale(),
            'locales' => language_routes(),
            'translations' => File::exists($file) ? File::json($file) : [],
            'meta' => [
                'microdata' => app('microdata')->get(),
                'tags' => [
                    [
                        'name' => 'robots',
                        'content' => 'index, follow',
                    ],
                    [
                        'name' => 'og:type',
                        'content' => $og_type ?? 'website',
                    ],
                    [
                        'name' => 'og:title',
                        'content' => ($titleMod['prefix'] ?? '').app('seo')->title().($titleMod['suffix'] ?? ''),
                    ],
                    [
                        'name' => 'og:description',
                        'content' => ($descriptionMod['prefix'] ?? '').app('seo')->description().($descriptionMod['suffix'] ?? ''),
                    ],
                    [
                        'name' => 'og:url',
                        'content' => url()->current(),
                    ],
                    [
                        'name' => 'og:image',
                        'content' => app('seo')->image(),
                    ],
                    [
                        'name' => 'og:site_name',
                        'content' => company_name(),
                    ],
                    [
                        'name' => 'twitter:card',
                        'content' => 'summary',
                    ],
                    [
                        'name' => 'twitter:site',
                        'content' => '@'.company_name(),
                    ],
                    [
                        'name' => 'twitter:description',
                        'content' => ($descriptionMod['prefix'] ?? '').app('seo')->description().($descriptionMod['suffix'] ?? ''),
                    ],
                    [
                        'name' => 'twitter:title',
                        'content' => ($titleMod['prefix'] ?? '').app('seo')->title().($titleMod['suffix'] ?? ''),
                    ],
                    [
                        'name' => 'twitter:image',
                        'content' => app('seo')->image(),
                    ],
                ],
                'scripts' => app('s')->get('custom_scripts', []),
                'canonical' => url()->current(),
                'title' => app('seo')->title(),
                'description' => app('seo')->description(),
                'keywords' => app('seo')->keywords(),
                // @todo Add hreflangs and alternate links
            ],
        ];
    }
}
