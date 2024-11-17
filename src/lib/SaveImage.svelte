<script lang="ts">
	import { Button } from "./components/ui/button";
	import {
		buildName,
		charSelected,
		equippedItems,
		showBuildName,
	} from "./stores";

	import { domToPng } from "modern-screenshot";

	let item = (el: Node) => {
		if ($equippedItems.length > 0) return true;
		let ignore = document.querySelector("#items-container");
		// let ignore = document.querySelectorAll("#support-label")
		return el != ignore;
	};

	function saveImage() {
		domToPng(
			// document.querySelector("#build-container") as HTMLElement,
			document.querySelector("#build-container") as HTMLElement,
			{ filter: item },
		).then((dataUrl) => {
			const characterSelected = $charSelected ?? "Generic";
			const link = document.createElement("a");
			const name = $showBuildName
				? $buildName != "Build Name" || $buildName !== null
					? $buildName + ".png"
					: characterSelected + " Build.png"
				: characterSelected + " Build.png";
			link.download = name;
			link.href = dataUrl;
			link.click();
		});
	}
</script>

<div id="save-image-container">
	<Button
		class="hover:bg-white"
		variant="secondary"
		id="save-image"
		onclick={saveImage}>Save Image</Button
	>
</div>
