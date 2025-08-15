<template>
    <section class="header">
        <img src="/logo-main.svg" alt="">
    </section>

    <section class="user-info">
        <h2>Таны мэдээлэл:</h2>
        
        <div class="info-items">
            <!-- Name -->
            <div class="info-item" @click="openEdit('name')">
                <div class="icon">
                    <img src="/account/name.svg" alt="">
                </div>
                <div class="info">
                    <div class="label">Нэр</div>
                    <div class="value">{{ userInfo.name || '' }}</div>
                </div>
                <div class="edit">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.25 12C1.25 9.66417 1.24842 7.83685 1.43976 6.41369C1.634 4.96896 2.03932 3.82894 2.93413 2.93413C3.82894 2.03932 4.96896 1.634 6.41369 1.43976C7.83685 1.24842 9.66417 1.25 12 1.25H13.5L13.5194 1.25023C13.9246 1.2605 14.25 1.59226 14.25 2C14.25 2.40774 13.9246 2.7395 13.5194 2.74977L13.5 2.75H12C9.62177 2.75 7.91356 2.75159 6.61358 2.92637C5.33518 3.09825 4.56445 3.42514 3.9948 3.9948C3.42514 4.56445 3.09825 5.33518 2.92637 6.61358C2.75159 7.91356 2.75 9.62177 2.75 12C2.75 14.3782 2.75159 16.0864 2.92637 17.3864C3.09556 18.6449 3.41496 19.4113 3.96825 19.9783L3.9948 20.0052V20.0052C4.56445 20.5749 5.33519 20.9017 6.61358 21.0736C7.91356 21.2484 9.62177 21.25 12 21.25C14.3782 21.25 16.0864 21.2484 17.3864 21.0736C18.6648 20.9017 19.4355 20.5748 20.0052 20.0052L20.0052 20.0052C20.5748 19.4355 20.9017 18.6648 21.0736 17.3864C21.2484 16.0864 21.25 14.3782 21.25 12V10.5C21.25 10.0858 21.5858 9.74999 22 9.74999C22.4142 9.75 22.75 10.0858 22.75 10.5V12C22.75 14.3358 22.7516 16.1631 22.5603 17.5863C22.366 19.031 21.9606 20.171 21.0658 21.0658C20.171 21.9606 19.031 22.366 17.5863 22.5603C16.1631 22.7516 14.3358 22.75 12 22.75C9.66417 22.75 7.83685 22.7516 6.41369 22.5603C4.96896 22.366 3.82894 21.9607 2.93413 21.0658V21.0658C2.03933 20.171 1.63399 19.031 1.43976 17.5863C1.24842 16.1631 1.25 14.3358 1.25 12Z" fill="#6B7280"/>
                        <path d="M16.7706 2.27589C18.1278 0.91872 20.3217 0.908117 21.6919 2.2441L21.7241 2.27592L21.7242 2.27595C23.0919 3.64383 23.0919 5.86158 21.7242 7.22946L21.0752 7.87833L21.0752 7.8783L15.1105 13.8431C14.7189 14.2347 14.4801 14.4753 14.2126 14.684L14.2126 14.684C13.9069 14.9224 13.5762 15.1268 13.2263 15.2936L13.2261 15.2937C12.9199 15.4396 12.5979 15.5455 12.0726 15.7206L10.3372 16.2991L9.21428 16.6734C8.67812 16.8521 8.08688 16.7126 7.68716 16.313L7.68701 16.3128C7.28748 15.9131 7.14788 15.3221 7.3266 14.7858L8.27939 11.9274C8.45449 11.4021 8.56048 11.0801 8.70642 10.7738C8.8732 10.4239 9.07764 10.0931 9.31612 9.78737C9.52478 9.51985 9.76547 9.28102 10.1569 8.8896L16.7706 2.27589ZM11.2175 9.95026C10.801 10.3668 10.6377 10.5319 10.4988 10.71L10.4988 10.71C10.3274 10.9297 10.1804 11.1675 10.0605 11.4192C9.96338 11.6229 9.88868 11.8429 9.70243 12.4017L9.27053 13.6975L10.3026 14.7295L11.5983 14.2976C12.157 14.1113 12.377 14.0367 12.5808 13.9396C12.8324 13.8196 13.0703 13.6726 13.29 13.5013L13.3233 13.4749C13.4897 13.3409 13.6593 13.1729 14.0498 12.7825L19.1052 7.72704C18.5892 7.50515 17.9882 7.14947 17.4194 6.58065C16.8505 6.01184 16.4948 5.41076 16.2729 4.89479L11.2175 9.95026ZM20.6451 3.31839C19.8616 2.55452 18.6073 2.56059 17.8313 3.33658L17.4546 3.71319C17.4773 3.80905 17.509 3.92327 17.5532 4.05066C17.6965 4.46371 17.9677 5.00771 18.48 5.51999C18.9923 6.03226 19.5363 6.30346 19.9493 6.44677C20.0767 6.49097 20.191 6.52268 20.2868 6.54538L20.6635 6.16877C21.4455 5.38668 21.4455 4.11868 20.6635 3.33658L20.6451 3.31839Z" fill="#6B7280"/>
                    </svg>
                </div>
            </div>

            <!-- Phone -->
            <div class="info-item" @click="openEdit('phoneNumber')"
            >
                <div class="icon">
                    <img src="/account/phone-number.svg" alt="">
                </div>
                <div class="info">
                    <div class="label">Утас</div>
                    <div class="value">{{ userInfo.phoneNumber || ''  }}</div>
                </div>
                <div class="edit">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.25 12C1.25 9.66417 1.24842 7.83685 1.43976 6.41369C1.634 4.96896 2.03932 3.82894 2.93413 2.93413C3.82894 2.03932 4.96896 1.634 6.41369 1.43976C7.83685 1.24842 9.66417 1.25 12 1.25H13.5L13.5194 1.25023C13.9246 1.2605 14.25 1.59226 14.25 2C14.25 2.40774 13.9246 2.7395 13.5194 2.74977L13.5 2.75H12C9.62177 2.75 7.91356 2.75159 6.61358 2.92637C5.33518 3.09825 4.56445 3.42514 3.9948 3.9948C3.42514 4.56445 3.09825 5.33518 2.92637 6.61358C2.75159 7.91356 2.75 9.62177 2.75 12C2.75 14.3782 2.75159 16.0864 2.92637 17.3864C3.09556 18.6449 3.41496 19.4113 3.96825 19.9783L3.9948 20.0052V20.0052C4.56445 20.5749 5.33519 20.9017 6.61358 21.0736C7.91356 21.2484 9.62177 21.25 12 21.25C14.3782 21.25 16.0864 21.2484 17.3864 21.0736C18.6648 20.9017 19.4355 20.5748 20.0052 20.0052L20.0052 20.0052C20.5748 19.4355 20.9017 18.6648 21.0736 17.3864C21.2484 16.0864 21.25 14.3782 21.25 12V10.5C21.25 10.0858 21.5858 9.74999 22 9.74999C22.4142 9.75 22.75 10.0858 22.75 10.5V12C22.75 14.3358 22.7516 16.1631 22.5603 17.5863C22.366 19.031 21.9606 20.171 21.0658 21.0658C20.171 21.9606 19.031 22.366 17.5863 22.5603C16.1631 22.7516 14.3358 22.75 12 22.75C9.66417 22.75 7.83685 22.7516 6.41369 22.5603C4.96896 22.366 3.82894 21.9607 2.93413 21.0658V21.0658C2.03933 20.171 1.63399 19.031 1.43976 17.5863C1.24842 16.1631 1.25 14.3358 1.25 12Z" fill="#6B7280"/>
                        <path d="M16.7706 2.27589C18.1278 0.91872 20.3217 0.908117 21.6919 2.2441L21.7241 2.27592L21.7242 2.27595C23.0919 3.64383 23.0919 5.86158 21.7242 7.22946L21.0752 7.87833L21.0752 7.8783L15.1105 13.8431C14.7189 14.2347 14.4801 14.4753 14.2126 14.684L14.2126 14.684C13.9069 14.9224 13.5762 15.1268 13.2263 15.2936L13.2261 15.2937C12.9199 15.4396 12.5979 15.5455 12.0726 15.7206L10.3372 16.2991L9.21428 16.6734C8.67812 16.8521 8.08688 16.7126 7.68716 16.313L7.68701 16.3128C7.28748 15.9131 7.14788 15.3221 7.3266 14.7858L8.27939 11.9274C8.45449 11.4021 8.56048 11.0801 8.70642 10.7738C8.8732 10.4239 9.07764 10.0931 9.31612 9.78737C9.52478 9.51985 9.76547 9.28102 10.1569 8.8896L16.7706 2.27589ZM11.2175 9.95026C10.801 10.3668 10.6377 10.5319 10.4988 10.71L10.4988 10.71C10.3274 10.9297 10.1804 11.1675 10.0605 11.4192C9.96338 11.6229 9.88868 11.8429 9.70243 12.4017L9.27053 13.6975L10.3026 14.7295L11.5983 14.2976C12.157 14.1113 12.377 14.0367 12.5808 13.9396C12.8324 13.8196 13.0703 13.6726 13.29 13.5013L13.3233 13.4749C13.4897 13.3409 13.6593 13.1729 14.0498 12.7825L19.1052 7.72704C18.5892 7.50515 17.9882 7.14947 17.4194 6.58065C16.8505 6.01184 16.4948 5.41076 16.2729 4.89479L11.2175 9.95026ZM20.6451 3.31839C19.8616 2.55452 18.6073 2.56059 17.8313 3.33658L17.4546 3.71319C17.4773 3.80905 17.509 3.92327 17.5532 4.05066C17.6965 4.46371 17.9677 5.00771 18.48 5.51999C18.9923 6.03226 19.5363 6.30346 19.9493 6.44677C20.0767 6.49097 20.191 6.52268 20.2868 6.54538L20.6635 6.16877C21.4455 5.38668 21.4455 4.11868 20.6635 3.33658L20.6451 3.31839Z" fill="#6B7280"/>
                    </svg>
                </div>
            </div>

            <!-- Email -->
            <div class="info-item" @click="openEdit('email')">
                <div class="icon">
                    <img src="/account/email.svg" alt="">
                </div>
                <div class="info">
                    <div class="label">И-мэйл</div>
                    <div class="value">{{ userInfo.email || '' }}</div>
                </div>
                <div class="edit">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.25 12C1.25 9.66417 1.24842 7.83685 1.43976 6.41369C1.634 4.96896 2.03932 3.82894 2.93413 2.93413C3.82894 2.03932 4.96896 1.634 6.41369 1.43976C7.83685 1.24842 9.66417 1.25 12 1.25H13.5L13.5194 1.25023C13.9246 1.2605 14.25 1.59226 14.25 2C14.25 2.40774 13.9246 2.7395 13.5194 2.74977L13.5 2.75H12C9.62177 2.75 7.91356 2.75159 6.61358 2.92637C5.33518 3.09825 4.56445 3.42514 3.9948 3.9948C3.42514 4.56445 3.09825 5.33518 2.92637 6.61358C2.75159 7.91356 2.75 9.62177 2.75 12C2.75 14.3782 2.75159 16.0864 2.92637 17.3864C3.09556 18.6449 3.41496 19.4113 3.96825 19.9783L3.9948 20.0052V20.0052C4.56445 20.5749 5.33519 20.9017 6.61358 21.0736C7.91356 21.2484 9.62177 21.25 12 21.25C14.3782 21.25 16.0864 21.2484 17.3864 21.0736C18.6648 20.9017 19.4355 20.5748 20.0052 20.0052L20.0052 20.0052C20.5748 19.4355 20.9017 18.6648 21.0736 17.3864C21.2484 16.0864 21.25 14.3782 21.25 12V10.5C21.25 10.0858 21.5858 9.74999 22 9.74999C22.4142 9.75 22.75 10.0858 22.75 10.5V12C22.75 14.3358 22.7516 16.1631 22.5603 17.5863C22.366 19.031 21.9606 20.171 21.0658 21.0658C20.171 21.9606 19.031 22.366 17.5863 22.5603C16.1631 22.7516 14.3358 22.75 12 22.75C9.66417 22.75 7.83685 22.7516 6.41369 22.5603C4.96896 22.366 3.82894 21.9607 2.93413 21.0658V21.0658C2.03933 20.171 1.63399 19.031 1.43976 17.5863C1.24842 16.1631 1.25 14.3358 1.25 12Z" fill="#6B7280"/>
                        <path d="M16.7706 2.27589C18.1278 0.91872 20.3217 0.908117 21.6919 2.2441L21.7241 2.27592L21.7242 2.27595C23.0919 3.64383 23.0919 5.86158 21.7242 7.22946L21.0752 7.87833L21.0752 7.8783L15.1105 13.8431C14.7189 14.2347 14.4801 14.4753 14.2126 14.684L14.2126 14.684C13.9069 14.9224 13.5762 15.1268 13.2263 15.2936L13.2261 15.2937C12.9199 15.4396 12.5979 15.5455 12.0726 15.7206L10.3372 16.2991L9.21428 16.6734C8.67812 16.8521 8.08688 16.7126 7.68716 16.313L7.68701 16.3128C7.28748 15.9131 7.14788 15.3221 7.3266 14.7858L8.27939 11.9274C8.45449 11.4021 8.56048 11.0801 8.70642 10.7738C8.8732 10.4239 9.07764 10.0931 9.31612 9.78737C9.52478 9.51985 9.76547 9.28102 10.1569 8.8896L16.7706 2.27589ZM11.2175 9.95026C10.801 10.3668 10.6377 10.5319 10.4988 10.71L10.4988 10.71C10.3274 10.9297 10.1804 11.1675 10.0605 11.4192C9.96338 11.6229 9.88868 11.8429 9.70243 12.4017L9.27053 13.6975L10.3026 14.7295L11.5983 14.2976C12.157 14.1113 12.377 14.0367 12.5808 13.9396C12.8324 13.8196 13.0703 13.6726 13.29 13.5013L13.3233 13.4749C13.4897 13.3409 13.6593 13.1729 14.0498 12.7825L19.1052 7.72704C18.5892 7.50515 17.9882 7.14947 17.4194 6.58065C16.8505 6.01184 16.4948 5.41076 16.2729 4.89479L11.2175 9.95026ZM20.6451 3.31839C19.8616 2.55452 18.6073 2.56059 17.8313 3.33658L17.4546 3.71319C17.4773 3.80905 17.509 3.92327 17.5532 4.05066C17.6965 4.46371 17.9677 5.00771 18.48 5.51999C18.9923 6.03226 19.5363 6.30346 19.9493 6.44677C20.0767 6.49097 20.191 6.52268 20.2868 6.54538L20.6635 6.16877C21.4455 5.38668 21.4455 4.11868 20.6635 3.33658L20.6451 3.31839Z" fill="#6B7280"/>
                    </svg>
                </div>
            </div>
        </div>
    </section>

    <section class="delivery-settings">
        <h2>Хүргэлт:</h2>
        
        <div class="info-items">
        <!-- Delivery Address -->
        <div class="info-item" @click="router.push('/delivery-address')">
            <div class="icon">
                <img src="/account/delivery-location.svg" alt="">
            </div>
            <div class="info">
                <div class="label">Хүргэлтийн хаяг</div>
                <div class="value">{{ defaultAddress ? defaultAddress : 'Хаяг сонгоогүй' }}</div>
            </div>
            <div class="arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="#6B7280" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
        </div>

        <!-- Auto Delivery Toggle -->
        <div class="info-item">
            <div class="icon">
                <img src="/account/auto-delivery-request.svg" alt="">
            </div>
            <div class="info">
                <div class="label">Шууд хүргүүлэх</div>
                <div class="value">{{ autoDelivery ? 'Идэвхтэй' : 'Идэвхгүй' }}</div>
            </div>
            <Switch
                v-model="autoDelivery"
                @click="toggleAutoDelivery"
                :class="autoDelivery ? 'enabled' : 'disabled'"
                class="switch"
            >
            <div class="switch" :class="autoDelivery ? 'enabled' : 'disabled'">
                <span
                    :style="autoDelivery ? 'transform: translateX(24px)' : 'transform: translateX(4px)'"
                    class="switch-handle"
                />
            </div>
            </Switch>
        </div>
        </div>
    </section>

    <div class="floating-button">
        <button @click="handleLogout" class="button">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.3251 2.81019C10.5 3.54167 10.5 4.87972 10.5 7.55583V20.4442C10.5 23.1203 10.5 24.4584 11.3251 25.1899C12.1502 25.9214 13.4114 25.7014 15.9339 25.2614L18.6508 24.7876C21.4444 24.3003 22.8411 24.0567 23.6706 23.032C24.5 22.0075 24.5 20.5256 24.5 17.5618V10.4383C24.5 7.47453 24.5 5.99264 23.6706 4.968C22.8411 3.94336 21.4444 3.69975 18.6508 3.2125L15.9339 2.73862C13.4114 2.29867 12.1502 2.0787 11.3251 2.81019ZM14 11.8634C14.4832 11.8634 14.875 12.2734 14.875 12.7791V15.221C14.875 15.7267 14.4832 16.1367 14 16.1367C13.5168 16.1367 13.125 15.7267 13.125 15.221V12.7791C13.125 12.2734 13.5168 11.8634 14 11.8634Z" fill="white"/>
                <path d="M8.80503 5.25C6.4037 5.2535 5.15199 5.3063 4.35427 6.10402C3.5 6.95829 3.5 8.33322 3.5 11.0831V16.9164C3.5 19.6663 3.5 21.0412 4.35427 21.8955C5.15199 22.6932 6.4037 22.746 8.80503 22.7495C8.74982 22.0223 8.74991 21.1817 8.75001 20.2729V7.72648C8.74991 6.81786 8.74982 5.97718 8.80503 5.25Z" fill="white"/>
            </svg>
            Системээс гарах
        </button>
    </div>

    <!-- Edit Dialog -->
    <Dialog :open="isEditOpen" @close="closeEdit" class="dialog">
        <DialogPanel class="dialogPanel">
            <div class="form-card">
                <h3>{{ getEditTitle() }}</h3>
                <form @submit.prevent="handleSubmit">
                    <div class="form-group">
                        <input 
                            v-model="editValue" 
                            :type="editField === 'email' ? 'email' : (editField === 'phoneNumber' ? 'tel' : 'text')"
                            :placeholder="getEditPlaceholder()"
                            required
                        >
                    </div>
                    <div class="button-group">
                        <button type="button" @click="closeEdit" class="cancel">Цуцлах</button>
                        <button type="submit" class="submit">Хадгалах</button>
                    </div>
                </form>
            </div>
        </DialogPanel>
    </Dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Switch } from '@headlessui/vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

