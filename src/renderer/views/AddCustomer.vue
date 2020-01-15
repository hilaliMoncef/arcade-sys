<template>
  <div class="about mt-3">
    <div class="col-8 offset-2 mb-4">
      <div class="row">
        <h1 class="display-4 text-center">
          Ajouter un client
        </h1>
        <p class="lead">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
    <div class="col-8 offset-2">
      <AddSingleCustomer :customer="customer" />
    </div>
  </div>
</template>

<script>
import AddSingleCustomer from '@/components/AddSingleCustomer.vue'

export default {
  name: 'AddCustomer',
  components: {
    AddSingleCustomer
  }
}
</script>
