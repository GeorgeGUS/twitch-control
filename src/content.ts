function isBody(el: HTMLElement) {
  return el.tagName === "BODY";
};

function isTwitchInput(el: HTMLElement) {
  return (
    el.tagName === "INPUT" ||
    el.tagName === "TEXTAREA" ||
    el.dataset.aTarget === "tw-input" ||
    el.dataset.aTarget === "chat-input" ||
    el.dataset.testSelector === "chat-input" ||
    el.classList.contains("chat-wysiwyg-input__editor")
  );
};

function forceControlSpaceKeyPress() {
  document.addEventListener("keydown", (event) => {
    const target = event.target as HTMLElement;
    if (event.code === "Space") {
      if (!isBody(target) && !isTwitchInput(target)) {
        target.blur();
        document.body.focus();
      }
      dispatchEvent(new KeyboardEvent("keypress", { code: "KeyK" }));
    }
  });
}

function main() {
  console.log("twitch-control enabled");
  forceControlSpaceKeyPress();
}

main();
