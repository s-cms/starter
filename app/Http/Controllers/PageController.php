<?php

namespace App\Http\Controllers;

use App\Actions\Pages\FindPageBySegmentsAction;
use App\Actions\Pages\GetPageRenderDataAction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public $limit = 3;

    public function __construct(
        private readonly FindPageBySegmentsAction $findPageAction,
        private readonly GetPageRenderDataAction $getPageDataAction
    ) {}

    public function handle(Request $request)
    {
        $segments = $request->segments();
        foreach ($segments as $key => $value) {
            if ($value == current_lang()) {
                unset($segments[$key]);
            }
        }

        if ($this->limit < count($segments)) {
            return abort(404);
        }

        $page = $this->findPageAction->handle($segments);
        abort_if(! $page, 404);

        $data = $this->getPageDataAction->handle($page, $request);

        return Inertia::render('page', $data)
            ->toResponse($request)
            ->withHeaders([
                'X-Robots-Tag' => $page->is_index ? 'index, follow' : 'noindex, nofollow',
                'Content-Language' => current_lang(),
            ]);
    }
}
