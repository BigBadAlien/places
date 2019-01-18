'use strict';
const app = require('koa')();
const serve = require('koa-static');
const rewrite = require('koa-rewrite');

 
app
  .use(rewrite(/^[^\.]+$/, '/'))
	.use(serve(__dirname + "/build"));

app.listen(8080);
console.log('Server started at port 8080');