const router = useRouter()
const isEditOpen = ref(false)
const editField = ref('')
const editValue = ref('')
const userInfo = ref({})
const autoDelivery = ref(false)
const defaultAddress = ref('')

const fetchUserInfo = async () => {
    const token = localStorage.getItem('authToken')
    if (!token) {
        router.push('/login')
        return
    }

    try {
        const response = await fetch('/api/account', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const result = await response.json()

        if (result.status === 401) {
            router.push('/login')
        }

        if (result.success) {
            userInfo.value = result.data
            autoDelivery.value = result.data.autoDeliveryRequest
            if(result.data.defaultDeliveryAddress){
            defaultAddress.value = result.data.defaultDeliveryAddress?.addressLabel || 
                                 `${result.data.defaultDeliveryAddress?.provinceOrCity}, ${result.data.defaultDeliveryAddress?.district}`
            } else {
                defaultAddress.value = 'Хаяг сонгоогүй'
            }
        }
    } catch (error) {
        console.error('Failed to fetch user info:', error)
        toast.error('Мэдээлэл ачаалахад алдаа гарлаа')
    }
}

const openEdit = (field) => {
    editField.value = field
    editValue.value = userInfo.value[field] || ''
    isEditOpen.value = true
}

const closeEdit = () => {
    isEditOpen.value = false
    editField.value = ''
    editValue.value = ''
}

const getEditTitle = () => {
    const titles = {
        name: 'Нэр засах',
        phoneNumber: 'Утас засах',
        email: 'И-мэйл засах'
    }
    return titles[editField.value] || ''
}

const getEditPlaceholder = () => {
    const placeholders = {
        name: 'Нэрээ оруулна уу',
        phoneNumber: 'Утасны дугаараа оруулна уу',
        email: 'И-мэйл хаягаа оруулна уу'
    }
    return placeholders[editField.value] || ''
}

const handleSubmit = async () => {
    try {
        const response = await fetch('/api/account', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({
                field: editField.value,
                value: editValue.value
            })
        })

        const result = await response.json()

        if (result.success) {
            userInfo.value[editField.value] = editValue.value
            toast.success('Мэдээлэл амжилттай шинэчлэгдлээ')
            closeEdit()
        } else {
            toast.error(result.message || 'Мэдээлэл шинэчлэхэд алдаа гарлаа')
        }
    } catch (error) {
        console.error('Failed to update user info:', error)
        toast.error('Мэдээлэл шинэчлэхэд алдаа гарлаа')
    }
}

