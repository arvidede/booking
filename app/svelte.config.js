import adapter from '@sveltejs/adapter-node'
import { vitePreprocess } from '@sveltejs/kit/vite'

import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [vitePreprocess()],
    onwarn: (warning, handler) => {
        const { code } = warning
        if (code === 'css-unused-selector') return

        handler(warning)
    },
    kit: {
        files: {
            hooks: {
                server: './src/hooks/server.ts',
                client: './src/hooks/client.ts'
            }
        },
        adapter: adapter(),
        alias: {
            utils: path.resolve('./src/utils'),
            components: path.resolve('./src/components'),
            server: path.resolve('./src/server'),
            assets: path.resolve('./src/assets'),
            types: path.resolve('./src/types'),
            styles: path.resolve('./src/styles'),
            stores: path.resolve('./src/stores')
        }
    }
}

export default config
