<script setup>
const props = defineProps({
  'type' : String,
  'placeholder' : String,
  'readonly' : Boolean,
  'required' : Boolean,
});

// 부모의 v-model과 연결되는 반응형 반수(v3.4+ 에서부터 사용 가능)
const model = defineModel();
</script>

<template>
<input
  :type="props.type"
  :readonly="props.readonly"
  :required="props.required"
  :placeholder="props.placeholder"
  v-model="model"
>
</template>

<style scoped>
input {
  padding: 0 10px;
  width: 300px;
  height: 85px;
  font-size: 24px;
  outline: none;
  border: 2px solid var(--personal-color-black);
  border-radius: 10px;
  display: flex;
  align-items: center;
}
</style>
