<template>
     <teleport to="body">
          <div class="backdrop" @click="close"></div>

          <dialog open>
               <h2>Add new task</h2>

               <form @submit.prevent="submitForm">
                    <input type="text" v-model.trim="newTask">

                    <p v-if="invalidInput">*enter your task</p>
                    
                    <div class="actions">
                         <button class="add-button">Add</button>
                         <button class="cancel-button" type="button" @click="close">Cancel</button>
                    </div>
               </form>
          </dialog>
     </teleport>
</template>

<script>
import { ref } from 'vue';

export default {
     emits: ['close', 'add'],
     setup(_, context) {
          const newTask = ref('');
          const invalidInput = ref(false);

          function submitForm() {
               invalidInput.value = false;

               if(newTask.value) {
                    context.emit('add', newTask.value);
               }
               else {
                    invalidInput.value = true;
               }
          }

          function close() {
               context.emit('close');
          }

          return {
               close,
               newTask,
               submitForm,
               invalidInput
          };
     }
}
</script>

<style scoped>
dialog {
     position: fixed;
     top: 20vh;
     left: 30%;
     width: 40%;
     z-index: 100;
     border-radius: 12px;
     border: none;
     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
     padding: 30px 50px;
     margin: 0;
     overflow: hidden;
     background-color: white;
     text-align: center;
}
h2 {
     color: #35b6ed;
     margin-bottom: 30px;
     font-size: 20px;
}
input {
     width: 80%;
     height: 35px;
     border: 1px solid #35b6ed;
     border-radius: 50px;
     padding: 4px 10px;
     font-size: 14px;
}
input:focus {
     outline: none;
}
p {
     color: red;
     margin-top: 10px;
     font-size: 14px;
}
.actions {
     margin-top: 20px;
}
button {
     font-size: 14px;
     border: 1px solid #35b6ed;
     padding: 5px 17px;
     border-radius: 50px;
     margin: 0 10px;
     cursor: pointer;
}
.add-button {
     color: #ffffff;
     background: #35b6ed;
}
.add-button:focus {
     outline: none;
}
.cancel-button {
     color: #35b6ed;
     background: #ffffff;
}
.cancel-button:focus {
     outline: none;
}
.backdrop {
     position: fixed;
     top: 0;
     left: 0;
     height: 100vh;
     width: 100%;
     background-color: rgba(0, 0, 0, 0.75);
     z-index: 10;
}
@media (max-width: 992px) {
     dialog {
          left: 20%;
          width: 60%;
     }
}
@media (max-width: 768px) {
     dialog {
          left: 10%;
          width: 80%;
          padding: 25px 5px;
     }
}
</style>