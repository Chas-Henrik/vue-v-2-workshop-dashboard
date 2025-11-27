// composables/useSoundEngine.ts
import { ref, onMounted } from "vue";
import * as Tone from "tone";

interface Sound {
	id: string;
	label: string;
	color: string;
	category: string;
}

export function useSoundEngine() {
	const isLoaded = ref(false);
	const isPlaying = ref<string | null>(null);

	const delayTime = ref(0.25);
	const delayMix = ref(0);

	// ❗ Plain variables, NOT reactive
	let delay: Tone.FeedbackDelay;
	const players: Record<string, Tone.Player> = {};

	const sounds: Sound[] = [
		{ id: "1C", label: "C", color: "purple", category: "notes" },
		{ id: "2D", label: "D", color: "blue", category: "notes" },
		{ id: "3E", label: "E", color: "cyan", category: "notes" },
		{ id: "4G", label: "G", color: "pink", category: "notes" },
		{ id: "5A", label: "A", color: "orange", category: "notes" },
	];

	onMounted(async () => {
		try {
			// Skapa effektkedja först, också utanför reaktivitet
			delay = new Tone.FeedbackDelay({
				delayTime: delayTime.value,
				feedback: 0.5,
				wet: delayMix.value,
			}).toDestination();

			const playerPromises = sounds.map((sound) => {
				return new Promise<void>((resolve, reject) => {
					const player = new Tone.Player({
						url: `/sounds/${sound.id}.mp3`,
						onload: () => resolve(),
						onerror: (err) => reject(err),
					}).connect(delay);

					players[sound.id] = player; // ✅ vanilla object, no Vue Proxy here
				});
			});

			await Promise.all(playerPromises);
			isLoaded.value = true;
			console.log("Alla ljud laddade!");
		} catch (error) {
			console.error("Fel vid laddning av ljud:", error);
		}
	});

	async function playSound(soundId: string) {
		if (!isLoaded.value) {
			console.warn("Ljuden har inte laddats än");
			return;
		}

		try {
			console.log("Starting AudioContext");
			await Tone.start();
			console.log("AudioContext started");

			const player = players[soundId];
			if (!player) {
				console.warn(`Ljud med id '${soundId}' finns inte`);
				return;
			}

			player.start();

			isPlaying.value = soundId;

			player.onstop = () => {
				if (isPlaying.value === soundId) {
					isPlaying.value = null;
				}
			};
		} catch (error) {
			console.error("Fel vid uppspelning:", error);
		}
	}

	function updateDelayTime(value: number) {
		delayTime.value = value;
		if (delay) delay.delayTime.value = value;
	}

	function updateDelayMix(value: number) {
		delayMix.value = value;
		if (delay) delay.wet.value = value;
	}

	return {
		sounds,
		isLoaded,
		isPlaying,
		delayTime,
		delayMix,
		playSound,
		updateDelayTime,
		updateDelayMix,
	};
}
