<template>
    <section class="header">
        <img src="/logo-main.svg" alt="" loading="lazy">
        <div class="priceSection">
            Нийт дүн: <span class="price">₮ {{ formattedTotalPrice }}</span>
        </div>
    </section>
    
    <section class="cargos">
        <!-- Skeleton loader when loading -->
        <div v-if="isLoading" class="loader-container">
            <span class="loader"></span>
        </div>
        
        <!-- DELIVERED_TO_UB Group -->
         <template v-else>
            <template v-for="location in groupedCargos.DELIVERED_TO_UB" :key="location.id">
                <div v-if="location.cargos.length > 0" class="status-group">
                    <h3>{{ location.name }} салбарт ирсэн</h3>
                    <div 
                        v-for="cargo in location.cargos" 
                        :key="cargo.id"
                        class="cargo-item"
                        :style="{ borderColor: getStatusBorderColor(cargo.currentStatus), backgroundColor: getStatusBackgroundColor(cargo.currentStatus) }"
                        @click="openCargoDetail(cargo)"
                    >
                        <div class="cargoinfo">
                            <div class="icon">
                                <img :src="`/cargo-status/${cargo.currentStatus}.svg`" alt="" loading="lazy">
                            </div>
                            <div class="text">
                                <div class="nickname">
                                    {{ cargo.nickname || cargo.trackingNumber }}
                                </div>
                                <div class="trackCode">
                                    <img src="/svg/bar-code.svg" alt="bar-code-icon" loading="lazy">
                                    {{ cargo.trackingNumber }}
                                </div>
                            </div>
                            <div v-if="cargo.price" class="priceSection">
                                <div class="price">
                                    ₮ {{ numberWithCommas(Number(cargo.price)) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <!-- Other Status Groups -->
            <template v-for="(cargos, status) in otherGroupedCargos" :key="status">
                <div v-if="cargos.length > 0" class="status-group">
                    <h3>{{ STATUS_TITLES[status] }}</h3>
                    <div 
                        v-for="cargo in cargos" 
                        :key="cargo.id"
                        class="cargo-item"
                        :style="{ borderColor: getStatusBorderColor(cargo.currentStatus), backgroundColor: getStatusBackgroundColor(cargo.currentStatus) }"
                        @click="openCargoDetail(cargo)"
                    >
                        <div class="cargoinfo">
                            <div class="icon">
                                <img :src="`/cargo-status/${cargo.currentStatus}.svg`" alt="" loading="lazy">
                            </div>
                            <div class="text">
                                <div class="nickname">
                                    {{ cargo.nickname || cargo.trackingNumber }}
                                </div>
                                <div class="trackCode">
                                    <img src="/svg/bar-code.svg" alt="bar-code-icon" loading="lazy">
                                    {{ cargo.trackingNumber }}
                                </div>
                            </div>
                            <div v-if="cargo.price" class="priceSection">
                                <div class="price">
                                    ₮ {{ numberWithCommas(Number(cargo.price)) }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </template>
    </section>

    <div class="floating-button">
        <button @click="isOpen = true" class="button">
            <img src="/cargo/add-cargo.svg" alt="" loading="lazy">
            Каргоны трак код нэмэх
        </button>
    </div>

    <!-- Lightweight Modal Implementation -->
    <Teleport to="body">
        <Transition name="fade">
            <div v-if="isOpen" class="dialog-overlay" @click.self="closeAddDialog">
                <div class="dialog-content form-card">
                    <h3>Шинэ ачаа бүртгэх</h3>
                    <form @submit.prevent="handleAddTrack">
                        <div class="form-group">
                            <label>Трак код</label>
                            <input v-model.trim="form.trackingNumber" type="text" required>
                        </div>
                        <div class="form-group">
                            <label>Нэр (optional)</label>
                            <input v-model.trim="form.nickname" type="text">
                        </div>
                        <div class="form-group">
                            <label>Төрөл</label>
                            <select v-model="form.cargoType">
                                <option value="NORMAL">Энгийн</option>
                                <option value="QUICK">Шуурхай</option>
                            </select>
                        </div>
                        <div class="button-group">
                            <button type="button" @click="closeAddDialog" class="cancel">Цуцлах</button>
                            <button type="submit" :disabled="isSubmitting" class="submit">
                                {{ isSubmitting ? 'Уншиж байна...' : 'Нэмэх' }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Transition>

        <Transition name="fade">
            <div v-if="isDetailOpen && cargoDetail" class="dialog-overlay" @click.self="closeDetailDialog">
                <div class="dialog-content detail-card">
                    <div class="head">
                        <div class="status">
                            {{ getStatusText(cargoDetail.currentStatus, cargoDetail.destinationLocation) }}
                        </div>
                        <div class="type">
                            {{ cargoDetail.cargoType === 'QUICK' ? 'Шуурхай' : 'Энгийн' }}
                        </div>
                    </div>
                    <div class="cargoinfo">
                        <div class="icon">
                            <img :src="`/cargo-status/${cargoDetail.currentStatus}.svg`" alt="" loading="lazy">
                        </div>
                        <div class="text">
                            <div class="nickname">
                                {{ cargoDetail.nickname || cargoDetail.trackingNumber }}
                            </div>
                            <div class="trackCode">
                                <img src="/svg/bar-code.svg" alt="bar-code-icon" loading="lazy">
                                {{ cargoDetail.trackingNumber }}
                            </div>
                            <div v-if="detailStatusDate" class="statusDate">
                                {{ detailStatusDate }}
                            </div>
                        </div>
                        <div class="priceSection">
                            <div v-if="cargoDetail.price" class="price">
                                ₮ {{ numberWithCommas(Number(cargoDetail.price)) }}
                            </div>
                        </div>
                    </div>
                    <div class="buttons">
                        <button v-if="cargoDetail.currentStatus === 'PRE_REGISTERED'" 
                                class="delete" 
                                :disabled="isDeleting"
                                @click="deleteCargoTrack(cargoDetail.id)">
                            {{ isDeleting ? 'Устгаж байна...' : 'Устгах' }}
                        </button>
                        <button class="close" @click="closeDetailDialog">Хаах</button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'

const router = useRouter()

// Constants
const STATUS_TITLES = {
    IN_TRANSIT: 'Замдаа яваа',
    RECEIVED_AT_ERENHOT: 'Эрээн-д хүлээн авсан',
    PRE_REGISTERED: 'Урьдчилан бүртгүүлсэн',
    DELIVERED: 'Хүлээлгэн өгсөн'
}

const STATUS_COLORS = {
    PRE_REGISTERED: { border: '#E3DBFF', bg: '#F4F0FF' },
    RECEIVED_AT_ERENHOT: { border: '#FFE3C2', bg: '#FFF4E8' },
    IN_TRANSIT: { border: '#CFFAE2', bg: '#F0FDF4' },
    DELIVERED_TO_UB: { border: '#B3D4FF', bg: '#E6F0FF' },
    DELIVERED: { border: '#D4D7DD', bg: '#F5F6FA' }
}

const STATUS_MAP = {
    PRE_REGISTERED: 'Бүртгэгдсэн',
    RECEIVED_AT_ERENHOT: 'Эрээн-д ирсэн',
    IN_TRANSIT: 'Замд яваа',
    DELIVERED_TO_UB: 'салбарт ирсэн',
    DELIVERED: 'Хүргэгдсэн'
}

// State
const isLoading = ref(true)
const isOpen = ref(false)
const isDetailOpen = ref(false)
const isSubmitting = ref(false)
const isDeleting = ref(false)
const cargoDetail = ref(null)
const groupedCargos = ref({
    DELIVERED_TO_UB: [],
    IN_TRANSIT: [],
    RECEIVED_AT_ERENHOT: [],
    PRE_REGISTERED: [],
    DELIVERED: []
})

const form = ref({
    trackingNumber: '',
    nickname: '',
    cargoType: 'NORMAL'
})

// Debounce function for API calls
const debounce = (fn, delay) => {
    let timeoutId
    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn.apply(this, args), delay)
    }
}

// Memoized number formatting function
const formatNumberCache = new Map()
function numberWithCommas(x) {
    if (formatNumberCache.has(x)) {
        return formatNumberCache.get(x)
    }
    const formatted = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    formatNumberCache.set(x, formatted)
    return formatted
}

function formatDateTime(value) {
    try {
        const d = new Date(value)
        if (isNaN(d.getTime())) return ''
        return d.toLocaleString('mn-MN', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).replace(',', '')
    } catch {
        return ''
    }
}

function getStatusText(status, destinationLocation) {
    if (status === 'DELIVERED_TO_UB' && destinationLocation) {
        return `${destinationLocation.name} ${STATUS_MAP[status]}`
    }
    return STATUS_MAP[status] || status
}

function getToken() {
    const token = localStorage.getItem('authToken')
    if (!token) {
        router.push('/login')
        return null
    }
    return token
}

// Memoized status color functions
const statusBorderColorCache = new Map()
function getStatusBorderColor(status) {
    if (statusBorderColorCache.has(status)) {
        return statusBorderColorCache.get(status)
    }
    const statusMap = {
        'PRE_REGISTERED': '#E3DBFF',
        'RECEIVED_AT_ERENHOT': '#FFE3C2',
        'IN_TRANSIT': '#CFFAE2',
        'DELIVERED_TO_UB': '#B3D4FF',
        'DELIVERED': '#D4D7DD'
    }
    const color = statusMap[status] || '#B3D4FF'
    statusBorderColorCache.set(status, color)
    return color
}

const statusBgColorCache = new Map()
function getStatusBackgroundColor(status) {
    if (statusBgColorCache.has(status)) {
        return statusBgColorCache.get(status)
    }
    const statusMap = {
        'PRE_REGISTERED': '#F4F0FF',
        'RECEIVED_AT_ERENHOT': '#FFF4E8',
        'IN_TRANSIT': '#F0FDF4',
        'DELIVERED_TO_UB': '#E6F0FF',
        'DELIVERED': '#F5F6FA'
    }
    const color = statusMap[status] || '#E6F0FF'
    statusBgColorCache.set(status, color)
    return color
}

// Optimized computed properties
const formattedTotalPrice = computed(() => {
    const total = groupedCargos.value.DELIVERED_TO_UB.reduce((acc, location) => 
        acc + location.cargos.reduce((sum, cargo) => sum + (Number(cargo.price) || 0), 0)
    , 0)
    return numberWithCommas(total)
})

const otherGroupedCargos = computed(() => ({
    IN_TRANSIT: groupedCargos.value.IN_TRANSIT,
    RECEIVED_AT_ERENHOT: groupedCargos.value.RECEIVED_AT_ERENHOT,
    PRE_REGISTERED: groupedCargos.value.PRE_REGISTERED,
    DELIVERED: groupedCargos.value.DELIVERED
}))

const detailStatusDate = computed(() => {
    if (!cargoDetail.value) return null
    const dateMap = {
        PRE_REGISTERED: cargoDetail.value.preRegisteredDate,
        RECEIVED_AT_ERENHOT: cargoDetail.value.receivedAtErenhotDate,
        IN_TRANSIT: cargoDetail.value.inTransitDate,
        DELIVERED_TO_UB: cargoDetail.value.deliveredToUBDate,
        DELIVERED: cargoDetail.value.deliveredDate
    }
    const date = dateMap[cargoDetail.value.currentStatus]
    return date ? formatDateTime(date) : null
})

// Dialog handlers with animation frame optimization
function closeAddDialog() {
    requestAnimationFrame(() => {
        isOpen.value = false
        form.value = { trackingNumber: '', nickname: '', cargoType: 'NORMAL' }
    })
}

function closeDetailDialog() {
    requestAnimationFrame(() => {
        isDetailOpen.value = false
        cargoDetail.value = null
    })
}

// Optimized API calls with requestAnimationFrame
async function fetchCargoTracks() {
    const token = getToken()
    if (!token) return

    isLoading.value = true
    
    try {
        const response = await fetch('/api/cargo/allCargoTracks', {
            headers: { Authorization: `Bearer ${token}` }
        })
        const result = await response.json()

        if (result.status === 401) {
            router.push('/login')
            return
        }

        if (result.success && result.data) {
            requestAnimationFrame(() => {
                const grouped = {
                    DELIVERED_TO_UB: [],
                    IN_TRANSIT: [],
                    RECEIVED_AT_ERENHOT: [],
                    PRE_REGISTERED: [],
                    DELIVERED: []
                }

                const locationGroups = {}

                result.data.forEach(cargo => {
                    if (cargo.currentStatus === 'DELIVERED_TO_UB' && cargo.destinationLocation) {
                        const locationId = cargo.destinationLocation.id
                        if (!locationGroups[locationId]) {
                            locationGroups[locationId] = {
                                id: locationId,
                                name: cargo.destinationLocation.name,
                                cargos: []
                            }
                        }
                        locationGroups[locationId].cargos.push(cargo)
                    } else {
                        grouped[cargo.currentStatus]?.push(cargo)
                    }
                })

                grouped.DELIVERED_TO_UB = Object.values(locationGroups)
                groupedCargos.value = grouped
                isLoading.value = false
            })
        }
    } catch (error) {
        console.error('Failed to fetch cargo tracks:', error)
        toast.error('Ачаа ачаалах үед алдаа гарлаа')
        isLoading.value = false
    }
}

const debouncedHandleAddTrack = debounce(async function() {
    const token = getToken()
    if (!token) return

    isSubmitting.value = true
    try {
        const response = await fetch('/api/cargo/addCargoTrack', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(form.value)
        })

        const data = await response.json()

        if (!response.ok) {
            toast.error(data.body?.message || data.message || 'Алдаа гарлаа')
            return
        }

        toast.success(data.message || 'Амжилттай нэмэгдлээ!')
        closeAddDialog()
        await fetchCargoTracks()
    } catch (err) {
        console.error('Бүртгэл амжилтгүй:', err)
        toast.error(err.message)
    } finally {
        isSubmitting.value = false
    }
}, 300)

function handleAddTrack() {
    debouncedHandleAddTrack()
}

const debouncedOpenCargoDetail = debounce(async function(cargo) {
    const token = getToken()
    if (!token) return

    try {
        const response = await fetch(
            `/api/cargo/detail?trackingNumber=${encodeURIComponent(cargo.trackingNumber)}`,
            { headers: { Authorization: `Bearer ${token}` } }
        )
        const result = await response.json()
        
        if (result.success && result.data) {
            requestAnimationFrame(() => {
                cargoDetail.value = result.data
                isDetailOpen.value = true
            })
        } else {
            toast.error(result.message || 'Дэлгэрэнгүй мэдээлэл олдсонгүй')
        }
    } catch (error) {
        console.error('Failed to fetch cargo detail:', error)
        toast.error('Дэлгэрэнгүй мэдээлэл олдсонгүй')
    }
}, 200)

function openCargoDetail(cargo) {
    debouncedOpenCargoDetail(cargo)
}

const debouncedDeleteCargoTrack = debounce(async function(cargoId) {
    const token = getToken()
    if (!token) return

    isDeleting.value = true
    try {
        const response = await fetch(
            `/api/cargo/deleteCargoTrack?id=${encodeURIComponent(cargoId)}`,
            {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        const result = await response.json()
        
        if (result.success) {
            toast.success('Ачаа амжилттай устгагдлаа')
            closeDetailDialog()
            await fetchCargoTracks()
        } else {
            toast.error(result.message || 'Алдаа гарлаа')
        }
    } catch (error) {
        console.error('Failed to delete cargo:', error)
        toast.error('Ачаа устгах үед алдаа гарлаа')
    } finally {
        isDeleting.value = false
    }
}, 300)

function deleteCargoTrack(cargoId) {
    debouncedDeleteCargoTrack(cargoId)
}

onMounted(() => {
    fetchCargoTracks()
})
</script>

<style lang="scss" scoped>
section {
    width: 100%;
    max-width: 100%;
    padding: 6px 16px;
    will-change: contents;
}

.header {
    padding: 24px;
    background-color: #EAF3FB;
    will-change: contents;
    
    .priceSection {
        display: flex;
        align-items: center;
        color: #6B7280;
        font-size: 16px;
        font-weight: 400;
        padding-top: 16px;
        
        .price {
            font-weight: 500;
            color: #1f1f1f;
            margin-left: 8px;
        }
    }
}

.cargos {
    margin: 16px 0 64px 0;
    will-change: contents;
    
    .status-group {
        margin-bottom: 12px;
        
        h3 {
            font-size: 16px;
            font-weight: 500;
            color: #6B7280;
            margin-bottom: 12px;
            padding-left: 8px;
        }
        
        .cargo-item {
            background-color: #E6F0FF;
            border: 1px solid #B3D4FF;
            border-radius: 20px;
            padding: 8px;
            margin: 8px 0;
            cursor: pointer;
            transition: transform 0.05s ease;
            will-change: transform;
            
            &:active {
                transform: translate3d(0, 1px, 0);
            }
            
            .cargoinfo {
                width: 100%;
                height: auto;
                display: grid;
                grid-template-columns: 64px 1fr auto;
                gap: 12px;
                
                .icon {
                    width: 64px;
                    height: 64px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    will-change: transform;
                    
                    img {
                        width: 64px;
                        height: 64px;
                        transform: translateZ(0);
                    }
                }
                
                .text {
                    min-width: 0;
                    height: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    
                    .nickname {
                        font-size: 16px;
                        font-weight: 500;
                        color: #1F1F1F;
                        margin-bottom: 4px;
                        white-space: normal;
                        word-break: break-word;
                        overflow-wrap: anywhere;
                        margin-top: 8px;
                    }
                    
                    .trackCode {
                        display: flex;
                        align-items: center;
                        gap: 4px;
                        font-size: 14px;
                        font-weight: 400;
                        color: #6B7280;
                        white-space: normal;
                        word-break: break-word;
                        overflow-wrap: anywhere;
                    }
                }
                
                .priceSection {
                    height: 100%;
                    width: auto;
                    display: flex;
                    align-items: center;
                    justify-content: end;
                    
                    .price {
                        font-size: 16px;
                        font-weight: 400;
                        background-color: #1F1F1F;
                        color: #FFFFFF;
                        border-radius: 16px;
                        height: 32px;
                        padding: 0 12px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        white-space: nowrap;
                    }
                }
            }
        }
    }
}

.floating-button {
    position: fixed;
    bottom: 86px;
    width: 100%;
    max-width: 480px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    padding: 0 16px;
    color: #FFFFFF;
    z-index: 10;
    will-change: transform;
    
    .button {
        height: 64px;
        width: 100%;
        border-radius: 20px;
        background: linear-gradient(45deg, #0973FB 0%, #66BFFF 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        font-weight: 500;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        white-space: wrap;
        text-wrap: wrap;
        transform: translateZ(0);
        will-change: transform;
        
        &:active {
            transform: translate3d(0, 1px, 0);
        }
    }
}

.dialog-overlay {
    position: fixed;
    inset: 0;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(31, 31, 31, 0.5);
    padding: 16px;
    will-change: opacity;
}

.dialog-content {
    background: #FFFFFF;
    padding: 12px;
    border-radius: 20px;
    width: 100%;
    max-width: 448px;
    max-height: 80vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    transform: translateZ(0);
    will-change: transform;
}

.form-card {
    h3 {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 24px;
        color: #1F1F1F;
    }
    
    .form-group {
        margin-bottom: 16px;
        
        label {
            display: block;
            font-size: 14px;
            margin-bottom: 8px;
            color: #6B7280;
        }
        
        input, select {
            width: 100%;
            height: 48px;
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            padding: 0 16px;
            font-size: 16px;
            color: #1F1F1F;
            background-color: #FFFFFF;
            transform: translateZ(0);
            
            &:focus {
                outline: none;
                border-color: #0973FB;
                box-shadow: 0 0 0 2px rgba(9, 115, 251, 0.1);
            }
            
            &::placeholder {
                color: #9CA3AF;
            }
        }
        
        select {
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B7280' stroke-width='1.67' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 16px center;
            padding-right: 40px;
        }
    }
    
    .button-group {
        display: flex;
        gap: 12px;
        margin-top: 24px;
        
        button {
            flex: 1;
            height: 48px;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 500;
            border: none;
            cursor: pointer;
            transition: transform 0.1s ease;
            transform: translateZ(0);
            will-change: transform;
            
            &:active {
                transform: translate3d(0, 1px, 0);
            }
            
            &.cancel {
                background: #EAF3FB;
                color: #1F1F1F;
                
                &:hover {
                    background: #DCE7F3;
                }
                
                &:active {
                    background: #CEDBE9;
                }
            }
            
            &.submit {
                background: linear-gradient(45deg, #0973FB 0%, #66BFFF 100%);
                color: #FFFFFF;
                
                &:hover {
                    opacity: 0.9;
                }
                
                &:active {
                    opacity: 0.8;
                }
            }
            
            &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        }
    }
}

.detail-card {
    background-color: #F4F8FB;
    
    .head {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
        
        .status {
            border-radius: 16px;
            height: 32px;
            width: auto;
            font-size: 14px;
            font-weight: 500;
            background-color: #1F1F1F;
            color: #FFFFFF;
            padding: 0 12px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .type {
            border-radius: 1rem;
            height: 32px;
            font-size: 14px;
            font-weight: 500;
            background-color: #0973FB;
            color: #FFFFFF;
            padding: 0 12px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    
    .cargoinfo {
        width: 100%;
        height: auto;
        display: grid;
        grid-template-columns: 64px 1fr auto;
        gap: 12px;
        margin-top: 16px;
        
        .icon {
            width: 64px;
            height: 64px;
            display: flex;
            justify-content: center;
            align-items: center;
            will-change: transform;
            
            img {
                width: 64px;
                height: 64px;
                transform: translateZ(0);
            }
        }
        
        .text {
            min-width: 0;
            height: 100%;
            display: flex;
            flex-direction: column;
            gap: 4px;
            
            .nickname {
                font-size: 16px;
                font-weight: 500;
                color: #1F1F1F;
                margin-bottom: 4px;
                white-space: normal;
                word-break: break-word;
                overflow-wrap: anywhere;
            }
            
            .trackCode {
                display: flex;
                align-items: center;
                gap: 4px;
                font-size: 14px;
                font-weight: 400;
                color: #6B7280;
                white-space: normal;
                word-break: break-word;
                overflow-wrap: anywhere;
            }
            
            .statusDate {
                font-size: 12px;
                color: #6B7280;
            }
        }
        
        .priceSection {
            height: 100%;
            width: auto;
            display: flex;
            align-items: center;
            justify-content: end;
            
            .price {
                font-size: 16px;
                font-weight: 400;
                background-color: #1F1F1F;
                color: #FFFFFF;
                border-radius: 16px;
                height: 32px;
                padding: 0 12px;
                display: flex;
                justify-content: center;
                align-items: center;
                white-space: nowrap;
            }
        }
    }
    
    .buttons {
        width: 100%;
        height: auto;
        display: flex;
        gap: 8px;
        justify-content: end;
        margin-top: 16px;
        
        button {
            flex: 1;
            height: 48px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            border: none;
            cursor: pointer;
            transition: transform 0.1s ease;
            transform: translateZ(0);
            will-change: transform;
            
            &:active {
                transform: translate3d(0, 1px, 0);
            }
            
            &.close {
                background-color: #FFFFFF;
                color: #1F1F1F;
            }
            
            &.delete {
                background-color: #F87171;
                color: #FFFFFF;
            }
            
            &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        }
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}

.loader-container {
    width: 100%;
    height: calc(100vh - 120px - 88px - 80px - 22px);
    display: flex;
    justify-content: center;
    align-items: center;
.loader {
    width: 48px;
    height: 48px;
    border: 5px solid rgba(9, 114, 251, 0.15);
    border-bottom-color: #0973FB;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
}

// Hardware acceleration for animations
@keyframes slideUp {
    from {
        transform: translate3d(0, 20px, 0);
        opacity: 0;
    }
    to {
        transform: translate3d(0, 0, 0);
        opacity: 1;
    }
}
</style>