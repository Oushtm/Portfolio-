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

// Project Data
const projectData = {
    calculator: {
        description: `
            <div class="project-description">
                <h2>Modern Calculator</h2>
                <p>A modern calculator application built with HTML, CSS, and JavaScript. Features a clean user interface, supports basic arithmetic operations, and includes keyboard input functionality.</p>
                
                <h3>Features</h3>
                <ul>
                    <li>Basic arithmetic operations (add, subtract, multiply, divide)</li>
                    <li>Keyboard input support</li>
                    <li>Responsive design</li>
                    <li>Clear and elegant UI</li>
                </ul>

                <h3>Technical Details</h3>
                <ul>
                    <li>Built with pure HTML, CSS, and JavaScript</li>
                    <li>Responsive grid layout</li>
                    <li>Event handling for both mouse and keyboard</li>
                    <li>Error handling and input validation</li>
                </ul>
            </div>
        `,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Calculator</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="calculator">
        <div class="display">
            <input type="text" id="result" readonly>
        </div>
        <div class="buttons">
            <button class="clear">C</button>
            <button class="operator">%</button>
            <button class="operator">÷</button>
            <button class="operator">×</button>
            <button class="number">7</button>
            <button class="number">8</button>
            <button class="number">9</button>
            <button class="operator">-</button>
            <button class="number">4</button>
            <button class="number">5</button>
            <button class="number">6</button>
            <button class="operator">+</button>
            <button class="number">1</button>
            <button class="number">2</button>
            <button class="number">3</button>
            <button class="equals">=</button>
            <button class="number zero">0</button>
            <button class="decimal">.</button>
        </div>
    </div>
</body>
</html>`,
        css: `/* Calculator Styles */
:root {
    --bg-color: #1c1c1c;
    --display-bg: #333;
    --btn-bg: #2d2d2d;
    --btn-hover: #404040;
    --text-color: #fff;
    --operator-color: #ff002b;
    --equals-color: #2ecc71;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: var(--bg-color);
}

.calculator {
    background: var(--bg-color);
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 0 30px rgba(0,0,0,0.3);
}

.display input {
    width: 100%;
    height: 60px;
    background: var(--display-bg);
    border: none;
    border-radius: 10px;
    color: var(--text-color);
    text-align: right;
    padding: 0 20px;
    font-size: 24px;
    margin-bottom: 20px;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

button {
    padding: 15px;
    border: none;
    border-radius: 10px;
    background: var(--btn-bg);
    color: var(--text-color);
    font-size: 18px;
    cursor: pointer;
    transition: all 0.3s ease;
}

button:hover {
    background: var(--btn-hover);
    transform: translateY(-2px);
}

.operator {
    background: var(--operator-color);
}

.equals {
    background: var(--equals-color);
    grid-row: span 2;
}

.zero {
    grid-column: span 2;
}`,
        javascript: `// Calculator functionality
document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('result');
    const buttons = document.querySelectorAll('button');
    
    let currentCalculation = '';
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            
            if (value === 'C') {
                clearDisplay();
            } else if (value === '=') {
                calculateResult();
            } else {
                appendValue(value);
            }
        });
    });
    
    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key.match(/[0-9]/) || ['+', '-', '*', '/', '.'].includes(e.key)) {
            appendValue(e.key);
        } else if (e.key === 'Enter') {
            calculateResult();
        } else if (e.key === 'Escape') {
            clearDisplay();
        }
    });
    
    function appendValue(value) {
        currentCalculation += value;
        display.value = currentCalculation;
    }
    
    function calculateResult() {
        try {
            const result = eval(currentCalculation);
            display.value = result;
            currentCalculation = result.toString();
        } catch (error) {
            display.value = 'Error';
            currentCalculation = '';
        }
    }
    
    function clearDisplay() {
        currentCalculation = '';
        display.value = '';
    }
});`
    },
    login: {
        description: `
            <div class="project-description">
                <h2>Modern Login Interface</h2>
                <p>A modern and secure login interface built with HTML, CSS, and JavaScript. Features form validation, password visibility toggle, and modern UI effects.</p>
                
                <h3>Features</h3>
                <ul>
                    <li>Real-time form validation</li>
                    <li>Password visibility toggle</li>
                    <li>Remember me functionality</li>
                    <li>Modern glassmorphism design</li>
                    <li>Responsive layout</li>
                </ul>

                <h3>Technical Details</h3>
                <ul>
                    <li>Built with HTML5, CSS3, and JavaScript</li>
                    <li>Local storage for remember me</li>
                    <li>CSS animations and transitions</li>
                    <li>Input validation patterns</li>
                </ul>
            </div>
        `,
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Login</title>
    <link rel="stylesheet" href="styles.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
    <div class="login-container">
        <form class="login-form" id="loginForm">
            <h2>Welcome Back</h2>
            
            <div class="input-group">
                <input type="email" id="email" required>
                <label>Email</label>
                <i class='bx bx-envelope'></i>
                <span class="error-message"></span>
            </div>

            <div class="input-group">
                <input type="password" id="password" required>
                <label>Password</label>
                <i class='bx bx-lock-alt'></i>
                <i class='bx bx-show toggle-password'></i>
                <span class="error-message"></span>
            </div>

            <div class="remember-forgot">
                <label>
                    <input type="checkbox" id="remember"> Remember me
                </label>
                <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" class="login-button">
                <span>Login</span>
                <i class='bx bx-right-arrow-alt'></i>
            </button>

            <div class="register-link">
                <p>Don't have an account? <a href="#">Register</a></p>
            </div>
        </form>
    </div>
</body>
</html>`,
        css: `/* Modern Login Styles */
:root {
    --primary-color: #ff002b;
    --text-color: #fff;
    --bg-color: #1c1c1c;
    --input-color: rgba(255, 255, 255, 0.1);
    --error-color: #e74c3c;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: var(--bg-color);
}

.login-container {
    width: 100%;
    max-width: 400px;
    padding: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    backdrop-filter: blur(10px);
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
}

.login-form h2 {
    text-align: center;
    font-size: 2em;
    color: var(--text-color);
    margin-bottom: 30px;
}

.input-group {
    position: relative;
    margin: 30px 0;
}

.input-group input {
    width: 100%;
    padding: 10px 10px 10px 35px;
    background: var(--input-color);
    border: none;
    border-radius: 5px;
    color: var(--text-color);
    font-size: 1em;
    outline: none;
    transition: 0.3s;
}

.input-group label {
    position: absolute;
    left: 35px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-color);
    pointer-events: none;
    transition: 0.3s;
}

.input-group input:focus ~ label,
.input-group input:valid ~ label {
    top: -10px;
    left: 10px;
    font-size: 0.8em;
    color: var(--primary-color);
}

.input-group i {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-color);
    font-size: 1.2em;
}

.toggle-password {
    left: auto !important;
    right: 10px;
    cursor: pointer;
}

.login-button {
    width: 100%;
    padding: 12px;
    background: var(--primary-color);
    color: var(--text-color);
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    transition: 0.3s;
}

.login-button:hover {
    background: #cc0023;
    transform: translateY(-2px);
}`,
        javascript: `// Login functionality
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.querySelector('.toggle-password');
    const rememberMe = document.getElementById('remember');

    // Check for saved credentials
    const savedEmail = localStorage.getItem('savedEmail');
    const savedPassword = localStorage.getItem('savedPassword');
    
    if (savedEmail && savedPassword) {
        emailInput.value = savedEmail;
        passwordInput.value = savedPassword;
        rememberMe.checked = true;
    }

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePassword.classList.toggle('bx-show');
        togglePassword.classList.toggle('bx-hide');
    });

    // Form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Show loading state
            const submitButton = loginForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Logging in...';
            submitButton.disabled = true;

            // Simulate API call
            setTimeout(() => {
                if (rememberMe.checked) {
                    localStorage.setItem('savedEmail', emailInput.value);
                    localStorage.setItem('savedPassword', passwordInput.value);
                } else {
                    localStorage.removeItem('savedEmail');
                    localStorage.removeItem('savedPassword');
                }

                // Show success message
                alert('Login successful!');
                
                // Reset form
                loginForm.reset();
                
                // Restore button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        }
    });

    function validateForm() {
        let isValid = true;
        
        // Validate email
        if (!emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            hideError(emailInput);
        }

        // Validate password
        if (passwordInput.value.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters');
            isValid = false;
        } else {
            hideError(passwordInput);
        }

        return isValid;
    }

    function showError(input, message) {
        const errorElement = input.parentElement.querySelector('.error-message');
        errorElement.textContent = message;
        errorElement.style.opacity = '1';
        input.classList.add('error');
    }

    function hideError(input) {
        const errorElement = input.parentElement.querySelector('.error-message');
        errorElement.style.opacity = '0';
        input.classList.remove('error');
    }
});`
    }
};

