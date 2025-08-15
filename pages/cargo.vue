<template>
    <section class="header">
        <img src="/logo-main.svg" alt="">
        <div class="priceSection">
            Нийт дүн: <span class="price">₮ {{numberWithCommas(totalPrice)}}</span>
        </div>
    </section>
    <section class="cargos">
        <!-- DELIVERED_TO_UB Group -->
        <template v-for="location in groupedCargos.DELIVERED_TO_UB" :key="location.id">
            <div v-if="location.cargos.length > 0" class="status-group">
                <h3>{{location.name}} салбарт ирсэн</h3>
            <div v-for="cargo in location.cargos" :key="cargo.id" class="cargo-item" :style="{ borderColor: getStatusBorderColor(cargo.currentStatus), backgroundColor: getStatusBackgroundColor(cargo.currentStatus) }" @click="openCargoDetail(cargo)">
                    <div class="cargoinfo">
                        <div class="icon">
                            <img :src="`/cargo-status/${cargo.currentStatus}.svg`" alt="">
                        </div>
                        <div class="text">
                            <div class="nickname" v-auto-slide>
                                {{cargo.nickname || cargo.trackingNumber}}
                            </div>
                            <div class="trackCode" v-auto-slide>
                                <img src="/svg/bar-code.svg" alt="bar-code-icon">
                                {{cargo.trackingNumber}}
                            </div>
                        </div>
                        <div class="priceSection">
                            <div v-if="cargo.price" class="price">
                                ₮ {{numberWithCommas(Number(cargo.price))}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <!-- IN_TRANSIT Group -->
        <div v-if="groupedCargos.IN_TRANSIT.length > 0" class="status-group">
            <h3>Замдаа яваа</h3>
            <div v-for="cargo in groupedCargos.IN_TRANSIT" :key="cargo.id" class="cargo-item" :style="{ borderColor: getStatusBorderColor(cargo.currentStatus), backgroundColor: getStatusBackgroundColor(cargo.currentStatus) }" @click="openCargoDetail(cargo)">
                <div class="cargoinfo">
                    <div class="icon">
                        <img :src="`/cargo-status/${cargo.currentStatus}.svg`" alt="">
                    </div>
                    <div class="text">
                        <div class="nickname" v-auto-slide>
                            {{cargo.nickname || cargo.trackingNumber}}
                        </div>
                        <div class="trackCode" v-auto-slide>
                            <img src="/svg/bar-code.svg" alt="bar-code-icon">
                            {{cargo.trackingNumber}}
                        </div>
                    </div>
                    <div class="priceSection">
                        <div v-if="cargo.price" class="price">
                            ₮ {{numberWithCommas(Number(cargo.price))}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- RECEIVED_AT_ERENHOT Group -->
        <div v-if="groupedCargos.RECEIVED_AT_ERENHOT.length > 0" class="status-group">
            <h3>Эрээн-д хүлээн авсан</h3>
            <div v-for="cargo in groupedCargos.RECEIVED_AT_ERENHOT" :key="cargo.id" class="cargo-item" :style="{ borderColor: getStatusBorderColor(cargo.currentStatus), backgroundColor: getStatusBackgroundColor(cargo.currentStatus) }" @click="openCargoDetail(cargo)">
                <div class="cargoinfo">
                    <div class="icon">
                        <img :src="`/cargo-status/${cargo.currentStatus}.svg`" alt="">
                    </div>
                    <div class="text">
                        <div class="nickname" v-auto-slide>
                            {{cargo.nickname || cargo.trackingNumber}}
                        </div>
                        <div class="trackCode" v-auto-slide>
                            <img src="/svg/bar-code.svg" alt="bar-code-icon">
                            {{cargo.trackingNumber}}
                        </div>
                    </div>
                    <div class="priceSection">
                        <div v-if="cargo.price" class="price">
                            ₮ {{numberWithCommas(Number(cargo.price))}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- PRE_REGISTERED Group -->
        <div v-if="groupedCargos.PRE_REGISTERED.length > 0" class="status-group">
            <h3>Урьдчилан бүртгүүлсэн</h3>
            <div v-for="cargo in groupedCargos.PRE_REGISTERED" :key="cargo.id" class="cargo-item" :style="{ borderColor: getStatusBorderColor(cargo.currentStatus), backgroundColor: getStatusBackgroundColor(cargo.currentStatus) }" @click="openCargoDetail(cargo)">
                <div class="cargoinfo">
                    <div class="icon">
                        <img :src="`/cargo-status/${cargo.currentStatus}.svg`" alt="">
                    </div>
                    <div class="text">
                        <div class="nickname" v-auto-slide>
                            {{cargo.nickname || cargo.trackingNumber}}
                        </div>
                        <div class="trackCode" v-auto-slide>
                            <img src="/svg/bar-code.svg" alt="bar-code-icon">
                            {{cargo.trackingNumber}}
                        </div>
                    </div>
                    <div class="priceSection">
                        <div v-if="cargo.price" class="price">
                            ₮ {{numberWithCommas(Number(cargo.price))}}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- DELIVERED Group -->
        <div v-if="groupedCargos.DELIVERED.length > 0" class="status-group">
            <h3>Хүлээлгэн өгсөн</h3>
            <div v-for="cargo in groupedCargos.DELIVERED" :key="cargo.id" class="cargo-item" :style="{ borderColor: getStatusBorderColor(cargo.currentStatus), backgroundColor: getStatusBackgroundColor(cargo.currentStatus) }" @click="openCargoDetail(cargo)">
                <div class="cargoinfo">
                    <div class="icon">
                        <img :src="`/cargo-status/${cargo.currentStatus}.svg`" alt="">
                    </div>
                    <div class="text">
                        <div class="nickname" v-auto-slide>
                            {{cargo.nickname || cargo.trackingNumber}}
                        </div>
                        <div class="trackCode" v-auto-slide>
                            <img src="/svg/bar-code.svg" alt="bar-code-icon">
                            {{cargo.trackingNumber}}
                        </div>
                    </div>
                    <div class="priceSection">
                        <div v-if="cargo.price" class="price">
                            ₮ {{numberWithCommas(Number(cargo.price))}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="floating-button">
        <button @click="setIsOpen(true)" class="button">
            <img src="/cargo/add-cargo.svg" alt="">
            Каргоны трак код нэмэх
        </button>
    </div>

    <Dialog class="dialog" :open="isOpen" @close="setIsOpen">
        <DialogPanel class="dialogPanel">
            <div class="form-card">
                <h3>Шинэ ачаа бүртгэх</h3>
                <form @submit.prevent="handleAddTrack">
                    <div class="form-group">
                        <label>Трак код</label>
                        <input v-model="form.trackingNumber" type="text" required>
                    </div>
                    <div class="form-group">
                        <label>Нэр (optional)</label>
                        <input v-model="form.nickname" type="text">
                    </div>
                    <div class="form-group">
                        <label>Төрөл</label>
                        <select v-model="form.cargoType">
                            <option value="NORMAL">Энгийн</option>
                            <option value="QUICK">Шуурхай</option>
                        </select>
                    </div>
                    <div class="button-group">
                        <button type="button" @click="setIsOpen(false)" class="cancel">Цуцлах</button>
                        <button type="submit" class="submit">Нэмэх</button>
                    </div>
                </form>
            </div>
        </DialogPanel>
    </Dialog>

    <Dialog class="detailDialog" :open="isDetailOpen" @close="setDetailOpen">
        <DialogPanel class="detailDialogPanel">
            <div v-if="cargoDetail" class="detailDialogCard">
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
                        <img :src="`/cargo-status/${cargoDetail.currentStatus}.svg`" alt="">
                    </div>
                    <div class="text">
                        <div class="nickname" v-auto-slide>
                            
                            {{ cargoDetail.nickname || cargoDetail.trackingNumber }}
                        </div>
                        <div class="trackCode" v-auto-slide>
                            <img src="/svg/bar-code.svg" alt="bar-code-icon">
                            {{ cargoDetail.trackingNumber }}
                        </div>
                        <div v-if="currentStatusDate(cargoDetail)" class="statusDate">
                            {{ formatDateTime(currentStatusDate(cargoDetail)) }}
                        </div>
                    </div>
                    <div class="priceSection">
                        <div v-if="cargoDetail.price" class="price">
                            ₮ {{ numberWithCommas(Number(cargoDetail.price)) }}
                        </div>
                    </div>
                </div>
                <div class="buttons">
                    <button v-if="cargoDetail.currentStatus == 'PRE_REGISTERED'" class="delete" @click="deleteCargoTrack(cargoDetail.id)">устгах</button>
                    <button class="close" @click="setDetailOpen(false)">Хаах</button>
                </div>
            </div>
        </DialogPanel>
    </Dialog>
</template>

<script setup>  
import { ref, onMounted } from 'vue'
import {
    Dialog,
    DialogPanel,
} from '@headlessui/vue'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'

const router = useRouter();
const isOpen = ref(false)
const cargos = ref([])
const totalPrice = ref(0)
const isDetailOpen = ref(false)
const cargoDetail = ref(null)

const form = ref({
    trackingNumber: '',
    nickname: '',
    cargoType: 'NORMAL'
})

function setIsOpen(value) {
    isOpen.value = value
    if (!value) {
        form.value = {
            trackingNumber: '',
            nickname: '',
            cargoType: 'NORMAL'
        }
    }
}

function setDetailOpen(value) {
    isDetailOpen.value = value
    if (!value) {
        cargoDetail.value = null
    }
}

const groupedCargos = ref({
    DELIVERED_TO_UB: [], // Change to array initially
    IN_TRANSIT: [],
    RECEIVED_AT_ERENHOT: [],
    PRE_REGISTERED: [],
    DELIVERED: []
})

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const deleteCargoTrack = async (cargoId) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        router.push('/login')
        return
    }

    try {
        const response = await fetch(`/api/cargo/deleteCargoTrack?id=${encodeURIComponent(cargoId)}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` }
        })
        const result = await response.json()
        if (result.success) {
            toast.success('Ачаа амжилттай устгагдлаа')
            isDetailOpen.value = false
            cargoDetail.value = null
            fetchCargoTracks() // Refresh the cargo list
        } else {
            toast.error(result.message || 'Алдаа гарлаа')
        }
    } catch (error) {
        console.error('Failed to delete cargo:', error)
        toast.error('Ачаа устгах үед алдаа гарлаа')
    }
}

