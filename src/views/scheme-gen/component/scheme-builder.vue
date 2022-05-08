<!--
 * @Title: scheme-builder.vue
 * @Description:
 * @Author: dscloudy 小云哥
 * @Date: 2022/2/26 8:58 PM
 *     Date          UpdateBy        Description
 * 2022/2/26 8:58 PM   dscloudy    Create File.
 -->
<template>
  <ha-page flex-direction="row" class="schema-builder">
    <div class="left">
      <prop-list :prop-list="propList" @current-prop-change="onCurrentPropChange"></prop-list>
    </div>
    <div class="middle">
      <attr-basic :current-prop="currentProp"></attr-basic>
      <attr-of v-if="currentProp && (currentProp?.ofItemType === 'oneOf' || currentProp?.ofItemType === 'anyOf')"></attr-of>
      <attr-style></attr-style>
    </div>

    <div class="right">
      <preview-schema :schema="schema"></preview-schema>
      <preview-ui></preview-ui>
      <preview-model :prop-list="propList" :schema="schema"></preview-model>
    </div>
  </ha-page>
</template>

<script lang="ts" setup>
// import PropList from '@/views/scheme-gen/component/prop-list.vue'
import AttrBasic from '@/views/scheme-gen/component/attr-basic.vue'
import AttrOf from '@/views/scheme-gen/component/attr-of.vue'
import AttrStyle from '@/views/scheme-gen/component/attr-style.vue'
import PreviewSchema from '@/views/scheme-gen/component/preview-schema.vue'
import PreviewUi from '@/views/scheme-gen/component/preview-ui.vue'
import PreviewModel from '@/views/scheme-gen/component/preview-model.vue'
import { getSchemaByPropList, Prop } from '@/views/scheme-gen/common/basic-attr'
import { ref, watch } from 'vue'
import { Schema } from '../../../../libs/components/types'

const propList = ref<Prop[]>([{ title: '属性0', key: 'prop0', type: 'string' }, { title: '属性1', key: 'prop1', type: 'string' }, { title: '属性2', key: 'prop2', type: 'string' }])

const currentProp = ref<Prop | null>(null)

const schema = ref<Schema>({
  required: [],
  properties: {}
})

const onCurrentPropChange = (prop: Prop) => {
  console.log('当前属性变化', prop)
  currentProp.value = prop
}

watch(() => propList.value, () => {
  schema.value = getSchemaByPropList(propList.value)
}, { deep: true, immediate: true })

</script>

<style scoped lang="scss">
.schema-builder {
  .left {
    width: 300px;
  }

  .middle {
    flex: 1;
  }

  .right {
    width: 400px;
  }
}
</style>
