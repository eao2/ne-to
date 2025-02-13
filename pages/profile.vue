<template>
  <div v-if="user">
    <p><strong>нэр:</strong> {{ user.name }}</p>
    <p><strong>утасны дугаар:</strong> {{ user.phoneNumber }}</p>
    <p><strong>э-мэйл:</strong> {{ user?.email }}</p>
    <!-- <p><strong>Email Verified:</strong> {{ user.emailVerified }}</p> -->
    <!-- <p><strong>User Type:</strong> {{ user.userType }}</p> -->
  </div>
  <div v-else>
    <p>Хэрэглэгчийн мэдээллийг ачаалж байна...</p>
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