const fetchCargoTracks = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        router.push('/login')
        return
    }

    try {
        const response = await fetch('/api/cargo/allCargoTracks', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const result = await response.json()

        if (result.status === 401) {
            router.push('/login')
        }

        if (result.success && result.data) {
            // Group cargos by status
            const grouped = {
                DELIVERED_TO_UB: [], // Initialize as array
                IN_TRANSIT: [],
                RECEIVED_AT_ERENHOT: [],
                PRE_REGISTERED: [],
                DELIVERED: []
            }

            // Group by location for DELIVERED_TO_UB
            const locationGroups = {};

            result.data.forEach(cargo => {
                if (cargo.currentStatus === 'DELIVERED_TO_UB' && cargo.destinationLocation) {
                    const locationId = cargo.destinationLocation.id;
                    if (!locationGroups[locationId]) {
                        locationGroups[locationId] = {
                            id: locationId,
                            name: cargo.destinationLocation.name,
                            cargos: []
                        };
                    }
                    locationGroups[locationId].cargos.push(cargo);
                } else {
                    grouped[cargo.currentStatus].push(cargo);
                }
            });

            // Convert locationGroups object to array for DELIVERED_TO_UB
            grouped.DELIVERED_TO_UB = Object.values(locationGroups);
            groupedCargos.value = grouped;

            // Calculate total price only for DELIVERED_TO_UB cargos
            totalPrice.value = Object.values(locationGroups).reduce((acc, location) => {
                return acc + location.cargos.reduce((locAcc, cargo) => {
                    return locAcc + (cargo.price ? Number(cargo.price) : 0)
                }, 0)
            }, 0);
        }
    } catch (error) {
        console.error('Failed to fetch cargo tracks:', error)
        toast.error('Ачаа ачаалах үед алдаа гарлаа')
    }
}

