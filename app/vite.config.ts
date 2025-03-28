import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [sveltekit()],
    resolve: {
        alias: {
            $img: './src/assets/img'
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: "@import 'styles/main';"
            }
        }
    }
})
