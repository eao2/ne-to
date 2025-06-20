<template>
  <div class="container">
    <!-- Location dropdown selector -->
    <h3 class="location-title">Салбар:</h3>
    <div class="location-select">
      <Listbox v-model="selectedLocation">
        <div class="listbox-wrapper">
          <ListboxButton class="listbox-btn">
            {{ selectedLocation?.name || 'Салбараа сонгоно уу' }}
          </ListboxButton>
          <ListboxOptions class="listbox-options">
            <ListboxOption
              v-for="loc in locations"
              :key="loc.id ?? 'null'"
              :value="loc"
              as="template"
            >
              <li
                class="listbox-option"
                :class="{ 'selected': selectedLocation && selectedLocation.id === loc.id }"
              >
                {{ loc.name }}
              </li>
            </ListboxOption>
          </ListboxOptions>
        </div>
      </Listbox>
    </div>

    <!-- Address Sections -->
    <div v-if="selectedLocation && selectedLocation.id === 'sansar'" class="address-sections">
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

    <div v-if="selectedLocation && selectedLocation.id === 'horoolol21'" class="address-sections">
      <div class="address-section">
        <h3>ЭНГИЙН ТЭЭВЭР</h3>
        <div class="copy-rows">
          1-р Эгнээ : 收件人 (Хүлээн авагч)
          <div class="copy-row">
            <span>K</span>
            <button @click="copyText('K')" class="copy-btn">Хуулах</button>
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
            <span>M</span>
            <button @click="copyText('M')" class="copy-btn">Хуулах</button>
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

    <div v-if="selectedLocation && selectedLocation.id === 'narnii-zam'" class="address-sections">
      <div class="address-section">
        <h3>ЭНГИЙН ТЭЭВЭР</h3>
        <div class="copy-rows">
          1-р Эгнээ : 收件人 (Хүлээн авагч)
          <div class="copy-row">
            <span>X</span>
            <button @click="copyText('X')" class="copy-btn">Хуулах</button>
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
            <span>Н</span>
            <button @click="copyText('Н')" class="copy-btn">Хуулах</button>
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

    <div v-if="selectedLocation && selectedLocation.id === '19uilchilgee'" class="address-sections">
      <div class="address-section">
        <h3>ЭНГИЙН ТЭЭВЭР</h3>
        <div class="copy-rows">
          1-р Эгнээ : 收件人 (Хүлээн авагч)
          <div class="copy-row">
            <span>巴</span>
            <button @click="copyText('巴')" class="copy-btn">Хуулах</button>
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
            <span>B</span>
            <button @click="copyText('B')" class="copy-btn">Хуулах</button>
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

    <div v-if="selectedLocation && selectedLocation.id === 'horoolol3,4gemtel'" class="address-sections">
      <div class="address-section">
        <h3>ЭНГИЙН ТЭЭВЭР</h3>
        <div class="copy-rows">
          1-р Эгнээ : 收件人 (Хүлээн авагч)
          <div class="copy-row">
            <span>风</span>
            <button @click="copyText('风')" class="copy-btn">Хуулах</button>
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
            <span>J</span>
            <button @click="copyText('J')" class="copy-btn">Хуулах</button>
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
      <swiper-slide class="swiper-slide" v-for="i in 17" :key="`taobao-${i}`">
        <img :src="`/cargoAdress/taobao/${i}.jpg`" alt="" loading="lazy">
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const locations = [
  { id: null, name: 'Салбар сонгох' },
  { id: 'sansar', name: 'Сансар' },
  { id: 'horoolol21', name: '21-р хороолол' },
  { id: 'narnii-zam', name: 'Нарны Зам' },
  { id: '19uilchilgee', name: '19 үйлчилгээний төв' },
  { id: 'horoolol3,4gemtel', name: '3,4-р хороолол гэмтэл' },
]

const user = ref({
  "name": '',
  "phoneNumber": ''
})
const selectedPlatform = ref('pinduoduo')
const selectedLocation = ref(locations[0])
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

.location-title{
  margin-bottom: 8px;
  color: #2c3e50;
}

.location-select {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.location-dropdown {
  width: 100%;
  max-width: 100%;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  background: white;
  font-size: 1rem;
  cursor: pointer;
  outline: none;
  
  &:focus {
    border-color: #0066ff;
    box-shadow: 0 0 0 2px rgba(0, 102, 255, 0.1);
  }
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
  
  .swiper-slide {
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
  
  :deep(.swiper-pagination) {
    bottom: 1rem !important;
  }
}

.listbox-wrapper {
  position: relative;
  margin-top: 0.25rem;
  width: 100%;
}

.listbox-btn {
  width: 100%;
  cursor: pointer;
  border-radius: 1rem;
  background: #fff;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  text-align: left;
  border: 1px solid #e2e8f0;
  font-size: 1rem;
  position: relative;
  min-height: 3rem;
}

.listbox-options {
  position: absolute;
  z-index: 100;
  margin-top: 0.25rem;
  width: 100%;
  overflow-y: auto;
  border-radius: 1rem;
  background: #fff;
  font-size: 1rem;
  border: 1px solid #e2e8f0;
}

.listbox-option {
  cursor: pointer;
  user-select: none;
  padding: 0.75rem 1rem;
  transition: background 0.2s;
  border: none;
  background: transparent;

  &:hover, &[aria-selected="true"] {
    background: #f5f5f5;
  }
}

.listbox-option.selected {
  background: #e6f0ff;
  font-weight: 600;
}
</style>