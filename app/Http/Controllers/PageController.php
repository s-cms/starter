<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use SmartCms\Kit\Http\Resources\FrontPageResource;
use SmartCms\Kit\Models\Block;
use SmartCms\Kit\Models\Page;

class PageController extends Controller
{
    public $limit = 3;

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

        $page = $this->findPage($segments);
        abort_if(! $page, 404);
        $blocks = $page->activeBlocks()->get()->map(fn (Block $block): array => [
            'id' => $block->type,
            'data' => $block->transformedData(),
        ]);

        return Inertia::render('page', [
            'categories' => $page->children()->paginate(12)->through(fn (Page $category) => FrontPageResource::make($category)->toArray(request: request())),
            'items' => $page->children()->paginate(12)->through(fn (Page $item) => FrontPageResource::make($item)->toArray(request: request())),
            'page' => FrontPageResource::make($page)->toArray(request: $request),
            'blocks' => [...Block::getHeaderBlocks(), ...$blocks->toArray(), ...Block::getFooterBlocks()],
            'meta' => [
                'title' => $page->title,
                'description' => $page->description,
            ],
        ]);
    }

    protected function findPage(array $segments, $parentId = null)
    {
        $slug = array_shift($segments);
        $page = Page::query()->where('slug', $slug ?? '')
            ->where('parent_id', $parentId)
            ->first();
        if (! $page) {
            return null;
        }

        if ($segments !== []) {
            return $this->findPage($segments, $page->id);
        }

        return $page;
    }
}
