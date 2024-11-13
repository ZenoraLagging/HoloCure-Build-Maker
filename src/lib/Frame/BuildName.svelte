<script lang="ts">
	import { showBuildName, buildName } from "$lib/stores";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Textarea } from "$lib/components/ui/textarea/index.js";

	const buildNameCharLimit = 99999999;

	function focusHandler(name: string) {
		if (name === "Build Name") {
			$buildName = "";
		}
	}

	function handleChange(name: string) {
		$buildName = name;
	}

	function blurHandler(name: string) {
		// insert placeholder when leaving empty text
		if (!name || name === "\n") {
			$buildName = "Build Name";
		}
	}
</script>

{#if $showBuildName}
	<Textarea
		placeholder=""
		spellcheck="false"
		maxlength={buildNameCharLimit}
		value={$buildName}
		onkeyup={(e: any) => {
			const target = e.target as HTMLTextAreaElement;
			target.style.height = "0px";
			target.style.height = target.scrollHeight + "px";
			handleChange(e.currentTarget.value);
		}}
		ref={(textarea: any) => {
			if (textarea) {
				textarea.style.height = "0px";
				textarea.style.height = textarea.scrollHeight + "px";
			}
		}}
		onfocus={(e: any) => focusHandler(e.currentTarget.value)}
		onblur={(e: any) => blurHandler(e.currentTarget.value)}
		class="text-3xl lg:text-5xl break-all text-left lg:text-center border-none overflow-hidden min-h-16 h-16 bg-opacity-0 z-50"
	/>
{/if}
