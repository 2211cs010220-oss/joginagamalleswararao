const cards = document.querySelectorAll(".project-card");
cards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    if (!window.matchMedia("(pointer:fine)").matches) return;
    const box = card.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    card.querySelector(".project-visual").style.transform = `perspective(900px) rotateY(${x * 3}deg) rotateX(${y * -3}deg)`;
  });

  const canvas = document.querySelector("#motion-canvas");
  const stage = document.querySelector(".motion-stage");
  const context = canvas?.getContext("2d");
  const pointer = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };

  if (canvas && context && stage) {
    const particles = Array.from({ length: 42 }, (_, index) => ({
      angle: (index / 42) * Math.PI * 2,
      radius: 45 + (index % 7) * 13,
      speed: 0.0015 + (index % 5) * 0.00045,
      size: 1 + (index % 3),
    }));
    let time = 0;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const bounds = stage.getBoundingClientRect();
      canvas.width = bounds.width * ratio;
      canvas.height = bounds.height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      const { width, height } = stage.getBoundingClientRect();
      time += 1;
      pointer.x += (pointer.targetX - pointer.x) * 0.06;
      pointer.y += (pointer.targetY - pointer.y) * 0.06;
      context.clearRect(0, 0, width, height);
      const centerX = width * (0.5 + (pointer.x - 0.5) * 0.12);
      const centerY = height * (0.5 + (pointer.y - 0.5) * 0.12);

      const glow = context.createRadialGradient(centerX, centerY, 8, centerX, centerY, width * 0.7);
      glow.addColorStop(0, "rgba(110,140,255,.25)");
      glow.addColorStop(0.55, "rgba(110,140,255,.04)");
      glow.addColorStop(1, "rgba(11,13,18,0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      context.save();
      context.translate(centerX, centerY);
      context.rotate(time * 0.001);
      for (let ring = 0; ring < 4; ring += 1) {
        context.beginPath();
        context.ellipse(0, 0, 80 + ring * 30, 155 - ring * 17, time * 0.0005 + ring, 0, Math.PI * 2);
        context.strokeStyle = ring % 2 ? "rgba(157,242,200,.3)" : "rgba(110,140,255,.35)";
        context.lineWidth = 1;
        context.stroke();
      }
      particles.forEach((particle) => {
        const angle = particle.angle + time * particle.speed;
        const x = Math.cos(angle) * particle.radius * 1.8;
        const y = Math.sin(angle) * particle.radius * 1.8;
        context.beginPath();
        context.arc(x, y, particle.size, 0, Math.PI * 2);
        context.fillStyle = particle.size > 2 ? "#9df2c8" : "#6e8cff";
        context.fill();
      });
      context.restore();

      context.beginPath();
      for (let x = 0; x <= width; x += 4) {
        const y = height * 0.68 + Math.sin(x * 0.025 + time * 0.035) * 13 + Math.sin(x * 0.008 - time * 0.02) * 18;
        if (x === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.strokeStyle = "rgba(157,242,200,.55)";
      context.lineWidth = 1.5;
      context.stroke();
      requestAnimationFrame(draw);
    };

    stage.addEventListener("pointermove", (event) => {
      const bounds = stage.getBoundingClientRect();
      pointer.targetX = (event.clientX - bounds.left) / bounds.width;
      pointer.targetY = (event.clientY - bounds.top) / bounds.height;
    });
    stage.addEventListener("pointerleave", () => {
      pointer.targetX = 0.5;
      pointer.targetY = 0.5;
    });
    window.addEventListener("resize", resize);
    resize();
    draw();
  }
  card.addEventListener("pointerleave", () => { card.querySelector(".project-visual").style.transform = ""; });
});