const getStatusText = (status, destinationLocation) => {
    const statusMap = {
        'PRE_REGISTERED': 'Бүртгэгдсэн',
        'RECEIVED_AT_ERENHOT': 'Эрээн-д ирсэн',
        'IN_TRANSIT': 'Замд яваа',
        'DELIVERED_TO_UB': `${destinationLocation ? destinationLocation?.name : ''} салбарт ирсэн`,
        'DELIVERED': 'Хүргэгдсэн'
    }
    return statusMap[status] || status
}

const openCargoDetail = async (cargo) => {
    try {
        const token = localStorage.getItem('authToken')
        if (!token) {
            router.push('/login')
            return
        }
        const response = await fetch(`/api/cargo/detail?trackingNumber=${encodeURIComponent(cargo.trackingNumber)}` , {
            headers: { Authorization: `Bearer ${token}` }
        })
        const result = await response.json()
        if (result.success && result.data) {
            cargoDetail.value = result.data
            isDetailOpen.value = true
        } else {
            toast.error(result.message || 'Дэлгэрэнгүй мэдээлэл олдсонгүй')
        }
    } catch (error) {
        console.error('Failed to fetch cargo detail:', error)
        toast.error(error.message || 'Дэлгэрэнгүй мэдээлэл олдсонгүй')
    }
}

