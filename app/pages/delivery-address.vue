<template>
    <section class="header">
        <h1>Хүргэлтийн хаягууд</h1>
    </section>
    
    <section v-if="addresses.length > 0" class="addresses">
        <div v-for="address in addresses" 
             :key="address.id" 
             class="address-item"
             :class="{ 'default': address.isDefault }">
            <div class="address-info">
                <div class="label">
                    {{ address.addressLabel || 'Хаяг' }}
                    <span v-if="address.isDefault" class="default-badge">Үндсэн</span>
                </div>
                <div class="details">
                    <div class="location">{{ getFullAddress(address) }}</div>
                    <div class="contact">{{ address.contactPhone }}</div>
                </div>
            </div>
            <div class="actions">
                <button v-if="!address.isDefault" 
                        @click="setAsDefault(address.id)" 
                        class="set-default">
                    Үндсэн хаяг болгох
                </button>
            </div>
        </div>
    </section>
    <section v-else class="empty-state">
        <p>Одоогоор бүртгэлтэй хүргэлтийн хаяг байхгүй байна</p>
    </section>

    <div class="floating-button">
        <button @click="setIsOpen(true)" class="button">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24.5 14H3.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14 3.5V24.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Шинэ хаяг нэмэх
        </button>
    </div>

    <Dialog :open="isOpen" @close="setIsOpen" class="dialog">
        <DialogPanel class="dialogPanel">
            <div class="form-card">
                <h3>Шинэ хаяг нэмэх</h3>
                <form @submit.prevent="handleAddAddress">
                    <div class="form-group">
                        <label>Хаягийн нэр</label>
                        <input 
                            :value="form.addressLabel"
                            @input="(e) => handleInput(e, 'addressLabel')"
                            type="text" 
                            placeholder="Жишээ: Гэр, Ажлын байр">
                    </div>
                    <div class="form-group">
                        <label>Аймаг/Хот</label>
                        <input 
                            :value="form.provinceOrCity"
                            @input="(e) => handleInput(e, 'provinceOrCity')"
                            type="text" 
                            required>
                    </div>
                    <div class="form-group">
                        <label>Дүүрэг/Сум</label>
                        <input 
                            :value="form.district"
                            @input="(e) => handleInput(e, 'district')"
                            type="text" 
                            required>
                    </div>
                    <div class="form-group">
                        <label>Хороо/Баг</label>
                        <input 
                            :value="form.subDistrict"
                            @input="(e) => handleInput(e, 'subDistrict')"
                            type="text" 
                            required>
                    </div>
                    <div class="form-group">
                        <label>Дэлгэрэнгүй хаяг</label>
                        <textarea 
                            :value="form.detailedLocation"
                            @input="(e) => handleInput(e, 'detailedLocation')"
                            required></textarea>
                    </div>
                    <div class="form-group">
                        <label>Утасны дугаар</label>
                        <input 
                            :value="form.contactPhone"
                            @input="handlePhoneInput"
                            type="text"
                            inputmode="numeric"
                            maxlength="8"
                            placeholder="12345678"
                            required>
                    </div>
                    <div class="form-group">
                        <label>Нэмэлт тайлбар</label>
                        <textarea 
                            :value="form.description"
                            @input="(e) => handleInput(e, 'description')"></textarea>
                    </div>
                    <div class="button-group">
                        <button type="button" @click="setIsOpen(false)" class="cancel">Цуцлах</button>
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
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'

const router = useRouter()

const addresses = ref([])
const isOpen = ref(false)
const form = ref({
    addressLabel: '',
    provinceOrCity: '',
    district: '',
    subDistrict: '',
    detailedLocation: '',
    contactPhone: '',
    description: ''
})

// Add validation helper for Mongolian Cyrillic
const isMongolianCyrillic = (text) => {
    const mongolianCyrillicRegex = /^[\u0400-\u04FF\s\-өүёӨҮЁ0-9№\-+="₮:._,%?/]+$/
    return mongolianCyrillicRegex.test(text)
}

const handleInput = (e, field) => {
    const value = e.target.value
    // Allow empty values (for optional fields like addressLabel)
    if (value === '') {
        form.value[field] = ''
        return
    }
    
    // Only update if input is Mongolian Cyrillic
    if (isMongolianCyrillic(value)) {
        form.value[field] = value
    } else {
        // Revert to previous valid value
        e.target.value = form.value[field]
        toast.error('Зөвхөн монгол үсэг оруулна уу')
    }
}

const handlePhoneInput = (e) => {
    // Strip any non-numeric characters
    const numericValue = e.target.value.replace(/\D/g, '')
    // Update only if 8 or fewer digits
    if (numericValue.length <= 8) {
        form.value.contactPhone = numericValue
    }
}

const fetchAddresses = async () => {
    const token = localStorage.getItem('authToken')
    if (!token) {
        router.push('/login')
        return
    }

    try {
        const response = await fetch('/api/delivery-address/getAddresses', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const result = await response.json()

        if (result.status === 401) {
            router.push('/login')
        }

        if (result.success) {
            addresses.value = result.data || []
        }
    } catch (error) {
        console.error('Failed to fetch addresses:', error)
        toast.error('Хаягууд ачаалах үед алдаа гарлаа')
    }
}

const setAsDefault = async (addressId) => {
    const token = localStorage.getItem('authToken')
    if (!token) return

    try {
        const response = await fetch('/api/delivery-address/setDefault', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ addressId })
        })
        const result = await response.json()

        if (result.success) {
            toast.success('Үндсэн хаяг амжилттай өөрчлөгдлөө')
            fetchAddresses()
        } else {
            toast.error(result.message || 'Үндсэн хаяг өөрчлөхөд алдаа гарлаа')
        }
    } catch (error) {
        console.error('Failed to set default address:', error)
        toast.error('Үндсэн хаяг өөрчлөхөд алдаа гарлаа')
    }
}

