//Type writer
let TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  let i = this.loopNum % this.toRotate.length;
  let fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
  let that = this;
  let delta = 200 - Math.random() * 100;
  if (this.isDeleting) { delta /= 2; }
  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }
  setTimeout(function () {
    that.tick()
  }, delta)
}
window.onload = function () {
  const elements = doc.getElementsByClassName('typewrite');
  for (let i = 0; i < elements.length; i++) {
    const toRotate = elements[i].getAttribute('data-type');
    const period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS 
  let css = doc.createElement("style")
  css.type = "text/css"
  css.innerHTML = ".typewrite > .wrap { border-right: 0.05em solid #263138}";
  doc.body.appendChild(css)
}

// Animate on scroll using Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show-fade-animation', 'show-y-axis-animation', 'show-x-axis-right-animation', 'show-x-axis-left-animation', 'show-skill-animation');
      observer.unobserve(entry.target); // Stop observing once the element is visible
      setTimeout(() => {
        entry.target.classList.remove('fade-animation', 'y-axis-animation', 'x-axis-right-animation', 'x-axis-left-animation', 'slide-skill-animation');
      }, 1000); // Set a timeout of 1 second (1000 milliseconds)
    }
  });
});

const animateElements = document.querySelectorAll('.fade-animation, .y-axis-animation, .x-axis-right-animation, .x-axis-left-animation, .slide-skill-animation');
animateElements.forEach((el) => observer.observe(el));

// Onclick download resume
function downloadCV() {
  // Path to your CV file
  const filePath = '/asset/resume/Resume.pdf'; // Update the path accordingly
  // Create an anchor element
  const a = document.createElement('a');
  // Set the href attribute to the file path
  a.href = filePath;
  // Set the download attribute with the desired file name
  a.download = 'Goboli Resume.pdf'; // Update the file name accordingly
  // Append the anchor element to the document body
  document.body.appendChild(a);
  // Trigger a click on the anchor element
  a.click();
  // Remove the anchor element from the document body
  document.body.removeChild(a);
}

// Function to reset form fields
function resetForm() {
  ['name', 'subject', 'email', 'message'].forEach(id => {
    document.getElementById(id).value = '';
  });
};

// Email Js code
emailjs.init('FjMleEN7Kptej6Rej');

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Get form values
    const name = document.getElementById('name').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Use EmailJS to send email
    emailjs.send('service_k84oe4w', 'template_zgokmbr', {
      name,
      subject,
      email,
      message,
    }).then(
      function () {
        //Debugging purpose
        //console.log('Email sent successfully:', response);
        // Clear the input fields
        resetForm();
        // Trigger Sweet Alert Success
        Swal.fire({
          title: "Confirmation",
          text: "Message sent successfully",
          icon: "success"
        });
      },
      function (error) {
        //Debugging purpose
        //console.log('Failed to send email:', error);
        // Trigger Sweet Alert Error
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to send message",
          footer: 'Error: '+ error
        });
      }
    );
  });
});

// Auto fit content on screen
const resizeOps = () => {
  document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
};
resizeOps();
window.addEventListener("resize", resizeOps);

// Navigation mobile menu
const doc = document;
const menuOpen = doc.querySelector(".menu-cta");
const menuClose = doc.querySelector(".close");
const overlay = doc.querySelector(".overlay");

// Toggle menu visibility
const toggleMenu = () => {
  overlay.classList.toggle("overlay--active");
};
// Open menu when menuOpen is clicked
menuOpen.addEventListener("click", toggleMenu);
// Close menu when menuClose is clicked
menuClose.addEventListener("click", toggleMenu);
// Close menu when clicking anywhere outside the menu
doc.addEventListener("click", (event) => {
  const isClickInsideMenu = overlay.contains(event.target) || menuOpen.contains(event.target);
  
  if (!isClickInsideMenu && overlay.classList.contains("overlay--active")) {
    overlay.classList.remove("overlay--active");
  }
});

// Activate Scrollspy
document.addEventListener('DOMContentLoaded', function () {
  const mainScrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: '#navigation'
  });
});

const navbar = document.querySelector('.primary-header')
const navLinks = document.querySelectorAll(['.nav-link', '.nav-logo', '.link-cta', '.to-top'])

window.addEventListener('scroll', () => {
  const navbarHeight = document.querySelector('.primary-header').offsetHeight;
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('scrolled-navbar')
  } else {
    navbar.classList.remove('scrolled-navbar')
  }
})
navLinks.forEach((link) => {
  link.addEventListener('click', e => {
    e.preventDefault()
    const target = link.getAttribute('href')
    const duration = 500
    smoothScroll(target, duration)
    overlay.classList.remove("overlay--active");
  })
})

// Smooth Scrolling
function smoothScroll(target, duration) {
  const targetElement = doc.querySelector(target)
  const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY
  const startPosition = window.scrollY
  const distance = targetPosition - startPosition
  let startTime = null

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const ease = easeInOutCubic(timeElapsed, startPosition, distance, duration)
    window.scrollTo(0, ease)
    if (timeElapsed < duration) requestAnimationFrame(animation)
  }

  function easeInOutCubic(t, b, c, d) {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t * t + b
    t -= 2
    return (c / 2) * (t * t * t + 2) + b
  }
  requestAnimationFrame(animation)
}

// Hover effect on skill items
const skillSet = document.querySelectorAll('.skill-item')
skillSet.forEach((skill, index) => {
  if (index % 2 === 0) {
    skill.style.backgroundColor = 'rgba(68, 89, 100, 0.1)'
  } else {
    skill.style.backgroundColor = 'rgba(68, 89, 100, 0.05)'
    skill.addEventListener('mouseover', () => {
      skill.style.backgroundColor = 'rgba(68, 89, 100, 0.1)'
      skill.style.borderLeft = '0.5px dashed rgba(68, 89, 100, 0.3)'
      skill.style.borderRight = '0.5px dashed rgba(68, 89, 100, 0.3)'
    })
    skill.addEventListener('mouseout', () => {
      skill.style.backgroundColor = 'rgba(68, 89, 100, 0.05)'
      skill.style.borderColor = 'transparent'
    })
  }
})

// Get current year
const year = document.querySelector('.get-year');
year.textContent = new Date().getFullYear();