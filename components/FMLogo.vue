<template>
  <img
    class="FMLogo"
    alt="Firm Media Logo"
    src="/fm_logo_v2.svg"
  >
</template>

<style>
.FMLogo {
  height: 180px;
  width: 180px;
  transform: rotateY(720deg);
  animation: turn 3.5s ease-out forwards 1s;
}

@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
