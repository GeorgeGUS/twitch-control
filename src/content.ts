import { debounce } from "es-toolkit/function";

const debounced = debounce((cb: () => void) => {
  cb();
}, 300);

function isSpaceKey(event: KeyboardEvent) {
  return event.code === "Space" || event.key === " ";
}

function isBody(el: HTMLElement) {
  return el.tagName === "BODY";
}

function isInput(el: HTMLElement) {
  return (
    el.tagName === "INPUT" ||
    el.tagName === "TEXTAREA" ||
    el.dataset.aTarget === "tw-input" ||
    el.dataset.aTarget === "chat-input" ||
    el.dataset.testSelector === "chat-input" ||
    el.classList.contains("chat-wysiwyg-input__editor")
  );
}

function dispatchPlayPause() {
  const video = document.querySelector("video");

  video?.paused ? video.play() : video?.pause();
}

function forceControlSpaceKeyPress() {
  document.addEventListener("keydown", (event) => {
    const target = event.target as HTMLElement;
    if (isSpaceKey(event) && !isBody(target) && !isInput(target)) {
      target.blur();
      document.body.focus();
      dispatchPlayPause();
    }
  });
}

function forcePlayOnPlayerClick() {
  let clickCount = 0;
  let debouncedClickCount = 0;

  function resetCounts() {
    clickCount = 0;
    debouncedClickCount = 0;
  }

  function handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (target.closest('[data-a-target="player-overlay-click-handler"]')) {
      clickCount++;

      debounced(() => {
        debouncedClickCount++;

        if (clickCount > debouncedClickCount) {
          resetCounts();
          return;
        }

        dispatchPlayPause();
        resetCounts();
      });
    }
  }

  document.addEventListener("click", handleClick);
}

function main() {
  console.log("twitch-control enabled");
  forceControlSpaceKeyPress();
  forcePlayOnPlayerClick();
}

main();
