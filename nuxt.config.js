// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },  
  devServer: {
    host: '0.0.0.0',
    port: 3000,
  },
  css: ['@/assets/styles/global.scss'],
  modules: [
    'vue-sonner/nuxt'
  ],
  vueSonner: {
    css: true 
  },
  runtimeConfig: {
    public: {
      googleMapsKey: 'AIzaSyDuDxwGbnDQYjDsSOe9q8UbOnTsPKXuFTg'
    }
  },
  app: {
    head: {
      title: 'NE-TO cargo',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {
          name: 'description',
          content: 'Манайх БНХУ-ын бүх хотуудаас бүх төрлийн ачаа барааг Монгол улслуу тээвэрлэх үйлчилгээг үзүүлдэг ба Таны ачааг эрээн хотоос шуурхай экспрэсс үйлчилгээгээр 1 хоногт авчирдаг боллоо.'
        },
        {
          name: 'theme-color',
          content: '#0066ff'
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'black-translucent'
        },
        // Open Graph meta tags
        {
          property: 'og:title',
          content: 'NE-TO cargo'
        },
        {
          property: 'og:description',
          content: 'Манайх БНХУ-ын бүх хотуудаас бүх төрлийн ачаа барааг Монгол улслуу тээвэрлэх үйлчилгээг үзүүлдэг ба Таны ачааг эрээн хотоос шуурхай экспрэсс үйлчилгээгээр 1 хоногт авчирдаг боллоо.'
        },
        {
          property: 'og:image',
          content: 'https://ne-to.com/og-image.jpg'
        },
        {
          property: 'og:image:alt',
          content: 'NE-TO cargo image'
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          property: 'og:url',
          content: 'https://ne-to.com'
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
