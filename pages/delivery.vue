<template>
    <section class="header">
        <img src="/logo-main.svg" alt="">
    </section>
    
    <section v-if="hasCargos" class="cargos">
        <!-- PRE_REGISTERED Group -->
        <div v-if="groupedCargos.PRE_REGISTERED.length > 0" class="status-group">
            <h3>Урьдчилан бүртгүүлсэн</h3>
            <div v-for="cargo in groupedCargos.PRE_REGISTERED" 
                 :key="cargo.id" 
                 class="cargo-item"
                 :style="{ borderColor: getStatusBorderColor(cargo.currentStatus), backgroundColor: getStatusBackgroundColor(cargo.currentStatus) }"
                 @click="toggleCargoSelection(cargo)">
                <div class="cargoinfo">
                    <div class="icon">
                        <svg v-if="selectedCargos.includes(cargo.id)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_528_215)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM16.8364 8.3636C17.1878 8.71507 17.1878 9.28493 16.8364 9.63636L10.8364 15.6364C10.4849 15.9878 9.91512 15.9878 9.5636 15.6364L7.1636 13.2364C6.81214 12.8849 6.81214 12.3151 7.1636 11.9636C7.51507 11.6122 8.08493 11.6122 8.4364 11.9636L10.2 13.7272L12.8818 11.0454L15.5636 8.3636C15.9151 8.01214 16.4849 8.01214 16.8364 8.3636Z"  :fill="getStatusColor(cargo.currentStatus)"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_528_215">
                            <rect width="24" height="24" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.5" d="M22.3256 12C22.3256 6.29733 17.7026 1.67442 12 1.67442C6.29733 1.67442 1.67442 6.29733 1.67442 12C1.67442 17.7026 6.29733 22.3256 12 22.3256C17.7026 22.3256 22.3256 17.7026 22.3256 12ZM24 12C24 18.6274 18.6274 24 12 24C5.37257 24 0 18.6274 0 12C5.66442e-06 5.37258 5.37258 5.66148e-06 12 0C18.6274 0 24 5.37257 24 12Z" :fill="getStatusColor(cargo.currentStatus)"/>
                        </svg>
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
            <div v-for="cargo in groupedCargos.RECEIVED_AT_ERENHOT" 
                 :key="cargo.id" 
                 class="cargo-item"
                 :style="{ borderColor: getStatusBorderColor(cargo.currentStatus), backgroundColor: getStatusBackgroundColor(cargo.currentStatus) }"
                 @click="toggleCargoSelection(cargo)">
                <div class="cargoinfo">
                    <div class="icon">
                        <svg v-if="selectedCargos.includes(cargo.id)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_528_215)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM16.8364 8.3636C17.1878 8.71507 17.1878 9.28493 16.8364 9.63636L10.8364 15.6364C10.4849 15.9878 9.91512 15.9878 9.5636 15.6364L7.1636 13.2364C6.81214 12.8849 6.81214 12.3151 7.1636 11.9636C7.51507 11.6122 8.08493 11.6122 8.4364 11.9636L10.2 13.7272L12.8818 11.0454L15.5636 8.3636C15.9151 8.01214 16.4849 8.01214 16.8364 8.3636Z"  :fill="getStatusColor(cargo.currentStatus)"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_528_215">
                            <rect width="24" height="24" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.5" d="M22.3256 12C22.3256 6.29733 17.7026 1.67442 12 1.67442C6.29733 1.67442 1.67442 6.29733 1.67442 12C1.67442 17.7026 6.29733 22.3256 12 22.3256C17.7026 22.3256 22.3256 17.7026 22.3256 12ZM24 12C24 18.6274 18.6274 24 12 24C5.37257 24 0 18.6274 0 12C5.66442e-06 5.37258 5.37258 5.66148e-06 12 0C18.6274 0 24 5.37257 24 12Z" :fill="getStatusColor(cargo.currentStatus)"/>
                        </svg>
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

        <!-- IN_TRANSIT Group -->
        <div v-if="groupedCargos.IN_TRANSIT.length > 0" class="status-group">
            <h3>Замдаа яваа</h3>
            <div v-for="cargo in groupedCargos.IN_TRANSIT" 
                 :key="cargo.id" 
                 class="cargo-item"
                 :style="{ borderColor: getStatusBorderColor(cargo.currentStatus), backgroundColor: getStatusBackgroundColor(cargo.currentStatus) }"
                 @click="toggleCargoSelection(cargo)">
                <div class="cargoinfo">
                    <div class="icon">
                        <svg v-if="selectedCargos.includes(cargo.id)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_528_215)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM16.8364 8.3636C17.1878 8.71507 17.1878 9.28493 16.8364 9.63636L10.8364 15.6364C10.4849 15.9878 9.91512 15.9878 9.5636 15.6364L7.1636 13.2364C6.81214 12.8849 6.81214 12.3151 7.1636 11.9636C7.51507 11.6122 8.08493 11.6122 8.4364 11.9636L10.2 13.7272L12.8818 11.0454L15.5636 8.3636C15.9151 8.01214 16.4849 8.01214 16.8364 8.3636Z"  :fill="getStatusColor(cargo.currentStatus)"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_528_215">
                            <rect width="24" height="24" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.5" d="M22.3256 12C22.3256 6.29733 17.7026 1.67442 12 1.67442C6.29733 1.67442 1.67442 6.29733 1.67442 12C1.67442 17.7026 6.29733 22.3256 12 22.3256C17.7026 22.3256 22.3256 17.7026 22.3256 12ZM24 12C24 18.6274 18.6274 24 12 24C5.37257 24 0 18.6274 0 12C5.66442e-06 5.37258 5.37258 5.66148e-06 12 0C18.6274 0 24 5.37257 24 12Z" :fill="getStatusColor(cargo.currentStatus)"/>
                        </svg>
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

        <!-- DELIVERED_TO_UB Group -->
        <div v-if="groupedCargos.DELIVERED_TO_UB.length > 0" class="status-group">
            <h3>УБ-т ирсэн</h3>
            <div v-for="cargo in groupedCargos.DELIVERED_TO_UB" 
                 :key="cargo.id" 
                 class="cargo-item"
                 :style="{ borderColor: getStatusBorderColor(cargo.currentStatus), backgroundColor: getStatusBackgroundColor(cargo.currentStatus) }"
                 @click="toggleCargoSelection(cargo)">
                <div class="cargoinfo">
                    <div class="icon">
                        <svg v-if="selectedCargos.includes(cargo.id)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_528_215)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12ZM16.8364 8.3636C17.1878 8.71507 17.1878 9.28493 16.8364 9.63636L10.8364 15.6364C10.4849 15.9878 9.91512 15.9878 9.5636 15.6364L7.1636 13.2364C6.81214 12.8849 6.81214 12.3151 7.1636 11.9636C7.51507 11.6122 8.08493 11.6122 8.4364 11.9636L10.2 13.7272L12.8818 11.0454L15.5636 8.3636C15.9151 8.01214 16.4849 8.01214 16.8364 8.3636Z"  :fill="getStatusColor(cargo.currentStatus)"/>
                            </g>
                            <defs>
                            <clipPath id="clip0_528_215">
                            <rect width="24" height="24" fill="white"/>
                            </clipPath>
                            </defs>
                        </svg>
                        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.5" d="M22.3256 12C22.3256 6.29733 17.7026 1.67442 12 1.67442C6.29733 1.67442 1.67442 6.29733 1.67442 12C1.67442 17.7026 6.29733 22.3256 12 22.3256C17.7026 22.3256 22.3256 17.7026 22.3256 12ZM24 12C24 18.6274 18.6274 24 12 24C5.37257 24 0 18.6274 0 12C5.66442e-06 5.37258 5.37258 5.66148e-06 12 0C18.6274 0 24 5.37257 24 12Z" :fill="getStatusColor(cargo.currentStatus)"/>
                        </svg>
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
    <section v-else class="empty-state">
        <div class="message">
            Хүргэлтэд бүртгүүлэх боломжтой ачаа байхгүй байна
        </div>
    </section>

    <div v-if="selectedCargos.length > 0" class="floating-button">
        <button @click="openDeliveryDialog" class="button">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.375 26.25H22.75V2.625C22.75 1.92881 22.4734 1.26113 21.9812 0.768845C21.4889 0.276562 20.8212 0 20.125 0L6.125 0C5.42881 0 4.76113 0.276562 4.26884 0.768845C3.77656 1.26113 3.5 1.92881 3.5 2.625V13.125C3.5 13.3571 3.59219 13.5796 3.75628 13.7437C3.92038 13.9078 4.14294 14 4.375 14C4.60706 14 4.82962 13.9078 4.99372 13.7437C5.15781 13.5796 5.25 13.3571 5.25 13.125V2.625C5.25 2.39294 5.34219 2.17038 5.50628 2.00628C5.67038 1.84219 5.89294 1.75 6.125 1.75H20.125C20.3571 1.75 20.5796 1.84219 20.7437 2.00628C20.9078 2.17038 21 2.39294 21 2.625V26.25H14.875C14.6429 26.25 14.4204 26.3422 14.2563 26.5063C14.0922 26.6704 14 26.8929 14 27.125C14 27.3571 14.0922 27.5796 14.2563 27.7437C14.4204 27.9078 14.6429 28 14.875 28H25.375C25.6071 28 25.8296 27.9078 25.9937 27.7437C26.1578 27.5796 26.25 27.3571 26.25 27.125C26.25 26.8929 26.1578 26.6704 25.9937 26.5063C25.8296 26.3422 25.6071 26.25 25.375 26.25Z" fill="white"/>
                <path d="M17.5 12.25C17.1946 12.2519 16.895 12.3336 16.631 12.4871C16.367 12.6406 16.1477 12.8605 15.995 13.125H14.875C14.6429 13.125 14.4204 13.2172 14.2563 13.3813C14.0922 13.5454 14 13.768 14 14C14 14.2321 14.0922 14.4547 14.2563 14.6188C14.4204 14.7828 14.6429 14.875 14.875 14.875H15.995C16.1488 15.1414 16.3702 15.3626 16.6367 15.5162C16.9032 15.6698 17.2056 15.7505 17.5132 15.75C17.8208 15.7495 18.1229 15.668 18.389 15.5136C18.655 15.3591 18.8757 15.1373 19.0287 14.8704C19.1817 14.6035 19.2617 14.301 19.2605 13.9934C19.2594 13.6858 19.1771 13.3839 19.0221 13.1182C18.8671 12.8524 18.6448 12.6323 18.3775 12.4799C18.1103 12.3275 17.8076 12.2482 17.5 12.25Z" fill="white" fill-opacity="0.5"/>
                <path d="M7 15.75H5.25C4.76675 15.75 4.375 16.1418 4.375 16.625V19.25C4.375 19.7332 4.76675 20.125 5.25 20.125H7C7.48325 20.125 7.875 19.7332 7.875 19.25V16.625C7.875 16.1418 7.48325 15.75 7 15.75Z" fill="white" fill-opacity="0.5"/>
                <path d="M5.25 24.5H4.375C4.14294 24.5 3.92038 24.4078 3.75628 24.2437C3.59219 24.0796 3.5 23.8571 3.5 23.625C3.5 23.3929 3.59219 23.1704 3.75628 23.0063C3.92038 22.8422 4.14294 22.75 4.375 22.75H5.25C5.48206 22.75 5.70462 22.8422 5.86872 23.0063C6.03281 23.1704 6.125 23.3929 6.125 23.625C6.125 23.8571 6.03281 24.0796 5.86872 24.2437C5.70462 24.4078 5.48206 24.5 5.25 24.5Z" fill="white"/>
                <path d="M9.625 28H2.625C1.92881 28 1.26113 27.7234 0.768845 27.2312C0.276562 26.7389 0 26.0712 0 25.375L0 18.375C0 17.6788 0.276562 17.0111 0.768845 16.5188C1.26113 16.0266 1.92881 15.75 2.625 15.75H9.625C10.3212 15.75 10.9889 16.0266 11.4812 16.5188C11.9734 17.0111 12.25 17.6788 12.25 18.375V25.375C12.25 26.0712 11.9734 26.7389 11.4812 27.2312C10.9889 27.7234 10.3212 28 9.625 28ZM2.625 17.5C2.39294 17.5 2.17038 17.5922 2.00628 17.7563C1.84219 17.9204 1.75 18.1429 1.75 18.375V25.375C1.75 25.6071 1.84219 25.8296 2.00628 25.9937C2.17038 26.1578 2.39294 26.25 2.625 26.25H9.625C9.85706 26.25 10.0796 26.1578 10.2437 25.9937C10.4078 25.8296 10.5 25.6071 10.5 25.375V18.375C10.5 18.1429 10.4078 17.9204 10.2437 17.7563C10.0796 17.5922 9.85706 17.5 9.625 17.5H2.625Z" fill="white"/>
            </svg>
            Хүргэлтэд бүртгүүлэх
        </button>
    </div>

    <!-- Delivery Address Dialog -->
    <Dialog :open="isAddressDialogOpen" @close="closeAddressDialog" class="dialog">
        <DialogPanel class="dialogPanel">
            <div class="form-card">
                <h3>Хүргэлтийн хаяг</h3>
                <div v-if="addresses.length === 0" class="no-address">
                    <p>Бүртгэлтэй хүргэлтийн хаяг байхгүй байна</p>
                    <div class="buttons">
                        <button @click="closeAddressDialog" class="close">
                            Буцах
                        </button>
                        <button @click="navigateToAddressPage" class="add-address">
                            Шинэ хаяг нэмэх
                        </button>
                    </div>
                </div>
                <div v-else class="address-list">
                    <div v-for="address in addresses" 
                         :key="address.id" 
                         class="address-item"
                         :class="{ selected: selectedAddress === address.id }"
                         @click="selectAddress(address.id)">
                        <div class="address-info">
                            <div class="main-info">
                                <div class="label">
                                    {{ address.addressLabel || 'Хаяг' }}
                                    <span v-if="address.isDefault" class="default-badge">Үндсэн</span>
                                </div>
                                <div class="contact">{{ address.contactPhone }}</div>
                            </div>
                            <div class="location">{{ getFullAddress(address) }}</div>
                        </div>
                        <div class="select-indicator">
                            <svg v-if="selectedAddress === address.id" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM16.8364 8.36364C17.1878 8.71508 17.1878 9.28492 16.8364 9.63636L10.8364 15.6364C10.4849 15.9878 9.91508 15.9878 9.56364 15.6364L7.16364 13.2364C6.8122 12.8849 6.8122 12.3151 7.16364 11.9636C7.51508 11.6122 8.08492 11.6122 8.43636 11.9636L10.2 13.7272L12.8818 11.0454L15.5636 8.36364C15.9151 8.0122 16.485 8.0122 16.8364 8.36364Z" fill="#0973FB"/>
                            </svg>
                            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.20101 17.799 1.5 12 1.5C6.20101 1.5 1.5 6.20101 1.5 12C1.5 17.799 6.20101 22.5 12 22.5Z" stroke="#E5E7EB" stroke-width="3"/>
                            </svg>
                        </div>
                    </div>
                    <div class="button-group">
                        <div class="top">
                            <button @click="navigateToAddressPage" class="add-new">
                                Шинэ хаяг нэмэх
                            </button>
                        </div>
                        <div class="bottom">
                            <button @click="closeAddressDialog" class="close">
                                Буцах
                            </button>
                            <button @click="submitDeliveryRequest" 
                                    class="submit"
                                    :disabled="!selectedAddress">
                                Захиалах
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DialogPanel>
    </Dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

