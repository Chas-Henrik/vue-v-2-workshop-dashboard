<script setup lang="ts">
// TODO: Importera ref och computed från 'vue'
// import { ref, computed } from 'vue'

// TODO: Importera useSoundEngine-komposablen
// import { useSoundEngine } from '../../composables/useSoundEngine'

// TODO: Anropa useSoundEngine() och plocka ut:
//  - sounds
//  - isLoaded
//  - isPlaying
//  - delayTime
//  - delayMix
//  - playSound
//  - updateDelayTime
//  - updateDelayMix

// TODO: Skapa en ref som håller koll på historik av spelade ljud
//  - Typ: Array<{ id: string; timestamp: number }>
//  - Tanken: varje gång ett ljud spelas lägger ni till ett objekt i denna array

// TODO: Implementera en computed property 'lastPlayed'
//  - Ska returnera label (t.ex. "C", "D", ...) för senast spelade ljudet
//  - Tips: titta på sista elementet i playHistory och matcha mot sounds
//  - Om inget ljud har spelats ännu: returnera null
// const lastPlayed = computed(() => {
//   // din kod här
// })

// TODO: Implementera en computed property 'totalPlays'
//  - Ska returnera totalt antal uppspelningar (längden på playHistory)
// const totalPlays = computed(() => {
//   // din kod här
// })

// TODO: Implementera funktionen handlePlay(soundId: string)
//  - Anropa playSound(soundId) från soundEngine
//  - Lägg till en rad i playHistory med:
//    { id: soundId, timestamp: Date.now() }
// function handlePlay(soundId: string) {
//   // din kod här
// }

// TODO: Implementera funktion handleDelayTimeInput(event: Event)
//  - Läs ut värdet från event.target (HTMLInputElement)
//  - Gör om till Number
//  - Anropa updateDelayTime(...) från soundEngine
// function handleDelayTimeInput(event: Event) {
//   // din kod här
// }

// TODO: Implementera funktion handleDelayMixInput(event: Event)
//  - Samma princip som ovan, men anropa updateDelayMix(...)
// function handleDelayMixInput(event: Event) {
//   // din kod här
// }
</script>


<template>
  <div class="soundboard-widget">
    <!-- TODO: Använd isLoaded från useSoundEngine för att visa laddningsstatus -->
    <!-- Tips: använd v-if="!isLoaded" här -->
    <div class="loading">
      <p>Laddar ljud...</p>
    </div>

    <!-- TODO: Annars (v-else) visa själva soundboarden -->
    <!-- Tips: lägg v-else på denna div -->
    <div>
      <!-- Stats header -->
      <div class="stats">
        <!-- TODO: Visa totalt antal uppspelningar (totalPlays) här -->
        <!-- Exempel: "Totalt: X uppspelningar" -->
        <span>Totalt: ... uppspelningar</span>

        <!-- TODO: Visa senast spelade ljud (lastPlayed) om det finns -->
        <!-- Tips: använd v-if="lastPlayed" -->
        <span>Senaste: ...</span>
      </div>
      
      <!-- Sound buttons -->
      <div class="sound-grid">
        <!-- TODO: Loopa över sounds med v-for -->
        <!-- Tips: v-for="sound in sounds" :key="sound.id" -->
        <!-- TODO: Använd @click för att anropa handlePlay(sound.id) -->
        <!-- TODO: Lägg till dynamiska klasser för färg och isPlaying -->
        <button class="sound-btn">
          <!-- TODO: Visa sound.label här -->
          Ljud
        </button>
      </div>

      <!-- Effekt-kontroller -->
      <div class="effects-controls">
        <div class="control-group">
          <!-- TODO: Visa delayTime i sekunder (t.ex. med toFixed) -->
          <label for="delay-time">
            Delay Time
          </label>
          <input
            id="delay-time"
            type="range"
            min="0.1"
            max="1"
            step="0.05"
          />
          <!-- TODO: Bind :value till delayTime -->
          <!-- TODO: Använd @input="handleDelayTimeInput" -->
        </div>

        <div class="control-group">
          <!-- TODO: Visa delayMix i procent -->
          <label for="delay-mix">
            Delay Mix
          </label>
          <input
            id="delay-mix"
            type="range"
            min="0"
            max="1"
            step="0.1"
          />
          <!-- TODO: Bind :value till delayMix -->
          <!-- TODO: Använd @input="handleDelayMixInput" -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>


/* Färger */
.sound-btn-purple { background: #8b5cf6; }
.sound-btn-blue { background: #3b82f6; }
.sound-btn-cyan { background: #06b6d4; }
.sound-btn-pink { background: #ec4899; }

.sound-btn-purple:hover { background: #7c3aed; }
.sound-btn-blue:hover { background: #2563eb; }
.sound-btn-cyan:hover { background: #0891b2; }
.sound-btn-pink:hover { background: #db2777; }

</style>
