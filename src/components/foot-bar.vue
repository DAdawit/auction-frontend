<template>
  <v-footer color="#EEEEEE" class="blue-grey darken-3">
    <v-card text tile class="text-center" color="blue-grey darken-4">
      <v-card-text>
        <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon >
          <v-icon size="24px" color="white">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text class="pt-0 px-4 white--text ">
        Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut
        risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui.
        Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices,
        cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text overline">
        {{ new Date().getFullYear() }} — <strong>E_acutions</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>



<script>
  export default {
    data: () => ({
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
    }),
  }
</script>