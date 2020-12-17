<template>
     <li>
          <div class="row">
               <div class="col-6">
                    <h3>{{ task.description }}</h3>
               </div>
               <div class="col-6">
                    <button class="delete-button float-right" @click="deleteTask">x</button>
               </div>
          </div>
     </li>
</template>

<script>
export default {
     props: ['task'],
     emits: ['delete-task'],
     setup(props, context) {
          function deleteTask() {
               context.emit('delete-task', props.task.id);
          }

          return {
               deleteTask
          };
     }
}
</script>

<style scoped>
li {
     list-style-type: none;
     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
     margin: 30px auto;
     color: #35b6ed;
     padding: 10px 20px;
     border-radius: 10px;
}
h3 {
     font-size: 17px;
     margin-bottom: 0;
}
.delete-button {
     color: #ffffff;
     font-size: 15px;
     background: #ffd400;
     display: inline-block;
     width: 22px;
     height: 22px;
     text-align: center;
     line-height: 15px;
     border-radius: 100px;
     cursor: pointer;
     border: 0;
}
.delete-button:focus {
     outline: none;
}
</style>