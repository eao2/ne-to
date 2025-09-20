<template>
    <div class="map-page">
        <div ref="mapContainer" class="map-container"></div>

        <!-- Information Modal -->
        <transition enter-active-class="transition-transform duration-300 ease-out" enter-from-class="translate-y-full"
            enter-to-class="translate-y-0" leave-active-class="transition-transform duration-300 ease-in"
            leave-from-class="translate-y-0" leave-to-class="translate-y-full">
            <div class="modal">
                <div v-if="selectedBranch" class="info-modal">
                    <h2 class="branch-name">{{ selectedBranch.name }}</h2>
                    <!-- Close Button -->
                    <!-- <button @click="selectedBranch = null; " class="close-button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button> -->

                    <div class="modal-content">
                        <div class="branch-details">
                            <div class="main-details-row">
                                <img :src="selectedBranch.image" :alt="selectedBranch.name" class="branch-image" />
                                <div class="details-row">
                                    <div class="detail-row">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_661_234)">
                                                <path
                                                    d="M3.65398 1.32805C3.59495 1.25211 3.52043 1.1896 3.43538 1.14468C3.35034 1.09975 3.2567 1.07343 3.1607 1.06747C3.0647 1.06151 2.96853 1.07605 2.87858 1.11012C2.78863 1.14418 2.70695 1.19699 2.63898 1.26505L1.60498 2.30005C1.12198 2.78405 0.943983 3.46905 1.15498 4.07005C2.03171 6.55716 3.45614 8.81546 5.32298 10.6781C7.18557 12.5449 9.44387 13.9693 11.931 14.8461C12.532 15.0571 13.217 14.8791 13.701 14.3961L14.735 13.3621C14.803 13.2941 14.8559 13.2124 14.8899 13.1225C14.924 13.0325 14.9385 12.9363 14.9326 12.8403C14.9266 12.7443 14.9003 12.6507 14.8554 12.5656C14.8104 12.4806 14.7479 12.4061 14.672 12.3471L12.365 10.5531C12.2838 10.4903 12.1894 10.4467 12.089 10.4255C11.9885 10.4044 11.8846 10.4063 11.785 10.4311L9.59498 10.9781C9.30264 11.0506 8.99651 11.0465 8.70623 10.9661C8.41594 10.8857 8.15132 10.7317 7.93798 10.5191L5.48198 8.06205C5.26916 7.84881 5.115 7.58424 5.03441 7.29395C4.95382 7.00366 4.94954 6.69748 5.02198 6.40505L5.56998 4.21505C5.59474 4.11544 5.59663 4.01151 5.5755 3.91106C5.55437 3.81061 5.51078 3.71625 5.44798 3.63505L3.65398 1.32805ZM1.88398 0.511051C2.05898 0.336 2.26921 0.200181 2.50072 0.112612C2.73223 0.0250429 2.97973 -0.0122724 3.22676 0.00314389C3.4738 0.0185602 3.71474 0.0863553 3.93356 0.202028C4.15239 0.3177 4.34411 0.478602 4.49598 0.674051L6.28998 2.98005C6.61898 3.40305 6.73498 3.95405 6.60498 4.47405L6.05798 6.66405C6.0299 6.77749 6.03153 6.89625 6.0627 7.00888C6.09388 7.12151 6.15356 7.2242 6.23598 7.30705L8.69298 9.76405C8.77593 9.84664 8.87879 9.90642 8.99161 9.9376C9.10443 9.96878 9.2234 9.97032 9.33698 9.94205L11.526 9.39505C11.7826 9.33126 12.0504 9.32647 12.3091 9.38102C12.5679 9.43558 12.8109 9.54807 13.02 9.71005L15.326 11.5041C16.155 12.1491 16.231 13.3741 15.489 14.1151L14.455 15.1491C13.715 15.8891 12.609 16.2141 11.578 15.8511C8.93866 14.9236 6.54252 13.4128 4.56798 11.4311C2.58636 9.4568 1.07553 7.06102 0.147983 4.42205C-0.214017 3.39205 0.110983 2.28505 0.850983 1.54505L1.88398 0.511051Z"
                                                    fill="#0973FB" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_661_234">
                                                    <rect width="16" height="16" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        <span>{{ selectedBranch.phoneNumber }}</span>
                                    </div>
                                    <div class="detail-row">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_486_116)">
                                                <path
                                                    d="M8 3.5C8 3.36739 7.94732 3.24021 7.85355 3.14645C7.75979 3.05268 7.63261 3 7.5 3C7.36739 3 7.24021 3.05268 7.14645 3.14645C7.05268 3.24021 7 3.36739 7 3.5V9C7.00003 9.08813 7.02335 9.17469 7.06761 9.25091C7.11186 9.32712 7.17547 9.39029 7.252 9.434L10.752 11.434C10.8669 11.4961 11.0014 11.5108 11.127 11.4749C11.2525 11.4391 11.3591 11.3556 11.4238 11.2422C11.4886 11.1288 11.5065 10.9946 11.4736 10.8683C11.4408 10.7419 11.3598 10.6334 11.248 10.566L8 8.71V3.5Z"
                                                    fill="#0973FB" />
                                                <path
                                                    d="M8 16C10.1217 16 12.1566 15.1571 13.6569 13.6569C15.1571 12.1566 16 10.1217 16 8C16 5.87827 15.1571 3.84344 13.6569 2.34315C12.1566 0.842855 10.1217 0 8 0C5.87827 0 3.84344 0.842855 2.34315 2.34315C0.842855 3.84344 0 5.87827 0 8C0 10.1217 0.842855 12.1566 2.34315 13.6569C3.84344 15.1571 5.87827 16 8 16ZM15 8C15 9.85652 14.2625 11.637 12.9497 12.9497C11.637 14.2625 9.85652 15 8 15C6.14348 15 4.36301 14.2625 3.05025 12.9497C1.7375 11.637 1 9.85652 1 8C1 6.14348 1.7375 4.36301 3.05025 3.05025C4.36301 1.7375 6.14348 1 8 1C9.85652 1 11.637 1.7375 12.9497 3.05025C14.2625 4.36301 15 6.14348 15 8Z"
                                                    fill="#0973FB" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_486_116">
                                                    <rect width="16" height="16" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        <span>{{ selectedBranch.hours }}</span>
                                    </div>
                                    <div class="detail-row">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_486_122)">
                                                <path
                                                    d="M3.5 0C3.63261 0 3.75979 0.0526784 3.85355 0.146447C3.94732 0.240215 4 0.367392 4 0.5V1H12V0.5C12 0.367392 12.0527 0.240215 12.1464 0.146447C12.2402 0.0526784 12.3674 0 12.5 0C12.6326 0 12.7598 0.0526784 12.8536 0.146447C12.9473 0.240215 13 0.367392 13 0.5V1H14C14.5304 1 15.0391 1.21071 15.4142 1.58579C15.7893 1.96086 16 2.46957 16 3V14C16 14.5304 15.7893 15.0391 15.4142 15.4142C15.0391 15.7893 14.5304 16 14 16H2C1.46957 16 0.960859 15.7893 0.585786 15.4142C0.210714 15.0391 0 14.5304 0 14V3C0 2.46957 0.210714 1.96086 0.585786 1.58579C0.960859 1.21071 1.46957 1 2 1H3V0.5C3 0.367392 3.05268 0.240215 3.14645 0.146447C3.24021 0.0526784 3.36739 0 3.5 0ZM2 2C1.73478 2 1.48043 2.10536 1.29289 2.29289C1.10536 2.48043 1 2.73478 1 3V14C1 14.2652 1.10536 14.5196 1.29289 14.7071C1.48043 14.8946 1.73478 15 2 15H14C14.2652 15 14.5196 14.8946 14.7071 14.7071C14.8946 14.5196 15 14.2652 15 14V3C15 2.73478 14.8946 2.48043 14.7071 2.29289C14.5196 2.10536 14.2652 2 14 2H2Z"
                                                    fill="#0973FB" />
                                                <path
                                                    d="M2.5 4C2.5 3.86739 2.55268 3.74021 2.64645 3.64645C2.74021 3.55268 2.86739 3.5 3 3.5H13C13.1326 3.5 13.2598 3.55268 13.3536 3.64645C13.4473 3.74021 13.5 3.86739 13.5 4V5C13.5 5.13261 13.4473 5.25979 13.3536 5.35355C13.2598 5.44732 13.1326 5.5 13 5.5H3C2.86739 5.5 2.74021 5.44732 2.64645 5.35355C2.55268 5.25979 2.5 5.13261 2.5 5V4ZM11 7.5C11 7.36739 11.0527 7.24021 11.1464 7.14645C11.2402 7.05268 11.3674 7 11.5 7H12.5C12.6326 7 12.7598 7.05268 12.8536 7.14645C12.9473 7.24021 13 7.36739 13 7.5V8.5C13 8.63261 12.9473 8.75979 12.8536 8.85355C12.7598 8.94732 12.6326 9 12.5 9H11.5C11.3674 9 11.2402 8.94732 11.1464 8.85355C11.0527 8.75979 11 8.63261 11 8.5V7.5ZM8 7.5C8 7.36739 8.05268 7.24021 8.14645 7.14645C8.24021 7.05268 8.36739 7 8.5 7H9.5C9.63261 7 9.75979 7.05268 9.85355 7.14645C9.94732 7.24021 10 7.36739 10 7.5V8.5C10 8.63261 9.94732 8.75979 9.85355 8.85355C9.75979 8.94732 9.63261 9 9.5 9H8.5C8.36739 9 8.24021 8.94732 8.14645 8.85355C8.05268 8.75979 8 8.63261 8 8.5V7.5ZM3 10.5C3 10.3674 3.05268 10.2402 3.14645 10.1464C3.24021 10.0527 3.36739 10 3.5 10H4.5C4.63261 10 4.75979 10.0527 4.85355 10.1464C4.94732 10.2402 5 10.3674 5 10.5V11.5C5 11.6326 4.94732 11.7598 4.85355 11.8536C4.75979 11.9473 4.63261 12 4.5 12H3.5C3.36739 12 3.24021 11.9473 3.14645 11.8536C3.05268 11.7598 3 11.6326 3 11.5V10.5ZM6 10.5C6 10.3674 6.05268 10.2402 6.14645 10.1464C6.24021 10.0527 6.36739 10 6.5 10H7.5C7.63261 10 7.75979 10.0527 7.85355 10.1464C7.94732 10.2402 8 10.3674 8 10.5V11.5C8 11.6326 7.94732 11.7598 7.85355 11.8536C7.75979 11.9473 7.63261 12 7.5 12H6.5C6.36739 12 6.24021 11.9473 6.14645 11.8536C6.05268 11.7598 6 11.6326 6 11.5V10.5Z"
                                                    fill="#0973FB" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_486_122">
                                                    <rect width="16" height="16" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        <span>{{ selectedBranch.days }}</span>
                                    </div>
                                    <div class="detail-row">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M8 0.999996C7.60603 0.999996 7.21593 1.07759 6.85195 1.22836C6.48797 1.37912 6.15726 1.6001 5.87868 1.87868C5.6001 2.15725 5.37913 2.48797 5.22836 2.85195C5.0776 3.21592 5 3.60603 5 4C5 4.39396 5.0776 4.78407 5.22836 5.14805C5.37913 5.51202 5.6001 5.84274 5.87868 6.12132C6.15726 6.39989 6.48797 6.62087 6.85195 6.77163C7.21593 6.9224 7.60603 7 8 7C8.79565 7 9.55871 6.68393 10.1213 6.12132C10.6839 5.55871 11 4.79564 11 4C11 3.20435 10.6839 2.44128 10.1213 1.87868C9.55871 1.31607 8.79565 0.999996 8 0.999996ZM4 4C4.00007 3.23022 4.22226 2.47682 4.63989 1.83019C5.05753 1.18356 5.65288 0.671167 6.3545 0.354502C7.05613 0.0378371 7.83422 -0.0696522 8.59542 0.0449322C9.35662 0.159517 10.0686 0.491307 10.6459 1.00049C11.2232 1.50968 11.6413 2.17463 11.8501 2.91555C12.0589 3.65647 12.0494 4.4419 11.8228 5.17758C11.5963 5.91326 11.1623 6.56795 10.5729 7.06309C9.98349 7.55822 9.26374 7.87277 8.5 7.969V13.5C8.5 13.6326 8.44732 13.7598 8.35355 13.8535C8.25979 13.9473 8.13261 14 8 14C7.86739 14 7.74021 13.9473 7.64645 13.8535C7.55268 13.7598 7.5 13.6326 7.5 13.5V7.97C6.53296 7.84816 5.64369 7.37743 4.99921 6.64623C4.35474 5.91503 3.99942 4.97468 4 4ZM6.493 12.574C6.51469 12.7047 6.48358 12.8387 6.40651 12.9466C6.32944 13.0544 6.21272 13.1272 6.082 13.149C5.37 13.267 4.802 13.444 4.427 13.642C4.28904 13.7079 4.16379 13.7976 4.057 13.907C4.03278 13.9334 4.01348 13.9638 4 13.997V14L4.002 14.008L4.018 14.041C4.0572 14.0991 4.10628 14.1498 4.163 14.191C4.328 14.321 4.598 14.461 4.976 14.586C5.727 14.836 6.796 15 8 15C9.204 15 10.273 14.837 11.024 14.586C11.402 14.46 11.672 14.321 11.837 14.191C11.8941 14.1499 11.9435 14.0992 11.983 14.041L11.998 14.008L12 14V13.996C11.9865 13.9628 11.9672 13.9324 11.943 13.906C11.8361 13.7969 11.7109 13.7076 11.573 13.642C11.197 13.444 10.63 13.267 9.918 13.149C9.85168 13.14 9.78783 13.1178 9.73025 13.0837C9.67267 13.0496 9.62253 13.0042 9.58279 12.9504C9.54306 12.8965 9.51454 12.8352 9.49893 12.7701C9.48332 12.7051 9.48093 12.6375 9.49191 12.5715C9.5029 12.5055 9.52702 12.4423 9.56286 12.3858C9.5987 12.3293 9.64552 12.2805 9.70055 12.2424C9.75558 12.2043 9.81769 12.1777 9.88322 12.164C9.94874 12.1504 10.0163 12.15 10.082 12.163C10.852 12.29 11.534 12.491 12.039 12.757C12.5 13 13 13.4 13 14C13 14.426 12.74 14.752 12.456 14.977C12.166 15.205 11.776 15.39 11.34 15.535C10.462 15.828 9.281 16 8 16C6.719 16 5.538 15.828 4.66 15.535C4.224 15.39 3.834 15.205 3.544 14.977C3.26 14.752 3 14.426 3 14C3 13.401 3.5 13 3.961 12.757C4.466 12.491 5.148 12.29 5.918 12.163C6.04874 12.1413 6.18275 12.1724 6.29057 12.2495C6.39838 12.3266 6.4712 12.4433 6.493 12.574Z"
                                                fill="#0973FB" />
                                        </svg>

                                        <span>{{ selectedBranch.location }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="links-row">
                                <a :href="`https://www.google.com/maps/search/?api=1&query=${selectedBranch.lat},${selectedBranch.lng}`"
                                    target="_blank" rel="noopener noreferrer" class="maps-link">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M20 8.8116L19.9999 8.8541C19.9998 8.872 19.9996 8.8899 19.9994 8.9078C19.9998 8.9287 20 8.9498 20 8.971C20 12.3073 17.4007 15.2604 15.6614 17.2367C15.1567 17.8101 14.7244 18.3013 14.449 18.6957C13.4694 20.0986 12.9524 21.6184 12.8163 22.2029C12.8163 22.6431 12.4509 23 12 23C11.5491 23 11.1837 22.6431 11.1837 22.2029C11.0476 21.6184 10.5306 20.0986 9.551 18.6957C9.2756 18.3013 8.8433 17.8101 8.3386 17.2367C6.5993 15.2604 4 12.3073 4 8.971C4 8.9498 4.0002 8.9287 4.0006 8.9078C4.0002 8.8758 4 8.8437 4 8.8116C4 4.49736 7.5817 1 12 1C16.4183 1 20 4.49736 20 8.8116ZM12 11.6812C13.7132 11.6812 15.102 10.325 15.102 8.6522C15.102 6.9793 13.7132 5.62319 12 5.62319C10.2868 5.62319 8.898 6.9793 8.898 8.6522C8.898 10.325 10.2868 11.6812 12 11.6812Z"
                                            fill="#34A851" />
                                        <path
                                            d="M19.1054 5.21856C18.1258 3.37546 16.4161 1.96177 14.3504 1.34277L9.75586 6.5615C10.3208 5.98352 11.1174 5.62346 12.0002 5.62346C13.7134 5.62346 15.1022 6.9796 15.1022 8.6524C15.1022 9.3349 14.8711 9.9646 14.4811 10.4711L19.1054 5.21856Z"
                                            fill="#4285F5" />
                                        <path
                                            d="M8.4311 17.3425C8.4004 17.3076 8.3695 17.2725 8.3383 17.2371C7.1918 15.9344 5.67162 14.2073 4.76855 12.2257L9.5439 6.80176C9.1387 7.31356 8.8976 7.95556 8.8976 8.65256C8.8976 10.3254 10.2865 11.6816 11.9997 11.6816C12.8675 11.6816 13.6521 11.3336 14.2151 10.7727L8.4311 17.3425Z"
                                            fill="#F9BB0E" />
                                        <path
                                            d="M5.89288 3.76562C4.71207 5.12686 4 6.8881 4 8.8117C4 8.8438 4.0002 8.8759 4.0006 8.9079C4.0002 8.9288 4 8.9499 4 8.9711C4 10.1082 4.30196 11.2009 4.76889 12.2254L9.5362 6.81061L5.89288 3.76562Z"
                                            fill="#E74335" />
                                        <path
                                            d="M14.3499 1.34254C13.6068 1.11988 12.8176 1 11.9997 1C9.5514 1 7.36 2.07387 5.89258 3.76553L9.5359 6.8105L9.5438 6.8015C9.6101 6.7178 9.6807 6.6375 9.7554 6.5611L14.3499 1.34254Z"
                                            fill="#1A73E6" />
                                    </svg>
                                    Open Maps
                                </a>
                                <a :href="`/address?id=${selectedBranch.id}`"
                                    rel="noopener noreferrer" class="maps-link">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M12 2.18176C7.38088 2.18176 3.63635 5.76134 3.63635 10.177C3.63635 14.558 6.30573 19.6703 10.4706 21.4984C11.4414 21.9247 12.5585 21.9247 13.5294 21.4984C17.6942 19.6703 20.3636 14.558 20.3636 10.177C20.3636 5.76134 16.6191 2.18176 12 2.18176ZM12 13.4025C13.5397 13.4025 14.7879 12.1466 14.7879 10.5973C14.7879 9.04807 13.5397 7.79214 12 7.79214C10.4602 7.79214 9.21211 9.04807 9.21211 10.5973C9.21211 12.1466 10.4602 13.4025 12 13.4025Z"
                                            fill="#0973FB" />
                                    </svg>
                                    Хаяг холбох
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Loader } from "@googlemaps/js-api-loader";

