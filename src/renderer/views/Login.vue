<template>
  <div>
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">
        Connexion en cours
      </h1>
      <p class="lead">
        Connectez votre terminal pour le mettre en service.
      </p>
    </div>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div class="d-flex justify-content-center">
      <div class="spinner-border text-success" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Auth",
  data: function() {
    return {
      credentials: {
        username: process.env.PULS_LOGIN,
        password: process.env.PULS_MDP
      },
      loading: false,
      error: ""
    };
  },
  mounted: function() {
    this.$store.dispatch("logout");
    this.$router.push("/login");
    if (this.$store.getters.isLoggedIn) {
      this.$router.push("/start");
    } else {
      this.login();
    }
  },
  methods: {
    login: function() {
      this.loading = true;
      this.$store
        .dispatch("login", this.credentials)
        .then(() => this.$router.push("/start"))
        .catch(err => {
          this.loading = false;
          this.error = err.response;
        });
    }
  }
};
</script>
