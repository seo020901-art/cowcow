// DOM 로딩 후 실행
document.addEventListener('DOMContentLoaded', () => {
    // 1. 스크롤 시 섹션 페이드인 효과 (Intersection Observer)
    const observerOptions = {
        threshold: 0.1, // 10% 보일 때 트리거
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // .section 및 .project-card 요소들을 관찰
    const revealElements = document.querySelectorAll('.section, .project-card, .skill-item');
    revealElements.forEach(el => {
        el.classList.add('reveal'); // 초기 hide 클래스 추가
        observer.observe(el);
    });

    // 2. 네비게이션바 스크롤 시 스타일 변경
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
        } else {
            navbar.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
        }
    });

    // 3. 부드러운 스크롤 (Anchor Link Smooth Scroll) - Polyfill 성격
    // CSS scroll-behavior: smooth가 있지만, 브라우저 호환성 및 추가 제어를 위해
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // 네비게이션 높이만큼 오프셋 조정 (필요 시)
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
