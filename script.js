/**
 * IAmBrownProductions — Portfolio
 * Lightbox: click any tile to view it larger, arrow-key / button through
 * the rest of that page's work. Everything here is placeholder-aware —
 * once real photos/videos are wired up (see README.md), this same
 * lightbox will show them instead of the tone gradient.
 */

(function () {
  "use strict";

  function initLightbox() {
    var tiles = Array.prototype.slice.call(
      document.querySelectorAll(".tile[data-lightbox]")
    );
    if (!tiles.length) return;

    var overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.innerHTML =
      '<div class="lightbox-frame">' +
      '<button class="lightbox-close" type="button" aria-label="Close">' +
      iconClose() +
      "</button>" +
      '<button class="lightbox-prev" type="button" aria-label="Previous project">' +
      iconChevron("left") +
      "</button>" +
      '<button class="lightbox-next" type="button" aria-label="Next project">' +
      iconChevron("right") +
      "</button>" +
      '<div class="lightbox-media"></div>' +
      '<div class="lightbox-caption">' +
      "<div>" +
      '<div class="tile-eyebrow" data-lb-eyebrow></div>' +
      '<div class="tile-title" data-lb-title></div>' +
      '<div class="tile-subtitle" data-lb-subtitle></div>' +
      "</div>" +
      "</div>" +
      "</div>";
    document.body.appendChild(overlay);

    var mediaEl = overlay.querySelector(".lightbox-media");
    var eyebrowEl = overlay.querySelector("[data-lb-eyebrow]");
    var titleEl = overlay.querySelector("[data-lb-title]");
    var subtitleEl = overlay.querySelector("[data-lb-subtitle]");
    var closeBtn = overlay.querySelector(".lightbox-close");
    var prevBtn = overlay.querySelector(".lightbox-prev");
    var nextBtn = overlay.querySelector(".lightbox-next");

    var currentIndex = 0;
    var lastFocused = null;

    function render(index) {
      currentIndex = (index + tiles.length) % tiles.length;
      var tile = tiles[currentIndex];
      var tone = (tile.querySelector(".tile-media") || {}).className || "";
      var toneMatch = tone.match(/tone-\d+/);
      mediaEl.className = "lightbox-media" + (toneMatch ? " " + toneMatch[0] : "");
      mediaEl.textContent = tile.getAttribute("data-media") || "Photo / video coming soon";
      eyebrowEl.textContent = tile.getAttribute("data-type") || "";
      titleEl.textContent = tile.getAttribute("data-title") || "";
      subtitleEl.textContent = tile.getAttribute("data-subtitle") || "";
    }

    function open(index) {
      lastFocused = document.activeElement;
      render(index);
      overlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
      closeBtn.focus();
    }

    function close() {
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    }

    tiles.forEach(function (tile, i) {
      tile.addEventListener("click", function () {
        open(i);
      });
    });

    closeBtn.addEventListener("click", close);
    prevBtn.addEventListener("click", function () {
      render(currentIndex - 1);
    });
    nextBtn.addEventListener("click", function () {
      render(currentIndex + 1);
    });
    overlay.addEventListener("click", function (e) {
      if (e.target === overlay) close();
    });
    document.addEventListener("keydown", function (e) {
      if (!overlay.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") render(currentIndex - 1);
      if (e.key === "ArrowRight") render(currentIndex + 1);
    });
  }

  function iconClose() {
    return (
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
      "</svg>"
    );
  }

  function iconChevron(direction) {
    var d = direction === "left" ? "M15 6L9 12L15 18" : "M9 6L15 12L9 18";
    return (
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<path d="' +
      d +
      '" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      "</svg>"
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initLightbox);
  } else {
    initLightbox();
  }
})();
