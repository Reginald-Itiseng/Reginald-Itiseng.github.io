document.querySelectorAll(".entries-grid .archive__item").forEach((card) => {
  const externalLink = card.querySelector(".archive__item-title a[href^='http']");

  if (!externalLink) {
    return;
  }

  card.classList.add("archive__item--external-link");
  card.setAttribute("role", "link");
  card.tabIndex = 0;

  const openExternalLink = () => {
    window.location.href = externalLink.href;
  };

  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      return;
    }

    openExternalLink();
  });

  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    openExternalLink();
  });
});