const toggleAutoDelivery = async () => {
    let oldValue = autoDelivery.value
    try {
        const response = await fetch('/api/account', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({
                field: 'autoDeliveryRequest',
                value: !autoDelivery.value
            })
        })

        const result = await response.json()
        console.log('Toggle auto delivery result:', result)

        if (result.success) {
            autoDelivery.value = result.data.autoDeliveryRequest
            toast.success('Тохиргоо амжилттай хадгалагдлаа')
        } else {
            autoDelivery.value = oldValue
            toast.error(result.message || 'Тохиргоо хадгалахад алдаа гарлаа')
        }
    } catch (error) {
        autoDelivery.value = oldValue
        console.error('Failed to toggle auto delivery:', error)
        toast.error('Тохиргоо хадгалахад алдаа гарлаа')
    }
}

const handleLogout = () => {
    localStorage.removeItem('authToken')
    router.push('/')
}

onMounted(() => {
    fetchUserInfo()
})
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
    h1 {
        font-size: 20px;
        font-weight: 500;
        color: #1F1F1F;
    }
}

.user-info, .delivery-settings {
    h2 {
        font-size: 16px;
        font-weight: 500;
        color: #6B7280;
        margin: 16px 0 12px 8px;
    }
}

.delivery-settings {
    margin-bottom: 64px;
}

