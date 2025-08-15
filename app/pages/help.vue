<template>
    <section class="header">
        <img src="/logo-main.svg" alt="">
    </section>
    <section class="disclosures">
        <Disclosure v-slot="{ open }">
            <DisclosureButton class="disclosureButton" :class="open? 'open' : ''">
                <h4 class="q">
                    Шуурхай тээвэр хэр хугацаанд ирдэг вэ?
                </h4>
            <div class="icon" :class="open? 'open' : ''">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.36436 13.2356C8.71592 13.5872 9.28686 13.5872 9.63842 13.2356L15.0384 7.83562C15.39 7.48406 15.39 6.91312 15.0384 6.56156C14.6869 6.21 14.1159 6.21 13.7644 6.56156L8.99999 11.3259L4.23561 6.56437C3.88405 6.21281 3.31311 6.21281 2.96155 6.56437C2.60999 6.91594 2.60999 7.48687 2.96155 7.83844L8.36155 13.2384L8.36436 13.2356Z"/>                </svg>
            </div>

            </DisclosureButton>
            <DisclosurePanel class="disclosurePanel">
                Эрээнээс Улаанбаатарт 1-2 хоногт хүргэдэг.
            </DisclosurePanel>
        </Disclosure>
        <Disclosure v-slot="{ open }">
            <DisclosureButton class="disclosureButton" :class="open? 'open' : ''">
                <h4 class="q">
                    Хүргэсэн төлөвтэй болсон ч яагаад Эрээн-д хүлээн авсан гэж гарч ирдэггүй вэ?
                </h4>
            <div class="icon" :class="open? 'open' : ''">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.36436 13.2356C8.71592 13.5872 9.28686 13.5872 9.63842 13.2356L15.0384 7.83562C15.39 7.48406 15.39 6.91312 15.0384 6.56156C14.6869 6.21 14.1159 6.21 13.7644 6.56156L8.99999 11.3259L4.23561 6.56437C3.88405 6.21281 3.31311 6.21281 2.96155 6.56437C2.60999 6.91594 2.60999 7.48687 2.96155 7.83844L8.36155 13.2384L8.36436 13.2356Z"/>                </svg>
            </div>

            </DisclosureButton>
            <DisclosurePanel class="disclosurePanel">
                Зарим Хятад хүргэлтийн газар барааг Эрээнд хүргэсний дараа үндсэн хаяг руу нь 2 хоногийн дотор, манай хаяг хүртэл хүргэж өгдөг.
            </DisclosurePanel>
        </Disclosure>
    </section>
</template>

<script setup>  
import { ref, onMounted } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router'

const router = useRouter();
const isOpen = ref(false)
const cargos = ref([])
const totalPrice = ref(0)

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
}
.disclosures {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    // background-color: #FFFFFF;
}
.disclosureButton {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 12px 16px;
    background-color: rgba(9, 114, 251, 0.1);
    border-radius: 8px;
    cursor: pointer;
    color: #0973FB;
    .q{
        font-weight: 500;
        display: flex;
        text-align: left;
        font-size: 14px;
    }
    .icon{
        display: flex;
        justify-content: space-between;
        align-items: center;
        &.open {
            transform: rotate(180deg);
            fill: #0973FB;
        }
        svg{
            fill: #0973FB;
        }
    }
}
.disclosurePanel{
    border-radius: 8px;
    padding: 16px 12px ;
    color: #1f1f1f;
    background-color: #FFFFFF;
    font-size: 14px;
}
</style>