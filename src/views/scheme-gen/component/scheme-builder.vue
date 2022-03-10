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
      <prop-list :prop-list="propList"></prop-list>
    </div>
    <div class="middle">
<!--          <ha-form :schema="basicAttrSchema"-->
<!--                   :model="innerBasicModel"-->
<!--                   :ui-schema="basicAttrUiSchema"-->
<!--                   @data-change="onBasicAttrChange"-->
<!--                   :column="2"-->
<!--          ></ha-form>-->
      <attr-basic></attr-basic>
      <attr-of></attr-of>
      <attr-style></attr-style>
    </div>

    <div class="right">
      <preview-schema :prop-list="propList"></preview-schema>
      <preview-ui></preview-ui>
      <preview-model></preview-model>
    </div>
  </ha-page>
</template>

<script lang="ts" setup>
import PropList from '@/views/scheme-gen/component/prop-list.vue'
import AttrBasic from '@/views/scheme-gen/component/attr-basic.vue'
import AttrOf from '@/views/scheme-gen/component/attr-of.vue'
import AttrStyle from '@/views/scheme-gen/component/attr-style.vue'
import PreviewSchema from '@/views/scheme-gen/component/preview-schema.vue'
import PreviewUi from '@/views/scheme-gen/component/preview-ui.vue'
import PreviewModel from '@/views/scheme-gen/component/preview-model.vue'
import { Prop } from '@/views/scheme-gen/common/basic-attr'
import { ref } from 'vue'

const propList = ref<Prop[]>([{ title: '属性0', key: 'prop0', type: 'string' }, { title: '属性1', key: 'prop1', type: 'string' }, { title: '属性2', key: 'prop2', type: 'string' }])

// const innerModel = ref<CommonObject>({})
//
// onMounted(() => {
//   innerModel.value = buildSchemaDefaultModel(innerSchema.value)
//   // onAddPropClick()
// })
//
// const innerBasicModel = reactive<BasicAttr>(getBasicAttrDefaultModel())
//
//
//
//
//
// watch(() => currentProp.value, (newVal: any) => {
//   innerBasicModel.key = newVal.key
//   innerBasicModel.title = newVal.title
//   innerBasicModel.type = 'string'
//   innerBasicModel.defaultValue = ''
//   innerBasicModel.isRequired = false
// }, { deep: true })
//
// watch(() => innerBasicModel, (newVal: any) => {
//   if (currentProp.value) {
//     currentProp.value!.title = newVal.title
//     currentProp.value!.key = newVal.key
//   }
// }, { deep: true })
//

// const onBasicAttrChange = (key: string, value: any) => {
//   if (key === 'type') {
//     console.log(value)
//   }
// }

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
