<script setup>
const props = defineProps({
  'placeholder': String,
  'readonly': Boolean,
  'required': Boolean,
});

// 부모의 v-model과 연결되는 반응형 변수(v3.4+)
const model = defineModel();

</script>

<template>
<textarea
  :readonly="props.readonly"
  :required="props.required"
  :placeholder="props.placeholder"
  v-model="model"
></textarea>
</template>


<style scoped>
textarea {
  width: 100%;
  height: 200px;
  padding: 10px;
  border-radius: 10px;
  resize: none;
}
</style>
