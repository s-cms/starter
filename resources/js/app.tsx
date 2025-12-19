import "../css/app.css";

import { createInertiaApp, router } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => title ? `${title}` : appName,
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob("./pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <App {...props} />
            </StrictMode>
        );
    },
    progress: {
        color: "#4B5563",
    },
});



router.on('navigate', (event: any) => {
    // @ts-ignore
    if (typeof window !== 'undefined' && window.dataLayer) {
        // @ts-ignore
        window.dataLayer.push({
            event: 'pageview',
            page: event.detail.page.url
        })
    }
})
