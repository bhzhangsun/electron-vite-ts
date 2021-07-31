import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        }
      ]
    })
  ],
  base: './',
  build: {
    outDir: "dist/renderer"
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true
  }
})
