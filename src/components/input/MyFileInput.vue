<script setup>
const props = defineProps({
  'required': Boolean,
});

// 부모의 v-model과 연결되는 반응형 변수(v3.4+)
const model = defineModel();

const handleChange = (e) => {
  if(e.target?.files && e.target.files.length > 0) {
    model.value = e.target.files[0];
  } else {
    model.value = null;
  }
}
</script>

<template>
  <label for="file" class="">Select File</label>
  <input
    type="file"
    id="file"
    :required="props.required"
    @change="handleChange"
  >
</template>


<style scoped>
label {
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  width: 120px;
  height: 45px;
  font-size: 20px;
  background-color: var(--personal-color-black);
  color: var(--personal-color-white);
}

input {
  display: none;
}
</style>
