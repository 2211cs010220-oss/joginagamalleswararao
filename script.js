const cursor = document.querySelector(".cursor");
const canHover = window.matchMedia("(pointer:fine)").matches;

if (canHover) {
  window.addEventListener("pointermove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });
  document.querySelectorAll("a, button, .project-card").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      cursor.style.width = "38px";
      cursor.style.height = "38px";
    });
    item.addEventListener("mouseleave", () => {
      cursor.style.width = "18px";
      cursor.style.height = "18px";
    });
  });
}

document.querySelectorAll(".filter").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    button.classList.add("active");
    const category = button.dataset.filter;
    document.querySelectorAll(".project-card").forEach((card) => {
      card.classList.toggle("hidden", category !== "all" && card.dataset.category !== category);
    });
  });
});

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (!canHover) return;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.querySelector(".project-image").style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${y * -5}deg) scale(.98)`;
  });
  card.addEventListener("pointerleave", () => {
    card.querySelector(".project-image").style.transform = "";
  });
});

document.querySelectorAll(".magnetic").forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    if (!canHover) return;
    const bounds = item.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    item.style.transform = `translate(${x * 0.12}px, ${y * 0.12}px)`;
  });
  item.addEventListener("pointerleave", () => { item.style.transform = ""; });
});
