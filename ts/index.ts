import * as Koa from "koa";
import * as Serve from "koa-static";
import * as Send from "koa-send";

const koa = new Koa();
const port = process.env.PORT || 80;
const dir = `${__dirname}/../${process.env.SERVE_DIR || "dist"}`;

console.log(port);

koa.use(Serve(dir));
koa.use(async ctx => {
  if (ctx.status === 404) await Send(ctx, "index.html", { root: dir });
});

koa.listen(port);
