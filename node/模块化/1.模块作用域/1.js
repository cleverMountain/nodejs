const a = require('./2.js')
// 模块1无法访问模块2的定义的方法和变量
console.log(a)



/**
 * node.js遵循的规范是Common.js,Common.js规定：
 * 1.每个模块内部,module 变量代表当前模块
 * 2.module变量是一个对象，他的exports属性（即module.exports）是对外的接口
 * 3.加载某个模块，其实是加载该模块的module.exports属性，require()方法用于加载模块
 */