const currentStatusDate = (cargo) => {
    if (!cargo) return null
    const map = {
        'PRE_REGISTERED': cargo.preRegisteredDate,
        'RECEIVED_AT_ERENHOT': cargo.receivedAtErenhotDate,
        'IN_TRANSIT': cargo.inTransitDate,
        'DELIVERED_TO_UB': cargo.deliveredToUBDate,
        'DELIVERED': cargo.deliveredDate,
    }
    return map[cargo.currentStatus] || null
}

const formatDateTime = (value) => {
    try {
        const d = new Date(value)
        if (Number.isNaN(d.getTime())) return ''
        const yyyy = d.getFullYear()
        const mm = String(d.getMonth() + 1).padStart(2, '0')
        const dd = String(d.getDate()).padStart(2, '0')
        const hh = String(d.getHours()).padStart(2, '0')
        const mi = String(d.getMinutes()).padStart(2, '0')
        return `${yyyy}-${mm}-${dd} ${hh}:${mi}`
    } catch {
        return ''
    }
}

const handleAddTrack = async() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        router.push({path: '/login'})
    }

    try {
        const response = await fetch('/api/cargo/addCargoTrack', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                nickname: form.value.nickname,
                cargoType: form.value.cargoType,
                trackingNumber: form.value.trackingNumber
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            toast.error(data.body?.message || data.message || 'Алдаа гарлаа');
            return;
        }

        isOpen.value = false;
        toast.success(data.message || 'Амжилттай нэмэгдлээ!');
        await fetchCargoTracks();
        
        // Reset form
        form.value.nickname = '';
        form.value.cargoType = 'NORMAL';
        form.value.trackingNumber = '';

    } catch (err) {
        console.error('Бүртгэл амжилтгүй:', err);
        toast.error(err.message);
    }
};

const getStatusBorderColor = (status) => {
    const statusMap = {
        'PRE_REGISTERED': '#E3DBFF',
        'RECEIVED_AT_ERENHOT': '#FFE3C2',
        'IN_TRANSIT': '#CFFAE2',
        'DELIVERED_TO_UB': '#B3D4FF',
        'DELIVERED': '#D4D7DD'
    }
    return statusMap[status] || "#B3D4FF"
}