const mapContainer = ref(null);
const selectedBranch = ref(null);
let map = null;

const config = useRuntimeConfig();
const GOOGLE_MAPS_API_KEY = config.public.googleMapsKey;
const MAP_ID = "c39c2bafafb406ca48d41de9";

// Branch locations
const branches = [
    { 
        id: 1, 
        name: "Сансар", 
        phoneNumber: "99912992",
        lat: 47.922838, 
        lng: 106.941455, 
        hours: "12:00-20:00", 
        days: "Даваа-Бямба", 
        location: 'БЗД 3-р хороо Сансарын түнелс зүүн 4зам руу уруудах туслах зам дагуу 7а байрны баруун хойд талд', 
        image: "https://placehold.co/200x200/4299e1/ffffff?text=Сансар" 
    },
    { 
        id: 2, 
        name: "21-р хороолол", 
        phoneNumber: "99880764",
        lat: 47.9225433, 
        lng: 106.822292, 
        hours: "11:00-19:00", 
        days: "Даваа-Бямба", 
        location: 'Содон хороололын чанх ард төв зам дагуу Амгалан төвийн 2 давхарт', 
        image: "https://placehold.co/200x200/4299e1/ffffff?text=21-р хороолол" 
    },
    { 
        id: 3, 
        name: "Төмөр зам", 
        phoneNumber: "99880764",
        lat: 47.911483, 
        lng: 106.886885, 
        hours: "10:00-17:00", 
        days: "Даваа-Баасан", 
        location: 'БГД-ын 1-хоpoo Khabu Hotel -н хойно 48-р байрны баруун урд талд', 
        image: "https://placehold.co/200x200/4299e1/ffffff?text=Төмөр зам" 
    },
    { 
        id: 4, 
        name: "19 үйлчилгээний төв", 
        phoneNumber: "94505479",
        lat: 47.9017538, 
        lng: 106.9004209, 
        hours: "10:00-18:00", 
        days: "Даваа-Баасан", 
        location: 'Хан-уул дүүрэг 2-р хороо 9-р байр 1 тоот', 
        image: "https://placehold.co/200x200/4299e1/ffffff?text=19 үйлчилгээний төв" 
    },
    { 
        id: 5, 
        name: "3,4-р хороолол гэмтэл", 
        phoneNumber: "89903381, 85601541",
        lat: 47.9207139, 
        lng: 106.8593221, 
        hours: "15:00-21:20", 
        days: "Даваа-Баасан", 
        location: 'БГД-31 хороо 65-р байр', 
        image: "https://placehold.co/200x200/4299e1/ffffff?text=3,4-р хороолол гэмтэл" 
    },
];

