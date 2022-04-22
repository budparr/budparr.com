import { defineConfig } from "astro/config";
import yaml from '@rollup/plugin-yaml';

export default defineConfig({

    siteName: "thisbud",
    site: 'https://www.budparr.com',
    markdown: {
        // Example: Include all drafts in your final build
        drafts: true,
    },
    vite: {
        plugins: [yaml()]
    }
});
