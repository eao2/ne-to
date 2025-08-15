<template>
    <div class="container">
        <section class="sec">
            <div class="content">
                <Toaster richColors position="top-right" />
                <slot />
                <NavBar/>
            </div>
        </section>
    </div>
</template>

<style lang="scss" scoped>        
    .container{
        display: flex;
        justify-content: center;
        background-color: #F9FBFD;
        .sec{
            display: flex;
            justify-content: center;
            min-height: 100vh;
            background-color: #F4F8FB;
            width: 480px;
            max-width: 480px;
            .content{
                width: 100%;
                min-width: auto;
                padding-bottom: 88px;
            }
        }
    }
</style>

<script setup>
import { Toaster } from 'vue-sonner';
</script>