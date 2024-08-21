<script>
    import Modal from "./Modal.svelte";

    export let text;
    export let title;
    export let src;
</script>

<Modal text={text}>
    <img
        slot="modal-content"
        class="modal-content"
        alt={title}
        {src}
    />
</Modal>
