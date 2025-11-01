document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav");
  window.addEventListener("scroll", () => {
    if (window.scrollY == 0) {
      nav.classList.remove("scrolled");
    } else {
      nav.classList.add("scrolled");
    }
  });

  const typewriterElement = document.querySelector(".typewriter");

  if (typewriterElement) {
    const words = JSON.parse(typewriterElement.getAttribute("data-words"));

    const wait = parseInt(typewriterElement.getAttribute("data-wait"), 10);

    new Typewriter(typewriterElement, words, wait);
  }

  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navLinks = document.getElementById("nav-links");

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburgerBtn.classList.toggle("active");
    });
  }
});

class Typewriter {
  constructor(element, words, wait = 2000) {
    this.element = element;
    this.words = words;
    this.wait = wait;
    this.txt = "";
    this.wordIndex = 0;
    this.isDeleting = false;
    this.type();
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];
    let typeSpeed = 200;

    if (this.isDeleting) {
      typeSpeed /= 2; //
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.element.innerHTML = this.txt;

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}
