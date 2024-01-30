<template>
  <div class="vue-list-picker">
    <v-list dense class="list-picker-container list-picker-left">
      <v-subheader class="list-picker-title" :class="getTitleClasses">
        {{ textSubstr(titleLeft, titleSubstr) }}
      </v-subheader>
      <VTextField
        hide-details
        outlined
        dense
        :placeholder="searchLabel"
        v-if="showSearchSource"
        v-model="searchSource"
        style="margin: 8px"
      ></VTextField>
      <v-list-item-group
        v-if="expandPanel"
        class="list-picker-panel"
        ref="moverright"
        :style="getStyles"
      >
        <v-expansion-panels v-model="openedExpansionPanelLeft">
          <v-expansion-panel
            class="list-picker-item"
            v-for="(items, i) in unselectedItemsFiltered || unselectedItems"
            :key="i"
            :class="[
              getContentClasses,
              {
                'list-picker-selected': items.isSelected,
                'list-picker-read-only': items.isReadOnly,
              },
            ]"
          >
            <div
              @click="
                selectUnselectItem(
                  $event,
                  items,
                  unselectedItemsFiltered || unselectedItems
                )
              "
              @mousemove="
                selectItem(items, unselectedItemsFiltered || unselectedItems)
              "
              @mousedown="startDrag"
              class="v-expansion-panel-header"
              style="cursor: pointer; user-select: none"
            >
              {{ items.header }}
              <v-spacer></v-spacer>
              <v-btn
                @click="
                  openedExpansionPanelLeft === i
                    ? (openedExpansionPanelLeft = null)
                    : (openedExpansionPanelLeft = i)
                "
                class="expansion-panel-header-icon"
                icon
              >
                <font-awesome-icon :icon="faChevronDown" />
              </v-btn>
            </div>
            <v-expansion-panel-content>
              <v-list-item
                class="list-item"
                v-for="item in items.items"
                :key="item[contentKey]"
                :class="[
                  getContentClasses,
                  {
                    'list-picker-selected': item.isSelected,
                    'list-picker-read-only': item.isReadOnly,
                  },
                ]"
              >
                {{ textSubstr(item[contentAttr], contentSubstr) }}
              </v-list-item>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-list-item-group>
      <v-list-item-group
        v-if="!expandPanel"
        class="list-picker-panel"
        ref="moverright"
        :style="getStyles"
      >
        <v-list-item
          class="list-picker-item"
          v-for="item in unselectedItemsFiltered || unselectedItems"
          :key="item[contentKey]"
          :class="[
            getContentClasses,
            {
              'list-picker-selected': item.isSelected,
              'list-picker-read-only': item.isReadOnly,
            },
          ]"
          @click="
            selectUnselectItem(
              $event,
              item,
              unselectedItemsFiltered || unselectedItems
            )
          "
          @mousemove="
            selectItem(item, unselectedItemsFiltered || unselectedItems)
          "
          @mousedown="startDrag"
        >
          {{ textSubstr(item[contentAttr], contentSubstr) }}
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <div class="list-picker-actions">
      <v-btn @click="moveAllRight" :class="buttonClass" icon>
        <font-awesome-icon
          v-if="!$slots.moveAllRight"
          :icon="faAngleDoubleRight"
        />
        <slot name="moveAllRight" />
      </v-btn>
      <v-btn @click="moveRight" class="mb-25" :class="buttonClass" icon>
        <font-awesome-icon v-if="!$slots.moveRight" :icon="faAngleRight" />
        <slot name="moveRight" />
      </v-btn>
      <v-btn @click="moveLeft" :class="buttonClass" icon>
        <font-awesome-icon v-if="!$slots.moveLeft" :icon="faAngleLeft" />
        <slot name="moveLeft" />
      </v-btn>
      <v-btn @click="moveAllLeft" class="mb-25" :class="buttonClass" icon>
        <font-awesome-icon
          v-if="!$slots.moveAllLeft"
          :icon="faAngleDoubleLeft"
        />
        <slot name="moveAllLeft" />
      </v-btn>

      <v-btn @click="unselectAll" :class="buttonClass" icon>
        <font-awesome-icon
          v-if="!$slots.unselectAll"
          :icon="faFilterCircleXmark"
        />
        <slot name="unselectAll" />
      </v-btn>
    </div>
    <v-list dense class="list-picker-container list-picker-right">
      <v-subheader class="list-picker-title" :class="getTitleClasses">
        {{ textSubstr(titleRight, titleSubstr) }}
      </v-subheader>
      <VTextField
        hide-details
        outlined
        dense
        :placeholder="searchLabel"
        v-if="showSearchDestination"
        v-model="searchDestination"
        style="margin: 8px"
      ></VTextField>
      <v-list-item-group
        v-if="expandPanel"
        class="list-picker-panel"
        ref="moverleft"
        :style="getStyles"
      >
        <v-expansion-panels v-model="openedExpansionPanelRight">
          <v-expansion-panel
            class="list-picker-item"
            v-for="(items, i) in selectedItemsFiltered || selectedItems"
            :key="i"
            :class="[
              getContentClasses,
              {
                'list-picker-selected': items.isSelected,
                'list-picker-read-only': items.isReadOnly,
              },
            ]"
          >
            <div
              @click="
                selectUnselectItem(
                  $event,
                  items,
                  selectedItemsFiltered || selectedItems
                )
              "
              @mousemove="
                selectItem(items, selectedItemsFiltered || selectedItems)
              "
              @mousedown="startDrag"
              class="v-expansion-panel-header"
              style="cursor: pointer; user-select: none"
            >
              {{ items.header }}
              <v-spacer></v-spacer>
              <v-btn
                @click="
                  openedExpansionPanelRight === i
                    ? (openedExpansionPanelRight = null)
                    : (openedExpansionPanelRight = i)
                "
                class="expansion-panel-header-icon"
                icon
              >
                <font-awesome-icon :icon="faChevronDown" />
              </v-btn>
            </div>
            <v-expansion-panel-content>
              <v-list-item
                class="list-item"
                v-for="item in items.items"
                :key="item[contentKey]"
                :class="[
                  getContentClasses,
                  {
                    'list-picker-selected': item.isSelected,
                    'list-picker-read-only': item.isReadOnly,
                  },
                ]"
              >
                {{ textSubstr(item[contentAttr], contentSubstr) }}
              </v-list-item>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-list-item-group>
      <v-list-item-group
        v-if="!expandPanel"
        class="list-picker-panel"
        ref="moverleft"
        :style="getStyles"
      >
        <v-list-item
          class="list-picker-item"
          v-for="item in selectedItemsFiltered || selectedItems"
          :key="item[contentKey]"
          :class="[
            getContentClasses,
            {
              'list-picker-selected': item.isSelected,
              'list-picker-read-only': item.isReadOnly,
            },
          ]"
          @click="
            selectUnselectItem(
              $event,
              item,
              selectedItemsFiltered || selectedItems
            )
          "
          @mousemove="selectItem(item, selectedItemsFiltered || selectedItems)"
          @mousedown="startDrag"
        >
          {{ textSubstr(item[contentAttr], contentSubstr) }}
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import {
  VList,
  VListItemGroup,
  VListItem,
  VSubheader,
  VBtn,
  VTextField,
  VExpansionPanels,
  VExpansionPanel,
  VExpansionPanelContent,
  VSpacer,
} from 'vuetify/lib'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faFilterCircleXmark,
  faAngleDoubleLeft,
  faAngleLeft,
  faAngleDoubleRight,
  faAngleRight,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'VueList',
  components: {
    VList,
    VListItemGroup,
    VListItem,
    VSubheader,
    VBtn,
    FontAwesomeIcon,
    VTextField,
    VExpansionPanels,
    VExpansionPanel,
    VExpansionPanelContent,
    VSpacer,
  },
  props: {
    leftItems: {
      type: Array,
      required: true,
    },
    rightItems: {
      type: Array,
      required: true,
    },
    movedItemLocation: {
      type: String,
      default: 'top',
    },
    titleLeft: {
      type: String,
      default: 'Items available',
    },
    titleRight: {
      type: String,
      default: 'Items selected',
    },
    titleCentered: {
      type: Boolean,
      default: true,
    },
    titleClass: {
      type: String,
      default: '',
    },
    titleSubstr: {
      type: Number,
      default: 20,
    },
    buttonClass: {
      type: String,
      default: '',
    },
    contentKey: {
      type: String,
      default: 'key',
    },
    contentAttr: {
      type: String,
      default: 'content',
    },
    contentCentered: {
      type: Boolean,
      default: false,
    },
    contentClass: {
      type: String,
      default: '',
    },
    contentSubstr: {
      type: Number,
      default: 23,
    },
    minHeight: {
      type: String,
      default: '450px',
    },
    height: {
      type: String,
      default: '',
    },
    minWidth: {
      type: String,
      default: '220px',
    },
    width: {
      type: String,
      default: '',
    },
    showSearchDestination: {
      type: Boolean,
      default: false,
    },
    showSearchSource: {
      type: Boolean,
      default: false,
    },
    expandPanel: {
      type: Boolean,
      default: false,
    },
    searchLabel: {
      type: String,
      default: 'Search...',
    },
  },
  data: () => ({
    loading: false,
    dragging: false,
    lastMovedItem: null,
    faFilterCircleXmark,
    faAngleDoubleLeft,
    faAngleLeft,
    faAngleDoubleRight,
    faAngleRight,
    faChevronDown,
    selectedItemsFiltered: null,
    searchDestination: null,
    unselectedItemsFiltered: null,
    searchSource: null,
    openedExpansionPanelLeft: null,
    openedExpansionPanelRight: null,
  }),
  computed: {
    unselectedItems: {
      get() {
        return this.leftItems
      },
      set(val) {
        this.$emit('leftItems:update', val)
      },
    },
    selectedItems: {
      get() {
        return this.rightItems
      },
      set(val) {
        this.$emit('rightItems:update', val)
      },
    },
    getTitleClasses() {
      const { titleClass, titleCentered } = this

      return titleClass || { 'text-center': titleCentered }
    },
    getContentClasses() {
      const { contentClass, contentCentered } = this

      return contentClass || { 'text-center': contentCentered }
    },
    getStyles() {
      const { height, minHeight, minWidth, width } = this

      return {
        height,
        minHeight,
        minWidth,
        width,
      }
    },
  },
  created() {
    this.unselectedItems =
      this.unselectedItems && this.unselectedItems.length
        ? this.unselectedItems.map((it) => ({ ...it, isSelected: false }))
        : []
    this.selectedItems =
      this.selectedItems && this.selectedItems.length
        ? this.selectedItems.map((it) => ({ ...it, isSelected: false }))
        : []
  },
  mounted() {
    document.addEventListener('mouseup', this.stopDrag)
  },
  beforeDestroy() {
    document.removeEventListener('mouseup', this.stopDrag)
  },
  methods: {
    textSubstr(value, qtd = 250, mask = '...') {
      return value && value.length > qtd
        ? `${value.substring(0, qtd)}${mask}`
        : value
    },
    startDrag() {
      this.dragging = true
    },
    stopDrag() {
      this.dragging = false
    },
    selectUnselectItem(e, item, items) {
      if (
        e.target.classList.contains('v-expansion-panel-header') ||
        e.target.classList.contains('list-picker-item')
      ) {
        this.setItem(item, items, !item.isSelected)
      }
    },
    setItem(item, items, val) {
      let itemBase = item

      if (items && items.length && !itemBase) {
        itemBase = items[0]
      }

      if (!itemBase || itemBase.isReadOnly) return

      itemBase.isSelected = val
      this.$forceUpdate()
    },
    selectItem(item, items) {
      if (this.dragging) {
        const VALUE_IS_SET_TO_TRUE = true
        this.setItem(item, items, VALUE_IS_SET_TO_TRUE)
      }
    },
    moveRight() {
      this.moveOne(
        this.unselectedItems || this.unselectedItemsFiltered,
        this.selectedItems || this.selectedItemsFiltered,
        'moverleft',
        'move-right'
      )
    },
    moveLeft() {
      this.moveOne(
        this.selectedItems || this.selectedItemsFiltered,
        this.unselectedItems || this.unselectedItemsFiltered,
        'moverright',
        'move-left'
      )
    },
    unselect(items) {
      if (!items.length) return

      items.forEach((it) => {
        it.isSelected = false
      })
      this.$forceUpdate()
    },
    unselectAll() {
      this.unselect(this.unselectedItemsFiltered || this.unselectedItems)
      this.unselect(this.selectedItemsFiltered || this.selectedItems)
      this.$emit('unselect-all')
    },
    moveOne(firstArray, secondArray, refsName, event) {
      const items = firstArray.filter((it) => it.isSelected && !it.isReadOnly)
      if (!items || !items.length) return

      for (let item of items) {
        const idx = firstArray.findIndex(
          (it) => it[this.contentKey] === item[this.contentKey]
        )

        firstArray.splice(idx, 1)
        this.$emit(event, item)

        if (this.movedItemLocation === 'top') {
          secondArray.unshift(item)
          this.$refs[refsName].scrollTop = 0
        } else {
          secondArray.push(item)
        }
      }

      this.unselectAll()
    },
    moveAllRight() {
      this.moveAll(
        this.unselectedItemsFiltered || this.unselectedItems,
        this.selectedItemsFiltered || this.selectedItems
      )
      this.$emit(
        'move-all-right',
        this.selectedItemsFiltered || this.selectedItems
      )
    },
    moveAllLeft() {
      this.moveAll(
        this.selectedItemsFiltered || this.selectedItems,
        this.unselectedItemsFiltered || this.unselectedItems
      )
      this.$emit(
        'move-all-left',
        this.unselectedItemsFiltered || this.unselectedItems
      )
    },
    moveAll(firstArray, secondArray) {
      let tmp = Array.from(firstArray)
      for (let item of tmp) {
        if (!item.isReadOnly) {
          const idx = firstArray.findIndex(
            (it) => it[this.contentKey] === item[this.contentKey]
          )
          firstArray.splice(idx, 1)
          secondArray.push(item)
        }
      }

      this.unselectAll()
    },
  },
  watch: {
    searchDestination(value) {
      if (!value) {
        this.selectedItemsFiltered = null
        return
      }

      if (this.expandPanel) {
        this.selectedItemsFiltered = this.selectedItems.filter((item) =>
          item?.header?.includes(value)
        )
      } else {
        this.selectedItemsFiltered = this.selectedItems.filter((item) =>
          item?.content?.includes(value)
        )
      }
    },
    searchSource(value) {
      if (!value) {
        this.unselectedItemsFiltered = null
        return
      }

      if (this.expandPanel) {
        this.unselectedItemsFiltered = this.unselectedItems.filter((item) =>
          item?.header?.includes(value)
        )
      } else {
        this.unselectedItemsFiltered = this.unselectedItems.filter((item) =>
          item?.content?.includes(value)
        )
      }
    },
  },
}
</script>

