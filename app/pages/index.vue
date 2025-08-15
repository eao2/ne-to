<template>
    <section class="header">
        <img src="/logo-main.svg" alt="">
    </section>
    <section class="slide">
        <div class="slide-images">
            <img class="image" src="/slide-image.jpg" alt="">
        </div>
    </section>
    <section class="checkTrack">        
        <div class="track">
            <div class="title">
                <img src="/svg/bar-code.svg" width="20" height="20" alt="bar-code-icon">
                Карго трак кодоор шалгах
            </div>
            <form class="inputBox" @submit.prevent="handleCargoTrackCheck">
                <div class="input">
                    <input
                        ref="trackInput"
                        v-model="trackCode"
                        class="trackInput" 
                        type="text" 
                        name="track-id"
                        placeholder="трак кодоо энд бичих эсвэл хуулж тавь"
                    />
                </div>
                <button v-if="trackCode.trim() === ''" @click="handlePasteFromClipboard" class="check" type="button">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_45_157)">
                        <path d="M4.90312 2.25H3C1.34531 2.25 0 3.59531 0 5.25V18C0 19.6547 1.34531 21 3 21H7.5V18.75H3C2.5875 18.75 2.25 18.4125 2.25 18V5.25C2.25 4.8375 2.5875 4.5 3 4.5H3.75C3.75 5.32969 4.42031 6 5.25 6H8.64375C9.46875 5.08125 10.6687 4.5 12 4.5H14.9062C14.5734 3.20625 13.3969 2.25 12 2.25H10.0969C9.91875 0.979687 8.82187 0 7.5 0C6.17812 0 5.08125 0.979687 4.90312 2.25ZM6.75 2.625C6.75 2.42609 6.82902 2.23532 6.96967 2.09467C7.11032 1.95402 7.30109 1.875 7.5 1.875C7.69891 1.875 7.88968 1.95402 8.03033 2.09467C8.17098 2.23532 8.25 2.42609 8.25 2.625C8.25 2.82391 8.17098 3.01468 8.03033 3.15533C7.88968 3.29598 7.69891 3.375 7.5 3.375C7.30109 3.375 7.11032 3.29598 6.96967 3.15533C6.82902 3.01468 6.75 2.82391 6.75 2.625ZM21 21.75H12C11.5875 21.75 11.25 21.4125 11.25 21V9C11.25 8.5875 11.5875 8.25 12 8.25H18.5672L21.75 11.4328V21C21.75 21.4125 21.4125 21.75 21 21.75ZM12 24H21C22.6547 24 24 22.6547 24 21V11.4328C24 10.8375 23.7609 10.2656 23.3391 9.84375L20.1562 6.66094C19.7344 6.23906 19.1625 6 18.5672 6H12C10.3453 6 9 7.34531 9 9V21C9 22.6547 10.3453 24 12 24Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_45_157">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </button>
                <button v-else class="check" type="submit" >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_88_366)">
                        <path d="M19.5 9.75C19.5 11.9016 18.8016 13.8891 17.625 15.5016L23.5594 21.4406C24.1453 22.0266 24.1453 22.9781 23.5594 23.5641C22.9734 24.15 22.0219 24.15 21.4359 23.5641L15.5016 17.625C13.8891 18.8062 11.9016 19.5 9.75 19.5C4.36406 19.5 0 15.1359 0 9.75C0 4.36406 4.36406 0 9.75 0C15.1359 0 19.5 4.36406 19.5 9.75ZM9.75 16.5C10.6364 16.5 11.5142 16.3254 12.3331 15.9862C13.1521 15.647 13.8962 15.1498 14.523 14.523C15.1498 13.8962 15.647 13.1521 15.9862 12.3331C16.3254 11.5142 16.5 10.6364 16.5 9.75C16.5 8.86358 16.3254 7.98583 15.9862 7.16689C15.647 6.34794 15.1498 5.60382 14.523 4.97703C13.8962 4.35023 13.1521 3.85303 12.3331 3.51381C11.5142 3.17459 10.6364 3 9.75 3C8.86358 3 7.98583 3.17459 7.16689 3.51381C6.34794 3.85303 5.60382 4.35023 4.97703 4.97703C4.35023 5.60382 3.85303 6.34794 3.51381 7.16689C3.17459 7.98583 3 8.86358 3 9.75C3 10.6364 3.17459 11.5142 3.51381 12.3331C3.85303 13.1521 4.35023 13.8962 4.97703 14.523C5.60382 15.1498 6.34794 15.647 7.16689 15.9862C7.98583 16.3254 8.86358 16.5 9.75 16.5Z" fill="white"/>
                        </g>
                        <defs>
                        <clipPath id="clip0_88_366">
                        <rect width="24" height="24" fill="white"/>
                        </clipPath>
                        </defs>
                    </svg>
                </button>
            </form>
        </div>
    </section>
    <section class="cargoConcise" v-if="cargoConciseSection">
        <a href="/cargo" v-if="cargoConciseInfo" class="cargoConciseInfo" :style="{ backgroundColor: getStatusBackgroundColor(cargoConciseInfo.status), borderColor: getStatusBorderColor(cargoConciseInfo.status) }">
            <div class="icon">
                <img :src="`/cargo-status/${cargoConciseInfo.status}.svg`" alt="">
            </div>
            <div class="text" :style="{ color: getStatusColor(cargoConciseInfo.status) }">
                {{ `${cargoConciseInfo.number}${getStatusDescription(cargoConciseInfo.status)} `}}
            </div>
            <div class="arrow">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.04189 23.9581C5.75043 25.6666 8.50029 25.6666 14 25.6666C19.4997 25.6666 22.2496 25.6666 23.9581 23.9581C25.6667 22.2496 25.6667 19.4996 25.6667 14C25.6667 8.50025 25.6667 5.7504 23.9581 4.04186C22.2496 2.33331 19.4997 2.33331 14 2.33331C8.50029 2.33331 5.75043 2.33331 4.04189 4.04186C2.33334 5.7504 2.33334 8.50025 2.33334 14C2.33334 19.4996 2.33334 22.2496 4.04189 23.9581ZM11.6313 18.1187C11.2896 17.7769 11.2896 17.223 11.6313 16.8813L14.5125 14L11.6313 11.1187C11.2896 10.777 11.2896 10.223 11.6313 9.88126C11.973 9.53956 12.527 9.53956 12.8687 9.88126L16.3687 13.3813C16.5328 13.5453 16.625 13.7679 16.625 14C16.625 14.232 16.5328 14.4546 16.3687 14.6187L12.8687 18.1187C12.527 18.4604 11.973 18.4604 11.6313 18.1187Z" :fill="getStatusColor(cargoConciseInfo.status)"/>
                </svg>
            </div>
        </a>
        <div v-else-if="!user" class="login">
            <a href="/register">
                <div class="registerButton">
                    Бүртгүүлэх
                </div>
            </a>
            <a href="/login">
                <div class="loginButton">
                    Нэвтрэх
                </div>
            </a>
        </div>
        <div v-else class="address">
            <a href="/address">
                <div class="box">
                    <div class="icon">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14 2.54541C8.61104 2.54541 4.24243 6.72158 4.24243 11.8732C4.24243 16.9843 7.35671 22.9487 12.2157 25.0815C13.3484 25.5788 14.6517 25.5788 15.7843 25.0815C20.6433 22.9487 23.7576 16.9843 23.7576 11.8732C23.7576 6.72158 19.389 2.54541 14 2.54541ZM14 15.6363C15.7964 15.6363 17.2525 14.171 17.2525 12.3636C17.2525 10.5561 15.7964 9.09085 14 9.09085C12.2036 9.09085 10.7475 10.5561 10.7475 12.3636C10.7475 14.171 12.2036 15.6363 14 15.6363Z" fill="white"/>
                        </svg>
                    </div>
                    <div class="description">
                        Хаягаа холбож каргогоо аваарай.
                    </div>
                    <div class="icon">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M4.04189 23.9581C5.75043 25.6666 8.50029 25.6666 14 25.6666C19.4997 25.6666 22.2496 25.6666 23.9581 23.9581C25.6667 22.2496 25.6667 19.4996 25.6667 14C25.6667 8.50025 25.6667 5.7504 23.9581 4.04186C22.2496 2.33331 19.4997 2.33331 14 2.33331C8.50029 2.33331 5.75043 2.33331 4.04189 4.04186C2.33334 5.7504 2.33334 8.50025 2.33334 14C2.33334 19.4996 2.33334 22.2496 4.04189 23.9581ZM11.6313 18.1187C11.2896 17.7769 11.2896 17.223 11.6313 16.8813L14.5125 14L11.6313 11.1187C11.2896 10.777 11.2896 10.223 11.6313 9.88126C11.973 9.53956 12.527 9.53956 12.8687 9.88126L16.3687 13.3813C16.5328 13.5453 16.625 13.7679 16.625 14C16.625 14.232 16.5328 14.4546 16.3687 14.6187L12.8687 18.1187C12.527 18.4604 11.973 18.4604 11.6313 18.1187Z" fill="white"/>
                        </svg>
                    </div>
                </div>
            </a>
        </div>
    </section>
    <section class="links">
        <a href="/address">
            <div class="link hightlight">
                <div class="icon">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14 2.54541C8.61104 2.54541 4.24243 6.72158 4.24243 11.8732C4.24243 16.9843 7.35671 22.9487 12.2157 25.0815C13.3484 25.5788 14.6517 25.5788 15.7843 25.0815C20.6433 22.9487 23.7576 16.9843 23.7576 11.8732C23.7576 6.72158 19.389 2.54541 14 2.54541ZM14 15.6363C15.7964 15.6363 17.2525 14.171 17.2525 12.3636C17.2525 10.5561 15.7964 9.09085 14 9.09085C12.2036 9.09085 10.7475 10.5561 10.7475 12.3636C10.7475 14.171 12.2036 15.6363 14 15.6363Z" fill="white"/>
                    </svg>
                </div>
                <h4 class="title">
                    Хаяг холбох
                </h4>
                <p class="description">Хятад дахь салбарлуу монгол хаяг холбох</p>
            </div>
        </a>
        <a href="/calculator">
            <div class="link">
                <div class="icon">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14 25.6667C9.05025 25.6667 6.57538 25.6667 5.03769 23.9581C3.5 22.2497 3.5 19.4997 3.5 14C3.5 8.50032 3.5 5.75046 5.03769 4.04192C6.57538 2.33337 9.05025 2.33337 14 2.33337C18.9497 2.33337 21.4247 2.33337 22.9623 4.04192C24.5 5.75046 24.5 8.50032 24.5 14C24.5 19.4997 24.5 22.2497 22.9623 23.9581C21.4247 25.6667 18.9497 25.6667 14 25.6667ZM17.5 7.00004H10.5C9.95751 7.00004 9.68627 7.00004 9.46373 7.05967C8.85982 7.22149 8.38811 7.69319 8.22629 8.29711C8.16667 8.51965 8.16667 8.79089 8.16667 9.33337C8.16667 9.87586 8.16667 10.1471 8.22629 10.3696C8.38811 10.9736 8.85982 11.4453 9.46373 11.6071C9.68627 11.6667 9.95751 11.6667 10.5 11.6667H17.5C18.0425 11.6667 18.3137 11.6667 18.5362 11.6071C19.1402 11.4453 19.6119 10.9736 19.7737 10.3696C19.8333 10.1471 19.8333 9.87586 19.8333 9.33337C19.8333 8.79089 19.8333 8.51965 19.7737 8.29711C19.6119 7.69319 19.1402 7.22149 18.5362 7.05967C18.3137 7.00004 18.0425 7.00004 17.5 7.00004ZM10.5 15.1667C10.5 15.8111 9.97766 16.3334 9.33333 16.3334C8.68901 16.3334 8.16667 15.8111 8.16667 15.1667C8.16667 14.5224 8.68901 14 9.33333 14C9.97766 14 10.5 14.5224 10.5 15.1667ZM14 16.3334C14.6444 16.3334 15.1667 15.8111 15.1667 15.1667C15.1667 14.5224 14.6444 14 14 14C13.3556 14 12.8333 14.5224 12.8333 15.1667C12.8333 15.8111 13.3556 16.3334 14 16.3334ZM19.8333 15.1667C19.8333 15.8111 19.311 16.3334 18.6667 16.3334C18.0223 16.3334 17.5 15.8111 17.5 15.1667C17.5 14.5224 18.0223 14 18.6667 14C19.311 14 19.8333 14.5224 19.8333 15.1667ZM18.6667 21C19.311 21 19.8333 20.4777 19.8333 19.8334C19.8333 19.189 19.311 18.6667 18.6667 18.6667C18.0223 18.6667 17.5 19.189 17.5 19.8334C17.5 20.4777 18.0223 21 18.6667 21ZM15.1667 19.8334C15.1667 20.4777 14.6444 21 14 21C13.3556 21 12.8333 20.4777 12.8333 19.8334C12.8333 19.189 13.3556 18.6667 14 18.6667C14.6444 18.6667 15.1667 19.189 15.1667 19.8334ZM9.33333 21C9.97766 21 10.5 20.4777 10.5 19.8334C10.5 19.189 9.97766 18.6667 9.33333 18.6667C8.68901 18.6667 8.16667 19.189 8.16667 19.8334C8.16667 20.4777 8.68901 21 9.33333 21Z" fill="white"/>
                    </svg>
                </div>
                <h4 class="title">
                    Тооцоолуур
                </h4>
                <p class="description">Тээврийн зардал тооцох</p>
            </div>
        </a>
        <a href="/help">
            <div class="link">
                <div class="icon">
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14 25.6667C8.50028 25.6667 5.75043 25.6667 4.04189 23.9581C2.33334 22.2497 2.33334 19.4997 2.33334 14C2.33334 8.50032 2.33334 5.75046 4.04189 4.04192C5.75043 2.33337 8.50028 2.33337 14 2.33337C19.4997 2.33337 22.2496 2.33337 23.9581 4.04192C25.6667 5.75046 25.6667 8.50032 25.6667 14C25.6667 19.4997 25.6667 22.2497 23.9581 23.9581C22.2496 25.6667 19.4997 25.6667 14 25.6667ZM14 9.04171C13.2752 9.04171 12.6875 9.62933 12.6875 10.3542C12.6875 10.8375 12.2957 11.2292 11.8125 11.2292C11.3293 11.2292 10.9375 10.8375 10.9375 10.3542C10.9375 8.66283 12.3087 7.29171 14 7.29171C15.6913 7.29171 17.0625 8.66283 17.0625 10.3542C17.0625 11.1835 16.7318 11.9374 16.1968 12.488C16.0892 12.5988 15.9865 12.7014 15.8885 12.7993C15.6367 13.0508 15.4161 13.2712 15.2226 13.52C14.9671 13.8483 14.875 14.0896 14.875 14.2917V15.1667C14.875 15.6499 14.4832 16.0417 14 16.0417C13.5168 16.0417 13.125 15.6499 13.125 15.1667V14.2917C13.125 13.5273 13.4808 12.9085 13.8416 12.4451C14.1084 12.1022 14.4438 11.7674 14.7161 11.4957C14.7982 11.4138 14.8745 11.3376 14.9415 11.2686C15.172 11.0314 15.3125 10.7101 15.3125 10.3542C15.3125 9.62933 14.7249 9.04171 14 9.04171ZM14 19.8334C14.6444 19.8334 15.1667 19.3111 15.1667 18.6667C15.1667 18.0224 14.6444 17.5 14 17.5C13.3557 17.5 12.8333 18.0224 12.8333 18.6667C12.8333 19.3111 13.3557 19.8334 14 19.8334Z" fill="white"/>
                    </svg>
                </div>
                <h4 class="title">
                    Асуулт, Хариулт
                </h4>
                <p class="description">Их асуудаг асуултууд болон хариултууд</p>
            </div>
        </a>
        <a href="/delivery">
            <div class="link">
                <div class="icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.75 22.5H19.5V2.25C19.5 1.65326 19.2629 1.08097 18.841 0.65901C18.419 0.237053 17.8467 0 17.25 0L5.25 0C4.65326 0 4.08097 0.237053 3.65901 0.65901C3.23705 1.08097 3 1.65326 3 2.25V11.25C3 11.4489 3.07902 11.6397 3.21967 11.7803C3.36032 11.921 3.55109 12 3.75 12C3.94891 12 4.13968 11.921 4.28033 11.7803C4.42098 11.6397 4.5 11.4489 4.5 11.25V2.25C4.5 2.05109 4.57902 1.86032 4.71967 1.71967C4.86032 1.57902 5.05109 1.5 5.25 1.5H17.25C17.4489 1.5 17.6397 1.57902 17.7803 1.71967C17.921 1.86032 18 2.05109 18 2.25V22.5H12.75C12.5511 22.5 12.3603 22.579 12.2197 22.7197C12.079 22.8603 12 23.0511 12 23.25C12 23.4489 12.079 23.6397 12.2197 23.7803C12.3603 23.921 12.5511 24 12.75 24H21.75C21.9489 24 22.1397 23.921 22.2803 23.7803C22.421 23.6397 22.5 23.4489 22.5 23.25C22.5 23.0511 22.421 22.8603 22.2803 22.7197C22.1397 22.579 21.9489 22.5 21.75 22.5Z" fill="white"/>
                        <path d="M15 10.5C14.7382 10.5016 14.4814 10.5717 14.2551 10.7032C14.0288 10.8348 13.8409 11.0233 13.71 11.25H12.75C12.5511 11.25 12.3603 11.329 12.2197 11.4697C12.079 11.6103 12 11.8011 12 12C12 12.1989 12.079 12.3897 12.2197 12.5304C12.3603 12.671 12.5511 12.75 12.75 12.75H13.71C13.8418 12.9784 14.0316 13.1679 14.26 13.2996C14.4885 13.4313 14.7476 13.5004 15.0113 13.5C15.275 13.4996 15.5339 13.4297 15.762 13.2973C15.99 13.165 16.1792 12.9748 16.3103 12.7461C16.4415 12.5173 16.51 12.258 16.509 11.9943C16.508 11.7307 16.4375 11.4719 16.3047 11.2441C16.1718 11.0164 15.9812 10.8277 15.7522 10.697C15.5231 10.5664 15.2637 10.4984 15 10.5Z" fill="white" fill-opacity="0.5"/>
                        <path d="M6 13.5H4.5C4.08579 13.5 3.75 13.8358 3.75 14.25V16.5C3.75 16.9142 4.08579 17.25 4.5 17.25H6C6.41421 17.25 6.75 16.9142 6.75 16.5V14.25C6.75 13.8358 6.41421 13.5 6 13.5Z" fill="white" fill-opacity="0.5"/>
                        <path d="M4.5 21H3.75C3.55109 21 3.36032 20.921 3.21967 20.7803C3.07902 20.6397 3 20.4489 3 20.25C3 20.0511 3.07902 19.8603 3.21967 19.7197C3.36032 19.579 3.55109 19.5 3.75 19.5H4.5C4.69891 19.5 4.88968 19.579 5.03033 19.7197C5.17098 19.8603 5.25 20.0511 5.25 20.25C5.25 20.4489 5.17098 20.6397 5.03033 20.7803C4.88968 20.921 4.69891 21 4.5 21Z" fill="white"/>
                        <path d="M8.25 24H2.25C1.65326 24 1.08097 23.7629 0.65901 23.341C0.237053 22.919 0 22.3467 0 21.75L0 15.75C0 15.1533 0.237053 14.581 0.65901 14.159C1.08097 13.7371 1.65326 13.5 2.25 13.5H8.25C8.84674 13.5 9.41903 13.7371 9.84099 14.159C10.2629 14.581 10.5 15.1533 10.5 15.75V21.75C10.5 22.3467 10.2629 22.919 9.84099 23.341C9.41903 23.7629 8.84674 24 8.25 24ZM2.25 15C2.05109 15 1.86032 15.079 1.71967 15.2197C1.57902 15.3603 1.5 15.5511 1.5 15.75V21.75C1.5 21.9489 1.57902 22.1397 1.71967 22.2803C1.86032 22.421 2.05109 22.5 2.25 22.5H8.25C8.44891 22.5 8.63968 22.421 8.78033 22.2803C8.92098 22.1397 9 21.9489 9 21.75V15.75C9 15.5511 8.92098 15.3603 8.78033 15.2197C8.63968 15.079 8.44891 15 8.25 15H2.25Z" fill="white"/>
                    </svg>
                </div>
                <h4 class="title">
                    Хүргүүлэн авах
                </h4>
                <p class="description">Таны гэрийн хаягт хүргэх</p>
            </div>
        </a>
    </section>
    <Dialog class="dialog" :open="isOpen" @close="setIsOpen">
        <DialogPanel class="dialogPanel">
            <div v-if="cargoInfo" class="dialogCard">
                <div class="head">
                    <div class="status">
                        {{getStatusText(cargoInfo.currentStatus, cargoInfo.destinationLocation)}}
                    </div>
                    <div class="type">
                        {{cargoInfo.cargoType === 'QUICK' ? 'Шуурхай' : 'Энгийн'}}
                    </div>
                </div>
                <div class="cargoinfo">
                    <div class="icon">
                        <img :src="`/cargo-status/${cargoInfo.currentStatus}.svg`" alt="">
                    </div>
                    <div class="text">
                        <div class="nickname" v-auto-slide>
                            {{cargoInfo.nickname || cargoInfo.trackingNumber}}
                        </div>
                        <div class="trackCode" v-auto-slide>
                            <img src="/svg/bar-code.svg" alt="bar-code-icon">
                            {{cargoInfo.trackingNumber}}
                        </div>
                    </div>
                    <div class="priceSection">
                        <div v-if="cargoInfo.price" class="price">
                            ₮ {{numberWithCommas(cargoInfo.price)}}
                        </div>
                    </div>
                </div>
                <div class="buttons">
                    <button class="close" @click="setIsOpen(false)">Хаах</button>
                </div>
                <!-- <button @click="handleDeactivate">Deactivate</button> -->
            </div>
        </DialogPanel>
    </Dialog>
