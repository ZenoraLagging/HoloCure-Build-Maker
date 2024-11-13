<script lang="ts" context="module">
	type Image = {
		sources: {
			avif: string;
			webp: string;
			png: string;
		};
		img: {
			src: string;
			w: number;
			h: number;
		};
	};

	export const images = import.meta.glob<Image>(
		[
			"$lib/images/characters/**/*.png",
			"$lib/images/weapons/**/*.png",
			"$lib/images/stamps/**/*.png",
			"$lib/images/items/**/*.png",
			"$lib/images/stats/*.png",
		],
		{
			query: { enhanced: true },
			import: "default",
			eager: true,
		},
	);
</script>
