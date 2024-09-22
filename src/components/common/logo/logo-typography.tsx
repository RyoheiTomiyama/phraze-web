import React from 'react'

type LogoTypographyProps = {
  className?: string
}
export const LogoTypography = ({ className }: LogoTypographyProps) => {
  return (
    <svg
      width="133"
      height="28"
      viewBox="0 0 133 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M122.788 27.2401C120.428 27.2401 118.351 26.7784 116.555 25.855C114.786 24.9316 113.413 23.6748 112.439 22.0845C111.464 20.4685 110.977 18.6346 110.977 16.5826C110.977 14.505 111.451 12.671 112.4 11.0808C113.375 9.46483 114.696 8.20799 116.363 7.31025C118.03 6.38687 119.915 5.92517 122.019 5.92517C124.045 5.92517 125.866 6.36122 127.482 7.2333C129.124 8.07974 130.419 9.31093 131.368 10.9269C132.317 12.5171 132.792 14.428 132.792 16.6596C132.792 16.8904 132.779 17.1597 132.753 17.4675C132.727 17.7497 132.702 18.019 132.676 18.2755H115.863V14.7743H129.521L127.213 15.8131C127.213 14.7358 126.995 13.7996 126.559 13.0045C126.123 12.2093 125.52 11.5938 124.75 11.1577C123.981 10.696 123.083 10.4652 122.057 10.4652C121.031 10.4652 120.121 10.696 119.326 11.1577C118.556 11.5938 117.953 12.2222 117.517 13.043C117.081 13.8381 116.863 14.7871 116.863 15.8901V16.8135C116.863 17.9421 117.107 18.9424 117.594 19.8145C118.107 20.6609 118.813 21.315 119.71 21.7767C120.634 22.2127 121.711 22.4307 122.942 22.4307C124.045 22.4307 125.007 22.264 125.828 21.9306C126.674 21.5971 127.444 21.097 128.136 20.4301L131.33 23.8928C130.381 24.9701 129.188 25.8037 127.751 26.3936C126.315 26.9579 124.661 27.2401 122.788 27.2401Z" />
      <path d="M90.4646 26.9323V23.3157L102.699 8.84924L103.738 10.8499H90.7339V6.23297H108.586V9.84958L96.3512 24.316L95.2739 22.3153H108.932V26.9323H90.4646Z" />
      <path d="M80.8389 26.9323V22.8924L80.4541 22.0075V14.7743C80.4541 13.4918 80.0565 12.4915 79.2614 11.7733C78.4919 11.0551 77.2992 10.696 75.6833 10.696C74.5803 10.696 73.4902 10.8756 72.4129 11.2347C71.3613 11.5681 70.4636 12.0298 69.7197 12.6197L67.5652 8.42601C68.6937 7.63087 70.0532 7.01528 71.6434 6.57924C73.2337 6.14319 74.8497 5.92517 76.4912 5.92517C79.6461 5.92517 82.0957 6.66901 83.8399 8.15669C85.584 9.64438 86.4561 11.9657 86.4561 15.1206V26.9323H80.8389ZM74.529 27.2401C72.9131 27.2401 71.528 26.9707 70.3738 26.4321C69.2195 25.8678 68.3346 25.1111 67.719 24.1621C67.1035 23.2131 66.7957 22.1486 66.7957 20.9687C66.7957 19.7375 67.0906 18.6602 67.6806 17.7369C68.2962 16.8135 69.258 16.0953 70.5662 15.5823C71.8743 15.0436 73.58 14.7743 75.6833 14.7743H81.1851V18.2755H76.3373C74.9266 18.2755 73.9519 18.5063 73.4133 18.968C72.9003 19.4297 72.6438 20.0069 72.6438 20.6994C72.6438 21.4689 72.9388 22.0845 73.5287 22.5462C74.1443 22.9822 74.9779 23.2002 76.0295 23.2002C77.0299 23.2002 77.9276 22.9694 78.7228 22.5077C79.5179 22.0204 80.095 21.315 80.4541 20.3916L81.3775 23.1618C80.9415 24.4956 80.1463 25.5087 78.9921 26.2013C77.8378 26.8938 76.3502 27.2401 74.529 27.2401Z" />
      <path d="M51.793 26.9323V6.23297H57.5257V12.0811L56.7177 10.3882C57.3333 8.92619 58.3208 7.82325 59.6802 7.07941C61.0397 6.30992 62.6941 5.92517 64.6435 5.92517V11.4655C64.387 11.4399 64.1561 11.427 63.9509 11.427C63.7457 11.4014 63.5277 11.3886 63.2969 11.3886C61.6553 11.3886 60.3215 11.8631 59.2955 12.8121C58.2952 13.7355 57.795 15.1847 57.795 17.1597V26.9323H51.793Z" />
      <path d="M39.0814 5.92519C40.723 5.92519 42.1851 6.25863 43.4675 6.92552C44.7757 7.56677 45.8017 8.56711 46.5455 9.92654C47.2894 11.2603 47.6613 12.9789 47.6613 15.0821V26.9323H41.6592V16.0055C41.6592 14.3383 41.2873 13.1071 40.5435 12.312C39.8253 11.5168 38.7993 11.1192 37.4655 11.1192C36.5164 11.1192 35.6572 11.3244 34.8877 11.7348C34.1438 12.1196 33.5539 12.7224 33.1178 13.5431C32.7074 14.3639 32.5022 15.4156 32.5022 16.6981V26.9323H26.5002L26.5003 0H32.5024L32.5002 8.93229L31.1556 10.2343C31.8994 8.84925 32.9639 7.78479 34.349 7.04095C35.7341 6.29711 37.3116 5.92519 39.0814 5.92519Z" />
      <path d="M0 26.9322V-1.12057e-05H11.6578C14.0689 -1.12057e-05 16.1465 0.39756 17.8907 1.1927C19.6348 1.96219 20.9814 3.07795 21.9305 4.53999C22.8795 6.00202 23.354 7.7462 23.354 9.77252C23.354 11.7732 22.8795 13.5046 21.9305 14.9666C20.9814 16.4286 19.6348 17.5572 17.8907 18.3523C16.1465 19.1218 14.0689 19.5066 11.6578 19.5066H6.23288V26.9322H0ZM6.23288 14.4279H11.3115C13.2352 14.4279 14.6716 14.0175 15.6207 13.1968C16.5697 12.376 17.0442 11.2346 17.0442 9.77252C17.0442 8.28484 16.5697 7.13061 15.6207 6.30982C14.6716 5.48902 13.2352 5.07863 11.3115 5.07863H6.23288V14.4279Z" />
    </svg>
  )
}
