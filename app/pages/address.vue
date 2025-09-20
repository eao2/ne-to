<template>
  <section class="header">
    <img src="/logo-main.svg" alt="">
  </section>

  <section class="content">
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
              <li class="listbox-option" :class="{ 'selected': selectedLocation && selectedLocation.id === loc.id }">
                {{ loc.name }}
              </li>
            </ListboxOption>
          </ListboxOptions>
        </div>
      </Listbox>
    </div>

    <div v-if="selectedLocation?.id" class="address-content">
      <TabGroup>
        <TabList class="tab-list">
          <Tab v-slot="{ selected }" as="template">
            <button :class="['tab-button', { active: selected }]">
              Энгийн тээвэр
            </button>
          </Tab>
          <Tab v-slot="{ selected }" as="template">
            <button :class="['tab-button', { active: selected }]">
              Шуурхай тээвэр
            </button>
          </Tab>
        </TabList>

        <TabPanels>
          <!-- Regular Delivery Panel -->
          <TabPanel>
            <div class="address-panel">
              <div class="copy-rows">
                <div class="copy-row-label">1-р Эгнээ : 收件人 (Хүлээн авагч)</div>
                <div class="copy-row">
                  <span class="text">{{ selectedLocation.regular || '' }}</span>
                  <button @click="copyText(selectedLocation.regular || '')" class="copy-btn">
                    Хуулах
                  </button>
                </div>
                
                <div class="copy-row-label">2-р Эгнээ : 手机号 (Утас)</div>
                <div class="copy-row">
                  <span class="text">15734796400</span>
                  <button @click="copyText('15734796400')" class="copy-btn">
                    Хуулах
                  </button>
                </div>

                <div class="copy-row-label">3-р Эгнээ : 地区 (Бүс нутаг)</div>
                <div class="copy-row">
                  <span class="text">内蒙古自治区锡林郭勒盟二连浩特市</span>
                  <button @click="copyText('内蒙古自治区锡林郭勒盟二连浩特市')" class="copy-btn">
                    Хуулах
                  </button>
                </div>

                <div class="copy-row-label">4-р Эгнээ : 详细地址 (Хаяг)</div>
                <div class="copy-row">
                  <span class="text">内蒙古锡林郭勒盟二连浩特市环宇商贸城，11楼4号({{ isLoggedIn ? `${user.name}, ${user.phoneNumber}` : 'Нэр, Утасны дугаар' }})</span>
                  <button @click="copyText(`内蒙古锡林郭勒盟二连浩特市环宇商贸城，11楼4号(${isLoggedIn ? `${user.name}, ${user.phoneNumber}` : 'Нэр, Утасны дугаар'})`)" class="copy-btn">
                    Хуулах
                  </button>
                </div>
                <button @click="copyText(`${selectedLocation.regular || ''} 15734796400 内蒙古自治区锡林郭勒盟二连浩特市 内蒙古锡林郭勒盟二连浩特市环宇商贸城，11楼4号(${isLoggedIn ? `${user.name}, ${user.phoneNumber}` : 'Нэр, Утасны дугаар'})`)" class="copy-all-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 2C8.67157 2 8 2.67157 8 3.5V4.5C8 5.32843 8.67157 6 9.5 6H14.5C15.3284 6 16 5.32843 16 4.5V3.5C16 2.67157 15.3284 2 14.5 2H9.5Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 4.03662C5.24209 4.10719 4.44798 4.30764 3.87868 4.87694C3 5.75562 3 7.16983 3 9.99826V15.9983C3 18.8267 3 20.2409 3.87868 21.1196C4.75736 21.9983 6.17157 21.9983 9 21.9983H15C17.8284 21.9983 19.2426 21.9983 20.1213 21.1196C21 20.2409 21 18.8267 21 15.9983V9.99826C21 7.16983 21 5.75562 20.1213 4.87694C19.552 4.30764 18.7579 4.10719 17.5 4.03662V4.5C17.5 6.15685 16.1569 7.5 14.5 7.5H9.5C7.84315 7.5 6.5 6.15685 6.5 4.5V4.03662ZM7 13.75C6.58579 13.75 6.25 14.0858 6.25 14.5C6.25 14.9142 6.58579 15.25 7 15.25H15C15.4142 15.25 15.75 14.9142 15.75 14.5C15.75 14.0858 15.4142 13.75 15 13.75H7ZM7 17.25C6.58579 17.25 6.25 17.5858 6.25 18C6.25 18.4142 6.58579 18.75 7 18.75H12.5C12.9142 18.75 13.25 18.4142 13.25 18C13.25 17.5858 12.9142 17.25 12.5 17.25H7Z" fill="white"/>
                  </svg>
                  Бүгдийг нь хуулах
                </button>
              </div>
            </div>
          </TabPanel>
          <!-- Express Delivery Panel -->
          <TabPanel>
            <div class="address-panel">
              <div class="copy-rows">
                <div class="copy-row-label">1-р Эгнээ : 收件人 (Хүлээн авагч)</div>
                <div class="copy-row">
                  <span class="text">{{ selectedLocation.express || '' }}</span>
                  <button @click="copyText(selectedLocation.express || '')" class="copy-btn">
                    Хуулах
                  </button>
                </div>
                
                <div class="copy-row-label">2-р Эгнээ : 手机号 (Утас)</div>
                <div class="copy-row">
                  <span class="text">15734796400</span>
                  <button @click="copyText('15734796400')" class="copy-btn">
                    Хуулах
                  </button>
                </div>

                <div class="copy-row-label">3-р Эгнээ : 地区 (Бүс нутаг)</div>
                <div class="copy-row">
                  <span class="text">内蒙古自治区锡林郭勒盟二连浩特市</span>
                  <button @click="copyText('内蒙古自治区锡林郭勒盟二连浩特市')" class="copy-btn">
                    Хуулах
                  </button>
                </div>

                <div class="copy-row-label">4-р Эгнээ : 详细地址 (Хаяг)</div>
                <div class="copy-row">
                  <span class="text">内蒙古锡林郭勒盟二连浩特市环宇商贸城，11楼4号({{ isLoggedIn ? `${user.name}, ${user.phoneNumber}` : 'Нэр, Утасны дугаар' }})</span>
                  <button @click="copyText(`内蒙古锡林郭勒盟二连浩特市环宇商贸城，11楼4号(${isLoggedIn ? `${user.name}, ${user.phoneNumber}` : 'Нэр, Утасны дугаар'})`)" class="copy-btn">
                    Хуулах
                  </button>
                </div>
                <button @click="copyText(`${selectedLocation.express || ''} 15734796400 内蒙古自治区锡林郭勒盟二连浩特市 内蒙古锡林郭勒盟二连浩特市环宇商贸城，11楼4号(${isLoggedIn ? `${user.name}, ${user.phoneNumber}` : 'Нэр, Утасны дугаар'})`)" class="copy-all-btn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5 2C8.67157 2 8 2.67157 8 3.5V4.5C8 5.32843 8.67157 6 9.5 6H14.5C15.3284 6 16 5.32843 16 4.5V3.5C16 2.67157 15.3284 2 14.5 2H9.5Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 4.03662C5.24209 4.10719 4.44798 4.30764 3.87868 4.87694C3 5.75562 3 7.16983 3 9.99826V15.9983C3 18.8267 3 20.2409 3.87868 21.1196C4.75736 21.9983 6.17157 21.9983 9 21.9983H15C17.8284 21.9983 19.2426 21.9983 20.1213 21.1196C21 20.2409 21 18.8267 21 15.9983V9.99826C21 7.16983 21 5.75562 20.1213 4.87694C19.552 4.30764 18.7579 4.10719 17.5 4.03662V4.5C17.5 6.15685 16.1569 7.5 14.5 7.5H9.5C7.84315 7.5 6.5 6.15685 6.5 4.5V4.03662ZM7 13.75C6.58579 13.75 6.25 14.0858 6.25 14.5C6.25 14.9142 6.58579 15.25 7 15.25H15C15.4142 15.25 15.75 14.9142 15.75 14.5C15.75 14.0858 15.4142 13.75 15 13.75H7ZM7 17.25C6.58579 17.25 6.25 17.5858 6.25 18C6.25 18.4142 6.58579 18.75 7 18.75H12.5C12.9142 18.75 13.25 18.4142 13.25 18C13.25 17.5858 12.9142 17.25 12.5 17.25H7Z" fill="white"/>
                  </svg>
                  Бүгдийg нь хуулах
                </button>
              </div>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>

    <div class="platform-tutorials">
      <TabGroup>
        <TabList class="tab-list">
          <Tab v-slot="{ selected }" as="template">
            <button :class="['tab-button', { active: selected }]">
              Pinduoduo 拼多多
            </button>
          </Tab>
          <Tab v-slot="{ selected }" as="template">
            <button :class="['tab-button', { active: selected }]">
              Taobao 淘寶
            </button>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <swiper
              :modules="[Navigation, Pagination]"
              :navigation="false"
              :pagination="{ clickable: true }"
              class="image-swiper"
            >
              <swiper-slide v-for="i in 8" :key="`pinduoduo-${i}`">
                <img :src="`/cargoAdress/pinduoduo/${i}.jpg`" alt="" loading="lazy">
              </swiper-slide>
            </swiper>
          </TabPanel>

          <TabPanel>
            <swiper
              :modules="[Navigation, Pagination]"
              :navigation="false"
              :pagination="{ clickable: true }"
              class="image-swiper"
            >
              <swiper-slide v-for="i in 17" :key="`taobao-${i}`">
                <img :src="`/cargoAdress/taobao/${i}.jpg`" alt="" loading="lazy">
              </swiper-slide>
            </swiper>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import { toast } from 'vue-sonner'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'

