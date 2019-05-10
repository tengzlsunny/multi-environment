
    
const VueLoaderPlugin = require('vue-loader/lib/plugin'); // vue-loader @15版本及以上必写

const path = require('path')
const srcDir = path.resolve(__dirname, './src')
/**
 * path.resolve()
 * path.resolve()方法可以将路径或者路径片段解析成绝对路径
 * 传入路径从右至左解析，遇到第一个绝对路径是完成解析，例如path.resolve('/foo', '/bar', 'baz') 将返回 /bar/baz
 * 如果传入的绝对路径不存在，那么当前目录将被使用
 * 当传入的参数没有/时，将被传入解析到当前根目录
 * 零长度的路径将被忽略
 * 如果没有传入参数，将返回当前根目录
 */

 /**
  * __dirname 
  * __dirname是__directory+name的缩写，顾名思义，是目录名的意思。
  * __dirname代表的是当前文件的绝对路径
  */

module.exports = {
    // 入口
    entry: {page:'./src/main.js'},

    // 出口
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    // 模块
    /**
     *  test：用正则匹配制定的文件类型；
     *  use：当你匹配了这个文件后，使用什么样的loader去处理匹配到的文件，
     *       use接收的是一个数组，意味着当他匹配到文件后，它可以启用多个的loader去处理文件的内容；
     * include：'' // 匹配特定路径；
     * exclude： '' //排除特定路径；
     * resourceQuery: /xxxx/ // 正则，匹配路径；
     * and: [...] //必须匹配数组中所有条件;
     * or: [...] //匹配数组中任意一个条件；
     * not: [...] //排除匹配数组中所有条件；
     * options //用来限定具体的 loader 使用的配置参数
     */
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },

    // 插件
    plugins: [
        new VueLoaderPlugin(),
    ],

    // Resolve 配置 Webpack 如何寻找模块所对应的文件
    resolve: {
        alias: { //通过别名来把原导入路径映射成一个新的导入路径,可以加快webpack查找模块的速度
            'components': './src/components/',
            '@': srcDir
        },
        extensions: ['.ts', '.js', '.json','.vue'] // 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在
    },

    /**
     * devServer是webpack开发服务器
     * 可以用来提高开发效率，它提供一些配置可以改变DevServer的默认行为
     * DevServer会启动一个HTTP服务器用于服务网页请求，同时会帮助启动webpack，并接收webpack发出的文件变更信号，通过websocket协议自动刷新网页做到实时预览。
     */
    devServer: {
        port: 8088, // 端口
        host: 'localhost'
    }
}