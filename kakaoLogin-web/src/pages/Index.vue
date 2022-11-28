<template>
  <q-page class="flex flex-center column q-gutter-lg">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
    <q-item style="max-width: 200px">
      <q-item-section>
        <q-item-label>Welcome!</q-item-label>
        <q-item-label style="line-break: anywhere" caption v-if="accessToken">{{accessToken}}</q-item-label>
      </q-item-section>

    </q-item>

  </q-page>
</template>

<script>
import {computed, defineComponent, onMounted} from 'vue'
import {useStore} from "vuex";


export default defineComponent({
  name: 'IndexPage',

  setup(){
    const $store = useStore()


    const accessToken = computed({
      get: () => $store.state.accessToken.accessToken,
    })

    return{
      accessToken
    }

  }


})
</script>
