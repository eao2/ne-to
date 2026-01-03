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
                    <img src="/account/edit.svg" alt="">
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
                    <img src="/account/edit.svg" alt="">
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
                    <img src="/account/edit.svg" alt="">
                </div>
            </div>
        </div>
    </section>

    <!-- <section class="delivery-settings">
        <h2>Хүргэлт:</h2>
        
        <div class="info-items">
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
    </section> -->

    <div class="floating-button">
        <button @click="handleLogout" class="button">
            <img src="/account/exit.svg" alt="">
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