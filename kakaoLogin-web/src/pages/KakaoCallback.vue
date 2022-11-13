<template>
  <q-page class="flex flex-center column q-gutter-lg">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
</template>

<script>
import {defineComponent, onMounted} from 'vue'
import axios from 'axios'
import {useRoute} from "vue-router";



export default defineComponent({
  name: 'KakaoCallback',

  setup(){
    const route = useRoute()
    const code = route.query.code
    const body = {
      code: code,
      domain: window.location.origin
    }

    //written by -henrykim13-
    //Request login to server
    //Remider:
    // 1. Replace ${url-of-server} when sever side is set up,
    // 2. convert below lines as comment when testing without backend server
    axios.post(`http://localhost:8000/auth/login`,body,{}).then((res)=>{
      console.log(res)//this logs login response on the console
    })

    //this logs data body that will be posted to the server
    onMounted(()=>{
    })
  }




})
</script>
