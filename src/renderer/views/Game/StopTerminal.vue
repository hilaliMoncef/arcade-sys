<template>
  <div>
    <div class="home">
      <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">
          Borne désactivée
        </h1>
        <p class="lead">
          Cliquer sur start pour relancer la borne.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
	export default {
	  name: 'StopTerminal',
	  mounted: function () {
	    this.$http.get('terminal/mine/off/')
	      .then(resp => {
	        console.log(resp)
	        this.$store.commit('stopTerminal')
	      }).catch(err => {
	        console.error(err.response)
	      })
	  }
	}
</script>
