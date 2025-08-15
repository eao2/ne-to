<template>
  <div v-if="user">
    <h1>Welcome, User!</h1>
    <p><strong>name:</strong> {{ user.name }}</p>
    <p><strong>Phone Number:</strong> {{ user.phoneNumber }}</p>
    <p><strong>Email:</strong> {{ user?.email }}</p>
    <p><strong>Email Verified:</strong> {{ user.emailVerified }}</p>
    <p><strong>User Type:</strong> {{ user.userType }}</p>
  </div>
  <div v-else>
    <p>Loading user information...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const user = ref(null);
const router = useRouter();

onMounted(async () => {
    try {
    const token = localStorage.getItem('authToken');

    if (!token) {
      console.error('No token found. Redirecting to login...');
      router.push('/login');
      return;
    }
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
