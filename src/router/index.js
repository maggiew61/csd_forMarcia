import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios';
import VueAxios from 'vue-axios';
import home from '@/components/home'
import currencyList from '@/components/currencyList'
import platform from '@/components/platform'
import commodity from '@/components/commodity'
import secElement from '@/components/secElement'
import csd_TopFivePieChart from '@/components/csd_TopFivePieChart'
import fourthElement from '@/components/fourthElement'
import mapUpdated from '@/components/mapUpdated'
import Poultry from '@/components/Poultry'
import mothOrchid from '@/components/mothOrchid'
import csdLinePlatform from '@/components/csd-linePlatform'
import foreignExchange from '@/components/foreignExchange'
import test from '@/components/test'

// powerbi
import flower_exportworld from '@/components/flower_exportworld'
import flower_export5 from '@/components/flower_export5'
import flower_worldrank from '@/components/flower_worldrank'
import flowerseed_export from '@/components/flowerseed_export'
import flowerseed_worldrank from '@/components/flowerseed_worldrank'
import poultryegg_worldrank from '@/components/poultryegg_worldrank'
import poultryegg_export5 from '@/components/poultryegg_export5'
import poultryleg_worldrank from '@/components/poultryleg_worldrank'
import poultryleg_export5 from '@/components/poultryleg_export5'
import poultryessence_export5 from '@/components/poultryessence_export5'
import poultryessence_worldrank from '@/components/poultryessence_worldrank'


Vue.use(Router)
Vue.use(VueAxios, axios);

const router = new Router({
  base: '',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/csd-linePlatform',
      name: 'csd-linePlatform',
      component: csdLinePlatform,
    },
    {
      path: '/mapUpdated',
      name: 'mapUpdated',
      component: mapUpdated,
    },
    {
      path: '/product_ranking',
      name: 'product_ranking',
      component: secElement,
    },
    {
      path: '/csd_TopFivePieChart',
      name: 'csd_TopFivePieChart',
      component: csd_TopFivePieChart,
    },
    {
      path: '/top_ten',
      name: 'top_ten',
      component: fourthElement,
    },
    {
      path: '/commodity',
      name: 'commodity',
      component: commodity,
    },
    {
      path: '/b',
      name: 'platform',
      component: platform,
    },
    {
      path: '/Poultry',
      name: 'Poultry',
      props: {  //重點
        keyword: 'chicken',
        test: 'anne hathaway'
      },
      component: Poultry,
    },
    {
      path: '/mothOrchid',
      name: 'mothOrchid',
      component: mothOrchid,
    },
    {
      path: '/foreignExchange',
      name: 'foreignExchange',
      component: foreignExchange,
    },
    {
      path: '/test',
      name: 'test',
      component: test,
    },
    // powerbi
    {
      path: '/flower_exportworld',
      name: 'flower_exportworld',
      component: flower_exportworld,
    },
    {
      path: '/flower_export5',
      name: 'flower_export5',
      component: flower_export5,
    },
    {
      path: '/flower_worldrank',
      name: 'flower_worldrank',
      component: flower_worldrank,
    },
    {
      path: '/flowerseed_export',
      name: 'flowerseed_export',
      component: flowerseed_export,
    },
    {
      path: '/flowerseed_worldrank',
      name: 'flowerseed_worldrank',
      component: flowerseed_worldrank,
    },
    {
      path: '/poultryegg_worldrank',
      name: 'poultryegg_worldrank',
      component: poultryegg_worldrank,
    },
    {
      path: '/poultryegg_export5',
      name: 'poultryegg_export5',
      component: poultryegg_export5,
    },
    {
      path: '/poultryleg_worldrank',
      name: 'poultryleg_worldrank',
      component: poultryleg_worldrank,
    },
    {
      path: '/poultryleg_export5',
      name: 'poultryleg_export5',
      component: poultryleg_export5,
    },
    {
      path: '/poultryessence_export5',
      name: 'poultryessence_export5',
      component: poultryessence_export5,
    },
    {
      path: '/poultryessence_worldrank',
      name: 'poultryessence_worldrank',
      component: poultryessence_worldrank,
    },
  ],
});

router.beforeEach((to, from, next) => {
  next();
});
export default router;


// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Hello',
//       component: home
//     },
//     {
//       path: '/a',  //localhost:8080/#/a
//       name: 'Hello2',
//       component: test2
//     },
//     {
//       path: '/currencyList',  //localhost:8080/#/a
//       name: 'currencyList',
//       component: currencyList
//     },
//
//     // {
//     //   path: '/test',
//     //   name: 'Hello',
//     //   component: test
//     // }
//   ]
// })


// bobo gdelt
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Gdelt',
//       component: Gdelt,
//       props: {  //重點
//         keyword: 'Orchid cut flowers',
//       }
//     }
//   ]
// })
