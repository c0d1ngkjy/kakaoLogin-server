<template>
  <q-page class="flex flex-center column q-gutter-lg">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
    <q-card
      style="width: 100%; max-width: 400px; border-radius: 10px"
      class="cursor-pointer"
      @click="loginWithKakao()"
    >
      <q-img src="~assets/kakao_login_large_wide.png"/>
    </q-card>
  </q-page>
</template>

<script>
import {defineComponent, onMounted} from 'vue'


export default defineComponent({
  name: 'IndexPage',

  setup(){
    onMounted(()=>{
      kakaoInit()
    })

    function kakaoInit() {
      Kakao.init('c8ee450362ad96111b95f820103bc6c9')// KaKao client key
      Kakao.isInitialized()

    }

    function loginWithKakao() {
      Kakao.Auth.authorize({
        redirectUri: 'http://127.0.0.1:3000/kakao-callback',
      });
    }

    return{
      loginWithKakao
    }

  }


})
</script>
