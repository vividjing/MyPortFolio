/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

/*==================== scroll sections active link ====================*/
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
  /*==================== sticky navbar ====================*/
  let header = document.querySelector("header");

  header.classList.toggle("sticky", window.scrollY > 100);

  /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

/*==================== scroll reveal ====================*/
ScrollReveal({
  // reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .services-container, .portfolio-box, .contact form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

/*==================== typed js ====================*/
const typed = new Typed(".multiple-text", {
  strings: ["Frontend Developer", "React Developer", "Fullstack Developer"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

/*==================== submit message====================*/

const sendData = () => {
  const form = document.getElementById("form");
  const success = document.getElementById("success");
  const fail = document.getElementById("fail");
  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  const data = { name, email, message };
  const jsonData = JSON.stringify(data);

  const url = "https://portfolioapi-nine.vercel.app/api/message";
  const otherPram = {
    headers: { "content-type": "application/json; charset=UTF-8" },
    mode: "cors",
    body: jsonData,
    method: "POST",
  };
  fetch(url, otherPram)
    .then((res) => {
      form.style.display = "none";
      success.style.display = "block";
      fail.style.display = "none";
      return res.json(data);
    })
    .catch((error) => {
      form.style.display = "none";
      success.style.display = "none";
      fail.style.display = "block";
    });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sendData();
});
