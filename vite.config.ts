import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import stylelintPlugin from 'vite-plugin-stylelint'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import postcssPresetEnv from 'postcss-preset-env'
//@ts-ignore
import postcssPxToViewport from 'postcss-px-to-viewport'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), eslintPlugin(), stylelintPlugin({ fix: true })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv, // 是一个postcss插件,帮助您使用最新的css语法，它将新的css规范转换为更兼容的css,所以你不需要等待浏览器的支持。（之前同功能的postcss-cssnext插件被废弃, 推荐用postcss-preset-env）
        postcssPxToViewport({
          // 实现px自动转vw实现自适应的关键插件，可以将px单位转换为视口单位的 (vw, vh, vmin, vmax)
          viewportWidth: 1920, // 视口宽度，对应UI设计稿的视窗宽度
          // viewporHeight: 1080, // 视口高度，对应UI设计稿的视窗高度
          unitToConvert: 'px', // 需要转换的单位，默认为"px"
          viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
          unitPrecision: 6, // 指定px转换之后的精度，即小数点位数
          selectorBlackList: ['.ignore'], // 需要忽略的 CSS 选择器，不会转为视窗单位，使用原有的 px 等单位
          exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          // include: /\/src\//,     // 如果设置了include，那将只有匹配到的文件才会被转换 （exclude和include设置一个就行了）
          replace: true, //  是否转换后直接更换属性值，而不添加备用属性
          minPixelValue: 1, // 设置最小的转换数值，默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          propList: ['*'], // 指定能转化为 vw 的css属性列表，*代表全部css属性的单位都进行转换
          // propList: ['*', '!font-size'],
          landscape: false, // 是否根据 landscapeWidth 生成的媒体查询条件，处理横屏情况
          // landscapeUnit: 'vw',    // 横屏时使用的单位
          // landscapeWidth: 1125,   // 横屏时使用的视窗宽度
        }),
      ],
    },
  },
  server: {
    open: false,
  },
})
