<template>
  <section class="btns">
    <a href="/" class="back-button">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.79 13.1295L14.013 20.3235C14.982 21.1725 16.5 20.4825 16.5 19.194V4.80597C16.5003 4.51761 16.4174 4.23528 16.2613 3.99281C16.1052 3.75033 15.8825 3.55798 15.62 3.4388C15.3574 3.31962 15.066 3.27865 14.7807 3.3208C14.4955 3.36295 14.2284 3.48644 14.0115 3.67647L5.7915 10.8705C5.63039 11.0113 5.50126 11.1849 5.41278 11.3797C5.32431 11.5745 5.27853 11.786 5.27853 12C5.27853 12.2139 5.32431 12.4254 5.41278 12.6202C5.50126 12.8151 5.63039 12.9887 5.7915 13.1295H5.79Z" fill="white"/>
      </svg>
      Буцах
    </a>
    <!-- <button class="edit-button">✏️ Засах</button> -->
  </section>
  <div class="tracking-container" v-if="trackingData">
    <div class="tracking-info">
      <div class="barcode">
        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.07143 2.4375C1.07143 2.18886 1.1655 1.9504 1.33294 1.77459C1.50038 1.59877 1.72748 1.5 1.96428 1.5C2.20108 1.5 2.42819 1.59877 2.59563 1.77459C2.76307 1.9504 2.85714 2.18886 2.85714 2.4375V15.5625C2.85714 15.8111 2.76307 16.0496 2.59563 16.2254C2.42819 16.4012 2.20108 16.5 1.96428 16.5C1.72748 16.5 1.50038 16.4012 1.33294 16.2254C1.1655 16.0496 1.07143 15.8111 1.07143 15.5625V2.4375ZM4.64286 2.4375C4.64286 2.18886 4.73692 1.9504 4.90437 1.77459C5.07181 1.59877 5.29891 1.5 5.53571 1.5C5.77251 1.5 5.99961 1.59877 6.16706 1.77459C6.3345 1.9504 6.42857 2.18886 6.42857 2.4375V15.5625C6.42857 15.8111 6.3345 16.0496 6.16706 16.2254C5.99961 16.4012 5.77251 16.5 5.53571 16.5C5.29891 16.5 5.07181 16.4012 4.90437 16.2254C4.73692 16.0496 4.64286 15.8111 4.64286 15.5625V2.4375ZM8.21428 2.4375C8.21428 2.18886 8.30835 1.9504 8.4758 1.77459C8.64324 1.59877 8.87034 1.5 9.10714 1.5C9.34394 1.5 9.57104 1.59877 9.73849 1.77459C9.90593 1.9504 10 2.18886 10 2.4375V15.5625C10 15.8111 9.90593 16.0496 9.73849 16.2254C9.57104 16.4012 9.34394 16.5 9.10714 16.5C8.87034 16.5 8.64324 16.4012 8.4758 16.2254C8.30835 16.0496 8.21428 15.8111 8.21428 15.5625V2.4375ZM11.7857 2.4375C11.7857 2.18886 11.8798 1.9504 12.0472 1.77459C12.2147 1.59877 12.4418 1.5 12.6786 1.5H14.4643C14.7011 1.5 14.9282 1.59877 15.0956 1.77459C15.2631 1.9504 15.3571 2.18886 15.3571 2.4375V15.5625C15.3571 15.8111 15.2631 16.0496 15.0956 16.2254C14.9282 16.4012 14.7011 16.5 14.4643 16.5H12.6786C12.4418 16.5 12.2147 16.4012 12.0472 16.2254C11.8798 16.0496 11.7857 15.8111 11.7857 15.5625V2.4375ZM17.1429 2.4375C17.1429 2.18886 17.2369 1.9504 17.4044 1.77459C17.5718 1.59877 17.7989 1.5 18.0357 1.5C18.2725 1.5 18.4996 1.59877 18.6671 1.77459C18.8345 1.9504 18.9286 2.18886 18.9286 2.4375V15.5625C18.9286 15.8111 18.8345 16.0496 18.6671 16.2254C18.4996 16.4012 18.2725 16.5 18.0357 16.5C17.7989 16.5 17.5718 16.4012 17.4044 16.2254C17.2369 16.0496 17.1429 15.8111 17.1429 15.5625V2.4375Z" fill="white"/>
        </svg>
        <span>{{ trackingData.trackingNumber }}</span>
        <!-- <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_245_64)">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4 2C4 1.46957 4.21071 0.960859 4.58579 0.585786C4.96086 0.210714 5.46957 0 6 0L14 0C14.5304 0 15.0391 0.210714 15.4142 0.585786C15.7893 0.960859 16 1.46957 16 2V10C16 10.5304 15.7893 11.0391 15.4142 11.4142C15.0391 11.7893 14.5304 12 14 12H6C5.46957 12 4.96086 11.7893 4.58579 11.4142C4.21071 11.0391 4 10.5304 4 10V2ZM6 1C5.73478 1 5.48043 1.10536 5.29289 1.29289C5.10536 1.48043 5 1.73478 5 2V10C5 10.2652 5.10536 10.5196 5.29289 10.7071C5.48043 10.8946 5.73478 11 6 11H14C14.2652 11 14.5196 10.8946 14.7071 10.7071C14.8946 10.5196 15 10.2652 15 10V2C15 1.73478 14.8946 1.48043 14.7071 1.29289C14.5196 1.10536 14.2652 1 14 1H6ZM2 5C1.73478 5 1.48043 5.10536 1.29289 5.29289C1.10536 5.48043 1 5.73478 1 6V14C1 14.2652 1.10536 14.5196 1.29289 14.7071C1.48043 14.8946 1.73478 15 2 15H10C10.2652 15 10.5196 14.8946 10.7071 14.7071C10.8946 14.5196 11 14.2652 11 14V13H12V14C12 14.5304 11.7893 15.0391 11.4142 15.4142C11.0391 15.7893 10.5304 16 10 16H2C1.46957 16 0.960859 15.7893 0.585786 15.4142C0.210714 15.0391 0 14.5304 0 14V6C0 5.46957 0.210714 4.96086 0.585786 4.58579C0.960859 4.21071 1.46957 4 2 4H3V5H2Z" fill="white"/>
          </g>
          <defs>
          <clipPath id="clip0_245_64">
          <rect width="16" height="16" fill="white"/>
          </clipPath>
          </defs>
        </svg> -->
        <!-- <button @click="navigateTo.clipboard.writeText(trackingData.trackingNumber)">📋</button> -->
      </div>
      <p v-if="trackingData.nickname">Нэр: <strong>{{ trackingData.nickname }}</strong></p>
      <p>Төрөл: <strong>{{ trackingData.cargoType == 'NORMAL' ? 'Энгийн' : 'Шуурхай'}}</strong></p>
      <p>Төлбөр: <strong>{{ trackingData.price || '0' }}₮</strong></p>
      <p>Сүүлд шинэчилсэн: <strong>{{ formatDate(trackingData.updatedAt) }}</strong></p>
      <p>Одоогийн төлөв: <strong>{{ currentStatus(trackingData.currentStatus) }}</strong></p>
    </div>

    <!-- <div class="history">
      <h3>Тээвэрлэлтийн түүх</h3>
      <ul>
        <li v-for="(event, index) in trackingData.history" :key="index">
          <div class="status">r
            <span class="dot" :class="{ active: index === 0 }"></span>
            <div class="details">
              <p class="status-text">{{ event.status }}</p>
              <p class="date">{{ event.date }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const router = useRouter()

const route = useRoute()
const trackCode = route.params.trackCode
const trackingData = ref(null)

function currentStatus(status){
  switch (status) {
    case 'PRE_REGISTERED':
      return 'Урьдчилан бүртгүүлсэн'
      break;
    case 'RECEIVED_AT_ERENHOT':
      return 'Эрээн-д ирсэн'
      break;
    case 'IN_TRANSIT':
      return 'Эрээн-с гарсан'
      break;
    case 'DELIVERED_TO_UB':
      return 'Улаанбаатар-д ирсэн'
      break;
    case 'DELIVERED':
      return 'Бараа хүлээлгэн өгсөн'
      break;
  }
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleString();
};

const fetchTrackingData = async () => {
  try {
    const response = await fetch(`/api/checkTrack?trackingNumber=${encodeURIComponent(trackCode)}`)
    if (!response.ok){
        alert('track код олдсонгүй')
        router.push('/')
    } 
    
    const data = await response.json()
    trackingData.value = data.data
  } catch (error) {
    console.error(error.message)
  }
}

onMounted(fetchTrackingData)
</script>

<style lang="scss" scoped>
@use './style.scss';
</style>