const router = useRouter()
const hasCargos = ref(false)
const selectedCargos = ref([])
const isAddressDialogOpen = ref(false)
const addresses = ref([])
const selectedAddress = ref(null)
const groupedCargos = ref({})

const fetchAvailableCargos = async () => {
    const token = localStorage.getItem('authToken')
    if (!token) {
        router.push('/login')
        return
    }

    try {
        const response = await fetch('/api/delivery/availableCargos', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const result = await response.json()

        if (result.success && result.data) {
            groupedCargos.value = result.data
            hasCargos.value = Object.values(result.data).some(arr => arr.length > 0)
        }
    } catch (error) {
        console.error('Failed to fetch available cargos:', error)
        toast.error('Ачаа ачаалах үед алдаа гарлаа')
    }
}

const fetchAddresses = async () => {
    const token = localStorage.getItem('authToken')
    if (!token) return

    try {
        const response = await fetch('/api/delivery/getAddresses', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const result = await response.json()

        if (result.success) {
            addresses.value = result.data || []
        }
    } catch (error) {
        console.error('Failed to fetch addresses:', error)
        toast.error('Хаягууд ачаалах үед алдаа гарлаа')
    }
}

const toggleCargoSelection = (cargo) => {
    const index = selectedCargos.value.indexOf(cargo.id)
    if (index === -1) {
        selectedCargos.value.push(cargo.id)
    } else {
        selectedCargos.value.splice(index, 1)
    }
}

const openDeliveryDialog = () => {
    if (selectedCargos.value.length === 0) {
        toast.error('Эхлээд ачаагаа сонгоно уу')
        return
    }
    isAddressDialogOpen.value = true
    fetchAddresses()
}

const closeAddressDialog = () => {
    isAddressDialogOpen.value = false
    selectedAddress.value = null
}

const navigateToAddressPage = () => {
    router.push('/delivery-address')
}

const submitDeliveryRequest = async () => {
    if (!selectedAddress.value) {
        toast.error('Хүргэлтийн хаяг сонгоно уу')
        return
    }

    try {
        const response = await fetch('/api/delivery/addDeliveryRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({
                cargoIds: selectedCargos.value,
                deliveryAddressId: selectedAddress.value
            })
        })

        const result = await response.json()

        if (result.success) {
            toast.success('Хүргэлтийн захиалга амжилттай бүртгэгдлээ')
            closeAddressDialog()
            selectedCargos.value = []
            fetchAvailableCargos()
        } else {
            toast.error(result.message || 'Хүргэлтийн захиалга бүртгэхэд алдаа гарлаа')
        }
    } catch (error) {
        console.error('Failed to submit delivery request:', error)
        toast.error('Хүргэлтийн захиалга бүртгэхэд алдаа гарлаа')
    }
}

