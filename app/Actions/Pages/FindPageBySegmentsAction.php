<?php

declare(strict_types=1);

namespace App\Actions\Pages;

use SmartCms\Kit\Models\Page;

final readonly class FindPageBySegmentsAction
{
    /**
     * Recursively find a page by URL segments.
     *
     * @param array $segments URL segments to match against page slugs
     * @param int|null $parentId Parent page ID for hierarchical lookup
     * @return Page|null Found page or null if not found
     */
    public function handle(array $segments, ?int $parentId = null): ?Page
    {
        $slug = array_shift($segments);
        $page = Page::query()->where('slug', $slug ?? '')
            ->where('parent_id', $parentId)
            ->first();

        if (! $page) {
            return null;
        }

        if ($segments !== []) {
            return $this->handle($segments, $page->id);
        }

        return $page;
    }
}
