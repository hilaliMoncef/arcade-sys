<template>
  <div>
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 class="display-4">
        Connexion
      </h1>
      <p class="lead">
        Connectez votre terminal pour le mettre en service.
      </p>
    </div>

    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <form class="col-6 offset-3">
      <div class="row">
        <div class="col">
          <label for="firstName">Username</label>
          <input
            v-model="credentials.username"
            type="text"
            class="form-control"
            required
          />
          <div class="invalid-feedback">
            Valid first name is required.
          </div>
        </div>
      </div>
      <div class="row mt-2">
        <div class="col">
          <label for="firstName">Password</label>
          <input
            v-model="credentials.password"
            type="password"
            class="form-control"
            required
          />
          <div class="invalid-feedback">
            Password is invalid.
          </div>
        </div>
      </div>
      <div class="row my-3">
        <div class="col text-center">
          <button class="btn btn-primary btn-lg" @click.prevent="login">
            Se connecter
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Auth",
  data: function() {
    return {
      credentials: {
        username: "",
        password: ""
      },
      loading: false,
      error: ""
    };
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
