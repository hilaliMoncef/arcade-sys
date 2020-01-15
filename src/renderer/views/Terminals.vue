<template>
  <div class="about">
    <div class="col-6 offset-3">
      <div class="row">
        <h1 class="display-4 text-center">
          Gestion de terminaux
        </h1>
        <p class="lead">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
    <div class="col-10 offset-1 mt-4">
      <div class="row mb-3 d-flex justify-content-end">
        <router-link
          to="/terminal/add"
          class="btn btn-primary d-flex align-items-center"
        >
          <font-awesome-icon
            icon="plus"
            class="mr-2"
          />
          <span>Nouveau terminal</span>
        </router-link>
      </div>
      <div class="row">
        <Terminal
          v-for="terminal in terminals"
          :key="terminal.id"
          :terminal="terminal"
          class="mb-3"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Terminal from '@/components/Terminal.vue'

export default {
  name: 'Terminals',
  components: {
    Terminal
  },
  data: function () {
    return {
      terminals: ''
    }
  },
  mounted: function () {
    this.getTerminals()
  },
  methods: {
    getTerminals: function () {
      this.$http.get('terminal/').then(resp => {
        this.terminals = resp.data
      })
    }
  }
}
</script>
