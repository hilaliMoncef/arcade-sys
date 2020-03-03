<template>
  <div class="h-100 w-100">
    <h1>Testing GPIO</h1>
  </div>
</template>

<script>
export default {
  name: "Test",
  data: function() {
    return {
      timer: 0
    };
  },
  mounted: function() {
    var gpio = require("onoff");

    var pushButton = new gpio(35, "in", "both");

    pushButton.watch(function(err, value) {
      if (err) {
        throw err;
      }
      console.log(value);
    });
  },
  methods: {}
};
</script>
