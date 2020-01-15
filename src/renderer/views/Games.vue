<template>
  <div class="about">
    <div class="col-6 offset-3">
      <div class="row">
        <h1 class="display-4 text-center">
          Gestion des jeux
        </h1>
        <p class="lead">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
    <div class="col-8 offset-2 mt-4">
      <div class="row mb-3 d-flex justify-content-end">
        <router-link
          to="/game/add"
          class="btn btn-primary d-flex align-items-center"
        >
          <font-awesome-icon
            icon="plus"
            class="mr-2"
          />
          <span>Nouveau jeu</span>
        </router-link>
      </div>
      <div
        v-for="game in games"
        :key="game.id"
        class="row mb-3"
      >
        <div class="terminal card w-100">
          <div
            class="terminal d-flex align-items-center justify-content-between"
          >
            <div class="d-flex align-items-center">
              <div class=" px-3">
                <img
                  :src="game.logo"
                  width="80"
                  :alt="game.name"
                >
              </div>
              <div class="py-2 px-3 d-flex flex-column">
                <h3 class="d-block mb-0">
                  {{ game.name }}
                </h3>
                <p class="mt-0 mb-2 small">
                  <strong>Description:</strong> {{ game.description }}
                </p>
              </div>
            </div>
            <div
              class="links d-flex flex-column align-items-stretch bg-light align-self-stretch justify-content-around border-left"
            >
              <a
                href=""
                class="px-3"
                @click.prevent="editGame(game.id)"
              >Modifier</a>
              <a
                href=""
                class="px-3 text-danger"
                @click.prevent="deleteGame(game.id)"
              >Supprimer</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Games',
  data: function () {
    return {
      games: {}
    }
  },
  mounted: function () {
    this.getGames()
  },
  methods: {
    getGames: function () {
      this.$http.get('game/').then(resp => {
        this.games = resp.data
      })
    },
    editGame: function (id) {
      this.$router.push('/game/' + id + '/edit')
    }
  }
}
</script>
