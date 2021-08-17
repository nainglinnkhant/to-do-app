import { ref } from "vue";

export default function useHttps(url, configObj) {
     const isLoading = ref(false)
     const errorMessage = ref(null)

     const sendRequest = async (utilizeData, errorMsg) => {
          isLoading.value = true

          try {
               const response = await fetch(url, configObj)

               const responseData = await response.json()

               if(!response.ok) {
                    throw new Error(responseData.message)
               }

               isLoading.value = false
               return utilizeData(responseData)
          }
          catch(error) {
               isLoading.value = false
               errorMessage.value = errorMsg || error.message
          }
     }

     const confirmError = () => {
          errorMessage.value = null
     }

     return {
          sendRequest,
          isLoading,
          errorMessage,
          confirmError
     }
}