const getFullAddress = (address) => {
    return `${address.provinceOrCity}, ${address.district}, ${address.detailedLocation}`
}

const getStatusText = (status) => {
    const statusMap = {
        'PRE_REGISTERED': 'Урьдчилан бүртгүүлсэн',
        'RECEIVED_AT_ERENHOT': 'Эрээн-д хүлээн авсан',
        'IN_TRANSIT': 'Замдаа яваа',
        'DELIVERED_TO_UB': 'УБ-т ирсэн'
    }
    return statusMap[status] || status
}

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


const getStatusColor = (status) => {
    const statusMap = {
        'PRE_REGISTERED': '#8E77B8',
        'RECEIVED_AT_ERENHOT': '#C57C38',
        'IN_TRANSIT': '#059669',
        'DELIVERED_TO_UB': '#0973FB',
        'DELIVERED': '#697386'
    }
    return statusMap[status] || "#0973FB"
}


const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

onMounted(() => {
    fetchAddresses()
    fetchAvailableCargos()
})

const selectAddress = (addressId) => {
    selectedAddress.value = addressId;
}

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
    max-height: 80vh;
    overflow-y: scroll;
    overflow-x: hidden;

    .no-address{
        p{
            padding: 0 16px;
        }
        .buttons{
            margin-top: 16px;
            display: flex;
            justify-content: space-between;
            gap: 8px;
            .add-address{
                background: linear-gradient(45deg, #0973FB 0%, #66BFFF 100%);
                color: #FFFFFF;
                border: none;
            }
            .close{
                background: #F3F4F6;
                color: #1F1F1F;
                border: none;
            }
        }
    }

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

.header {
    padding: 24px;
    background-color: #EAF3FB;
    h1 {
        font-size: 20px;
        font-weight: 500;
        color: #1F1F1F;
    }
}

.cargo-item {
    &:hover {
        background-color: rgba(9, 115, 251, 0.05);
    }
    
    &.selected {
        border-color: #0973FB;
        background-color: rgba(9, 115, 251, 0.1);
    }
}

.dialog {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 400px;
  max-height: 80vh;

  h3 {
    margin-bottom: 16px;
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0 0 16px 0;

    li {
      padding: 12px 14px;
      border-radius: 8px;
      border: 1px solid #ddd;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 0.95rem;
      color: #444;

      &:hover {
        background-color: #f5f7fa;
        border-color: #ccc;
      }
    }
  }

  button {
    width: 100%;
    padding: 10px 14px;
    border: none;
    border-radius: 8px;
    background-color: #0973FB;
    color: white;
    font-weight: 500;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #065dc0;
    }
  }
}

