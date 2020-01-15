<template>
  <div class="home">
    <div v-if="isAdmin">
      <h1 class="display-4 font-weight-bold">
        Bienvenue
      </h1>
      <p class="lead">
        Vous avez désormais accès à la console d'administration. Que voulez-vous
        faire ?
      </p>
      <div class="d-flex align-items center">
        <router-link
          to="/terminals"
          class="btn btn-outline-primary mr-2"
        >
          Gestion des terminaux
        </router-link>
        <router-link
          to="/campaigns"
          class="btn btn-outline-primary mr-2"
        >
          Gestion des campagnes
        </router-link>
        <router-link
          to="/games"
          class="btn btn-outline-primary mr-2"
        >
          Gestion des jeux
        </router-link>
        <router-link
          to="/customers"
          class="btn btn-outline-primary mr-2"
        >
          Gestion des clients
        </router-link>
      </div>
    </div>
    <div v-else-if="isLoggedIn">
      <h1 class="display-4 font-weight-bold">
        Bienvenue sur ce terminal
      </h1>
      <p class="lead">
        Votre terminal est bien connecté à notre réseau. Que voulez-vous faire ?
      </p>
      <div class="d-flex align-items center">
        <router-link
          to="/start"
          class="btn btn-outline-primary mr-2"
        >
          Lancer la session
        </router-link>
        <a
          href="mailto:hilali.moncef@gmail.com"
          class="btn btn-outline-primary mr-2"
        >
          Contacter le support
        </a>
      </div>
    </div>
    <div v-else>
      <h1 class="display-4 font-weight-bold">
        Bonjour !
      </h1>
      <p class="lead">
        Pour commencer, veuillez vous connecter.
      </p>
      <div class="d-flex align-items center">
        <router-link
          to="/login"
          class="btn btn-outline-primary mr-2"
        >
          Se connecter
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: function () {
    return {
      isAdmin: this.$store.getters.isAdmin,
      isLoggedIn: this.$store.getters.isLoggedIn
    }
  }
}
</script>
