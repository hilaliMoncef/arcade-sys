<template>
  <form class="w-100">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="form-group w-100">
            <label for="name">Nom de l'entreprise</label>
            <input
              v-model="customer.company"
              type="text"
              class="form-control"
              aria-describedby="nameHelp"
            >
            <small
              id="nameHelp"
              class="form-text text-muted"
            >Le nom de l'entreprise cliente.</small>
          </div>
        </div>
        <div class="row">
          <div class="form-group w-100">
            <label for="name">Contact au sein de l'entreprise</label>
            <input
              v-model="customer.representative"
              type="text"
              class="form-control"
              aria-describedby="nameHelp"
            >
            <small
              id="nameHelp"
              class="form-text text-muted"
            >Le nom ou l'email de votre contact dans cette entreprise.</small>
          </div>
        </div>
        <div class="row">
          <div class="col-6 pl-0">
            <div class="form-group">
              <label for="sales_type">Type de vente</label>
              <select
                v-model="customer.sales_type"
                class="form-control"
              >
                <option value="A">
                  Achat
                </option>
                <option value="L">
                  Location
                </option>
              </select>
            </div>
          </div>
          <div class="col-6 pr-0">
            <div class="form-group">
              <label for="sales_type">Contrat de maintenance</label>
              <select
                v-model="customer.maintenance_type"
                class="form-control"
              >
                <option value="option1">
                  Option 1
                </option>
                <option value="option2">
                  Option 2
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col text-center">
        <router-link
          to="/customers"
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
  name: 'AddCustomerForm',
  data: function () {
    return {
      customer: {}
    }
  },
  methods: {
    add: function () {
      if (this.customer) {
        this.$http.post('customer/', this.customer).then(resp => {
          this.customer = resp.data
          this.$router.push('/customers')
        })
      }
    }
  }
}
</script>
