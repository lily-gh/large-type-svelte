<script>
    export let text;

    let showModal = false;

    function openModal() {
        showModal = true;
    }

    function closeModal() {
        showModal = false;
    }
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<a href="" on:click|preventDefault={openModal}>{text}</a>

{#if showModal}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="modal" on:click={closeModal}>
        <span class="close-modal" on:click={closeModal}>&times;</span>
        <slot name="modal-content" ></slot>
    </div>
{/if}

<style>
    /* The Modal (background) */
    .modal {
        position: fixed;
        /* Stay in place */
        z-index: 1;
        /* Sit on top */
        padding-top: 100px;
        /* Location of the box */
        left: 0;
        top: 0;
        width: 100%;
        /* Full width */
        height: 100%;
        /* Full height */
        overflow: auto;
        /* Enable scroll if needed */
        background-color: rgb(0, 0, 0);
        /* Fallback color */
        background-color: rgba(0, 0, 0, 0.9);
        /* Black w/ opacity */
    }

    /* Modal Content */

    :global(.modal-content) {
        margin: auto;
        display: block;
        width: 80%;
        max-width: 700px;
    }

    /* Add Animation */
    :global(.modal-content) {
        -webkit-animation-name: zoom;
        -webkit-animation-duration: 0.6s;
        animation-name: zoom;
        animation-duration: 0.6s;
    }

    @-webkit-keyframes zoom {
        from {
            -webkit-transform: scale(0);
        }

        to {
            -webkit-transform: scale(1);
        }
    }

    @keyframes zoom {
        from {
            transform: scale(0);
        }

        to {
            transform: scale(1);
        }
    }

    /* The Close Button */
    .close-modal {
        position: absolute;
        top: 15px;
        right: 35px;
        color: #f1f1f1;
        font-size: 40px;
        font-weight: bold;
        transition: 0.3s;
    }

    .close-modal:hover,
    .close-modal:focus {
        color: #bbb;
        text-decoration: none;
        cursor: pointer;
    }

    /* 100% Image Width on Smaller Screens */
    @media only screen and (max-width: 700px) {
        :global(.modal-content) {
            width: 100%;
        }
    }
</style>