.info-items {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.info-item {
    background: #FFFFFF;
    border-radius: 20px;
    padding: 8px;
    display: grid;
    grid-template-columns: 48px 1fr 48px;
    gap: 12px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        border-color: #0973FB;
        background: rgba(9, 115, 251, 0.05);
    }

    .icon {
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .info {
        min-width: 0;
        .label {
            font-size: 14px;
            color: #6B7280;
            margin-bottom: 4px;
            margin-top: 4px;
            font-weight: 300;
        }
        .value {
            font-size: 16px;
            color: #1F1F1F;
            font-weight: 400;
            white-space: normal;
            word-break: break-word;
            overflow-wrap: anywhere;
        }
    }

    .edit, .arrow {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .switch{
        position: relative;
        display: inline-flex;
        height: 1.5rem;
        width: 2.75rem;
        align-items: center;
        border-radius: 9999px;
        &.enabled {
            background-color: #2563eb;
        }
        &.disabled {
            background-color: #e5e7eb;
        }
        .switch-handle {
            position: absolute;
            display: inline-block;
            width: 16px;
            height: 16px;
            transition: all 300ms ease-in-out;
            border-radius: 12px;
            background-color: #FFFFFF;
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
    
    .button {
        height: 64px;
        width: 100%;
        border-radius: 20px;
        background: #F87171;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;
        font-weight: 500;
        border: none;
        color: white;
        
        &:hover {
            background: #EF4444;
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
            max-height: 80vh;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            animation: slideUp 0.2s ease-out;

            h3 {
                font-size: 18px;
                font-weight: 500;
                margin-bottom: 24px;
                color: #1F1F1F;
            }

            .form-group {
                margin-bottom: 24px;

                input {
                    width: 100%;
                    height: 48px;
                    border: 1px solid #E5E7EB;
                    border-radius: 8px;
                    padding: 0 16px;
                    font-size: 16px;
                    color: #1F1F1F;
                    
                    &:focus {
                        outline: none;
                        border-color: #0973FB;
                        box-shadow: 0 0 0 2px rgba(9, 115, 251, 0.1);
                    }
                }
            }

            .button-group {
                display: flex;
                gap: 12px;

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
                    }

                    &.submit {
                        background: linear-gradient(45deg, #0973FB 0%, #66BFFF 100%);
                        color: #FFFFFF;
                        border: none;

                        &:hover {
                            opacity: 0.9;
                        }
                    }
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