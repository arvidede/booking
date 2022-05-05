import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'

import path from 'path'

// /** @type {import('vite').Plugin} */
// const plugin = {
//     name: 'custom-middleware',
//     configureServer(server) {
//         server.middlewares.use((req, res, next) => {
//             // console.log(`Got request ${req.url}`)
//             next()
//         })
//     }
// }

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess({
        scss: {
            prependData: "@import './src/styles/main';"
        }
    }),
    kit: {
        adapter: adapter(),
        vite: {
            // plugins: [plugin],
            resolve: {
                alias: {
                    utils: path.resolve('./src/utils'),
                    components: path.resolve('./src/components'),
                    server: path.resolve('./src/server'),
                    types: path.resolve('./src/types'),
                    styles: path.resolve('./src/styles'),
                    stores: path.resolve('./src/stores')
                }
            }
        }
    }
}

export default config