// Get route and router for query parameters
const route = useRoute()
const router = useRouter()

// Merged locations data with codes
const locations = [
  { id: null, name: 'Салбар сонгох', regular: '', express: '' },
  { id: '1', name: 'Сансар', regular: '速', express: 'S' },
  { id: '2', name: '21-р хороолол', regular: 'K', express: 'M' },
  { id: '3', name: 'Төмөр Зам', regular: 'X', express: 'Н' },
  { id: '4', name: '19 үйлчилгээний төв', regular: '巴', express: 'B' },
  { id: '5', name: '3,4-р хороолол гэмтэл', regular: '风', express: 'J' },
]

const user = ref({
  "name": '',
  "phoneNumber": ''
})
const selectedPlatform = ref('pinduoduo')
const selectedLocation = ref(locations[0])
const isLoggedIn = ref(false)

// Initialize selected location from query parameter
const initializeSelectedLocation = () => {
  const queryId = route.query.id
  if (queryId) {
    const foundLocation = locations.find(loc => loc.id === queryId)
    if (foundLocation) {
      selectedLocation.value = foundLocation
    }
  }
}

// Watch for changes in selectedLocation and update URL
watch(selectedLocation, (newLocation) => {
  if (newLocation && newLocation.id) {
    // Update URL with new query parameter without page reload
    router.push({
      path: route.path,
      query: { ...route.query, id: newLocation.id }
    })
  } else {
    // Remove id parameter if no location is selected
    const { id, ...restQuery } = route.query
    router.push({
      path: route.path,
      query: restQuery
    })
  }
}, { deep: true })

