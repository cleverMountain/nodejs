// 路由中间件： app.router('./', (res, req, next) => {},)


// app实例中间件

// 内置中间件: express.static  app.use(express.static) 托管静态资源
            // express.json 解析JSON格式得请求体数据
            // express.urlencoded app.use(express.urlencoded(extend: false)) 解析URL-encoded格式得请求数据
            // 需要配置才能获取表单得req.body
            // 第三方中间件