<template>
     <base-dialog v-if="isLoading" errorMessage="Authenticating..." fixed>
          <base-spinner></base-spinner>
     </base-dialog>

     <base-dialog 
          v-if="errorMessage && !isLoading" 
          :errorMessage="errorMessage" 
          @close="confirmError">
     </base-dialog>

     <the-header></the-header>

     <div class="container">
          <div class="col-md-6 offset-md-3">
               <form @submit.prevent="auth">
                    <label for="email">Email</label>
                    <input type="email" id="email" class="form-control mb-3" v-model.trim="email">

                    <label for="password">Password</label>
                    <input type="password" id="password" class="form-control" v-model.trim="password">

                    <p v-if="invalid">*please enter valid email and correct password</p>

                    <div class="actions">
                         <button class="auth-button">{{ mode }}</button>

                         <button type="button" class="switch-button" @click="switchMode">{{ switchButtonCaption }}</button>
                    </div>
               </form>
          </div>
     </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
     setup() {
          const email = ref('');
          const password = ref('');
          const mode = ref('Login');
          const invalid = ref(false);
          const errorMessage = ref('');
          const isLoading = ref(false);

          const store = useStore();
          const router = useRouter();

          const switchButtonCaption = computed(function() {
               if(mode.value === 'Login') {
                    return 'Signup instead';
               }
               else {
                    return 'Login instead';
               }
          });

          function switchMode() {
               if(mode.value === 'Login') {
                    mode.value = 'Signup';
               }
               else {
                    mode.value = 'Login';
               }
          }

          async function auth() {
               if(email.value === '' || !email.value.includes('@') || password.value.length < 6) {
                    invalid.value = true;
                    return;
               }

               // let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAWunrscZqJeuNmzExLAIIzRra-OeyVMkg`;

               // if(mode.value === 'Login') {
               //      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAWunrscZqJeuNmzExLAIIzRra-OeyVMkg`;
               // }

               isLoading.value = true;
               try {
                    invalid.value = false;
                    await store.dispatch('auth', {
                         email: email.value,
                         password: password.value,
                         mode: mode.value  
                    });
                    // const response = await fetch(url, {
                    //      method: 'POST',
                    //      body: JSON.stringify({
                    //           email: email.value,
                    //           password: password.value,
                    //           returnSecureToken: true
                    //      })
                    // });

                    // const responseData = await response.json();

                    // if(!response.ok) {
                    //      const error = new Error(responseData.error.message);
                    //      throw error;
                    // }

                    // store.state.userId = responseData.localId;

                    router.replace('/');
               }
               catch(error) {
                    if(mode.value === 'Signup') {
                         errorMessage.value = 'This email is already used.';
                    }
                    else {
                         errorMessage.value = 'Please enter correct email and password.';
                    }
               }
               isLoading.value = false;
          }

          function confirmError() {
               errorMessage.value = '';
          }

          return {
               email,
               password,
               mode,
               switchMode,
               switchButtonCaption,
               auth,
               invalid,
               errorMessage,
               confirmError,
               isLoading
          }
     }
}
</script>

<style scoped>
form {
     margin: 40px 0;
}
label {
     font-size: 14px;
}
.form-control {
     font-size: 15px;
     padding-left: 5px;
}
p {
     color: red;
     padding-top: 10px;
     font-size: 13px;
     margin-bottom: 0;
}
.actions {
     text-align: center;
}
button {
     font-size: 16px;
     border: 1px solid #35b6ed;
     padding: 4px 15px;
     border-radius: 50px;
     margin: 25px 10px;
     cursor: pointer;
}
.auth-button {
     color: #ffffff;
     background: #35b6ed;
}
.switch-button {
     color: #35b6ed;
     background: #ffffff;
}
.auth-button:focus, .switch-button:focus {
     outline: none;
}
</style>