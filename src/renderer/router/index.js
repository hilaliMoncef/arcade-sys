import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index.js";

import Home from "../views/Home.vue";
// import Campaigns from '../views/Campaigns.vue'
// import Campaign from '../views/Campaign.vue'
// import EditCampaign from '../views/EditCampaign.vue'
// import AddCampaign from '../views/AddCampaign.vue'
// import Customers from '../views/Customers.vue'
// import AddCustomer from '../views/AddCustomer.vue'
// import EditCustomer from '../views/EditCustomer.vue'
// import Terminals from '../views/Terminals.vue'
// import Terminal from '../views/Terminal.vue'
// import EditTerminal from '../views/EditTerminal.vue'
// import AddTerminal from '../views/AddTerminal.vue'
// import Games from '../views/Games.vue'
// import EditGame from '../views/EditGame.vue'
// import AddGame from '../views/AddGame.vue'
import Login from "../views/Login.vue";

import StartTerminal from "../views/Game/StartTerminal.vue";
import GameChoice from "../views/Game/GameChoice.vue";
import ShowCampaign from "../views/Game/ShowCampaign.vue";
import StopTerminal from "../views/Game/StopTerminal.vue";
import Payment from "../views/Game/Payment.vue";
import Play from "../views/Game/Play.vue";
import Endgame from "../views/Game/Endgame.vue";
import EmailSent from "../views/Game/EmailSent.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Login
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requiresAnon: true
    }
  },
  {
    path: "/start",
    name: "start",
    component: StartTerminal,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/stop",
    name: "stop",
    component: StopTerminal,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/choose",
    name: "choose",
    component: GameChoice,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/payment",
    name: "payment",
    component: Payment,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/watch",
    name: "watch",
    component: ShowCampaign,
    meta: {
      requiresAuth: true,
      onlyFrom: "payment"
    }
  },
  {
    path: "/play",
    name: "play",
    component: Play,
    meta: {
      requiresAuth: true,
      onlyFrom: "watch"
    }
  },
  {
    path: "/endgame",
    name: "endgame",
    component: Endgame,
    meta: {
      requiresAuth: true,
      onlyFrom: "play"
    }
  },
  {
    path: "/sent",
    name: "sent",
    component: EmailSent,
    meta: {
      requiresAuth: true,
      onlyFrom: "endgame"
    }
  }
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.onlyFrom)) {
    if (from.name == to.meta.onlyFrom) {
      next();
      return;
    }
    next("/start");
  } else if (to.matched.some(record => record.meta.requiresAdmin)) {
    if (store.getters.isAdmin) {
      next();
      return;
    }
    next("/");
  } else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else if (to.matched.some(record => record.meta.requiresAnon)) {
    if (!store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/");
  } else {
    next();
  }
});

export default router;
