import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

import { collectionRouterMap } from "@/config";



const router = new VueRouter({
  routes: collectionRouterMap
})

export default router
