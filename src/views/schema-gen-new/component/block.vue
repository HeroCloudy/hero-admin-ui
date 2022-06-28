<!--
 * @Title: block.vue
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2022/3/10 2:22 PM
 *     Date          UpdateBy        Description
 * 2022/3/10 2:22 PM   dscloudy    Create File.
 -->
<template>
  <div class="block-wrapper">
    <div class="header" v-if="title">
      <div class="title">{{ title }}</div>
      <div class="opt">
        <slot name="opt"></slot>
      </div>
    </div>
    <div class="container" :style="{
       minHeight: minHeight,
       height: height ? height : 'auto',
       overflowY: height ? 'auto' : 'hidden'
    }">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

defineProps({
  title: {
    type: String,
    default: null,
    required: false
  },
  minHeight: {
    type: String,
    default: '1px',
    required: false
  },
  height: {
    type: String,
    default: null,
    required: false
  }
})
</script>

<style scoped lang="scss">
@import "../../../../libs/scss/base/var";

.block-wrapper {
  margin: 5px;

  .header {
    display: flex;

    .title {
      flex: 1;
      line-height: 28px;
      color: $primary-color;
      font-weight: bold;
      font-size: 16px;
    }
  }

  .container {
    box-sizing: border-box;
    padding: 5px;
    border: 1px dashed $primary-color;
    min-height: 200px;
    border-radius: 5px;
    color: #333333;
    font-size: 14px;
  }
}
</style>
