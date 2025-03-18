/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 50,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 
// Add event listeners to "Show More" overlays
document.querySelectorAll('.work__overlay').forEach((overlay, index) => {
    overlay.addEventListener('click', (event) => {
        event.preventDefault();
        const modalId = `#modal${index + 1}`; // Match modal ID with work item index
        document.querySelector(modalId).style.display = 'block';
    });
});

// Close Modal
document.querySelectorAll('.modal__close').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        const modal = item.closest('.modal');
        modal.style.display = 'none';
    });
});

// Close Modal when clicking outside
window.addEventListener('click', event => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});

// Add event listeners to tabs
document.querySelectorAll('.modal__tab').forEach(tab => {
    tab.addEventListener('click', (event) => {
        event.preventDefault();
        const tabType = tab.getAttribute('data-tab');

        // Remove active class from all tabs and code blocks
        document.querySelectorAll('.modal__tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.modal__code').forEach(c => c.classList.remove('active'));

        // Add active class to the clicked tab and corresponding code block
        tab.classList.add('active');
        document.getElementById(`${tabType}-code`).classList.add('active');
    });
});

// Add smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Theme toggle
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'bx-sun';

// Previously selected theme (checking from localStorage)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// Obtain current theme
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';

// Validate if user previously chose a topic
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme);
}

// Activate/deactivate theme manually with button
themeButton.addEventListener('click', () => {
    // Add or remove dark theme / icon
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    // Save theme and current icon that user chose
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

// Loader
document.addEventListener('DOMContentLoaded', function() {
    // Increase this value to make the loading screen stay longer
    // Current value: 15000 milliseconds (15 seconds)
    setTimeout(function() {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.display = 'none';
        }
    }, 30000); // 30 seconds
});

// Animation on scroll
ScrollReveal().reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400
});

ScrollReveal().reveal('.home__title, .section-title', {
    origin: 'left',
    distance: '60px',
    duration: 2500
});

ScrollReveal().reveal('.about__info-item', {
    origin: 'bottom',
    distance: '60px',
    duration: 2500,
    delay: 400,
    interval: 200
});

// Add this to your JavaScript to make the cursor appear only on the active element
function updateTypingState() {
  const elements = [
    document.getElementById('typing-greeting'),
    document.getElementById('typing-name'),
    document.getElementById('typing-profession')
  ];
  
  const delays = [500, 2000, 4000]; // Match these to your CSS animation delays
  const durations = [1000, 1500, 2000]; // Approximate typing durations
  
  elements.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add('active');
      
      setTimeout(() => {
        el.classList.remove('active');
        if (index < elements.length - 1) {
          elements[index + 1].classList.add('active');
        }
      }, durations[index]);
      
    }, delays[index]);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  // Set up typing animations
  const greeting = document.getElementById('typing-greeting');
  const name = document.getElementById('typing-name');
  const profession = document.getElementById('typing-profession');
  
  // Store original text
  const greetingText = greeting.textContent;
  const nameText = name.textContent;
  const professionText = profession.textContent;
  
  // Set data-text attributes
  greeting.setAttribute('data-text', greetingText);
  name.setAttribute('data-text', nameText);
  profession.setAttribute('data-text', professionText);
  
  // Add typing classes
  greeting.classList.add('typing', 'greeting');
  name.classList.add('typing', 'name');
  profession.classList.add('typing', 'profession');
  
  // Update active states for cursor
  updateTypingState();
});