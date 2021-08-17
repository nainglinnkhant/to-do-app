<template>
     <base-dialog v-if="errorMessage" :errorMessage="errorMessage" @close="confirmError"></base-dialog>

     <add-task-dialog v-if="isDialogOpen" @close="closeDialog" @add="addTask"></add-task-dialog>

     <the-header></the-header>

     <div class="container">
          <div class="col-md-6 offset-md-3">
               <div class="button-section">
                    <button class="add-button" @click="openDialog">+ add a task</button>
               </div>

               <base-spinner v-if="isLoading"></base-spinner>

               <ul>
                    <task-item 
                         v-for="task in tasks"
                         :key="task.id"
                         :task="task"
                         @delete-task="deleteTask">
                    </task-item>
               </ul>

               <div class="button-section">
                    <button class="logout-button" @click="logout">Logout</button>
               </div>
          </div>
     </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import db from '../firebase.js';

import TaskItem from '../components/TaskItem.vue';
import AddTaskDialog from '../components/AddTaskDialog.vue';
import useHttps from '../composables/use-https';

export default {
     components: {
          TaskItem,
          AddTaskDialog
     },
     setup() {
          const tasks = ref([]);
          const isDialogOpen = ref(false);

          const store = useStore();
          const router = useRouter();

          function openDialog() {
               isDialogOpen.value = true;
          }

          function closeDialog() {
               isDialogOpen.value = false;
          }

          const userId = store.getters.userId;

          async function addTask(newTask) {
               const { sendRequest: sendAddTaskRequest } = useHttps(
                    `https://to-do-app-6ec13.firebaseio.com/${userId}.json`,
                    {
                         method: 'POST',
                         body: JSON.stringify({
                              description: newTask
                         })
                    }
               );

               isDialogOpen.value = false;

               const utilizeData = (responseData) => {
                    return responseData.name;
               }

               const taskId = await sendAddTaskRequest(utilizeData)

               tasks.value.push({
                    id: taskId,
                    description: newTask,
               });
          }

          function deleteTask(taskId) {
               const userId = store.getters.userId;
               db.ref(userId).child(taskId).remove();

               const index = tasks.value.findIndex(task => task.id === taskId);
               tasks.value.splice(index, 1);
          }

          const { isLoading, errorMessage, sendRequest: sendTasksRequest, confirmError } = useHttps(
               `https://to-do-app-6ec13.firebaseio.com/${userId}.json`,
               null
          );

          async function loadTask() {
               const utilizeData = (responseData) => {
                    const transformedTasks = [];
                    for(const key in responseData) {
                         const task = {
                              id: key,
                              description: responseData[key].description
                         }
                         transformedTasks.push(task);
                    }
                    return transformedTasks;
               };

               tasks.value = await sendTasksRequest(utilizeData, 'Failed to load your tasks.');
          }

          function logout() {
               store.dispatch('logout');
               router.replace('/auth');
          }

          return {
               tasks,
               isDialogOpen,
               openDialog,
               closeDialog,
               addTask,
               deleteTask,
               loadTask,
               errorMessage,
               confirmError,
               logout,
               isLoading
          };
     },
     mounted() {
          this.loadTask();
     }
}
</script>

<style scoped>
.button-section {
     text-align: center;
     margin-top: 30px;
}
button {
     color: #35b6ed;
     padding: 5px 15px;
     display: inline-block;
     cursor: pointer;
     font-size: 16px;
     border-radius: 20px;
     background: #ffffff;
}
.add-button {
     border: 1px dotted #35b6ed;
}
.logout-button {
     border: 1px solid #35b6ed;
}
.add-button:focus, .logout-button:focus {
     outline: none;
}
</style>
