import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { buildName, charSelected, equippedFoodDish, equippedItems, equippedPrism, equippedStamps, equippedSupportItem, equippedWeapons, itemSlots, resetItemSlots, resetStampSlots, resetWeaponSlots, statPriorityOrder, weaponSlots } from "./stores";

/**
 * @param {unknown[]} inputs
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function decodeBuild(buildStr: string) {
	// if (data.success) {
	// 	// decode string
	// 	const buildStr = data.build;
	// 	const buildString = Buffer.from(
	// 		buildStr.build_string,
	// 		"base64",
	// 	).toString("utf8");

	// 	/*
	// 	c = character
	// 	b = show build name
	// 	n = build name
	// 	l = weapon slot #
	// 	w = weapons
	// 	i = items
	// 	t = show stamps
	// 	s = stamps
	// 	a = stats
	// 	*/

	// 	// separate build attributes
	// 	const matches = buildString.match(/(?<=&|^).+?(?=&|$)/g);
	// 	const keys = [
	// 		"c",
	// 		"b",
	// 		"n",
	// 		"l",
	// 		"w",
	// 		"i",
	// 		"t",
	// 		"s",
	// 		"a",
	// 		"f",
	// 		"si",
	// 		"p",
	// 	];
	// 	const nonInteger = ["wb", "n", "w", "i", "s", "a"]; // the rest are boolean
	// 	const build = {};

	// 	if (matches) {
	// 		// store param in object
	// 		for (let i = 0; i < matches.length; i++) {
	// 			const keyValue = matches[i].split(":");

	// 			// stop loop once abnormal attributes are detected
	// 			if (keyValue.length !== 2 && !keys.includes(keyValue[0])) break;

	// 			const key = keyValue[0];
	// 			// parse integer values
	// 			const value = nonInteger.includes(key)
	// 				? keyValue[1]
	// 				: parseInt(keyValue[1]);
	// 			build[key] = value;
	// 		}

	// 		// character
	// 		if ("c" in build) charSelected.set(characters[build["c"]]);
	// 		// show build name
	// 		if ("b" in build) showBuildName.set(Boolean(build["b"]));
	// 		// build name
	// 		if ("n" in build) buildName.set(build["n"]);
	// 		// weapon slot #
	// 		if ("l" in build && build["l"] >= 1 && build["l"] <= 6) {
	// 			weaponSlots.set(build["l"]);
	// 			equippedWeapons.set(Array(build["l"] - 1).fill(""));
	// 			weaponAddSymbols.set(Array(build["l"] - 1).fill("add"));
	// 		}
	// 		// weapons
	// 		if ("wb" in build) banWeapon.set(Boolean(!build["wb"]));
	// 		if (
	// 			"w" in build &&
	// 			build["w"]
	// 				.split(",")
	// 				.every(
	// 					(i) =>
	// 						(parseInt(i) >= 0 &&
	// 							parseInt(i) <= weapons.length - 1) ||
	// 						i === "",
	// 				)
	// 		) {
	// 			const indices = build["w"].split(",");
	// 			// filter first to remove empty elements
	// 			const collabAmount = indices
	// 				.filter((i) => i)
	// 				.map(
	// 					(i) =>
	// 						i >= collabWeapons.length - 1 &&
	// 						i <= weapons.length - 1,
	// 				).length;
	// 			// remove elemnts based on weapon slot amount
	// 			indices.splice($weaponSlots - 1);
	// 			// remove collab in rightmost slot if breaking collab limit
	// 			if (collabAmount >= $weaponSlots)
	// 				indices[indices.length - 1] = "";

	// 			equippedWeapons.set(
	// 				indices
	// 					.map((i) => weapons[parseInt(i)])
	// 					.map((i) => (i ? i : "")),
	// 			);
	// 			weaponAddSymbols.set(
	// 				indices.map((i) => (i === "" ? "add" : "")),
	// 			);
	// 			collabLimit.set($weaponSlots - 2);
	// 			removeWeapon.set(true);
	// 		}
	// 		// items
	// 		if (
	// 			"i" in build &&
	// 			build["i"]
	// 				.split(",")
	// 				.every(
	// 					(i) =>
	// 						(parseInt(i) >= 0 &&
	// 							parseInt(i) <= items.length - 1) ||
	// 						i === "",
	// 				)
	// 		) {
	// 			const indices = build["i"].split(",");
	// 			equippedItems.set(
	// 				indices
	// 					.map((i) => items[parseInt(i)])
	// 					.map((i) => (i ? i : "")),
	// 			);
	// 			itemAddSymbols.set(indices.map((i) => (i === "" ? "add" : "")));
	// 			removeItem.set(true);
	// 		}
	// 		// show stamps
	// 		if ("t" in build) showStamps.set(Boolean(build["t"]));
	// 		// stamps
	// 		if (
	// 			"s" in build &&
	// 			build["s"]
	// 				.split(",")
	// 				.every(
	// 					(i) =>
	// 						(parseInt(i) >= 0 &&
	// 							parseInt(i) <= items.length - 1) ||
	// 						i === "",
	// 				)
	// 		) {
	// 			const indices = build["s"].split(",");
	// 			equippedStamps.set(
	// 				indices
	// 					.map((i) => stamps[parseInt(i)])
	// 					.map((i) => (i ? i : "")),
	// 			);
	// 			stampAddSymbols.set(
	// 				indices.map((i) => (i === "" ? "add" : "")),
	// 			);
	// 			removeStamp.set(true);
	// 		}
	// 		// stat priority
	// 		if (
	// 			"a" in build &&
	// 			build["a"]
	// 				.split(",")
	// 				.every(
	// 					(i) =>
	// 						parseInt(i) >= 0 && parseInt(i) <= stats.length - 1,
	// 				)
	// 		) {
	// 			statPriorityOrder.set(
	// 				build["a"].split(",").map((i) => stats[parseInt(i)]),
	// 			);
	// 			showPriorityOrder.set(true);
	// 		}
	// 		// food
	// 		if ("f" in build) equippedFoodDish.set(build["f"]);
	// 		// support item
	// 		if ("si" in build) equippedSupportItem.set(build["si"]);
	// 		// prism
	// 		if ("p" in build) equippedPrism.set(build["p"]);
	// 	} else {
	// 		resetAll();
	// 	}
	// }
}

export function resetAll() {
		charSelected.set("");
		equippedWeapons.set(Array(5).fill(""));
		weaponSlots.set(6);
		resetWeaponSlots.set(true);

		equippedItems.set(Array(6).fill(""));
		resetItemSlots.set(true);
		itemSlots.set(6);

		equippedStamps.set(Array(3).fill(""));
		resetStampSlots.set(true);

		equippedFoodDish.set("");
		equippedPrism.set("");
		equippedSupportItem.set("");

		buildName.set("Build Name");

		statPriorityOrder.set([]);
}