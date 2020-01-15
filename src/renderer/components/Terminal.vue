<template>
  <div class="terminal card w-100">
    <div class="terminal d-flex align-items-center justify-content-between">
      <div
        class="clickable py-2 px-3 d-flex align-items-center w-100"
        @click="showDetail"
      >
        <img
          class="mx-3"
          src="@/assets/img/console.png"
          height="70"
          alt="Console"
        >
        <div class="d-flex flex-column justify-content-between">
          <strong>{{ currentTerminal.name }}</strong>
          <p class="small my-1">
            Campagne:
            <span
              v-for="campaign in campaigns"
              :key="campaign.id"
              class="border px-2 mx-1 rounded border-primary text-primary"
            >{{ campaign.name }}</span>
          </p>
          <p class="small my-1">
            Jeux:
            <span
              v-for="game in games"
              :key="game.id"
              class="border px-2 mx-1 rounded border-secondary text-secondary"
            >{{ game.name }}</span>
          </p>
        </div>
        <div class="d-flex flex-column ml-auto">
          <span
            v-if="currentTerminal.is_active"
            class="badge badge-success my-1"
          >Activé</span>
          <span
            v-else
            class="badge badge-danger my-1"
          >Inactive</span>
          <span
            v-if="currentTerminal.is_on"
            class="badge badge-success my-1"
          >Allumé</span>
          <span
            v-else
            class="badge badge-danger my-1"
          >Eteint</span>
          <span
            v-if="currentTerminal.is_playing"
            class="badge badge-success my-1"
          >En jeu</span>
          <span
            v-else
            class="badge badge-warning my-1"
          >En attente</span>
        </div>
      </div>
      <div
        class="links d-flex flex-column align-items-stretch bg-light align-self-stretch justify-content-around border-left"
      >
        <a
          v-if="currentTerminal.is_active"
          href=""
          class="text-danger px-3"
          @click.prevent="deactivateTerminal"
        >Désactiver</a>
        <a
          v-else
          href=""
          class="text-success px-3"
          @click.prevent="activateTerminal"
        >Activer</a>
        <a
          href=""
          class="px-3"
          @click.prevent="editTerminal"
        >Modifier</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Terminals',
  props: ['terminal'],
  data: function () {
    return {
      currentTerminal: this.terminal,
      campaigns: {},
      games: {}
    }
  },
  mounted: function () {
    if (this.currentTerminal.campaigns && this.currentTerminal.games) {
      this.$http
        .get('terminal/' + this.currentTerminal.id + '/campaigns/')
        .then(resp => {
          this.campaigns = resp.data
        })
      this.$http
        .get('terminal/' + this.currentTerminal.id + '/games/')
        .then(resp => {
          this.games = resp.data
        })
    } else {
      this.campaigns = ['Non assigné']
    }
  },
  methods: {
    showDetail: function () {
      this.$router.push({
        name: 'terminal',
        params: { id: this.currentTerminal.id }
      })
    },
    editTerminal: function () {
      this.$router.push({
        name: 'edit-terminal',
        params: { id: this.currentTerminal.id }
      })
    },
    activateTerminal: function () {
      if (this.currentTerminal.campaigns && this.currentTerminal.games) {
        this.$http
          .get('terminal/' + this.currentTerminal.id + '/activate/')
          .then(resp => {
            this.currentTerminal = resp.data
          })
      } else {
        console.error(
          "Impossible d'activer un terminal sans campagne ou sans jeu."
        )
      }
    },
    deactivateTerminal: function () {
      this.$http
        .get('terminal/' + this.currentTerminal.id + '/deactivate/')
        .then(resp => {
          this.currentTerminal = resp.data
        })
    }
  }
}
</script>

<style>
.clickable {
  cursor: pointer;
}
</style>
