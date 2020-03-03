<template>
  <div class="h-100 w-100">
    
  </div>
</template>

<script>
import SimpleKeyboard from "@/components/SimpleKeyboard.vue";

export default {
  name: "Test",
  components: {
    SimpleKeyboard
  },
  data: function() {
    return {
      timer: 0,
      duration: 0,
      videoId: "TM86NgP2zx8",
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        showinfo: 0
      }
    };
  },
  mounted: function() {
    this.shell();
  },
  methods: {
    shell:  function() {
      var exec = require("child_process").exec;
      var shell = exec("retroarch", {
          timeout: 7000
        }, (error, stdout, stderr) => {
        if (error) {
          console.warn(error);
        }
        console.log(stdout);
      });
      var timer = setTimeout(function() {
        exec('killall "retroarch"');
      }, 7000);
    }
  }
};
</script>