// Watch for route changes (e.g., browser back/forward)
watch(() => route.query.id, (newId) => {
  if (newId) {
    const foundLocation = locations.find(loc => loc.id === newId)
    if (foundLocation && foundLocation.id !== selectedLocation.value?.id) {
      selectedLocation.value = foundLocation
    }
  } else if (selectedLocation.value?.id) {
    selectedLocation.value = locations[0]
  }
})

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    toast.info('Хуулаж авлаа!')
  } catch (err) {
    toast.info('Хуулж чадсангүй!')
  }
}

onMounted(async () => {
  // Initialize selected location from query parameter
  initializeSelectedLocation()
  
  // Fetch user information
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

<style lang="scss" scoped>
.header {
    padding: 24px;
    background-color: #EAF3FB;
    h1 {
        font-size: 20px;
        font-weight: 500;
        color: #1F1F1F;
    }
}

.content {
    padding: 16px;
}

.tab-list {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
}

.tab-button {
    flex: 1;
    padding: 12px;
    border-radius: 12px;
    background: rgba(9, 114, 251, 0.1);
    color: #1F1F1F;
    font-weight: 500;
    transition: all 0.2s ease;

    &.active {
        background: linear-gradient(45deg, #0973FB 0%, #66BFFF 100%);
        color: white;
    }
}

.address-panel {
    background: #FFFFFF;
    border-radius: 12px;
    padding: 16px;
}

.copy-rows {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.copy-row-label {
    font-size: 14px;
    color: #6B7280;
    margin-bottom: -4px;
}

.all-copy-btn{
  width: 100%;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(45deg, #66BFFF 0%, #0973FB 100%);
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 500;
}

.copy-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: #F9FAFB;
    border-radius: 8px;
    gap: 12px;
    .text {
        font-size: 16px;
        color: #1F1F1F;
        word-break: break-all;
    }

    .copy-btn {
        padding: 8px 16px;
        background: rgba(9, 114, 251, 0.1);
        color: #0973FB;
        border: none;
        border-radius: 8px;
        font-weight: 500;
        white-space: nowrap;
        transition: opacity 0.2s;

        &:hover {
            opacity: 0.9;
        }
    }
}

.platform-tutorials {
    margin-top: 24px;
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
  border-radius: 8px;
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
  border-radius: 12px;

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

.copy-all-btn{
  width: 100%;
  height: 48px;
  margin-top: 8px;
  border-radius: 8px;
  background-color: #0973FB;
  color: #FFFFFF;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
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