import { createRouter, createWebHistory } from 'vue-router'
import indexView from '../views/indexView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
  // mode: "hash",
  routes: [
    {
      path: "/:catchAll(.*)",
      name: 'catchall',
      component: indexView
    },
    {
      path: '/',
      name: 'index',
      component: indexView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/battlecalculators/general',
      name: 'battlecalculatorsgeneral',
      component: () => import('../views/BattleCalculator/CalculatorGeneral.vue')
    },
    {
      path: '/battlecalculators/list',
      name: 'battlecalculatorslist',
      component: () => import('../views/BattleCalculator/CalculatorList.vue')
    },
    {
      path: '/battlecalculators/rangedcombat',
      name: 'battlecalculatorsrangedcombat',
      component: () => import('../views/BattleCalculator/CalculatorRangedCombat.vue')
    },
    {
      path: '/battlegear/list',
      name: 'battlegearlist',
      component: () => import('../views/BattleGear/GearList.vue')
    },
    {
      path: '/battlegear/sheet/:id',
      name: 'battlegearsheet',
      component: () => import('../views/BattleGear/GearSheet.vue')
    },
    {
      path: '/battlerosters/list',
      name: 'battlerosterslist',
      component: () => import('../views/BattleRosters/RosterList.vue')
    },
    {
      path: '/battlerosters/army/list/:id',
      name: 'battlerostersarmylist',
      component: () => import('../views/BattleRosters/army/ArmyList.vue')
    },
    {
      path: '/battlerosters/army/list/:armyid/squads/:squadid',
      name: 'battlerostersarmylistsquads',
      component: () => import('../views/BattleRosters/army/ArmySquads.vue')
    },
    {
      path: '/battleunits/list',
      name: 'battleunitslist',
      component: () => import('../views/BattleUnits/UnitList.vue')
    },
    {
      path: '/battleunits/sheet/:id',
      name: 'battleunitssheet',
      component: () => import('../views/BattleUnits/UnitSheet.vue')
    },
    {
      path: '/rules/core/contents',
      name: 'rulescorecontents',
      component: () => import('../views/rules/core/Contents.vue')
    },
    {
      path: '/rules/core/playingsurface',
      name: 'rulescoreplayingsurface',
      component: () => import('../views/rules/core/PlayingSurface.vue')
    },
    {
      path: '/rules/core/unitsandgear',
      name: 'rulescoreunitsandgear',
      component: () => import('../views/rules/core/UnitsAndGear.vue')
    },
    {
      path: '/rules/core/squads',
      name: 'rulescoresquads',
      component: () => import('../views/rules/core/Squads.vue')
    },
    {
      path: '/rules/core/gameround',
      name: 'rulescoregameround',
      component: () => import('../views/rules/core/GameRound.vue')
    },
    {
      path: '/rules/core/formulas',
      name: 'rulescoreformulas',
      component: () => import('../views/rules/core/Formulas.vue')
    }
  ]
})

export default router
