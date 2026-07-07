<template>
  <AppLayout>
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <SkillsSection />
    <CertificationsSection />
    <ProjectsSection />
    <ContactSection />
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import CertificationsSection from '@/components/sections/Certificationssection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
</script>
