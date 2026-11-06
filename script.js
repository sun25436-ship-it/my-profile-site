const EMAIL = 'sun25436@gmail.com';

// 스크롤 등장 애니메이션 + 스킬 바 채우기
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    entry.target.querySelectorAll('[data-w]').forEach((bar) => { bar.style.width = bar.dataset.w + '%'; });
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// 현재 섹션에 맞춰 헤더 메뉴 / 하단 탭 활성화
const links = document.querySelectorAll('[data-nav]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((link) => link.classList.toggle('active', link.dataset.nav === entry.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
['about', 'skills', 'projects', 'contact'].forEach((id) => {
  const el = document.getElementById(id);
  if (el) sectionObserver.observe(el);
});

// 이메일 복사
const toast = document.getElementById('toast');
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2000);
}
document.getElementById('copy-email').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(EMAIL);
    showToast('이메일 주소를 복사했어요');
  } catch (e) {
    showToast('복사에 실패했어요. 직접 복사해 주세요');
  }
});

document.getElementById('year').textContent = new Date().getFullYear();
