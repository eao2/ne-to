<template>
  <div class="calculator-container">
    <div class="calculator-header">
    </div>

    <div class="calculator-form">
      <h3>Ачаа тээврийн үнэ тооцоолох</h3>

      <div class="delivery-type">
        <div class="price-result">
          <div class="result-card">
            <h4>Тооцоолсон үнэ</h4>
            <p class="price">{{ calculatedPrice.toLocaleString() }}₮</p>
            <p class="calculation-method">{{ calculationMethod }}</p>
            <div class="calculation-details">
              <p>Хэмжээ: {{ calculateVolume().toFixed(3) }} м³</p>
              <p>Жин: {{ form.weight }} кг</p>
            </div>
          </div>
        </div>
        <label>Тээвэрлэлтийн төрөл</label>
        <div class="radio-group">
          <div class="radio-option" :class="{ active: form.deliveryType === 'normal' }"
            @click="selectDeliveryType('normal')">
            Энгийн тээвэр
          </div>
          <div class="radio-option" :class="{ active: form.deliveryType === 'quick' }"
            @click="selectDeliveryType('quick')">
            Шуурхай тээвэр
          </div>
        </div>
      </div>

      <div class="dimensions">
        <div class="input-group">
          <label>Урт (см)</label>
          <input type="number" v-model="form.length" placeholder="0" min="0" @input="validateAndCalculate" />
        </div>

        <div class="input-group">
          <label>Өргөн (см)</label>
          <input type="number" v-model="form.width" placeholder="0" min="0" @input="validateAndCalculate" />
        </div>

        <div class="input-group">
          <label>Өндөр (см)</label>
          <input type="number" v-model="form.height" placeholder="0" min="0" @input="validateAndCalculate" />
        </div>
      </div>
      <div class="input-group">
        <label>Жин (кг)</label>
        <input type="number" v-model="form.weight" step="0.1" placeholder="0" min="0" @input="validateAndCalculate" />
      </div>

      <button class="calculate-button" @click="calculatePrice">
        Үнэ тооцоолох
      </button>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <div class="info">
        <b>🚛 1. ЭНГИЙН ТЭЭВЭР</b><br>
        <ul>
          <li>0–100гр → 2000₮</li>
          <li>100гр–1кг → 3000₮</li>
          <li>1кг-с дээш → 3000₮/кг</li>
          <li>Гутлын хайрцаг → 8000-10000₮</li>
          <li>Овроор: 1м³ = 800¥</li>
        </ul>
        <br>
        <hr><br>
        <b>⚡ 2. ШУУРХАЙ ТЭЭВЭР</b><br>
        <ul>
          <li>0–100гр → 3000₮</li>
          <li>100гр–1кг → 3500₮</li>
          <li>Гутлын хайрцаг → 8000₮-13000₮</li>
          <li>Овортой түүвэр ачаа → 3500₮-с эхлэнэ</li>
        </ul>
        <br>
        <b>⚠️ Анхааруулга:</b><br>
        Шуурхай тээврээр овор ихтэй ачаа ирэхгүй.<br>
        Жишээ нь — гутлын хайрцагнаас жижиг хэмжээтэй ачаа шуурхай тээврээр ирэх боломжтой.<br><br>
        <hr><br>
        <b>💡 Жин ихтэй бага оврын ачааг жингээр, оврын хэмжээ ихтэй ачааг овроор тооцно.</b>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const form = ref({
  deliveryType: 'normal',
  length: '0',
  width: '0',
  height: '0',
  weight: '0'
})

const calculatedPrice = ref(0)
const calculationMethod = ref('')
const errorMessage = ref('')

const calculateVolume = () => {
  const length = parseFloat(form.value.length) || 0
  const width = parseFloat(form.value.width) || 0
  const height = parseFloat(form.value.height) || 0
  return (length * width * height) / 1000000 // Convert to cubic meters
}