const getStatusBackgroundColor = (status) => {
    const statusMap = {
        'PRE_REGISTERED': '#F4F0FF',
        'RECEIVED_AT_ERENHOT': '#FFF4E8',
        'IN_TRANSIT': '#F0FDF4',
        'DELIVERED_TO_UB': '#E6F0FF',
        'DELIVERED': '#F5F6FA'
    }
    return statusMap[status] || "#E6F0FF"
}


onMounted(() => {
    fetchCargoTracks()
})

// Auto-slide directive for overflowing single-line text (runs once, not infinite)
const vAutoSlide = {
    mounted(el) {
        setupAutoSlide(el)
    },
    updated(el) {
        setupAutoSlide(el)
    }
}

function setupAutoSlide(containerEl) {
    try {
        if (!containerEl || !containerEl.isConnected) return

        const computed = window.getComputedStyle(containerEl)
        const wasInitialized = Boolean(containerEl.__autoSlideInner)

        if (!wasInitialized) {
            const inner = document.createElement('div')
            // Preserve layout: flex containers keep inline-flex; others inline-block
            inner.style.display = computed.display.includes('flex') ? 'inline-flex' : 'inline-block'
            inner.style.alignItems = 'center'
            inner.style.gap = computed.columnGap || '4px'
            inner.style.whiteSpace = 'nowrap'

            while (containerEl.firstChild) {
                inner.appendChild(containerEl.firstChild)
            }
            containerEl.appendChild(inner)
            containerEl.style.overflow = 'hidden'
            containerEl.__autoSlideInner = inner
        }

        const innerEl = containerEl.__autoSlideInner
        if (!innerEl) return

        // Cancel previous animation
        if (containerEl.__autoSlideAnim) {
            try { containerEl.__autoSlideAnim.cancel() } catch {}
            containerEl.__autoSlideAnim = null
        }

        // Measure after layout frame
        requestAnimationFrame(() => {
            const containerWidth = containerEl.clientWidth
            const contentWidth = innerEl.scrollWidth
            const extra = contentWidth - containerWidth

            if (extra <= 2) {
                innerEl.style.transform = 'translateX(0)'
                return
            }

            // Duration based on distance (40px/sec) + small padding
            const durationMs = Math.max(2000, Math.min(12000, Math.round((extra / 40) * 1000 + 800)))

            // Only run when visible in viewport
            const run = () => {
                // Hold at start 10%, slide to end by 90%, then hold
                const anim = innerEl.animate([
                    { transform: 'translateX(0px)' , offset: 0 },
                    { transform: 'translateX(0px)' , offset: 0.1 },
                    { transform: `translateX(${-extra}px)`, offset: 0.9 },
                    { transform: `translateX(${-extra}px)`, offset: 1 }
                ], {
                    duration: durationMs,
                    easing: 'ease-in-out',
                    iterations: 1,
                    fill: 'forwards'
                })
                containerEl.__autoSlideAnim = anim
            }

            if (containerEl.__autoSlideObserved) {
                // Already observed; do nothing
                run()
                return
            }

            const io = new IntersectionObserver((entries) => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        run()
                        io.disconnect()
                        containerEl.__autoSlideObserved = true
                        break
                    }
                }
            }, { threshold: 0.2 })
            io.observe(containerEl)

            // Recompute on resize
            const ro = new ResizeObserver(() => setupAutoSlide(containerEl))
            ro.observe(containerEl)
            containerEl.__autoSlideResizeObs = ro
        })
    } catch {}
}
</script>

