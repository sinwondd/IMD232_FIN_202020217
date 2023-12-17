function navigateToNextPage() {
  // 이동할 다음 페이지
  var nextPageURL = 'next_page.html';

  // 페이지 이동
  window.location.href = nextPageURL;
}
document.addEventListener('DOMContentLoaded', function () {
  const pixelOverlay = document.querySelector('.pixel-overlay');

  function createPixels() {
    for (let i = 0; i < 100; i++) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      pixel.style.top = `${Math.random() * 100}%`;
      pixel.style.left = `${Math.random() * 100}%`;
      pixelOverlay.appendChild(pixel);
    }
  }

  createPixels();
});
