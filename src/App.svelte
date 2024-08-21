<script>
  import QRModal from "./components/QRModal.svelte";
  import BarcodeModal from "./components/BarcodeModal.svelte";

  let inputText = "*hello!";
  let inputRef;
  $: text = inputText || " ";
  $: charboxFontSize = Math.min(150 / text.length, 30);

  const WELCOME_MSG = "*hello!";

  // adds default message to URL by default
  updateFragment();

  $: allSplit = inputText.length > 0 ? inputText.split(/.*?/u) : [" "];

  function getHtmlChar(char) {
    return char === " " ? "&nbsp;" : char;
  }

  function getClassForChar(char) {
    if (char.match(/[0-9]/i)) {
      return "number";
    } else if (!char.match(/\p{L}/iu)) {
      return "symbol";
    } else {
      return "char";
    }
  }

  function updateText(newText, moveCursorToStart) {
    inputText = newText;
    console.log(`fontS: ${charboxFontSize}`);
    updateTitle();
    updateFragment();

    inputRef.focus();

    if (moveCursorToStart) {
      setTimeout(() => inputRef.setSelectionRange(0, 0), 0);
    }
  }

  function updateFragment() {
    // Don't spam the browser history & strip query strings.
    window.location.replace(
      location.origin + "/#" + encodeURIComponent(inputText),
    );
  }

  function updateTitle() {
    if (!inputText || inputText === WELCOME_MSG) {
      document.title = "Large Type";
    } else {
      document.title = inputText;
    }
  }

  // Runs only once to clear the input when the user types
  // the first character just after the welcome message
  function onKeyDown() {
    console.log("running ONCE");
    if (inputText.indexOf(WELCOME_MSG) !== -1) {
      inputText = "";
    }
  }

</script>

<main>
  <!-- Content -->
  <div class="main">
    <!-- svelte-ignore a11y-invalid-attribute -->
    <span class="inputarea">
      <input
        type="text"
        class="inputbox"
        tabindex="0"
        placeholder="Enter your text here"
        bind:value={inputText}
        bind:this={inputRef}
        on:keydown|once={onKeyDown}
        on:keyup={() => {
          updateFragment();
          updateTitle();
        }}
        on:click|preventDefault|once={() => {}}
      />

      <span class="button-row">
        <a href="" on:click|preventDefault={() => updateText("+49 150 0000 0000")}
          >Phone</a
        >
        <a href="" on:click|preventDefault={() => updateText("Your Name Here")}
          >Name</a
        >
        <a
          href=""
          on:click|preventDefault={() => updateText("@gmail.com", true)}
          >@gmail.com</a
        >
      </span>

      <span class="button-row">
        <QRModal
          text="LinkedIn"
          src="./linkedin-qr.png"
          title="Linkedin QR Code"
        />
        <QRModal
          text="Instagram"
          src="./instagram-qr.png"
          title="Instagram QR Code"
        />
        <QRModal
          text="Telegram"
          src="./telegram-qr.png"
          title="Telegram QR Code"
        />
        <QRModal
          text="WhatsApp"
          src="./whatsapp-qr.png"
          title="WhatsApp QR Code"
        />
      </span>

      <span class="button-row">
        <a
          href=""
          class="js-phone-button"
          on:click|preventDefault={() => updateText("")}>Blank</a
        >

        <BarcodeModal barcodeText={inputText} />
      </span>
    </span>

    <ul class="text">
      {#each allSplit as c, i (i)}
        <li class="charbox">
          <span
            style="font-size: {charboxFontSize}vw;"
            class={getClassForChar(c)}>{@html getHtmlChar(c)}</span
          >
        </li>
      {/each}
    </ul>

    <span class="about">
      View code on <a
        href="https://github.com/lily-gh/large-type-svelte-public"
        target="_blank">GitHub</a
      >
    </span>
  </div>
</main>
