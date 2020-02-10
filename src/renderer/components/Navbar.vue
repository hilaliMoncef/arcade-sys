<template>
  <div
    class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-5 bg-white border-bottom shadow-sm"
  >
    <h5 class="my-0 mr-md-auto font-weight-normal">
      <router-link to="/">
        PULS
      </router-link>
    </h5>
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
