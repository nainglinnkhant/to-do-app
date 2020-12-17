<template>
     <div class="container mt-5">
          <div class="col-md-6 offset-md-3">
               <h2>Page not found</h2>
          
               <p class="pt-3">
                    This page could not be found - maybe check out 
                    <router-link to="/auth">this</router-link>.
               </p>
          </div>
     </div>
</template>

<style scoped>
h2 {
     color: #35b6ed;
     font-size: 22px;
}
p {
     font-size: 15px;
}
</style>