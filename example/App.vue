<template>
  <v-app>
    <v-main>
      <vue-list
        :left-items="leftItems1"
        :right-items="rightItems1"
        show-search-destination
        show-search-source
        expand-panel
      >
      </vue-list>
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
    rightItems: [
      { key: 2, content: 'read-only', isReadOnly: true },
      { key: 5, content: 'teste 5' },
    ],
    leftItems1: [
      {
        key: 1,
        header: 'header1',
        items: [
          { key: 1, content: 'teste 1', isReadOnly: true },
          { key: 3, content: 'teste 2' },
          { key: 4, content: 'teste 3', isReadOnly: true },
          { key: 5, content: 'teste 5' },
        ],
      },
      {
        key: 2,
        header: 'header2',
        items: [
          { key: 1, content: 'teste 1' },
          { key: 3, content: 'teste 2' },
          { key: 4, content: 'teste 3' },
        ],
        isReadOnly: true,
      },
      {
        key: 3,
        header: 'header3',
        items: [
          { key: 1, content: 'teste 1' },
          { key: 3, content: 'teste 2' },
          { key: 4, content: 'teste 3' },
        ],
      },
    ],
    rightItems1: [
      {
        key: 4,
        header: 'header4',
        items: [
          { key: 1, content: 'teste 11' },
          { key: 3, content: 'teste 22' },
          { key: 4, content: 'teste 33' },
        ],
      },
    ],
  }),
}
</script>
