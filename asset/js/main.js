/*Navigation mobile menu*/
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

/*Active navigation*/
const navbar = doc.querySelector('.primary-header')
const navLinks = doc.querySelectorAll(['.nav-link', '.nav-logo', '.link-cta', '.to-top'])

window.addEventListener('scroll', () => {
  const navbarHeight = doc.querySelector('.primary-header').offsetHeight;
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('scrolled-navbar')
  } else {
    navbar.classList.remove('scrolled-navbar')
  }
})
navLinks.forEach((link) => {
  link.addEventListener('click', e => {
    e.preventDefault()

    navLinks.forEach((link) => link.classList.remove('active'))
    link.classList.add('active')

    const target = link.getAttribute('href')
    const duration = 500
    smoothScroll(target, duration)
    overlay.classList.remove("overlay--active");
  })
})

/*Smooth Scrolling*/
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
/*Code for typewriter effects*/
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
  var css = doc.createElement("style")
  css.type = "text/css"
  css.innerHTML = ".typewrite > .wrap { border-right: 0.05em solid #263138}";
  doc.body.appendChild(css)
}

/*Onclick download CV*/
function downloadCV() {
  // Path to your CV file
  const filePath = '/asset/resume/Resume.pdf'; // Update the path accordingly

  // Create an anchor element
  const a = document.createElement('a');
  
  // Set the href attribute to the file path
  a.href = filePath;
  
  // Set the download attribute with the desired file name
  a.download = 'Goboli CV.pdf'; // Update the file name accordingly
  
  // Append the anchor element to the document body
  document.body.appendChild(a);
  
  // Trigger a click on the anchor element
  a.click();
  
  // Remove the anchor element from the document body
  document.body.removeChild(a);
}

//Hover effect on skill items
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

//Auto fit content on screen
const resizeOps = () => {
  document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
};

resizeOps();
window.addEventListener("resize", resizeOps);

//Redirect onclick
function redirectContact() {
  const contactPage = "#contact";

  window.location.href = contactPage;
}