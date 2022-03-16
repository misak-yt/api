<template>
  <div class="wrap">
    <div>
      <div>
        <label for="large">大区分：</label>
        <input type="text" name="large" v-model="large">
        <label for="large">中区分：</label>
        <input type="text" name="middle" v-model="middle">
        <label for="large">小区分：</label>
        <input type="text" name="small" v-model="small">
      </div>
      <div>
        <label for="large">どれくらい表示する？</label>
        <input type="text" name="count" v-model="count">
      </div>
      <button @click="getdata()">ぼたん</button>
    </div>
    <div class="box">
      <Card v-for="item in res" :key="item" 
        :img="item.img"
        :name="item.name"
        :address="item.address"
        :genre="item.genre"
        :memo="item.memo"
        :href="item.url"
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

      if ((this.large === undefined|| this.large === '')&& (this.middle === undefined|| this.middle === '')&& (this.small === undefined||this.small === ''))  {
        alert("大区分、中区分、小区分いずれか入力してください")
      }
      console.log(`large:${this.large}, middle:${this.middle}, small:${this.small}`);
      const baseUrl = '/gourmet/v1/?key='
      const apikey = process.env.VUE_APP_apikey
      const url = baseUrl + apikey 
      const size = '&count=' + this.count
      const format = '&format=json'
      let self = this
      let area = ''

      if (this.large !== undefined&& this.large !== '') {
        await this.getLargeArea(this.large)
        area += '&large_area=' + this.areas[0]
      }
      if (this.middle !== undefined&& this.middle !== '') {
        await this.getMiddleArea(this.middle)
        area += '&middle_area=' + this.areas[1]
      }
      if (this.small !== undefined&& this.small !== '') {
        await this.getSmallArea(this.small)
        area += '&small_area=' + this.areas[2]
      }
      await axios.get(url + area + size + format)
      .then(response => {
        console.log(response);
        let data = response.data.results.shop
        data.forEach(data => {
          let address = data.address
          let access = data.middle_area.mobile_access
          let memo = data.budget_memo
          let genre = data.genre.name
          let name = data.name
          let img = data.photo.pc.m
          let url = data.urls.pc

          self.res.push({
            name: name,
            access: access,
            genre: genre,
            address: address,
            img: img,
            memo: memo,
            url: url
          })

        })
      })
    },
    async getLargeArea(area){
      const baseUrl = '/large_area/v1/?key='
      const apikey = process.env.VUE_APP_apikey
      const url = baseUrl + apikey + '&'
      const format = 'format=json'
      let self = this

      this.areas[0] = null
      await axios.get(url + format)
        .then(response => {
          let data = response.data.results.large_area
          let res = data.find(data => {
            return data.name === area
          })
          self.areas[0] = res.code
        })
    },
    async getMiddleArea(area){
      const baseUrl = '/middle_area/v1/?key='
      const apikey = process.env.VUE_APP_apikey
      const url = baseUrl + apikey + '&'
      const format = 'format=json'
      let self = this

      this.areas[1] = null
      console.log(area);
      await axios.get(url + format)
        .then(response => {
          let data = response.data.results.middle_area
          let res = data.find(data => {
            return data.name.indexOf(area) !== -1
          })
          self.areas[1] = res.code
        })
    },
    async getSmallArea(area){
      const baseUrl = '/small_area/v1/?key='
      const apikey = process.env.VUE_APP_apikey
      const url = baseUrl + apikey + '&'
      const format = 'format=json'
      let self = this

      this.areas[2] = null
      console.log(area);
      await axios.get(url + format)
        .then(response => {
          let data = response.data.results.small_area
          let res = data.filter(data => {
            return data.name.indexOf(area) !== -1
          })
          let code_list = ''
          res.forEach(d => code_list += d.code + ',')
          console.log(code_list);
          self.areas[2] = code_list.trimEnd()
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
