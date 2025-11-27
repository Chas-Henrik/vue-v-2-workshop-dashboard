# Dashboard Workshop - Vue.js

Dagens workshop går ut på att bygga en **dashboard-applikation** där ni får öva på: komponenter, props, emits, slots, lifecycle hooks och composables.

Gör så mycket ni hinner med, fokusera på att förstå det ni gör snarare än att göra klart hela uppgiften.
Använd gärna AI för att generera (och sedan tolka enligt kursplan) koden för att förstå vad som händer :)

Använd gärna TypeScript och ni får såklart använda tailwind istället för vanlig css.

---

## Uppgift

Bygg en dashboard med:

- **Layout-system** med header, sidebar och main content
- **Återanvändbara komponenter** (cards, buttons, modals)
- **Widget-system** där olika widgets kan läggas till
- **Data som persistas** i localStorage via composables
- **Lifecycle hooks** för att ladda och spara data

---

## Kom igång

```bash
npm install
npm run dev
```

---

## Grundläggande struktur

Förslag på mappstruktur:

```
src/
├── components/
│   ├── layout/
│   │   ├── DashboardLayout.vue
│   │   ├── AppHeader.vue
│   │   └── AppSidebar.vue
│   ├── ui/
│   │   ├── Card.vue
│   │   ├── Button.vue
│   │   └── Modal.vue
│   └── widgets/
│       ├── TodoWidget.vue
│       ├── WeatherWidget.vue
│       └── StatsWidget.vue
├── composables/
│   ├── useTodos.js
│   └── useLocalStorage.js
└── App.vue
```

---

## Del 1: Layout-komponenter med Slots

### DashboardLayout.vue

Skapa en layout-komponent som använder named slots:

- Named slot för `header`
- Named slot för `sidebar`
- Default slot för main content
- Använd CSS Grid eller Flexbox för layout
- Sidebar ska kunna togglas öppen/stängd (emit event)

**Exempel:**

```vue
<template>
	<div class="dashboard-layout">
		<header>
			<slot name="header"></slot>
		</header>
		<aside :class="{ 'sidebar-open': isSidebarOpen }">
			<slot name="sidebar"></slot>
		</aside>
		<main>
			<slot></slot>
		</main>
	</div>
</template>
```

### Card.vue

Skapa en återanvändbar card-komponent:

- Named slots för `header` och `footer`
- Default slot för content
- Fallback content för header (visa "Card" om inget skickas in)
- Props för styling: `variant` (default, primary, success, danger)

---

## Del 2: Widget-system

Skapa en eller flera av följande widgets som kan användas på ett dashboard:

### TodoWidget.vue

- Gör om eran todo-komponent från förra veckan så att den använder:
- En `useTodos` composable
- Visa lista med todos
- Lägg till nya todos
- Toggle completed status
- Ta bort todos
- Visa antal klara todos (computed property)

### WeatherWidget.vue (enklare variant)

- Hårdkodat väderdata (ingen API än)
- Använd `onMounted()` för att "ladda" data (simulera med timeout)
- Visa loading-state medans data laddas
- Använd Card-komponenten för styling

**Extra för väderwidgeten:**

- Använd ett verkligt väder-API (t.ex. OpenWeatherMap)
- Skapa en `useFetch` composable

### SoundBoard.vue

- Bygg vidare på ljudspelaren som jag satt upp
- Den använder en composable (useSoundEngine.ts) där alla ljud laddas i onMounted
- Triggas med playSound som kan anropas via soundboardet
- Finns också kontroller för delayTime och delayMix där ni kan använda v-model för att uppdatera värden.

---

## Del 3: Composables

### useTodos.js

- `todos` ref (array)
- `addTodo(text)` - lägg till ny todo
- `removeTodo(id)` - ta bort todo
- `toggleTodo(id)` - toggle completed
- `completedCount` - computed property
- Använd `watch()` för att spara till localStorage
- Använd `onMounted()` för att ladda från localStorage

### useLocalStorage.js (Extra)

En generell composable för localStorage:

- `useLocalStorage(key, defaultValue)`
- Returnerar ref som automatiskt synkas med localStorage
- Watch för att spara vid ändringar
- Hantera JSON parsing/stringifying

---

## Del 4: Förslag på hur man skulle kunna sätta ihop allt i App.vue

### App.vue

**Använd komponenterna ni skapat:**

```vue
<template>
	<DashboardLayout>
		<template #header>
			<AppHeader :user="currentUser" @toggle-sidebar="handleToggleSidebar" />
		</template>

		<template #sidebar>
			<AppSidebar :is-open="sidebarOpen" />
		</template>

		<!-- Main content -->
		<div class="widgets-grid">
			<Card>
				<template #header>
					<h3>Mina uppgifter</h3>
				</template>
				<TodoWidget />
			</Card>

			<Card variant="primary">
				<template #header>
					<h3>Väder</h3>
				</template>
				<WeatherWidget />
			</Card>

			<Card variant="success">
				<StatsWidget title="Besökare" :value="1234" icon="👥" />
			</Card>
		</div>
	</DashboardLayout>
</template>
```

## Extra uppgifter (Frivilligt)

- Animationer vid mount/unmount av widgets
- Modal-komponent för inställningar
- Responsive design

---

## Tips och Best Practices

**Komponenter:**

- Håll komponenter små och fokuserade (Single Responsibility)
- Använd props för data nedåt, emits för events uppåt
- Använd slots när innehållet ska vara flexibelt

**Composables:**

- Namnge med `use` prefix
- Returnera refs och funktioner som ett objekt
- Kapsla in all relaterad logik i en composable

**Lifecycle:**

- Använd `onMounted()` för setup (API-anrop, event listeners)
- Använd `onUnmounted()` för cleanup (för att undvika memory leaks)
- Tänk på att komponenter kan monteras/avmonteras flera gånger

**LocalStorage:**

- Använd try/catch vid JSON.parse()
- Validera data som laddas från localStorage