const validateAndCalculate = () => {
  // Allow decimal points for weight
  if (form.value.weight.toString().split('.').length > 2) {
    form.value.weight = form.value.weight.toString().split('.')[0] + '.' + form.value.weight.toString().split('.')[1]
  }
  
  calculatePrice()
}

const selectDeliveryType = (type) => {
  form.value.deliveryType = type
  calculatePrice()
}

const calculatePrice = () => {
  errorMessage.value = ''
  const volume = calculateVolume()
  const weight = parseFloat(form.value.weight) || 0

  if (form.value.deliveryType === 'normal') {
    calculateNormalDelivery(volume, weight)
  } else {
    calculateQuickDelivery(volume, weight)
  }
}

const calculateNormalDelivery = (volume, weight) => {
  let priceByVolume = volume * 433500
  let priceByWeight = 0

  // Weight based calculation
  if (weight <= 0.1) {
    priceByWeight = 2000
  } else if (weight <= 1) {
    priceByWeight = 3000
  } else {
    priceByWeight = weight * 3000
  }

  // Use the higher price
  calculatedPrice.value = Math.max(priceByVolume, priceByWeight)
  calculationMethod.value = priceByVolume > priceByWeight ? 
    'Эзлэхүүнээр тооцсон (850¥/м³)' : 'Жингээр нь тооцсон (3,000₮/кг)'
}

const calculateQuickDelivery = (volume, weight) => {
  let priceByVolume = volume * 634000
  let priceByWeight = 0

  if (weight <= 0.1) {
    priceByWeight = 2000
  } else if (weight <= 1) {
    priceByWeight = 3500
  } else {
    priceByWeight = weight * 3500
  }

  calculatedPrice.value = Math.max(priceByVolume, priceByWeight)
  calculationMethod.value = calculatedPrice.value === priceByVolume ? 
    'Эзлэхүүнээр тооцсон (1,250¥/м³)' : 'Жингээр нь тооцсон (3,500₮/кг)'
}

onMounted(() => {
  calculatePrice() // Calculate initial price
})
</script>

<style lang="scss" scoped>
.calculator-container {
  max-width: 600px;
  margin: 0 auto;
  font-family: "Rubik", serif;
}

.calculator-form {
  padding: 1.5rem;

  h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 24px;
  }
}

.delivery-type {
  margin-bottom: 24px;

  label {
    display: block;
    font-weight: 500;
    margin-bottom: 8px;
  }
}

.radio-group {
  display: flex;
  gap: 1.5rem;

  .radio-option {
    flex: 1;
    padding: 12px 16px;
    border: 2px solid #E5E7EB;
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s;

    &:hover {
      border-color: #0973FB;
    }

    &.active {
      background-color: #0973FB;
      color: #fff;
      border-color: #0973FB;
    }
  }
}

.dimensions {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.input-group {
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
    margin-bottom: 1.5rem;
    
    &:focus {
      outline: none;
      border-color: #0973FB;
    }
  }
}

.calculate-button {
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
}

.price-result {
  margin: 1.5rem 0;

  .result-card {
    background-color: #FFFFFF;
    border-radius: 8px;
    padding: 20px;
    text-align: center;

    h4 {
      font-size: 16px;
      color: #374151;
      margin-bottom: 8px;
    }

    .price {
      font-size: 32px;
      font-weight: 700;
      color: #0973FB;
      margin-bottom: 8px;
    }

    .calculation-method {
      font-size: 14px;
      color: #6B7280;
      margin-bottom: 16px;
    }

    .calculation-details {
      font-size: 14px;
      color: #6B7280;
      text-align: left;
      border-top: 1px solid #E5E7EB;
      padding-top: 16px;
      
      p {
        margin-bottom: 4px;
      }
    }
  }
}

.error-message {
  margin-top: 16px;
  background-color: #FEE2E2;
  color: #EF4444;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}
.info{
  color: #6B7280;
  margin-top: 1rem;
  ul{
    margin-left: 1rem;
  }
}
</style>