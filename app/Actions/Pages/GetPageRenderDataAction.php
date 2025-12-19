<?php

declare(strict_types=1);

namespace App\Actions\Pages;

use Illuminate\Http\Request;
use SmartCms\Kit\Actions\Pages\GetMeta;
use SmartCms\Kit\Http\Resources\FrontPageResource;
use SmartCms\Kit\Models\Block;
use SmartCms\Kit\Models\Front\FrontPage;
use SmartCms\Kit\Models\Page;

final readonly class GetPageRenderDataAction
{
    /**
     * Prepare all data needed to render a page.
     *
     * @param Page $page The page to render
     * @param Request $request Current HTTP request
     * @return array Page render data including blocks, children, and meta
     */
    public function handle(Page $page, Request $request): array
    {
        $blocks = $page->activeBlocks()->get()->map(fn(Block $block): array => [
            'id' => $block->type,
            'data' => $block->transformedData(),
        ]);

        // Fetch children pages once to avoid N+1 query issue
        $children = $page->children()->paginate(12)->through(
            fn(Page $child) => FrontPageResource::make($child)->toArray(request: $request)
        );

        return [
            'categories' => $children,
            'items' => $children,
            'page' => FrontPageResource::make($page)->toArray(request: $request),
            'blocks' => [...Block::getHeaderBlocks(), ...$blocks->toArray(), ...Block::getFooterBlocks()],
            'meta' => GetMeta::run(FrontPage::find($page?->id ?? 0)),
        ];
    }
}