selectedBranch.value = branches[0];

async function initMap() {
    if (!mapContainer.value) return;

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(mapContainer.value, {
        center: { lat: 47.9179, lng: 106.9175 },
        zoom: 12,
        mapId: MAP_ID || undefined,
        disableDefaultUI: true,
    });

    branches.forEach(branch => {
        const markerEl = document.createElement("div");
        markerEl.className = "custom-marker";
        markerEl.id = branch.id;
        const name = document.createElement("div");
        name.className = "marker-dot";
        name.textContent = branch.name;
        markerEl.appendChild(name);

        if (branch.id === selectedBranch.value.id) {
            markerEl.classList.add("active");
        }

        const marker = new AdvancedMarkerElement({
            map,
            position: { lat: branch.lat, lng: branch.lng },
            content: markerEl,
            title: branch.name,
        });

        marker.addListener("click", () => {
            document.querySelectorAll('.custom-marker').forEach(el => el.classList.remove('active'));
            markerEl.classList.add("active");
            selectedBranch.value = branch;
            map.panTo({ lat: branch.lat, lng: branch.lng });
        });
    });

    map.panTo({ lat: branches[0].lat, lng: branches[0].lng });
}

onMounted(async () => {
    const loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        version: "beta",
        libraries: ["maps", "marker"]
    });

    try {
        await loader.load();
        await initMap();
    } catch (err) {
        console.error("Failed to load Google Maps:", err);
    }
});
</script>


