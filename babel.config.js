module.exports = {
  plugins: [
    'lodash',  // HINT:需要安装babel-plugin-lodash插件
    [
      'babel-plugin-import',
      {
        libraryName: '@arco-design/web-react',
        libraryDirectory: 'es',
        camel2DashComponentName: false,
        style: true, // 样式按需加载
      },
    ],
  ],
}
