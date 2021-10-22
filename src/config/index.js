//主线 路由
import { masterRouterMap } from "./master";
import { zhqRouterMap } from "./zhq";
import { wxmRouterMap } from "./wxm";
export const collectionRouterMap = [...masterRouterMap, ...zhqRouterMap, ...wxmRouterMap];