<template>
  <q-page
    padding
    class="page-showcase">

    <q-list
      v-for="category in categories"
      :key="category.hash">
      <q-collapsible
        opened="true"
        :icon="category.icon"
        :label="category.title">
        <div class="row justify-center">
          <div
            style="width: 850px; max-width: 90vw;"
            class="row">
            <div
              v-for="feature in category.features"
              :key="feature.hash"
              class="col-xs-4 col-sm-3 col-lg-2">
              <div
                class="card text-center category-link text-primary"
                @click="show(category, feature)">
                <img :src="feature.image">
                <p class="caption">{{ feature.title }}</p>
              </div>
            </div>
          </div>
        </div>
      </q-collapsible>
    </q-list>

    <q-page-sticky
      v-show="category"
      position="bottom-right"
      :offset="[18, 18]">
      <q-btn
        round
        color="secondary"
        @click="category = false"
        class="animate-pop">
        <q-icon name="keyboard_backspace" />
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import categories from '../assets/categories'

export default {
    data () {
        return {
            categories: categories
        }
    },
    methods: {
        show (category, feature) {
            if (feature.link) {
                location.href = feature.link
            } else {
                this.$router.push(`/${category.hash}/${feature.hash}`)
            }
        }
    }
}
</script>

<style lang="stylus">
    @import '~variables'

    .page-showcase
        img
            width 60px
            height 60px
            margin-bottom 8px
        .showcase-top
            margin-bottom 18px
            .q-alert
                max-width 500px
        .card
            cursor pointer
            position relative
            padding 8px
            .q-icon
                font-size 30px
            p
                color rgba(0, 0, 0, .87)
                margin 15px 0 0 0 !important
            &:before
                content ''
                position absolute
                top 0
                right 0
                bottom 0
                left 0
                border-radius 2px
                opacity 0
                transition opacity .2s
                background currentColor
            &:hover:before
                opacity .4
</style>
