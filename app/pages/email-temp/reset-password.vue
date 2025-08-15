<script setup>
// Define route options for SSR
definePageMeta({
  ssr: true
});

// Fetch email template from server
const { data: emailData, error, pending } = await useFetch('/api/email-preview');
</script>

<template>
  <div class="email-preview">
    <h1 class="preview-title">Нууц үг сэргээх имэйл загвар</h1>
    
    <!-- Error State -->
    <div v-if="error" class="status-message error">
      Алдаа: {{ error.message }}
    </div>

    <!-- Loading State -->
    <div v-else-if="pending" class="status-message loading">
      Уншиж байна...
    </div>

    <!-- Success State -->
    <div v-else-if="emailData?.html" class="preview-container" v-html="emailData.html" />

    <!-- No Content State -->
    <div v-else class="status-message">
      Имэйл загвар олдсонгүй
    </div>
  </div>
</template>

<style scoped>
.email-preview {
  max-width: 800px;
  margin: 2rem auto;
  padding: 1rem;
}

.preview-title {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
}

.status-message {
  text-align: center;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
}

.loading {
  background-color: #e9ecef;
  color: #495057;
}

.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.preview-container {
  background: white;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.preview-container :deep(a) {
  pointer-events: none;
}
</style>