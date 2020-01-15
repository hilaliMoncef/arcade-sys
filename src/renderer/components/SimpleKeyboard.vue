<template>
  <div :class="keyboardClass" />
</template>

<script>
import Keyboard from 'simple-keyboard'
import keyNavigation from 'simple-keyboard-key-navigation'
import 'simple-keyboard/build/css/index.css'

export default {
  name: 'SimpleKeyboard',
  props: {
    keyboardClass: {
      default: 'simple-keyboard',
      type: String
    },
    input: {
      type: String
    }
  },
  data: () => ({
    keyboard: null
  }),
  computed: {
    a () {
      return this.$store.state.gamepad.A
    },
    left () {
      return this.$store.state.gamepad.Left
    },
    right () {
      return this.$store.state.gamepad.Right
    },
    top () {
      return this.$store.state.gamepad.Top
    },
    bottom () {
      return this.$store.state.gamepad.Bottom
    }
  },
  watch: {
    a: function (val) {
      if (val) {
        this.keyboard.modules.keyNavigation.press()
      }
    },
    left: function (val) {
      if (val) {
        this.keyboard.modules.keyNavigation.left()
      }
    },
    right: function (val) {
      if (val) {
        this.keyboard.modules.keyNavigation.right()
      }
    },
    top: function (val) {
      if (val) {
        this.keyboard.modules.keyNavigation.up()
      }
    },
    bottom: function (val) {
      if (val) {
        this.keyboard.modules.keyNavigation.down()
      }
    },
    input (input) {
      this.keyboard.setInput(input)
    }
  },
  mounted () {
    this.keyboard = new Keyboard({
      onChange: this.onChange,
      useMouseEvents: true,
      enableKeyNavigation: true,
      modules: [keyNavigation]
    })
  },
  methods: {
    onChange (input) {
      this.$emit('onChange', input)
    },
    handleShift () {
      let currentLayout = this.keyboard.options.layoutName
      let shiftToggle = currentLayout === 'default' ? 'shift' : 'default'

      this.keyboard.setOptions({
        layoutName: shiftToggle
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