</template>

<script setup>  
import { ref, onMounted } from 'vue'
import {
    Dialog,
    DialogPanel,
} from '@headlessui/vue'
import { toast } from 'vue-sonner'
import { useRouter } from 'vue-router';

const router = useRouter();
const isOpen = ref(false)
const trackCode = ref('')
const cargoInfo = ref(null)
const user = ref(true)
const cargoConciseInfo = ref(null)
const cargoConciseSection = ref(false)

function setIsOpen(value) {
    isOpen.value = value
    if (!value) {
        cargoInfo.value = null
        trackCode.value = ''
    }
}

const getStatusText = (status, destinationLocation) => {
    const statusMap = {
        'PRE_REGISTERED': 'Бүртгэгдсэн',
        'RECEIVED_AT_ERENHOT': 'Эрээн-д ирсэн',
        'IN_TRANSIT': 'Замд яваа',
        'DELIVERED_TO_UB': `${destinationLocation? destinationLocation?.name : ""} салбарт ирсэн`,
        'DELIVERED': 'Хүргэгдсэн'
    }
    return statusMap[status] || status
}

const getStatusBorderColor = (status) => {
    const statusMap = {
        'PRE_REGISTERED': '#E3DBFF',
        'RECEIVED_AT_ERENHOT': '#FFE3C2',
        'IN_TRANSIT': '#CFFAE2',
        'DELIVERED_TO_UB': '#B3D4FF',
        'DELIVERED': '#D4D7DD'
    }
    return statusMap[status] || "#B3D4FF"
}

