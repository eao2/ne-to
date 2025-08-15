<template>
    <Toaster richColors position="top-right" />
    <slot/>
</template>

<script setup>
import {Toaster} from 'vue-sonner'
</script>