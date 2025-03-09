<template>
    <div class="container">
      <!-- Copy sections -->
      <div class="address-sections">
        <div class="address-section">
          <h3>ЭНГИЙН ТЭЭВЭР</h3>
          <div class="copy-rows">
            1-р Эгнээ : 收件人 (Хүлээн авагч)
            <div class="copy-row">
              <span>速</span>
              <button @click="copyText('速')" class="copy-btn">Хуулах</button>
            </div>
            2-р Эгнээ : 手机号 (Утас)
            <div class="copy-row">
              <span>15734796400</span>
              <button @click="copyText('15734796400')" class="copy-btn">Хуулах</button>
            </div>
            3-р Эгнээ : 地区 (Бүс нутаг)
            <div class="copy-row">
              <span>内蒙古自治区锡林郭勒盟二连浩特市</span>
              <button @click="copyText('内蒙古自治区锡林郭勒盟二连浩特市')" class="copy-btn">Хуулах</button>
            </div>
            4-р Эгнээ : 详细地址 (Хаяг)
            <div class="copy-row">
              <span>内蒙古锡林郭勒盟二连浩特市环宇商贸城，11楼4号{{ isLoggedIn ? ` (${user.name}, ${user.phoneNumber})` : '(Нэр, Утасны дугаар)' }}</span>
              <button @click="copyText(`内蒙古锡林郭勒盟二连浩特市环宇商贸城，11楼4号${isLoggedIn ? ` (${user.name}, ${user.phoneNumber})` : '(Нэр, Утасны дугаар)'}`)" class="copy-btn">Хуулах</button>
            </div>
          </div>
        </div>
  
        <div class="address-section">
          <h3>ШУУРХАЙ ТЭЭВЭР</h3>
          <div class="copy-rows">
            1-р Эгнээ : 收件人 (Хүлээн авагч)
            <div class="copy-row">
              <span>S</span>
              <button @click="copyText('S')" class="copy-btn">Хуулах</button>
            </div>
            2-р Эгнээ : 手机号 (Утас)
            <div class="copy-row">
              <span>15734796400</span>
              <button @click="copyText('15734796400')" class="copy-btn">Хуулах</button>
            </div>
            3-р Эгнээ : 地区 (Бүс нутаг)
            <div class="copy-row">
              <span>内蒙古自治区锡林郭勒盟二连浩特市</span>
              <button @click="copyText('内蒙古自治区锡林郭勒盟二连浩特市')" class="copy-btn">Хуулах</button>
            </div>
            4-р Эгнээ : 详细地址 (Хаяг)
            <div class="copy-row">
              <span>内蒙古锡林郭勒盟二连浩特市环宇商贸城，11楼4号{{ isLoggedIn ? ` (${user.name}, ${user.phoneNumber})` : '(Нэр, Утасны дугаар)' }}</span>
              <button @click="copyText(`内蒙古锡林郭勒盟二连浩特市环宇商贸城，11楼4号${isLoggedIn ? ` (${user.name}, ${user.phoneNumber})` : '(Нэр, Утасны дугаар)'}`)" class="copy-btn">Хуулах</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Platform selector -->
      <div class="platform-selector">
        <button 
          :class="['selector-btn', { active: selectedPlatform === 'pinduoduo' }]"
          @click="selectedPlatform = 'pinduoduo'"
        >
          Pinduoduo 拼多多
        </button>
        <button 
          :class="['selector-btn', { active: selectedPlatform === 'taobao' }]"
          @click="selectedPlatform = 'taobao'"
        >
          Taobao 淘寶
        </button>
      </div>
  
      <!-- Pinduoduo Swiper -->
      <swiper
        v-if="selectedPlatform === 'pinduoduo'"
        :modules="[Navigation, Pagination]"
        :navigation="false"
        :pagination="{ clickable: true }"
        class="image-swiper"
      >
        <swiper-slide v-for="i in 8" :key="`pinduoduo-${i}`">
          <img :src="`/cargoAdress/pinduoduo/${i}.jpg`" alt="" loading="lazy">
        </swiper-slide>
      </swiper>
  
      <!-- Taobao Swiper -->
      <swiper
        v-if="selectedPlatform === 'taobao'"
        :modules="[Navigation, Pagination]"
        :navigation="false"
        :pagination="{ clickable: true }"
        class="image-swiper"
      >
        <swiper-slide class="swiper-slide" v-for="i in 10" :key="`taobao-${i}`">
          <img :src="`/cargoAdress/taobao/${i}.jpg`" alt="" loading="lazy">
        </swiper-slide>
      </swiper>
    </div>
  </template>
  
<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const user = ref({
    "name": '',
    "phoneNumber": ''
})
const selectedPlatform = ref('pinduoduo')
const isLoggedIn = ref(false)

const copyText = async (text) => {
    try {
        await navigator.clipboard.writeText(text)
        alert(`Амжилттай хууллаа! \n${text}`)
    } catch (err) {
        alert('Хуулж чадсангүй!')
    }
}

onMounted(async () => {
    try {
        const token = localStorage.getItem('authToken');

        if (!token) {
            isLoggedIn.value = false;
            console.log('No token found - user not logged in');
            return;
        }

        const response = await fetch('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (data.body?.name) {
            user.value = data.body;
            isLoggedIn.value = true;
        } else {
            isLoggedIn.value = false;
        }
    } catch (error) {
        console.error('Error fetching user information:', error);
        isLoggedIn.value = false;
    }
});


</script>
  
  <style scoped lang="scss">
  .container {
    margin: 0 auto;
  }
  
  .address-sections {
    margin-bottom: 1rem;
  }
  
  .address-section {
    margin-bottom: 1.5rem;
    background: white;
    padding: 1rem;
    border-radius: 1rem;
  
    h3 {
      margin-bottom: 1rem;
      color: #2c3e50;
    }
  }
  
  .copy-rows {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .copy-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    background: #f5f5f5;
    border-radius: 8px;
  }

  .copy-btn {
    padding: 0.5rem 12px;
    background: #0066ff;
    color: white;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #0066ff;
    }
  }

  .platform-selector {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .selector-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    background: white;
    cursor: pointer;
    transition: all 0.3s;

    &.active {
      background: #0066ff;
      color: white;
    }

  }
  
  .image-swiper {
    width: 100%;
    height: auto;
    .swiper-slide{
        width: 100% !important;
    }
    
    :deep(.swiper-slide) {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 3rem;
      
      img {
        max-width: 100%;
        max-height: calc(100svh - 8rem);
        border-radius: 1rem;
        border: 1px solid #fff;
        object-fit: contain;
      }
    }
  
    :deep(.swiper-button-next),
    :deep(.swiper-button-prev) {
      color: #1f1f1f;
    }
  
    :deep(.swiper-pagination-bullet-active) {
      background: #0066ff;
    }
    :deep(.swiper-pagination){
        bottom: 1rem !important;
    }
  }
  
  
  </style>