<style lang="scss" scoped>
section {
    width: 100%;
    max-width: 100%;
    padding: 6px 16px;
}
.header {
    padding: 24px;
    background-color: #EAF3FB;
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

.cargos{
    margin: 16px 0 64px 0;
    .status-group {
        margin-bottom: 12px;
        h3 {
            font-size: 16px;
            font-weight: 500;
            color: #6B7280;
            margin-bottom: 12px;
            padding-left: 8px;
        }
        .cargo-item{
            background-color: #E6F0FF;
            border: 1px solid #B3D4FF;
            border-radius: 20px;
            padding: 8px;
            margin: 8px 0;
            cursor: pointer;
            transition: transform 0.05s ease;
            &:active {
                transform: scale(0.998);
            }
            .cargoinfo{
                width: 100%;
                height: auto;
                display: grid;
                grid-template-columns: 64px 1fr auto;
                gap: 12px;
                .icon{
                    width: 64px;
                    height: 64px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        width: 64px;
                        height: 64px;
                    }
                }
                .text{
                    min-width: 0;
                    height: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    .nickname{
                        font-size: 16px;
                        font-weight: 500;
                        color: #1F1F1F;
                        margin-bottom: 4px;
                        white-space: normal;
                        word-break: break-word;
                        overflow-wrap: anywhere;
                        margin-top: 8px;
                    }
                    .trackCode{
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
                .priceSection{
                    height: 100%;
                    width: auto;
                    display: flex;
                    align-items: center;
                    justify-content: end;
                    .price{
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
                    };

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
    .button{
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
    }
}

.form-card {
    background: #FFFFFF;
    padding: 24px;
    border-radius: 20px;
    width: 100%;
    max-width: 448px;

    h3 {
        font-size: 18px;
        font-weight: 500;
        margin-bottom: 24px;
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
            transition: all 0.2s ease;

            &.cancel {
                background: #EAF3FB;
                color: #1F1F1F;
                border: none;

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
                border: none;

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

.dialog {
    position: relative;
    z-index: 999;
    
    .dialogPanel {
        position: fixed;
        z-index: 10;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(31, 31, 31, 0.5);
        padding: 16px;

        .form-card {
            background: #FFFFFF;
            padding: 24px;
            border-radius: 20px;
            width: 100%;
            max-width: 448px;
            animation: slideUp 0.2s ease-out;
            max-height: 80vh;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;

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
                    transition: all 0.2s ease;

                    &.cancel {
                        background: #EAF3FB;
                        color: #1F1F1F;
                        border: none;

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
                        border: none;

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
    }
}

/* Detail dialog copied design from index.vue, scoped for cargo detail */
.detailDialog{
    position: relative;
    z-index: 999;
    .detailDialogPanel{
        position: fixed;
        z-index: 10;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(31, 31, 31, 0.5);
        padding: 16px;
        .detailDialogCard{
            width: 100%;
            max-width: 448px;
            background-color: #F4F8FB;
            padding: 12px;
            border-radius: 20px;
            max-height: 80vh;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            .head{
                width: 100%;
                height: auto;
                display: flex;
                justify-content: space-between;
                .status{
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
                .type{
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
            .cargoinfo{
                width: 100%;
                height: auto;
                display: grid;
                grid-template-columns: 64px 1fr auto;
                gap: 12px;
                margin-top: 16px;
                .icon{
                    width: 64px;
                    height: 64px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img{
                        width: 64px;
                        height: 64px;
                    }
                }
                .text{
                    min-width: 0;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    .nickname{
                        font-size: 16px;
                        font-weight: 500;
                        color: #1F1F1F;
                        margin-bottom: 4px;
                        white-space: normal;
                        word-break: break-word;
                        overflow-wrap: anywhere;
                    }
                    .trackCode{
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
                    .statusDate{
                        font-size: 12px;
                        color: #6B7280;
                    }
                }
                .priceSection{
                    height: 100%;
                    width: auto;
                    display: flex;
                    align-items: center;
                    justify-content: end;
                    .price{
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
            .buttons{
                width: 100%;
                height: auto;
                display: flex;
                gap: 8px;
                justify-content: end;
                margin-top: 16px;
                .close{
                    width: 100%;
                    height: 48px;
                    background-color: #FFFFFF;
                    color: #1F1F1F;
                    font-size: 14px;
                    font-weight: 500;
                    border-radius: 8px;
                    border: none;
                    cursor: pointer;
                }
                .delete{
                    width: 100%;
                    height: 48px;
                    background-color: #F87171;
                    color: #FFFFFF;
                    font-size: 14px;
                    font-weight: 500;
                    border-radius: 8px;
                    border: none;
                    cursor: pointer;
                }
            }
        }
    }
}
@keyframes slideUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>