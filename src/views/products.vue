<template>
  <div>
    <!-- <homeBackground /> -->
    <AllProducts />
    <hr>

    <!-- <NewProducts /> -->
  </div>
</template>
<script>
      import AllProducts from '@/components/items/AllProducts.vue';
  export default {
    name: 'Home',
    components: {
      AllProducts,
    },
    data() {
      return {
        show: false,
        input:'',
        items: [{
            src: '/pro_pics/22061.jpg',
          },
          {
            src: '/pro_pics/36136.jpg',
          },
          {
            src: '/pro_pics/29707.jpg',
          },
          {
            src: '/pro_pics/30462.jpg',
          },
        ],
      }
    }

  }
</script>