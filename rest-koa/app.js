// 使用koa的js

const Koa = require('koa')

const bodyParser = require('koa-bodyparser')

const controller = require('./controller')

const templating = require('./templating')

const rest = require('./rest')

const model = require('./model')

const path = require('path')

const app = new Koa()

// log request URL:
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`)
  await next()
})

// static file support:
let staticFiles = require('./static-files')
app.use(staticFiles(path.join('/static/', __dirname, '/static')))

// parse request body:
app.use(bodyParser())

// add nunjucks as view:
app.use(templating('views', {
  noCache: true,
  watch: true
}))

// bind .rest() for ctx:
app.use(rest.restify())

// add controllers:
app.use(controller())

// 监听3000端口
app.listen(3000, () => {
  console.log('app started at port 3000...')
})
