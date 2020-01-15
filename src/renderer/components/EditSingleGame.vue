<template>
  <form class="w-100">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="card w-100 card-rounded mb-3">
            <div class="card-body">
              <div class="form-group d-flex flex-column align-items-center">
                <img :src="game.logo" :alt="game.name" height="100" />
                <input
                  ref="logo"
                  type="file"
                  class="form-control-file mt-5 my-3 text-center w-auto"
                  aria-describedby="fileHelpId"
                />
                <button
                  type="button"
                  class="btn btn-primary"
                  @click.prevent="editLogo"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="form-group w-100">
            <label for="name">Nom du jeu</label>
            <input
              v-model="game.name"
              type="text"
              class="form-control"
              aria-describedby="nameHelp"
            />
            <small id="nameHelp" class="form-text text-muted"
              >Le nom affiché du jeu.</small
            >
          </div>
        </div>
        <div class="row">
          <div class="form-group w-100">
            <label for="name">Path du jeu</label>
            <input
              v-model="game.path"
              type="text"
              class="form-control"
              aria-describedby="nameHelp"
            />
            <small id="nameHelp" class="form-text text-muted"
              >Le chemin du fichier de lancement du jeu (en
              construction).</small
            >
          </div>
        </div>
        <div class="row">
          <div class="form-group w-100">
            <label for="name">Description</label>
            <textarea
              v-model="game.description"
              class="form-control"
              aria-describedby="nameHelp"
            />
            <small id="nameHelp" class="form-text text-muted"
              >Une courte description du jeu.</small
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row my-3">
      <div class="col text-center">
        <router-link to="/games" class="btn btn-link">
          Retour
        </router-link>
        <button class="btn btn-primary" @click.prevent="edit">
          Enregistrer les modifications
        </button>
      </div>
    </div>
  </form>
</template>

<script>
var FormData = require("form-data");
var fs = require("fs");

export default {
  name: "EditGameForm",
  props: ["id"],
  data: function() {
    return {
      game: {}
    };
  },
  mounted: function() {
    this.$http.get("game/" + this.id + "/").then(resp => {
      this.game = resp.data;
    });
  },
  methods: {
    editLogo: function() {
      if (this.game) {
        let formData = new FormData();
        formData.append(
          "logo",
          fs.createReadStream(this.$refs.logo.files[0].path)
        );
        console.log(this.$refs.logo.files[0]);
        console.log(formData);
        this.$http
          .patch("game/" + this.id + "/", formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          })
          .then(resp => {
            console.log(resp);
            this.game = resp.data;
            this.$router.push("/games");
          });
      }
    },
    edit: function() {
      if (this.game) {
        let game = {
          id: this.game.id,
          name: this.game.name,
          path: this.game.path
        };
        this.$http.patch("game/" + this.id + "/", game).then(resp => {
          this.game = resp.data;
          this.$router.push("/games");
        });
      }
    }
  }
};
</script>
