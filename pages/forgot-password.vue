<template>
    <form @submit.prevent="handleForgotPassword">
      <div class="forgot-container">
        <div class="forgot-header">
          <a href="/" class="back-button">
            <span>
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="12" fill="#1F1F1F" fill-opacity="0.1"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M28.0001 20C28.0001 20.2653 27.8947 20.5196 27.7072 20.7071C27.5196 20.8947 27.2653 21 27.0001 21H15.4141L19.7081 25.292C19.8011 25.385 19.8748 25.4954 19.9251 25.6169C19.9754 25.7384 20.0013 25.8686 20.0013 26C20.0013 26.1315 19.9754 26.2617 19.9251 26.3832C19.8748 26.5047 19.8011 26.6151 19.7081 26.708C19.6151 26.801 19.5047 26.8748 19.3832 26.9251C19.2618 26.9754 19.1316 27.0013 19.0001 27.0013C18.8686 27.0013 18.7384 26.9754 18.6169 26.9251C18.4954 26.8748 18.3851 26.801 18.2921 26.708L12.2921 20.708C12.199 20.6152 12.1251 20.5048 12.0747 20.3833C12.0242 20.2618 11.9983 20.1316 11.9983 20C11.9983 19.8685 12.0242 19.7383 12.0747 19.6168C12.1251 19.4953 12.199 19.3849 12.2921 19.292L18.2921 13.292C18.4799 13.1043 18.7345 12.9988 19.0001 12.9988C19.2656 12.9988 19.5203 13.1043 19.7081 13.292C19.8959 13.4798 20.0013 13.7345 20.0013 14C20.0013 14.2656 19.8959 14.5203 19.7081 14.708L15.4141 19H27.0001C27.2653 19 27.5196 19.1054 27.7072 19.2929C27.8947 19.4805 28.0001 19.7348 28.0001 20Z" fill="#1F1F1F"/>
                </svg>
            </span>
          </a>
          <div class="logo">
            <svg width="113" height="27" viewBox="0 0 113 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.71439 26C1.45039 26 1.23439 25.916 1.06639 25.748C0.898391 25.58 0.814391 25.364 0.814391 25.1V1.7C0.814391 1.436 0.898391 1.22 1.06639 1.052C1.23439 0.883999 1.45039 0.799998 1.71439 0.799998H5.63839C5.90239 0.799998 6.11839 0.883999 6.28639 1.052C6.45439 1.22 6.53839 1.436 6.53839 1.7V10.7H16.2944V1.7C16.2944 1.436 16.3784 1.22 16.5464 1.052C16.7144 0.883999 16.9304 0.799998 17.1944 0.799998H21.1184C21.3824 0.799998 21.5984 0.883999 21.7664 1.052C21.9344 1.22 22.0184 1.436 22.0184 1.7V25.1C22.0184 25.364 21.9344 25.58 21.7664 25.748C21.5984 25.916 21.3824 26 21.1184 26H17.1944C16.9304 26 16.7144 25.916 16.5464 25.748C16.3784 25.58 16.2944 25.364 16.2944 25.1V15.812H6.53839V25.1C6.53839 25.364 6.45439 25.58 6.28639 25.748C6.11839 25.916 5.90239 26 5.63839 26H1.71439ZM36.5734 26.36C34.7254 26.36 33.0454 26.096 31.5334 25.568C30.0454 25.016 28.8334 24.236 27.8974 23.228C26.9854 22.22 26.4454 20.996 26.2774 19.556C26.2534 19.34 26.3134 19.16 26.4574 19.016C26.6254 18.872 26.8174 18.8 27.0334 18.8H30.9934C31.2814 18.8 31.4854 18.848 31.6054 18.944C31.7494 19.04 31.8934 19.208 32.0374 19.448C32.2774 20.12 32.7454 20.672 33.4414 21.104C34.1614 21.536 35.1694 21.752 36.4654 21.752C38.0014 21.752 39.2014 21.272 40.0654 20.312C40.9294 19.328 41.3614 17.96 41.3614 16.208V15.56H33.9094C33.6454 15.56 33.4294 15.476 33.2614 15.308C33.0934 15.116 33.0094 14.888 33.0094 14.624V12.176C33.0094 11.912 33.0934 11.696 33.2614 11.528C33.4294 11.336 33.6454 11.24 33.9094 11.24H41.3614V10.628C41.3614 8.732 40.9294 7.34 40.0654 6.452C39.2254 5.54 38.0254 5.084 36.4654 5.084C35.1694 5.084 34.1614 5.312 33.4414 5.768C32.7454 6.224 32.3014 6.764 32.1094 7.388C31.9894 7.628 31.8694 7.796 31.7494 7.892C31.6294 7.988 31.4254 8.036 31.1374 8.036H27.1414C26.9254 8.036 26.7334 7.964 26.5654 7.82C26.3974 7.676 26.3254 7.496 26.3494 7.28C26.5414 5.792 27.0934 4.544 28.0054 3.536C28.9414 2.504 30.1414 1.736 31.6054 1.232C33.0934 0.703999 34.7494 0.439999 36.5734 0.439999C38.6134 0.439999 40.4254 0.811999 42.0094 1.556C43.5934 2.276 44.8414 3.392 45.7534 4.904C46.6654 6.416 47.1694 8.384 47.2654 10.808C47.2894 11.504 47.3014 12.116 47.3014 12.644C47.3014 13.148 47.3014 13.664 47.3014 14.192C47.3014 14.696 47.2894 15.296 47.2654 15.992C47.1694 18.44 46.6654 20.432 45.7534 21.968C44.8654 23.48 43.6294 24.596 42.0454 25.316C40.4854 26.012 38.6614 26.36 36.5734 26.36ZM52.1158 17.504C51.8758 17.504 51.6718 17.42 51.5038 17.252C51.3358 17.084 51.2518 16.88 51.2518 16.64V13.76C51.2518 13.52 51.3358 13.316 51.5038 13.148C51.6718 12.98 51.8758 12.896 52.1158 12.896H63.3118C63.5518 12.896 63.7558 12.98 63.9238 13.148C64.0918 13.316 64.1758 13.52 64.1758 13.76V16.64C64.1758 16.88 64.0918 17.084 63.9238 17.252C63.7558 17.42 63.5518 17.504 63.3118 17.504H52.1158ZM75.4264 26C75.1624 26 74.9464 25.916 74.7784 25.748C74.6104 25.58 74.5264 25.364 74.5264 25.1V5.804H67.9744C67.7344 5.804 67.5304 5.72 67.3624 5.552C67.1944 5.384 67.1104 5.18 67.1104 4.94V1.7C67.1104 1.436 67.1944 1.22 67.3624 1.052C67.5304 0.883999 67.7344 0.799998 67.9744 0.799998H86.8384C87.1024 0.799998 87.3184 0.883999 87.4864 1.052C87.6544 1.22 87.7384 1.436 87.7384 1.7V4.94C87.7384 5.18 87.6544 5.384 87.4864 5.552C87.3184 5.72 87.1024 5.804 86.8384 5.804H80.3224V25.1C80.3224 25.364 80.2384 25.58 80.0704 25.748C79.9024 25.916 79.6864 26 79.4224 26H75.4264ZM101.209 26.36C99.0251 26.36 97.1411 26 95.5571 25.28C93.9731 24.56 92.7371 23.48 91.8491 22.04C90.9611 20.576 90.4811 18.74 90.4091 16.532C90.3851 15.5 90.3731 14.48 90.3731 13.472C90.3731 12.44 90.3851 11.396 90.4091 10.34C90.4811 8.18 90.9611 6.368 91.8491 4.904C92.7611 3.416 94.0091 2.3 95.5931 1.556C97.2011 0.811999 99.0731 0.439999 101.209 0.439999C103.321 0.439999 105.169 0.811999 106.753 1.556C108.361 2.3 109.621 3.416 110.533 4.904C111.445 6.368 111.925 8.18 111.973 10.34C112.021 11.396 112.045 12.44 112.045 13.472C112.045 14.48 112.021 15.5 111.973 16.532C111.901 18.74 111.421 20.576 110.533 22.04C109.645 23.48 108.409 24.56 106.825 25.28C105.241 26 103.369 26.36 101.209 26.36ZM101.209 21.716C102.601 21.716 103.741 21.296 104.629 20.456C105.541 19.592 106.021 18.224 106.069 16.352C106.117 15.296 106.141 14.312 106.141 13.4C106.141 12.464 106.117 11.48 106.069 10.448C106.045 9.2 105.817 8.18 105.385 7.388C104.953 6.596 104.377 6.02 103.657 5.66C102.961 5.276 102.145 5.084 101.209 5.084C100.273 5.084 99.4451 5.276 98.7251 5.66C98.0051 6.02 97.4291 6.596 96.9971 7.388C96.5891 8.18 96.3611 9.2 96.3131 10.448C96.2891 11.48 96.2771 12.464 96.2771 13.4C96.2771 14.312 96.2891 15.296 96.3131 16.352C96.3851 18.224 96.8651 19.592 97.7531 20.456C98.6411 21.296 99.7931 21.716 101.209 21.716Z" fill="#0973FB"/>
            </svg>
          </div>
        </div>
  
        <div class="forgot-form">
          <h2>Нууц үг сэргээх</h2>
          
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
          
          <div v-if="!requestCompleted">
            <p class="instruction">Бүртгэлтэй утасны дугаараа оруулна уу. Бид таны имэйл луу нууц үг шинэчлэх линк илгээх болно.</p>
            
            <div class="input-group">
              <label>Утасны дугаар</label>
              <input
                name="tel"
                type="tel"
                v-model="form.phoneNumber"
                placeholder="99112233"
                @input="validatePhoneNumber"
              />
              <p v-if="!isPhoneValid && form.phoneNumber.length > 0" class="error">
                Утасны дугаар яг 8 оронтой байх ёстой.
              </p>
            </div>
  
            <button class="forgot-button" type="submit" :disabled="loading">
              {{ loading ? 'Илгээж байна...' : 'Нууц үг сэргээх линк авах' }}
            </button>
          </div>
          
          <div v-if="requestCompleted" class="forgot-success">
            <p>Нууц үг сэргээх линк амжилттай илгээгдлээ!</p>
            <p>Таны <strong>{{ maskedEmail }}</strong> имэйл хаяг руу илгээгдсэн линк дээр дарж нууц үгээ сэргээнэ үү.</p>
            <button class="forgot-button" @click="goToLogin">Нэвтрэх хуудас руу очих</button>
          </div>
        </div>
      </div>
    </form>
  </template>
  
  <script setup>
  definePageMeta({
    layout: 'custom'
  })
  
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const loading = ref(false)
  const errorMessage = ref('')
  const requestCompleted = ref(false)
  const isPhoneValid = ref(true)
  const maskedEmail = ref('')
  
  const form = ref({
    phoneNumber: '',
  })
  
  const validatePhoneNumber = () => {
    const phoneRegex = /^\d{8}$/; // Exactly 8 digits
    isPhoneValid.value = phoneRegex.test(form.value.phoneNumber);
  };
  
  const handleForgotPassword = async () => {
    validatePhoneNumber();
  
    // Basic validation
    if (!form.value.phoneNumber.trim()) {
      errorMessage.value = 'Утасны дугаараа оруулна уу'
      return
    }
  
    if (!isPhoneValid.value) {
      errorMessage.value = 'Утасны дугаар яг 8 оронтой байх ёстой.'
      return
    }
  
    loading.value = true
    errorMessage.value = ''
  
    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: form.value.phoneNumber,
        }),
      })
  
      const data = await response.json()
  
      if (!response.ok) {
        errorMessage.value = data.message || 'Алдаа гарлаа'
        return
      }
  
      maskedEmail.value = data.maskedEmail
      requestCompleted.value = true
    } catch (err) {
      console.error('Forgot password error:', err)
      errorMessage.value = 'Холболтын алдаа гарлаа. Дараа дахин оролдоно уу.'
    } finally {
      loading.value = false
    }
  }
  
  const goToLogin = () => {
    router.push('/login')
  }
  </script>
  
  <style lang="scss" scoped>
  .forgot-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    font-family: "Rubik", serif;
  }
  
  .forgot-header {
    width: 100%;
    display: grid;
    grid-template-columns: 2.5rem auto 2.5rem;
    margin-bottom: 30px;
  
    .back-button {
      display: inline-flex;
      margin-right: 20px;
    }
  
    .logo {
      flex: 1;
      text-align: center;
    }
  }
  
  .forgot-form {
    background: #fff;
    border-radius: 16px;
    padding: 32px;
  
    h2 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 16px;
      text-align: center;
    }
    
    .instruction {
      color: #6B7280;
      margin-bottom: 24px;
      text-align: center;
    }
  }
  
  .input-group {
    margin-bottom: 20px;
  
    label {
      display: block;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
    }
  
    input {
      width: 100%;
      padding: 12px 16px;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      font-size: 16px;
      
      &::placeholder {
        color: #9CA3AF;
      }
      
      &:focus {
        outline: none;
        border-color: #0973FB;
      }
    }
  }
  
  .error {
    color: #EF4444;
    font-size: 12px;
    margin-top: 4px;
  }
  
  .error-message {
    background-color: #FEE2E2;
    color: #EF4444;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  
  .forgot-button {
    width: 100%;
    background-color: #0973FB;
    color: white;
    font-weight: 600;
    padding: 12px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.2s;
    
    &:hover {
      background-color: #0860d0;
    }
    
    &:disabled {
      background-color: #9CA3AF;
      cursor: not-allowed;
    }
  }
  
  .forgot-success {
    text-align: center;
    padding: 20px 0;
    
    p {
      margin-bottom: 20px;
    }
  }
  </style>