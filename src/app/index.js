const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const helmet = require('koa-helmet');

const customRouters = require('./router');

const server = new Koa();
const router = new Router();

server.context.api = true;
server.use(helmet())
server.use(json());
server.use(bodyParser())

router.get('/heath', (ctx) => ctx.body = { server: 'online' });
router.use('/v1', customRouters(router).routes(), customRouters(router).allowedMethods())

server
.use(router.routes())
.use(router.allowedMethods())

module.exports = server;
