<template>
  <div class="about mt-3">
    <div class="col-8 offset-2 mb-4">
      <div class="row">
        <h1 class="display-4 text-center">
          Ajouter un jeu
        </h1>
        <p class="lead">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
    <div class="col-8 offset-2">
      <EditSingleGame :id="game_id" />
    </div>
  </div>
</template>

<script>
import EditSingleGame from '@/components/EditSingleGame.vue'

export default {
  name: 'EditGame',
  components: {
    EditSingleGame
  },
  data: function () {
    return {
      game_id: this.$route.params.id
    }
  }
}
</script>
