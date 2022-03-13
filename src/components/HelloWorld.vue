<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <h2>{{ res }}</h2>
    <button @click="getdata()">ぼたん</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      res: ''
    }
  },
  methods: {
    getdata(){
      const baseUrl = '/v1/?'
      const apikey = process.env.VUE_APP_apikey
      const url = baseUrl + 'key=' + apikey + '&'
      let self = this
      axios.get(url + 'large_area=Z011')
      .then(data => self.res = data)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
