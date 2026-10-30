const cards = document.querySelectorAll(".project-card");
cards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    const box = card.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    card.querySelector(".project-visual").style.transform = `perspective(900px) rotateY(${x * 3}deg) rotateX(${y * -3}deg)`;
  });
  card.addEventListener("pointerleave", () => { card.querySelector(".project-visual").style.transform = ""; });
});
