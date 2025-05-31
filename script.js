// Responsive navigation menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav');
const navLinks = document.querySelectorAll('.nav-links a');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});

// Smooth scroll for anchor links
const anchorLinks = document.querySelectorAll('a[href^="#"]');
anchorLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    // Exclude links with href="#" from smooth scrolling
    if (this.getAttribute('href') === '#') {
      e.preventDefault();
      return;
    }
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Back to Top button functionality
const backToTopButton = document.createElement('a');
backToTopButton.setAttribute('href', '#');
backToTopButton.classList.add('back-to-top');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) { // Show button after scrolling 300px
    backToTopButton.classList.add('visible');
  } else {
    backToTopButton.classList.remove('visible');
  }
});

backToTopButton.addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Random Quote Generation
const quotes = [
  { quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { quote: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein" },
  { quote: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson" },
  { quote: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
  { quote: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { quote: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { quote: "Act as if what you do makes a difference. It does.", author: "William James" },
  { quote: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
  { quote: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" }
];

function displayRandomQuote() {
  const quoteDisplay = document.querySelector('#random-quote-display');
  const loaderElement = quoteDisplay.querySelector('.loader'); // Get the loader element
  const quoteElement = quoteDisplay.querySelector('.quote-text'); // Target the new quote display div
  const authorElement = quoteDisplay.querySelector('.quote-author'); // Target the new quote display div

  if (quoteElement && authorElement && loaderElement) {
    // Hide quote and author, show loader
    quoteElement.style.display = 'none';
    authorElement.style.display = 'none';
    loaderElement.style.display = 'block';

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];

    // Simulate a delay for fetching the quote (optional)
    setTimeout(() => {
      quoteElement.textContent = `"${randomQuote.quote}"`;
      authorElement.textContent = `- ${randomQuote.author}`;

      // Show quote and author, hide loader
      loaderElement.style.display = 'none';
      quoteElement.style.display = 'block';
      authorElement.style.display = 'block';
    }, 500); // Adjust delay time as needed (in milliseconds)
  }
}

// Display a random quote when the 'Get a quote' button is clicked
const getQuoteButton = document.querySelector('.quote-btn'); // Updated selector to match the correct button class
if (getQuoteButton) {
  getQuoteButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default button behavior (like navigating)
    displayRandomQuote();
  });
}

// Display a random quote when the page loads
document.addEventListener('DOMContentLoaded', displayRandomQuote);

// Image Carousel for About Section
const aboutImage = document.querySelector('.about-image img');
const prevBtn = document.querySelector('.about-image .prev-btn');
const nextBtn = document.querySelector('.about-image .next-btn');
const aboutImages = [
  'images/about image.jpeg',
  'images/about image2.jpeg',
  'images/about image3.jpeg',
  'images/about image4.jpeg',
  'images/about image5.jpeg',
  'images/about image6.jpeg',
  'images/about image7.jpeg',
  'images/about image8.jpeg',
  'images/about image9.jpeg',
  'images/about image10.jpeg'
];
let currentImageIndex = 0;

// Function to change image
function showImage(index) {
  if (aboutImage) {
    aboutImage.src = aboutImages[index];
  }
}

// Show initial image
showImage(currentImageIndex);

// Event listener for next button
if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % aboutImages.length;
    showImage(currentImageIndex);
  });
}

// Event listener for previous button
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + aboutImages.length) % aboutImages.length;
    showImage(currentImageIndex);
  });
}

// Keep automatic change image every 4 seconds
function changeAboutImage() {
  currentImageIndex = (currentImageIndex + 1) % aboutImages.length;
  showImage(currentImageIndex);
}
if (aboutImage) { // Check if the image element exists before starting the carousel
  setInterval(changeAboutImage, 4000);
}

// Service Description Display Functionality
document.addEventListener('DOMContentLoaded', function() {
  const serviceButtons = document.querySelectorAll('.service-explore-btn');

  // Handle clicks on Read More buttons
  serviceButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      // Check if this is the photography service button
      const serviceItem = button.closest('.service-item');
      const serviceTitle = serviceItem.querySelector('h3').textContent;
      
      if (serviceTitle === 'Photography & Videography') {
        // Allow default navigation for photography service
        return;
      }
      
      // For all other services, show popup
      e.preventDefault();
      const description = serviceItem.querySelector('.service-description');

      if (description) {
        // Toggle visibility
        description.classList.toggle('show');

        // Change button text based on description visibility
        if (description.classList.contains('show')) {
          button.textContent = 'Close Popup';
        } else {
          button.textContent = 'Read More';
        }
      }
    });
  });
});

// Contact form validation and submission handling
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

if (contactForm && successMessage) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const object = {};
    formData.forEach(function(value, key){
        object[key] = value;
    });
    const json = JSON.stringify(object);

    try {
        const response = await fetch('https://formsubmit.co/ajax/info@legacyagency.online', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        });

        if (response.ok) {
            successMessage.classList.add('show');
            contactForm.reset();
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000); // Hide success message after 5 seconds
        } else {
            // Handle errors, e.g., display a message to the user
            console.error('Form submission failed:', response.statusText);
            alert('There was an error sending your message. Please try again later.');
        }
    } catch (error) {
        console.error('Form submission failed:', error);
        alert('There was an error sending your message. Please try again later.');
    }
  });
}

// Image Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('.image-modal');
    const modalImage = document.querySelector('.modal-image');
    const closeButton = document.querySelector('.close-button');
    const galleryItems = document.querySelectorAll('.gallery-item img');

    // Function to open the modal
    function openModal(imageSrc) {
        modal.style.display = 'block';
        modalImage.src = imageSrc;
    }

    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none';
        modalImage.src = ''; // Clear image source on close
    }

    // Add click event listeners to gallery images
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            openModal(this.src);
        });
    });

    // Add click event listener to the close button
    closeButton.addEventListener('click', closeModal);

    // Close the modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close the modal when pressing the Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
}); 