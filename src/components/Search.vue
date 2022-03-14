<template>
  <div class="wrap">
    <div>
      <label for="large">大区分：</label>
      <input type="text" name="large" v-model="large">
      <button @click="getdata()">ぼたん</button>
    </div>
    <div class="box">
      <Card v-for="item in res" :key="item" 
        :img="item.img"
        :name="item.name"
        :address="item.address"
        :genre="item.genre"
        :memo="item.memo"
      />
      <h3>{{this.areas}}</h3>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Card from '../components/Card.vue'
export default {
  name: 'Search',
  components: {
    Card
  },
  data(){
    return {
      res: [],
      areas:[]
    }
  },
  methods: {
    init(){
      this.res = []
    },
    async getdata(){
      this.init()

      const baseUrl = '/gourmet/v1/?'
      const apikey = process.env.VUE_APP_apikey
      const url = baseUrl + 'key=' + apikey + '&'
      const format = '&format=json'
      let self = this
      await this.getLargeArea(this.large)
      await axios.get(url + 'large_area=' + this.areas[0] + format)
      .then(response => {
        let data = response.data.results.shop
        console.log(data);
        data.forEach(data => {
          let address = data.address
          let access = data.middle_area.mobile_access
          let memo = data.budget_memo
          let genre = data.genre.name
          let name = data.name
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
      })
    },
    async getLargeArea(area){
      const baseUrl = '/large_area/v1/?'
      const apikey = process.env.VUE_APP_apikey
      const url = baseUrl + 'key=' + apikey + '&'
      const format = 'format=json'
      let self = this

      this.areas[0] = null
      console.log(area);
      await axios.get(url + format)
        .then(response => {
          let data = response.data.results.large_area
          let res = data.find(data => {
            return data.name === area
          })
          self.areas[0] = res.code
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  justify-content:left;
}
.wrap {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}
h5 {
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
