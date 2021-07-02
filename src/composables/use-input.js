import { computed, ref } from 'vue';

export default function useInput(checkValidity) {
     const input = ref('');
     const isInputTouched = ref(false);

     const isInputInvalid = computed(() => !checkValidity(input.value) && isInputTouched.value);

     const setInputTouched = () => {
          isInputTouched.value = true;
     };

     return {
          input,
          isInputInvalid,
          setInputTouched
     };
}