const getStatusBackgroundColor = (status) => {
    const statusMap = {
        'PRE_REGISTERED': '#F4F0FF',
        'RECEIVED_AT_ERENHOT': '#FFF4E8',
        'IN_TRANSIT': '#F0FDF4',
        'DELIVERED_TO_UB': '#E6F0FF',
        'DELIVERED': '#F5F6FA'
    }
    return statusMap[status] || "#E6F0FF"
}

const getStatusColor = (status) => {
    const statusMap = {
        'PRE_REGISTERED': '#8E77B8',
        'RECEIVED_AT_ERENHOT': '#C57C38',
        'IN_TRANSIT': '#059669',
        'DELIVERED_TO_UB': '#0973FB',
        'DELIVERED': '#697386'
    }
    return statusMap[status] || "#0973FB"
}

const getStatusDescription = (status) => {
  const statusMap = {
    'PRE_REGISTERED': 'ш ачаа урьдчилан бүртгэгдсэн байна',
    'RECEIVED_AT_ERENHOT': 'ш ачаа Хятад салбарт бүртгэгдсэн байна',
    'IN_TRANSIT': 'ш ачаа замд явж байна',
    'DELIVERED_TO_UB': 'ш ачаа УБ-т ирсэн байна'
  }
  return statusMap[status] || ''
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const handleCargoTrackCheck = async () => {
    if (trackCode.value.trim() === '') {
        toast.error('Трак код оруулна уу')
        return
    }

    try {
        const response = await fetch(`/api/index/checkTrack?trackingNumber=${trackCode.value.trim()}`)
        const result = await response.json()
        
        if (result.success && result.data) {
            cargoInfo.value = result.data
            isOpen.value = true
        } else {
            toast.error(result.message || 'Трак код олдсонгүй')
        }
    } catch (error) {
        toast.error(error.message || 'Трак код олдсонгүй')
    }
}

const handlePasteFromClipboard = async () => {
    try {
        const text = await navigator.clipboard.readText()
        trackCode.value = text.trim()
    } catch (err) {
        console.error('Failed to read clipboard:', err)
        toast.error('Clipboard-с уншихад алдаа гарлаа')
    }
}

const getCargoConciseInfo = async () => {
    try {
        const token = localStorage.getItem('authToken')
        if (!token) {
          user.value = false
          cargoConciseSection.value = true
          return
        }

        const response = await fetch('/api/index/cargoConciseInfo', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        const result = await response.json()
        
        user.value = result.user
        cargoConciseSection.value = true
        if (result.success && result.data) {
          cargoConciseInfo.value = {
            status: result.data.status,
            number: result.data.count
          }
        } else {
          cargoConciseInfo.value = null
        }
    } catch (error) {
        console.error('Failed to fetch cargo concise info:', error)
        cargoConciseInfo.value = null
    }
}

onMounted(() => {
    getCargoConciseInfo()
})

// Auto-slide directive used in cargo dialogs
const vAutoSlide = {
    mounted(el) {
        setupAutoSlide(el)
    },
    updated(el) {
        setupAutoSlide(el)
    }
}

function setupAutoSlide(containerEl) {
    try {
        if (!containerEl || !containerEl.isConnected) return

        const computed = window.getComputedStyle(containerEl)
        const wasInitialized = Boolean(containerEl.__autoSlideInner)

        if (!wasInitialized) {
            const inner = document.createElement('div')
            inner.style.display = computed.display.includes('flex') ? 'inline-flex' : 'inline-block'
            inner.style.alignItems = 'center'
            inner.style.gap = computed.columnGap || '4px'
            inner.style.whiteSpace = 'nowrap'

            while (containerEl.firstChild) {
                inner.appendChild(containerEl.firstChild)
            }
            containerEl.appendChild(inner)
            containerEl.style.overflow = 'hidden'
            containerEl.__autoSlideInner = inner
        }

        const innerEl = containerEl.__autoSlideInner
        if (!innerEl) return

        if (containerEl.__autoSlideAnim) {
            try { containerEl.__autoSlideAnim.cancel() } catch {}
            containerEl.__autoSlideAnim = null
        }

        requestAnimationFrame(() => {
            const containerWidth = containerEl.clientWidth
            const contentWidth = innerEl.scrollWidth
            const extra = contentWidth - containerWidth

            if (extra <= 2) {
                innerEl.style.transform = 'translateX(0)'
                return
            }

            const durationMs = Math.max(2000, Math.min(12000, Math.round((extra / 40) * 1000 + 800)))

            const run = () => {
                const anim = innerEl.animate([
                    { transform: 'translateX(0px)' , offset: 0 },
                    { transform: 'translateX(0px)' , offset: 0.1 },
                    { transform: `translateX(${-extra}px)`, offset: 0.9 },
                    { transform: `translateX(${-extra}px)`, offset: 1 }
                ], {
                    duration: durationMs,
                    easing: 'ease-in-out',
                    iterations: 1,
                    fill: 'forwards'
                })
                containerEl.__autoSlideAnim = anim
            }

            if (containerEl.__autoSlideObserved) {
                run()
                return
            }

            const io = new IntersectionObserver((entries) => {
                for (const e of entries) {
                    if (e.isIntersecting) {
                        run()
                        io.disconnect()
                        containerEl.__autoSlideObserved = true
                        break
                    }
                }
            }, { threshold: 0.2 })
            io.observe(containerEl)

            const ro = new ResizeObserver(() => setupAutoSlide(containerEl))
            ro.observe(containerEl)
            containerEl.__autoSlideResizeObs = ro
        })
    } catch {}
}
</script>

<style lang="scss" scoped>
section {
    width: 100%;
    max-width: 100%;
    padding: 6px 16px;
}
.header {
    padding: 24px 0 4px 24px;

    img {
        height: 32px;
        width: auto;
    }
}
.slide {
    padding: 16px;
    padding-bottom: 8px;
    width: 100%;
    .slide-images{
        display: flex;
        width: 100%;
        height: auto;
        border-radius: 20px;
        .image{
            max-width: 100%;
            height: auto;
            border-radius: 20px;
        }
    }
}
.checkTrack{
    .track{
        background-color: #FFFFFF;
        padding: 12px;
        border-radius: 20px;
        .title{
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            font-weight: 400;
            color: #1F1F1F;
            padding: 4px 4px 12px 4px;
        }
        .inputBox{
            height: 52px;
            display: flex;
            width: 100%;
            .input{
                min-width: none;
                width: 100%;
                max-width: 100%;
                .trackInput{
                    width: 100%;
                    height: 52px;
                    border-radius: 8px 0 0 8px;
                    outline: none;
                    border: none;
                    background-color: #EAF3FB;
                    padding: 1rem;
                    color: #1f1f1f;
                    font-size: 1rem;
                    font-weight: 500;
                    &::placeholder{
                        font-size: 12px;
                        color: #5E5E5E;
                        font-weight: 400;
                    }
                }
            }
            .check{
                min-width: 52px;
                height: 100%;
                background: linear-gradient(45deg, #66BFFF 0%, #0973FB 100%);
                border-radius: 0 8px 8px 0;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
}

.cargoConcise{
    .cargoConciseInfo{
        width: 100%;
        background-color: #FFFFFF;
        padding: 8px;
        border-radius: 20px;
        height: 64px;
        display: grid;
        grid-template-columns: 48px auto 48px;
        gap: 12px;
        border-width: 1px;
        border-style: solid;
        .icon{
            width: 48px;
            height: 48px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 24px;
            background: linear-gradient(45deg, #0973FB 0%, #66BFFF 100%);
            img{
                width: 48px;
                height: 48px;
                border-radius: 12px;
            }
        }
        .text{
            font-weight: 500;
            font-size: 16px;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .arrow{
            display: flex;
            justify-content:center;
            align-items: center;
        }
    }
    .login{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        a{
            text-decoration: none;
        }
        .registerButton, .loginButton{
            width: 100%;
            height: 48px;
            border-radius: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            font-weight: 500;
        }
        .registerButton{
            color: #1F1F1F;
            background-color: #FFFFFF;
        }
        .loginButton{
            background: linear-gradient(45deg, #0973FB 0%, #66BFFF 100%);
            color: #FFFFFF;
        }
    }
    .address{
        .box{
            width: 100%;
            height: 64px;
            background: linear-gradient(45deg, #0973FB 0%, #66BFFF 100%);
            border-radius: 20px;
            display: grid;
            grid-template-columns: auto auto auto;
            align-items: center;
            cursor: pointer;
            gap: 12px;
            padding: 12px;
            .description{
                color: #FFFFFF;
                font-size: 16px;
                font-weight: 500;
                white-space: wrap;
            }
            .icon{
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
            }
        }
    }
}

.links{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    .link{
        width: 100%;
        height: 100%;
        background: #ffffff;
        padding: 16px;
        border-radius: 20px;
        &.hightlight{
            background: linear-gradient(45deg, #0973FB 0%, #66BFFF 100%);
            .icon{
                background: rgba(255, 255, 255, 0.3);
            }
            .title{
                color: #ffffff;
            }
            .description{
                color: #ffffff;
            }
        }
        .icon{
            width: 48px;
            height: 48px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 24px;
            background: linear-gradient(45deg, #0973FB 0%, #66BFFF 100%);
            margin-bottom: 12px;
        }
        .title{
            font-size: 16px;
            font-weight: 500;
            color: #1F1F1F;
            margin-bottom: 8px;
        }
        .description{
            font-size: 12px;
            font-weight: 400;
            color: #1F1F1F;
        }
    }
}
.dialog{
    position: relative;
    z-index: 999;
    .dialogPanel{
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
        .dialogCard{
            width: 100%;
            max-width: 448px;
            background-color: #F4F8FB;
            padding: 12px;
            border-radius: 20px;
            max-height: 80vh;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            .head{
                width: 100%;
                height: auto;
                display: flex;
                justify-content: space-between;
                .status{
                    border-radius: 16px;
                    height: 32px;
                    width: auto;
                    font-size: 14px;
                    font-weight: 500;
                    background-color: #1F1F1F;
                    color: #FFFFFF;
                    padding: 0 12px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                .type{
                    border-radius: 1rem;
                    height: 32px;
                    font-size: 14px;
                    font-weight: 500;
                    background-color: #0973FB;
                    color: #FFFFFF;
                    padding: 0 12px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
            .cargoinfo{
                width: 100%;
                height: auto;
                display: grid;
                grid-template-columns: 64px 1fr auto;
                gap: 12px;
                margin-top: 16px;
                .text{
                    min-width: 0;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    .nickname{
                        font-size: 16px;
                        font-weight: 500;
                        color: #1F1F1F;
                        margin-bottom: 4px;
                        white-space: normal;
                        word-break: break-word;
                        overflow-wrap: anywhere;
                    }
                    .trackCode{
                        display: flex;
                        align-items: center;
                        gap: 4px;
                        font-size: 14px;
                        font-weight: 400;
                        color: #6B7280;
                        white-space: normal;
                        word-break: break-word;
                        overflow-wrap: anywhere;
                    }
                }
                .priceSection{
                    height: 100%;
                    width: auto;
                    display: flex;
                    align-items: center;
                    justify-content: end;
                    .price{
                        font-size: 16px;
                        font-weight: 400;
                        background-color: #1F1F1F;
                        color: #FFFFFF;
                        border-radius: 16px;
                        height: 32px;
                        padding: 0 12px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        white-space: nowrap;
                    };

                }
            }
            .buttons{
                width: 100%;
                height: auto;
                display: flex;
                justify-content: end;
                margin-top: 16px;
                .close{
                    width: 100%;
                    height: 48px;
                    background-color: #FFFFFF;
                    color: #1F1F1F;
                    font-size: 14px;
                    font-weight: 500;
                    border-radius: 8px;
                    border: none;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>