const handleAddAddress = async () => {
    // Validate all text fields except phone and optional fields
    const fieldsToValidate = ['provinceOrCity', 'district', 'subDistrict', 'detailedLocation']
    const invalidFields = fieldsToValidate.filter(field => 
        form.value[field] && !isMongolianCyrillic(form.value[field])
    )

    if (invalidFields.length > 0) {
        toast.error('Зөвхөн монгол үсэг оруулна уу')
        return
    }

    // Phone number validation
    const phoneRegex = /^[0-9]{8}$/
    if (!phoneRegex.test(form.value.contactPhone)) {
        toast.error('Утасны дугаар 8 оронтой байх ёстой')
        return
    }

    try {
        const token = localStorage.getItem('authToken')
        if (!token) return

        const response = await fetch('/api/delivery-address/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(form.value)
        })

        const result = await response.json()

        if (result.success) {
            toast.success('Шинэ хаяг амжилттай нэмэгдлээ')
            setIsOpen(false)
            fetchAddresses()
            // Reset form
            form.value = {
                addressLabel: '',
                provinceOrCity: '',
                district: '',
                subDistrict: '',
                detailedLocation: '',
                contactPhone: '',
                description: ''
            }
        } else {
            toast.error(result.message || 'Хаяг нэмэхэд алдаа гарлаа')
        }
    } catch (error) {
        console.error('Failed to add address:', error)
        toast.error('Хаяг нэмэхэд алдаа гарлаа')
    }
}

const getFullAddress = (address) => {
    return `${address.provinceOrCity}, ${address.district}, ${address.subDistrict}, ${address.detailedLocation}`
}

const setIsOpen = (value) => {
    isOpen.value = value
    if (!value) {
        form.value = {
            addressLabel: '',
            provinceOrCity: '',
            district: '',
            subDistrict: '',
            detailedLocation: '',
            contactPhone: '',
            description: ''
        }
    }
}

onMounted(() => {
    fetchAddresses()
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

.addresses {
    margin: 16px 0 64px 0;
    .address-item {
        background-color: #FFFFFF;
        border: 1px solid #E5E7EB;
        border-radius: 20px;
        padding: 16px;
        margin-bottom: 12px;
        transition: all 0.2s ease;

        &.default {
            border: 1px solid #0973FB;
            background: #EAF3FB;
        }

        .address-info {
            .label {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 16px;
                font-weight: 500;
                color: #1F1F1F;
                margin-bottom: 8px;
                text-wrap: wrap;
                .default-badge {
                    background: #0973FB;
                    color: white;
                    padding: 4px 12px;
                    border-radius: 16px;
                    font-size: 12px;
                }
            }

            .details {
                .location {
                    font-size: 14px;
                    color: #6B7280;
                    margin-bottom: 4px;
                    line-height: 1.4;
                }
                .contact {
                    font-size: 14px;
                    color: #6B7280;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                    margin-top: 8px;
                }
            }
        }

        .actions {
            margin-top: 12px;
            border-top: 1px solid #E5E7EB;
            padding-top: 12px;
            
            .set-default {
                background: none;
                border: none;
                color: #0973FB;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                padding: 0;

                &:hover {
                    opacity: 0.8;
                }
            }
        }
    }
}

.empty-state {
    padding: 40px 16px;
    text-align: center;
    color: #6B7280;
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
            overflow-y: scroll;
            max-height: 60vh;

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

                input, textarea {
                    width: 100%;
                    border: 1px solid #E5E7EB;
                    border-radius: 8px;
                    padding: 12px 16px;
                    font-size: 16px;
                    color: #1F1F1F;
                    background-color: #FFFFFF;
                    
                    &:focus {
                        outline: none;
                        border-color: #0973FB;
                        box-shadow: 0 0 0 2px rgba(9, 115, 251, 0.1);
                    }
                }

                input {
                    height: 48px;
                }

                textarea {
                    height: 96px;
                    resize: none;
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