<script setup>
import PassportCover from '@/components/PassportCover.vue'
import TravelInvite from '@/components/TravelInvite.vue'
import PassportDetails from '@/components/PassportDetails.vue'
import JourneyTips from '@/components/JourneyTips.vue'
import RsvpSection from '@/components/RsvpSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import BottomNav from '@/components/BottomNav.vue'
</script>

<template>
  <PassportCover />
  <main>
    <TravelInvite />
    <PassportDetails />
    <JourneyTips />
    <RsvpSection />
  </main>
  <SiteFooter />
  <BottomNav />
</template>
