<template>
  <v-app>
    <v-main>
      <vue-list
        :left-items="leftItems1"
        :right-items="rightItems1"
        show-search-destination
        show-search-source
        :searchLabel="searchLabel"
        expandPanel
      >
      </vue-list>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    searchLabel: 'Procurar...',
    leftItems: [
      { key: 0, content: 'david.dias@twa.pt', id: 1 },
      { key: 1, content: 'isabelle.correa@twa.pt', id: 12 },
      { key: 2, content: 'leandro.alexandre@twa.pt', id: 13 },
      { key: 3, content: 'luisfbatista@markdata.pt', id: 17 },
      { key: 4, content: 'recognition@markdata.pt', id: 21 },
      { key: 5, content: 'demo@markdata.pt', id: 22 },
      { key: 6, content: 'Prica', id: 62 },
      { key: 7, content: 'hugo@markdata.pt', id: 77 },
      { key: 8, content: 'joao.cardoso@markdata.pt', id: 79 },
      { key: 9, content: 'eventsrecognition@gmail.com', id: 82 },
      { key: 10, content: 'Tiago', id: 96 },
      { key: 11, content: 'Pedro', id: 97 },
      { key: 12, content: 'recognition@twa.pt', id: 109 },
      { key: 13, content: null, id: 113 },
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
      {
        key: 5,
        header: 'header33',
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
