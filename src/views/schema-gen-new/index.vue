<!--
 * @Title: index.vue
 * @Description: JSON Schema 生成器新版本
 * @Author: dscloudy 小云哥
 * @Date: 2022/6/27 14:37
 *     Date          UpdateBy        Description
 * 2022/6/27 14:37   dscloudy    Create File.
 -->
<template>
  <ha-page flex-direction="row" class="schema-gen">
    <!--  左侧：属性 prop 列表  -->
    <div class="left">
      <prop-list :prop-list="list" @current-prop-change="onCurrentPropChange"></prop-list>
    </div>

    <!--  中间：属性值 attr 列表  -->
    <div class="center">
      <attr-list v-if="currentProp" :current-prop="currentProp"></attr-list>
    </div>

    <!--  左侧：预览 preview 列表  -->
    <div class="right">
      <preview-list :prop-list="list"></preview-list>
    </div>
  </ha-page>
</template>

<script lang="ts" setup>
import PropList from './component/prop-list.vue'
import { ref } from 'vue'
import { Prop } from '@/views/scheme-gen/common/basic-attr'
import PreviewList from '@/views/schema-gen-new/component/preview-list.vue'
import AttrList from '@/views/schema-gen-new/component/attr-list.vue'
import { buildPropItem } from '@/views/schema-gen-new/common/commons'

const currentProp = ref<Prop>()

const list = ref<Prop[]>([buildPropItem(0)])

const onCurrentPropChange = (prop: Prop) => {
  currentProp.value = prop
}
</script>

<style scoped lang="scss">
.schema-gen {
  width: 100%;
  min-height: 100%;

  .left {
    width: 300px;
  }

  .right {
    width: 350px;
  }

  .center {
    flex: 1;
  }

  //.open {
  //  width: 0;
  //  height: 0;
  //  margin: auto auto;
  //  border-top: 10px solid transparent;
  //  border-right: 10px solid transparent;
  //  border-bottom: 10px solid transparent;
  //  border-left: 10px solid #333333;
  //
  //}

  // 可删除 BEGIN
  .left,
  .right {
    background-color: #f0fcdc;
  }

  // 可删除 END
}
</style>
