<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <div v-for="item in res" :key="item">
      <img :src=item.img alt="">
      <h3>{{ item.name }}</h3>
      <h3>{{ item.address }}</h3>
      <h3>{{ item.access }}</h3>
      <h3>{{ item.img }}</h3>
      <h3>{{ item.genre }}</h3>
      <h3>{{ item.memo }}</h3>
    </div>
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
      res: []
    }
  },
  methods: {
    getdata(){
      const baseUrl = '/v1/?'
      const apikey = process.env.VUE_APP_apikey
      const url = baseUrl + 'key=' + apikey + '&'
      const format = '&format=json'
      let self = this
      axios.get(url + 'large_area=Z011' + format)
      .then(response => {
        let data = response.data.results.shop
        data.forEach(data => {
          let address = data.address
          let access = data.middle_area.mobile_access
          let memo = data.budget_memo || ''
          let genre = data.genre.name
          let name = data.middle_area.name
          let img = data.photo.pc.m

          console.log(img);
          self.res.push({
            name: name,
            access: access,
            genre: genre,
            address: address,
            img: img,
            memo: memo
          })

        })
        console.log(data);
      })
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