<style lang="scss" scoped>
:global(.content) {
    padding-bottom: 0 !important;
}

.map-page {
    position: relative;
    width: 100%;
    height: 100vh;
    font-family: 'Inter', sans-serif;
}

.map-container {
    width: 100%;
    height: 100%;
}

.modal{
    position: fixed;
    z-index: 10;
    bottom: 74px;
    padding: 16px;
    width: 100%;
}

.info-modal {
    position: relative;
    background-color: #F4F8FB;
    border-radius: 16px;
    padding: 12px;
    min-width: none;
    width: 100%;
    max-width: 448px;
    .branch-name{
        font-weight: 400;
    }
}

.branch-image {
    width: 6rem;
    height: 6rem;
    border-radius: 0.5rem;
    object-fit: cover;
    flex-shrink: 0;
}

.branch-details {
    flex-grow: 1;
}

.branch-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
}

.main-details-row{
    display: flex;
    gap: 8px;
    .details-row{
        .detail-row {
            display: flex;
            align-items: center;
            color: #4b5563;
            font-size: 0.9rem;
            margin-top: 4px;

            svg {
                width: 1.25rem;
                height: 1.25rem;
                margin-right: 0.5rem;
                color: #3b82f6;
                flex-shrink: 0;
            }
        }
    }
}

.links-row{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 8px;
    .maps-link {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #ffffff;
        color: #1f1f1f;
        font-weight: 400;
        text-decoration: none;
        gap: 8px;
        transition: background-color 0.2s ease-in-out;
        min-height: 40px;
        padding: 8px 12px;
        border-radius: 8px;
    }
}

:global(.active) {
    border: 2px solid #0973FB !important;
}

:global(.custom-marker) {
    border: 2px solid #ffffff;
    width: 48px;
    height: 48px;
    border-radius: 9999px;
    background-image: url('/marker-image.svg');
    background-size: 44px 44px;
    object-fit: fill;
    display: flex;
    align-items: center;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
    transition: transform 0.2s ease;
}

:global(.marker-dot) {
    position: relative;
    left: 50px;
    font-weight: 400;
    font-size: 12px;
}
</style>