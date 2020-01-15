<template>
  <div class="about mt-3">
    <div class="col-8 offset-2 mb-4">
      <div class="row">
        <h1 class="display-4 text-center">
          Customer n° {{ customer.id }}
        </h1>
        <p class="lead">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
    <div class="col-8 offset-2">
      <EditSingleCustomer :customer="customer" />
    </div>
  </div>
</template>

<script>
import EditSingleCustomer from '@/components/EditSingleCustomer.vue'

export default {
  name: 'EditCustomer',
  components: {
    EditSingleCustomer
  },
  data: function () {
    return {
      customer: {}
    }
  },
  mounted: function () {
    this.getCustomer()
  },
  methods: {
    getCustomer: function () {
      this.$http
        .get('customer/' + this.$route.params.id + '/')
        .then(resp => {
          this.customer = resp.data
        })
        .catch(err => {
          if (err.response.status == 404) {
            this.$router.push('/customers')
          }
        })
    }
  }
}
</script>
