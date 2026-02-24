import { onRequest as __api_og_ts_onRequest } from "/Users/rakuto/Documents/TikunamiCity/functions/api/og.ts"
import { onRequest as __share_ts_onRequest } from "/Users/rakuto/Documents/TikunamiCity/functions/share.ts"

export const routes = [
    {
      routePath: "/api/og",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_og_ts_onRequest],
    },
  {
      routePath: "/share",
      mountPath: "/",
      method: "",
      middlewares: [],
      modules: [__share_ts_onRequest],
    },
  ]