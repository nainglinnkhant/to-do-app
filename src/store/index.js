import { createStore } from 'vuex';

const store = createStore({
     state() {
          return {
               userId: ''
          }
     },
     getters: {
          userId(state) {
               return state.userId;
          },
          isAuthenticated(state) {
               return !!state.userId;
          }
     },
     actions: {
          async auth(context, payload) {
               let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAWunrscZqJeuNmzExLAIIzRra-OeyVMkg`;

               if(payload.mode === 'Login') {
                    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAWunrscZqJeuNmzExLAIIzRra-OeyVMkg`;
               }

               const response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({
                         email: payload.email,
                         password: payload.password,
                         returnSecureToken: true
                    })
               });

               const responseData = await response.json();

               if(!response.ok) {
                    const error = new Error(responseData.error.message);
                    throw error;
               }

               localStorage.setItem('userId', responseData.localId);

               context.commit('auth', {
                    userId: responseData.localId
               });
          },
          logout(context) {
               localStorage.removeItem('userId');
               context.commit('logout');
          },
          tryLogin(context) {
               const userId = localStorage.getItem('userId');
               if(userId) {
                    context.commit('auth', {
                         userId: userId
                    });
               }
          }
     },
     mutations: {
          auth(state, payload) {
               state.userId = payload.userId;
          },
          logout(state) {
               state.userId = '';
          }
     }
});

export default store;