<style scoped>
.vue-list-picker {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  display: flex;
  flex-flow: row nowrap;
  cursor: default;
}
.vue-list-picker .list-picker-container {
  padding: 0;
  flex: 1 1 auto;
  border: 1px solid #ddd;
  background: #f9f9f9;
  border-radius: 3px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  max-width: 48%;
}
.vue-list-picker .list-picker-panel {
  min-height: 400px;
  overflow-y: auto;
}
.vue-list-picker .list-picker-item::selection {
  background: unset;
}
.vue-list-picker .list-picker-actions {
  flex: 0 0 auto;
  align-self: center;
  padding: 0 15px;
}
.vue-list-picker .list-picker-actions > button {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.vue-list-picker .list-picker-item,
.vue-list-picker .list-picker-selected,
.vue-list-picker .list-picker-title {
  border-bottom: 1px solid #ccc;
}
.vue-list-picker .list-picker-title {
  padding: 8px 10px;
  background: #fafafa;
  color: #1565c0;
  font-size: 1.1em;
  font-weight: 600;
  justify-content: center;
}
.vue-list-picker .list-picker-selected {
  background: #1565c0;
  color: #f0f0f0 !important;
  font-weight: 600;
}
.vue-list-picker .list-picker-read-only {
  background: #f0f0f0;
  color: grey !important;
  font-weight: 600;
}
.vue-list-picker .mb-25 {
  margin-bottom: 25px;
}
.vue-list-picker .text-center {
  text-align: center;
}
.vue-list-picker .expansion-panel-header-icon {
  flex: none;
  position: absolute;
  right: 16px;
}

.vue-list-picker .list-item {
  pointer-events: none;
}
</style>
