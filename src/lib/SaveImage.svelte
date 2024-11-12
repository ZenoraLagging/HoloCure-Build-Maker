<script>
	import html2canvas from "html2canvas";
	import FileSaver from "file-saver";

	function saveImage() {
		html2canvas(document.querySelector("#build-container"), {
			scale: 1,
			backgroundColor: "#27272A",
		}).then((canvas) => {
			const ctx = canvas.getContext("2d");
			ctx.mozImageSmoothingEnabled = false;
			ctx.webkitImageSmoothingEnabled = false;
			ctx.msImageSmoothingEnabled = false;
			ctx.imageSmoothingEnabled = false;
			const bldName = document.querySelector("#build-name");
			const fileName =
				bldName !== null ? bldName.textContent : "Build Name";
			canvas.toBlob((blob) => FileSaver.saveAs(blob, `${fileName}.png`));
		});
	}
</script>

<div id="save-image-container">
	<button id="save-image" onclick={saveImage}>Save Image</button>
</div>
