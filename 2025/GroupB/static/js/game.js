// static/js/game.js
document.addEventListener('DOMContentLoaded', () => {
  const image = document.getElementById('phishing-image');
  const resultBox = document.getElementById('result-message');
  const correctSpots = [
    { x: 120, y: 80, radius: 20 },
    { x: 300, y: 150, radius: 20 },
  ];

  image.addEventListener('click', (e) => {
    const rect = image.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let found = false;
    for (let spot of correctSpots) {
      const dx = x - spot.x;
      const dy = y - spot.y;
      if (Math.sqrt(dx * dx + dy * dy) <= spot.radius) {
        found = true;
        showCircle(x, y);
        break;
      }
    }

    if (found) {
      resultBox.textContent = '正解！';
    } else {
      resultBox.textContent = '不正解...';
    }
  });

  function showCircle(x, y) {
    const circle = document.createElement('div');
    circle.className = 'circle';
    circle.style.left = `${x - 20}px`;
    circle.style.top = `${y - 20}px`;

    const container = image.parentElement;
    container.appendChild(circle);

    setTimeout(() => {
      circle.remove();
    }, 1000);
  }
});
