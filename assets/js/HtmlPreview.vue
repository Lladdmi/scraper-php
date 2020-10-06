<template>
  <div>
    <a href="#" v-scroll-to="'#here'">Scroll to #element</a>
    <button v-on:click="test">test</button>
    <div id="preview">
      {{ html }}
    </div>
  </div>
</template>

<script>
export default {
  name: "html_prev",
  components: {

  },
  data() {
    return {
      html: 'testtest'
    }
  },
  methods:{
    test(event){
      console.log(event);
    }
  }
}
</script>