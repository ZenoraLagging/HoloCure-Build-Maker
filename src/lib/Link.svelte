<script lang="ts">
	import { Buffer } from "buffer";

	import {
		charSelected,
		showBuildName,
		buildName,
		equippedWeapons,
		weaponSlots,
		equippedItems,
		equippedStamps,
		showStamps,
		statPriorityOrder,
		banWeapon,
		itemSlots,
		equippedSupportItem,
		equippedPrism,
		equippedFoodDish,
	} from "$lib/stores";

	import { characters, weapons, items, stamps, stats } from "$lib/variables";
	import { Button } from "./components/ui/button";
	import type { buildsTable } from "./db/schema";
	import SaveImage from "$lib/SaveImage.svelte";
	import { Input } from "$lib/components/ui/input/index.js";
	import toast from "svelte-hot-french-toast";
	type NewBuild = typeof buildsTable.$inferInsert;

	function generateId() {
		let id = "";
		const characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		const charactersLength = characters.length;

		for (let i = 0; i < 8; i++) {
			id += characters.charAt(
				Math.floor(Math.random() * charactersLength),
			);
		}

		return id;
	}

	$: message = "";
	$: copySuccess = false;
	$: oldEncoded = "";
	// save attributes of the build in one long string which will be parsed on load
	function generateLink() {
		message = "Generating link. Please wait...";
		/*
		name = array index
		any boolean = binary
		build name, weapon slots = as is
		all gears, stat priority = array index (convert to empty string if empty slot) -> comma-delimited string
		*/
		const c = characters.indexOf($charSelected);
		const b = +$showBuildName;
		const n = $buildName;
		const l = $weaponSlots;
		const w = $equippedWeapons
			.map((weapon) => weapons.indexOf(weapon))
			.map((i) => (i !== -1 ? i : ""))
			.join(",");
		const wb = +$banWeapon;
		const i = $equippedItems
			.map((item) => items.indexOf(item))
			.map((i) => (i !== -1 ? i : ""))
			.join(",");
		const t = +$showStamps;
		const s = $equippedStamps
			.map((stamp) => stamps.indexOf(stamp))
			.map((i) => (i !== -1 ? i : ""))
			.join(",");
		const a = $statPriorityOrder
			.map((stat) => stats.indexOf(stat))
			.join(",");
		const f = $equippedFoodDish;
		const si = $equippedSupportItem;
		const p = $equippedPrism;

		// place all with its respective key and encode to base64
		const finalEncoded = Buffer.from(
			`c:${c}&b:${b}&n:${n}&l:${l}&w:${w}&wb:${wb}&i:${i}&t:${t}&s:${s}&a:${a}:&f${f}:$si${si}:p${p}`,
		).toString("base64");

		// generate random 8-length alphanumeric string as the key for the Supabase database
		// and to shorten the generated link
		const id = generateId();

		// prevent storing link of the same build consecutively
		if (finalEncoded !== oldEncoded) {
			const build: NewBuild = {
				build_key: id,
				build_string: finalEncoded,
				name: $showBuildName ? $buildName : "",
				character: $charSelected ?? "None",
				weapons: $equippedWeapons,
				weaponSlots: $weaponSlots,
				itemSlots: $itemSlots,
				bannedWeapon: $banWeapon,
				items: $equippedItems,
				stamps: $equippedStamps,
				bannedStamp: $showStamps,
				stats: $statPriorityOrder,
				supportItem: $equippedSupportItem,
				prism: $equippedPrism,
				foodDish: $equippedFoodDish,
			};
			// store link in database
			fetch("/api/set-id", {
				method: "POST",
				body: JSON.stringify(build),
			})
				.then(() => {
					message = `${window.location.protocol}//${window.location.host}/build?id=${id}`;
					copySuccess = false;
					oldEncoded = finalEncoded;
				})
				.catch((error) => {
					toast.error(
						"There was an error generating the link. Try again.",
						{
							icon: "❌",
							style: "color: #fff; background-color: #333;",
						},
					);
					message = "Error!";
					copySuccess = false;
					console.error(error);
				});
		} else {
			toast.error("There was an error generating the link. Try again.", {
				icon: "❌",
				style: "color: #fff; background-color: #333;",
			});
			message = "Error!";
			copySuccess = false;
		}
	}

	function copyToClipboard() {
		navigator.clipboard.writeText(message).then(() => (copySuccess = true));
		toast.success("Successfully copied link!", {
			icon: "✔️",
			style: "color: #fff; background-color: #333;",
		});
	}
</script>

<div class="flex flex-col flex-wrap gap-6">
	{#if message}
		<div>
			<div class="flex flex-row w-full items-center space-x-2">
				<Input value={message} class="text-lg" />
				<Button
					disabled={copySuccess}
					class="material-symbols-outlined w-fit"
					onclick={copyToClipboard}>content_copy</Button
				>
			</div>
		</div>
	{/if}
	<Button
		class="w-64 h-fit p-4 text-2xl hover:bg-white"
		variant="secondary"
		onclick={generateLink}>Generate Link</Button
	>
	<SaveImage />
</div>

<style lang="scss">
	#generated-link {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background-color: var(--dark-bg-color);
		margin: 20px auto;
		padding: 5px 10px 10px 10px;
		width: max-content;
		line-height: 30px;

		div {
			display: flex;
			align-items: center;
			height: 35px;
			margin-left: 10px;

			p {
				padding-bottom: 5px;
				margin-right: 2px;
			}
		}

		.material-symbols-outlined {
			font-weight: bold;

			&:hover {
				cursor: pointer;
				color: white;
			}
		}
	}
</style>
