import * as Koa from 'koa';
import * as Serve from 'koa-static';
import * as Send from 'koa-send';
import * as helmet from 'koa-helmet';

const koa = new Koa();
const port = process.env.PORT || 80;
const dir = `${__dirname}/../${process.env.SERVE_DIR || 'dist'}`;

koa.use(helmet());

//#region HSTS
const sixtyDaysInSeconds = 5184000;
koa.use(
  helmet.hsts({
    maxAge: sixtyDaysInSeconds,
    includeSubDomains: true,
    preload: true,
  })
);
//#endregion

koa.use(Serve(dir));
koa.use(async ctx => {
  if (ctx.status === 404) await Send(ctx, 'index.html', { root: dir });
});

koa.listen(port);

console.info(`KOA Serves on PORT: ${port}, PATH: ${dir}`);
