<script>
    import Modal from "./Modal.svelte";
    import JsBarcode from "jsbarcode";

    export let barcodeText;

    let barcodeElement;

    // generates barcode as soon as the element is rendered on screen
    $: if (barcodeElement) {
        generateBarcode();
    }

    function generateBarcode() {
        try {
            JsBarcode(barcodeElement, barcodeText);
        } catch (error) {
            console.error("Error generating barcode:", error);
            barcodeText = "Error generating barcode";
            generateBarcode();
        }
    }
</script>

<Modal text="Barcode">
    <div slot="modal-content" class="barcode-container">
        <svg class="modal-content" bind:this={barcodeElement}></svg>
    </div>
</Modal>

<style>
    .barcode-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
