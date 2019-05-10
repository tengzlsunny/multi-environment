## webpack
1. 搭建一个小的单页面vue
    > 初始化package.json (npm init)

    > 添加如下文件或者文件夹
    + webpack.config.js
    + .babelrc
    + index.html
    + src文件
    + src/main.js
    + src/App.vue

    > 搭建vue项目
        npm install --save-dev vue-loader vue-template-compiler vue
    
    > 搭webpack服务器
        npm install --save-dev webpack-dev-server webpack webpack-cli

    > 修改package.json配置
        ```js
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1",
            "dev": "webpack-dev-server --hot --mode development",
            "build": "webpack --progress --hide-modules --mode production"
        },
        ```
        webpack-dev-server有以下可选参数：
            --content-base //设定webpack-dev-server的director根目录。如果不进行设定的话，默认是在当前目录下。
            --quiet: //控制台中不输出打包的信息，开发中一般设置为false，进行 打印，这样查看错误比较方面
            --no-info: // 不显示任何信息
            --colors: //对信息进行颜色输出
            --no-colors: //对信息不进行颜色输出
            --compress: //开启gzip压缩
            --host <hostname/ip>: //设置ip
            --port <number>: //设置端口号，默认是:8080
            --inline: //webpack-dev-server会在你的webpack.config.js的入口配置文件中再添加一个入口,
            --hot: //开发热替换
            --open: //启动命令，自动打开浏览器
            --history-api-fallback: //查看历史url
    
    > webpack.config.js 配置入口，出口，模块以及插件
    1. 配置入口和出口
        ```js
            // 入口
            entry: './src/main.js',

            // 出口
           output: {
                filename: 'js/[name].bundle.js',
                path: path.resolve(__dirname, 'dist'),
                publicPath: '/assets'
            },
            /**
            * path.resolve()
            * path.resolve()方法可以将路径或者路径片段解析成绝对路径
            * 传入路径从右至左解析，遇到第一个绝对路径是完成解析，例如path.resolve('/foo', '/bar', 'baz') 将返回 /bar/baz
            * 如果传入的绝对路径不存在，那么当前目录将被使用
            * 当传入的参数没有/时，将被传入解析到当前根目录
            * 零长度的路径将被忽略
            * 如果没有传入参数，将返回当前根目录
            *
            * __dirname 
            * __dirname是__directory+name的缩写，顾名思义，是目录名的意思。
            * __dirname代表的是当前文件的绝对路径
            *
            * 如果配置了 output 的 publicPath，在 index.html 文件里面也应该做出调整。(<script src="assets/js/page.bundle.js"></script>)
            * 如果没有配置publicPath，在 index.html 文件里面也应该做出调整。(<script src="dist/js/page.bundle.js"></script>)
            */
        ```

    2. 配置loader(解析和转换 .vue 文件)
        配置vue-loader
        ```js
        { 
            test: /\.vue$/,
            loader: 'vue-loader'
        }
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
        ```
    
    3. 配置插件 plugins
        注意： 在vue-loader 15.*之后的版本都是 vue-loader的使用都是需要伴生VueLoaderPlugin的
        ```js
            const VueLoaderPlugin = require('vue-loader/lib/plugin');
            plugins: [
                new VueLoaderPlugin(),
            ],
        ```
    
    4. Resolve 配置 Webpack 如何寻找模块所对应的文件
        ```js
        resolve: {
            alias: { //通过别名来把原导入路径映射成一个新的导入路径,可以加快webpack查找模块的速度
                'components': './src/components/',
                '@': srcDir
            },
            extensions: ['.ts', '.js', '.json','.vue'] // 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在
        },
        ```
    
    5. devServer 服务器配置
        ```js
        devServer: {
            contentBase: "./",//本地服务器所加载的页面所在的目录
            historyApiFallback: true,//不跳转
            host:'0.0.0.0',
            port:7000,
            hot:true,
            inline: true,//实时刷新
            hot:true,//Enable webpack's Hot Module Replacement feature
            compress:true,//Enable gzip compression for everything served
            overlay: true, //Shows a full-screen overlay in the browser
            stats: "errors-only" ,//To show only errors in your bundle
            open:true, //When open is enabled, the dev server will open the browser.
            proxy: {
                "/api": {
                    target: "http://localhost:3000",
                    pathRewrite: {"^/api" : ""}
                }
            }，//重定向
        }
        /**
        * devServer是webpack开发服务器
        * 可以用来提高开发效率，它提供一些配置可以改变DevServer的默认行为
        * DevServer会启动一个HTTP服务器用于服务网页请求，同时会帮助启动webpack，并接收webpack发出的文件变更信号，通过websocket协议自动刷新网页做到实时预览。
        * contentBase:用于告诉服务器文件的根目录。这主要用来需要引用静态文件的时候(本地服务器所加载的页面所在的目录)
        * historyApiFallback: 这个配置属性是用来应对返回404页面时定向到特定页面用的
        * host: 设置服务器的主机号，默认是localhost，但是可以自己进行设置
        * port: 设置端口号
        * hot：热模块替换机制（用于在开发过程中，实时预览修改后的页面，无需重新加载整个页面）
        * inline： 
        * compress: 这是一个布尔型的值，当它被设置为true的时候对所有的服务器资源采用gzip压缩 
        *           优点：对JS，CSS资源的压缩率很高，可以极大得提高文件传输的速率，从而提升web性能
        *           缺点：服务端要对文件进行压缩，而客户端要进行解压，增加了两边的负载
        * overlay: 用于在浏览器输出编译错误的，默认是关闭的，需要手动打开
        *          overlay: {
                        warnings: true,
                        errors: true
                    }
        *open: 当open选项被设置为true时，dev server将直接打开浏览器
        *proxy: 重定向是解决跨域的好办法，当后端的接口拥有独立的API，而前端想在同一个domain下访问接口的时候，可以通过设置proxy实现。
        *      proxy: {
                    "/api": {
                        target: "http://localhost:3000",
                        pathRewrite: {"^/api" : ""}
                    }
                }
        *publicPath: 用于设置编译后文件的路径
                    publicPath: "/assets/"(确保publicPath的书写规则：前后都有一个斜杠！ )
        */
        ```

        
       