// Modal functionality
function openModal(projectId) {
    const modal = document.getElementById('projectModal');
    const project = projectData[projectId];
    
    // Set content for each tab
    document.querySelector('#description').innerHTML = project.description;
    document.querySelector('#html code').textContent = project.html;
    document.querySelector('#css code').textContent = project.css;
    document.querySelector('#javascript code').textContent = project.javascript;
    
    // Apply syntax highlighting
    Prism.highlightAll();
    
    // Show first tab by default
    switchTab('description');
    
    // Show modal
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('projectModal').style.display = 'none';
}

function switchTab(tabName) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.modal__tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.modal__code').forEach(content => {
        content.classList.remove('active');
    });
    
    // Add active class to selected tab and content
    document.querySelector(`.modal__tab[onclick*="${tabName}"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact__form');
    const lastCommentName = document.getElementById('lastCommentName');
    const lastCommentDate = document.getElementById('lastCommentDate');
    const lastCommentMessage = document.getElementById('lastCommentMessage');

    // Load last comment from localStorage if it exists
    const loadLastComment = () => {
        const lastComment = JSON.parse(localStorage.getItem('lastComment'));
        if (lastComment) {
            lastCommentName.textContent = lastComment.name;
            lastCommentDate.textContent = lastComment.date;
            lastCommentMessage.textContent = lastComment.message;
        }
    };

    // Call loadLastComment when page loads
    loadLastComment();

    // Handle form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Create comment object
        const comment = {
            name: name,
            email: email,
            message: message,
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        // Save to localStorage
        localStorage.setItem('lastComment', JSON.stringify(comment));

        // Update display
        lastCommentName.textContent = comment.name;
        lastCommentDate.textContent = comment.date;
        lastCommentMessage.textContent = comment.message;

        // Show success message
        alert('Message sent successfully!');

        // Reset form
        contactForm.reset();
    });
});

/*===== LOAD DIPLOMAS =====*/
function loadDiplomas() {
    const diplomasContainer = document.querySelector('.diplomas__container');
    if (!diplomasContainer) return;

    const diplomas = [
        {
            title: 'High School Diploma',
            subtitle: 'Science Mathematics',
            description: 'Completed with honors in Mathematics and Physics',
            date: '2023',
            icon: 'bx-medal'
        },
        {
            title: 'Web Development Certificate',
            subtitle: 'Front-end Development',
            description: 'Specialized in modern web technologies and frameworks',
            date: '2023',
            icon: 'bx-code-alt'
        },
        {
            title: 'Design Certificate',
            subtitle: 'UI/UX Design',
            description: 'Mastery in creating user-friendly interfaces',
            date: '2023',
            icon: 'bx-palette'
        }
    ];

    diplomasContainer.innerHTML = diplomas.map(diploma => `
        <div class="diplomas__card">
            <i class='bx ${diploma.icon} diplomas__icon'></i>
            <h3 class="diplomas__title">${diploma.title}</h3>
            <h4 class="diplomas__subtitle">${diploma.subtitle}</h4>
            <p class="diplomas__description">${diploma.description}</p>
            <span class="diplomas__date">${diploma.date}</span>
        </div>
    `).join('');
}

// Load diplomas when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadDiplomas();
});