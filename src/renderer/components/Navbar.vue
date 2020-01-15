<template>
  <div
    class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-5 bg-white border-bottom shadow-sm"
  >
    <h5 class="my-0 mr-md-auto font-weight-normal">
      <router-link to="/">
        PULS
      </router-link>
    </h5>
    <nav class="my-2 my-md-0 mr-md-3">
      <div v-if="!isAdmin">
        <router-link v-if="!isTerminalOn" class="p-2 text-dark" to="/start">
          Démarrer la borne
        </router-link>
        <router-link v-else class="p-2 text-dark text-danger" to="/stop">
          Arrêter la borne
        </router-link>
      </div>
      <span v-if="isLoggedIn && isAdmin">
        <a
          id="dropdownAdminMenu"
          class="dropdown-toggle p-2"
          href="#"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Admin
        </a>

        <div class="dropdown-menu" aria-labelledby="dropdownAdminMenu">
          <router-link class="dropdown-item p-2 text-dark" to="/terminals"
            >Terminaux</router-link
          >
          <router-link class="dropdown-item p-2 text-dark" to="/campaigns"
            >Campagnes</router-link
          >
          <router-link class="dropdown-item p-2 text-dark" to="/games"
            >Jeux</router-link
          >
          <router-link class="dropdown-item p-2 text-dark" to="/customers"
            >Clients</router-link
          >
        </div>
      </span>
    </nav>
    <router-link v-if="!isLoggedIn" class="btn btn-outline-primary" to="/login">
      <font-awesome-icon icon="user-secret" /> Connexion
    </router-link>
    <a v-else href="#" class="btn btn-outline-primary" @click.prevent="logout"
      >Déconnexion</a
    >
  </div>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    isAdmin: function() {
      return this.$store.getters.isAdmin;
    },
    isSuperAdmin: function() {
      return this.$store.getters.isSuperAdmin;
    },
    isTerminalOn: function() {
      return this.$store.state.currentTerminal.is_on;
    }
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    }
  }
};
</script>
