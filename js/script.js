"use strict";

// Expose scrollToContent globally for the inline onclick handler
window.scrollToContent = function () {
  const firstSection = document.querySelector("section");
  if (firstSection) {
    firstSection.scrollIntoView({ behavior: "smooth" });
  }
};

document.addEventListener("DOMContentLoaded", function () {
  // Moving tech icons
  const movingIcons = document.getElementById("movingIcons");
  const icons = [
    "fa-microchip",
    "fa-wifi",
    "fa-robot",
    "fa-server",
    "fa-cloud",
    "fa-satellite",
    "fa-mobile-alt",
    "fa-code",
  ];

  if (movingIcons) {
    for (let i = 0; i < 20; i++) {
      const icon = document.createElement("i");
      icon.className = `tech-icon fas ${
        icons[Math.floor(Math.random() * icons.length)]
      }`;
      icon.style.left = `${Math.random() * 100}%`;
      icon.style.top = `${Math.random() * 100}%`;
      icon.style.animationDuration = `${10 + Math.random() * 20}s`;
      icon.style.animationDelay = `${Math.random() * 5}s`;
      movingIcons.appendChild(icon);
    }
  }

  // Typing effect
  const typingText = document.querySelector(".typing-text");
  const phrases = [
    "MSc Student in Telecommunication Engineering",
    "AI & IoT Specialist",
    "Cloud & Edge Computing",
    "Back-end Web Developer",
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isEnd = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isEnd = true;
      setTimeout(() => {
        isDeleting = true;
        type();
      }, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(type, 500);
    } else {
      const speed = isDeleting ? 50 : 100;
      setTimeout(type, isEnd ? speed * 2 : speed);
      isEnd = false;
    }
  }

  if (typingText) {
    setTimeout(type, 1000);
  }

  // Scroll animation for sections
  const sections = document.querySelectorAll("section");

  function checkScroll() {
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (sectionTop < windowHeight * 0.75) {
        section.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", checkScroll);
  checkScroll(); // Check on load
});

function scrollCertifications(direction) {
  const container = document.querySelector(".certifications-container");
  const scrollAmount = 320; // Adjust this value based on card width + gap
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: "smooth",
  });
}

// Optional: Auto-scroll for touch devices
let isDown = false;
let startX;
let scrollLeft;
const certificationsContainer = document.querySelector(
  ".certifications-container"
);

certificationsContainer.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - certificationsContainer.offsetLeft;
  scrollLeft = certificationsContainer.scrollLeft;
});

certificationsContainer.addEventListener("mouseleave", () => {
  isDown = false;
});

certificationsContainer.addEventListener("mouseup", () => {
  isDown = false;
});

certificationsContainer.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - certificationsContainer.offsetLeft;
  const walk = (x - startX) * 2;
  certificationsContainer.scrollLeft = scrollLeft - walk;
});
