<template>
  <v-app>
    <v-main>
      <vue-list
        :left-items="leftItems"
        :right-items="rightItems"
        show-search-destination
        show-search-source
      />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    leftItems: [
      { key: 1, content: 'teste 1' },
      { key: 3, content: 'teste 2' },
      { key: 4, content: 'teste 3' },
    ],
    rightItems: [{ key: 2, content: 'read-only', isReadOnly: true }],
  }),
}
</script>
