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
                    <div>
                         <label for="email">Email</label>
                         <input
                              type="email"
                              id="email"
                              class="form-control"
                              v-model.trim="email"
                              @blur="setEmailTouched"
                         />
                         <p v-if="isEmailInvalid">please enter a valid email.</p>
                    </div>
                    

                    <div class="mt-3">
                         <label for="password">Password</label>
                         <input
                              type="password"
                              id="password"
                              class="form-control"
                              v-model.trim="password"
                              @blur="setPasswordTouched"
                         />
                         <p v-if="isPasswordInvalid">please enter a valid password (at least 5 characters).</p>
                    </div>

                    <div class="actions">
                         <button class="auth-button">{{ mode }}</button>

                         <button type="button" class="switch-button" @click="switchMode">
                              {{ switchButtonCaption }}
                         </button>
                    </div>
               </form>
          </div>
     </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import useInput from '../composables/use-input';

export default {
     setup() {
          const {
               input: email,
               isInputInvalid: isEmailInvalid,
               setInputTouched: setEmailTouched 
          } = useInput((input) => validateEmail(input));

          const {
               input: password,
               isInputInvalid: isPasswordInvalid,
               setInputTouched: setPasswordTouched 
          } = useInput((input) => input.length > 5);

          const mode = ref('Login');
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

          function validateEmail(email) {
               const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
               return re.test(String(email).toLowerCase());
          }

          async function auth() {
               if(!validateEmail(email.value) || password.value.length <= 5) {
                    return;
               }

               isLoading.value = true;
               try {
                    await store.dispatch('auth', {
                         email: email.value,
                         password: password.value,
                         mode: mode.value  
                    });
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
               errorMessage,
               confirmError,
               isLoading,
               isEmailInvalid,
               isPasswordInvalid,
               setEmailTouched,
               setPasswordTouched
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
     padding-top: 5px;
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