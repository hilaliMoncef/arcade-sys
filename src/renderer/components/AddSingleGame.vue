<template>
  <form class="w-100">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="form-group w-100">
            <label for="name">Nom du jeu</label>
            <input
              v-model="game.name"
              type="text"
              class="form-control"
              aria-describedby="nameHelp"
            >
            <small
              id="nameHelp"
              class="form-text text-muted"
            >Le nom affiché du jeu.</small>
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
            >
            <small
              id="nameHelp"
              class="form-text text-muted"
            >Le chemin du fichier de lancement du jeu (en
              construction).</small>
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
            <small
              id="nameHelp"
              class="form-text text-muted"
            >Une courte description du jeu.</small>
          </div>
        </div>
        <div class="row">
          <div class="form-group w-100">
            <label for="logo">Logo</label>
            <input
              ref="logo"
              type="file"
              class="form-control-file"
              aria-describedby="fileHelpId"
            >
            <small
              id="fileHelpId"
              class="form-text text-muted"
            >Un logo en PNG pour le jeu.</small>
          </div>
        </div>
      </div>
    </div>
    <div class="row my-3">
      <div class="col text-center">
        <router-link
          to="/games"
          class="btn btn-link"
        >
          Retour
        </router-link>
        <button
          class="btn btn-primary"
          @click.prevent="add"
        >
          Enregistrer les modifications
        </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: 'AddGameForm',
  data: function () {
    return {
      game: {}
    }
  },
  methods: {
    add: function () {
      if (this.game) {
        let form = new FormData()
        form.append('name', this.game.name)
        form.append('path', this.game.path)
        form.append('description', this.game.description)
        form.append('logo', this.$refs.logo.files[0])
        this.$http
          .post('game/', form, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(resp => {
            this.game = resp.data
            this.$router.push('/games')
          })
      }
    }
  }
}
</script>
