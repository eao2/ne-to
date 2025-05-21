<template>
  <div class="container">
    <div class="profile-card" v-if="user">
      <h2 class="profile-title">Хэрэглэгчийн мэдээлэл</h2>
      <div class="profile-info">
        <div class="info-row">
          <div class="info-label">Нэр:</div>
          <div class="info-value">{{ user.name }}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Утасны дугаар:</div>
          <div class="info-value">{{ user.phoneNumber }}</div>
        </div>
        <div class="info-row" v-if="user?.email">
          <div class="info-label">Э-мэйл:</div>
          <div class="info-value">{{ user.email }}</div>
        </div>
      </div>
    </div>
    <div v-else class="loading-card">
      <p>Хэрэглэгчийн мэдээллийг ачаалж байна...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const user = ref(null);
const router = useRouter();

onMounted(async () => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    console.error('No token found. Redirecting to login...');
    router.push('/login');
    return;
  }

  try {
    const response = await fetch('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      console.error('Unauthorized access. Redirecting to login...');
      router.push('/login');
      return;
    }

    if (response.status === 404) {
      console.error('User not found. Redirecting to login...');
      router.push('/login');
      return;
    }

    if (!response.ok) {
      console.error(`Unexpected error: ${response.statusText}`);
      return;
    }

    const data = await response.json();
    user.value = data.body; // Ensure the correct structure from your API
  } catch (error) {
    console.error('Error fetching user information:', error);
    router.push('/login');
  }
});
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 0.5rem;
}

.profile-card, .loading-card {
  background: white;
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.profile-title {
  color: #2c3e50;
  font-size: 1.25rem;
  margin-bottom: 1rem;
  text-align: center;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-row {
  display: flex;
  flex-wrap: wrap;
  padding: 0.75rem;
  gap: 0.5rem;
  border-radius: 0.375rem;
  background: #f8f9fa;
  
  &:hover {
    background: #f0f2f5;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.25rem;
  }
}

.info-label {
  font-weight: 600;
  min-width: 120px;
  color: #4a5568;
  
  @media (max-width: 480px) {
    min-width: unset;
    margin-bottom: 0.25rem;
  }
}

.info-value {
  color: #2d3748;
  flex: 1;
}

.loading-card {
  text-align: center;
  color: #4a5568;
  padding: 0.75rem;
}
</style>
