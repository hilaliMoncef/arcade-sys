import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

import Home from '../views/Home.vue'
import Campaigns from '../views/Campaigns.vue'
import Campaign from '../views/Campaign.vue'
import EditCampaign from '../views/EditCampaign.vue'
import AddCampaign from '../views/AddCampaign.vue'
import Customers from '../views/Customers.vue'
import AddCustomer from '../views/AddCustomer.vue'
import EditCustomer from '../views/EditCustomer.vue'
import Terminals from '../views/Terminals.vue'
import Terminal from '../views/Terminal.vue'
import EditTerminal from '../views/EditTerminal.vue'
import AddTerminal from '../views/AddTerminal.vue'
import Games from '../views/Games.vue'
import EditGame from '../views/EditGame.vue'
import AddGame from '../views/AddGame.vue'
import Login from '../views/Login.vue'

import StartTerminal from '../views/Game/StartTerminal.vue'
import GameChoice from '../views/Game/GameChoice.vue'
import ShowCampaign from '../views/Game/ShowCampaign.vue'
import StopTerminal from '../views/Game/StopTerminal.vue'
import Payment from '../views/Game/Payment.vue'
import Play from '../views/Game/Play.vue'
import Endgame from '../views/Game/Endgame.vue'
import EmailSent from '../views/Game/EmailSent.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/campaigns',
    name: 'campaings',
    component: Campaigns,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/campaign/add',
    name: 'add-campaign',
    component: AddCampaign,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/campaign/:id',
    name: 'campaign',
    component: Campaign,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/campaign/:id/edit',
    name: 'edit-campaign',
    component: EditCampaign,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/customers',
    name: 'customers',
    component: Customers
  },
  {
    path: '/customer/:id/edit',
    name: 'edit-customer',
    component: EditCustomer,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/customer/add',
    name: 'add-customer',
    component: AddCustomer,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/games',
    name: 'games',
    component: Games
  },
  {
    path: '/game/:id/edit',
    name: 'edit-game',
    component: EditGame,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/game/add',
    name: 'add-game',
    component: AddGame,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAnon: true
    }
  },
  {
    path: '/start',
    name: 'start',
    component: StartTerminal,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/stop',
    name: 'stop',
    component: StopTerminal,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/choose',
    name: 'choose',
    component: GameChoice,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/payment',
    name: 'payment',
    component: Payment,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/watch',
    name: 'watch',
    component: ShowCampaign,
    meta: {
      requiresAuth: true,
      onlyFrom: 'payment'
    }
  },
  {
    path: '/play',
    name: 'play',
    component: Play,
    meta: {
      requiresAuth: true,
      onlyFrom: 'watch'
    }
  },
  {
    path: '/endgame',
    name: 'endgame',
    component: Endgame,
    meta: {
      requiresAuth: true,
      onlyFrom: 'play'
    }
  },
  {
    path: '/sent',
    name: 'sent',
    component: EmailSent,
    meta: {
      requiresAuth: true,
      onlyFrom: 'endgame'
    }
  },
  {
    path: '/terminals',
    name: 'terminals',
    component: Terminals,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/terminal/add',
    name: 'add-terminal',
    component: AddTerminal,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
  {
    path: '/terminal/:id',
    name: 'terminal',
    component: Terminal,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/terminal/:id/edit',
    name: 'edit-terminal',
    component: EditTerminal,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.onlyFrom)) {
    if (from.name == to.meta.onlyFrom) {
      next()
      return
    }
    next('/start')
  } else if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (store.getters.isAdmin) {
      next()
      return
    }
    next('/')
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else if (to.matched.some(record => record.meta.requiresAnon)) {
    if (!store.getters.isLoggedIn) {
      next()
      return
    }
    next('/')
  } else {
    next()
  }
})

export default router
