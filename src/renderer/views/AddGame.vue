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
      <AddSingleGame />
    </div>
  </div>
</template>

<script>
import AddSingleGame from '@/components/AddSingleGame.vue'

export default {
  name: 'AddGame',
  components: {
    AddSingleGame
  }
}
</script>
