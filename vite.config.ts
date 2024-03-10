import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  //跨域代理
  server:{
    host:'0.0.0.0',
    port:80,
    proxy:{
      '/api/createDiary':{
        target:'https://diary.raqtpie.xyz',
        changeOrigin:true
      },
      '/api/deleteDiary':{
        target:'https://diary.raqtpie.xyz',
        changeOrigin:true
      },
      '/api/selectDiary':{
        target:'https://diary.raqtpie.xyz',
        changeOrigin:true
      },
      '/api/selectDiaryByAuthor':{
        target:'https://diary.raqtpie.xyz',
        changeOrigin:true
      },
      '/api/selectDiaryById':{
        target:'https://diary.raqtpie.xyz',
        changeOrigin:true
      },
      '/api/updateDiary':{
        target:'https://diary.raqtpie.xyz',
        changeOrigin:true
      },
    }
  }
})
