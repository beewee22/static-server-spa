import * as Koa from "koa";
import * as Serve from "koa-static";
import * as Send from "koa-send";

const koa = new Koa();

koa.use(Serve(`${__dirname}/../dist`));
koa.use(async ctx => {
  if (ctx.status === 404)
    await Send(ctx, "index.html", { root: __dirname + "/../dist" });
});

koa.listen(3000);