.address-list {
    margin: 16px 0;
    max-height: 60vh;

    .address-item {
        background: #FFFFFF;
        border: 1px solid #E5E7EB;
        border-radius: 16px;
        padding: 16px;
        margin-bottom: 12px;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            border-color: #0973FB;
            background: rgba(9, 115, 251, 0.05);
        }

        &.selected {
            border-color: #0973FB;
            background: #EAF3FB;
        }

        .address-info {
            flex: 1;
            margin-right: 16px;

            .main-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;

                .label {
                    font-weight: 500;
                    font-size: 16px;
                    color: #1F1F1F;
                    display: flex;
                    align-items: center;
                    gap: 8px;

                    .default-badge {
                        background: #0973FB;
                        color: white;
                        padding: 2px 8px;
                        border-radius: 12px;
                        font-size: 12px;
                    }
                }

                .contact {
                    font-size: 14px;
                    color: #6B7280;
                }
            }

            .location {
                font-size: 14px;
                color: #6B7280;
                line-height: 1.4;
            }
        }

        .select-indicator {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}

.button-group {
    .top {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .bottom{
        display: flex;
        justify-content: center;
        width: 100%;
        gap: 8px;
        margin-top: 8px;
    }
    button {
        flex: 1;
        height: 48px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        transition: all 0.2s ease;

        &.add-new{
            background: #EAF3FB;
            color: #1F1F1F;
            border: none;

            &:hover {
                background: #DCE7F3;
            }
        }
        &.close {
            background-color: #FFFFFF;
            color: #1F1F1F;
            border: 1px solid #E5E7EB;

            &:hover {
                background: #E5E7EB;
            }
        }

        &.submit {
            background: linear-gradient(45deg, #0973FB 0%, #66BFFF 100%);
            color: #FFFFFF;
            border: none;

            &:hover {
                opacity: 0.9;
            }

            &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
        }
    }
}

.empty-state{
    padding: 16px 24px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .message {
        font-size: 16px;
        font-weight: 500;
        color: #6B7280;
        text-align: center;
    }
}

</style>