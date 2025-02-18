let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
  menu.classList.toggle('fa-times');
  navbar.classList.toggle('active');
}

let themeToggler = document.querySelector('.theme-toggler');
let toggleBtn = document.querySelector('.toggle-btn');

toggleBtn.onclick = () =>{
  themeToggler.classList.toggle('active');
}

window.onscroll = () =>{
  menu.classList.remove('fa-times');
  navbar.classList.remove('active');
  themeToggler.classList.remove('active');
}

document.querySelectorAll('.theme-toggler .theme-btn').forEach(btn =>{
  
  btn.onclick = () =>{
    let color = btn.style.background;
    document.querySelector(':root').style.setProperty('--main-color', color);
  }

});

var swiper = new Swiper(".home-slider", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 2,
    slideShadows: true,
  },
  loop:true,
  autoplay:{
    delay: 3000,
    disableOnInteraction:false,
  }
});

var swiper = new Swiper(".review-slider", {
    slidesPerView: 1,
    grabCursor: true,
    loop:true,
    spaceBetween: 10,
    breakpoints: {
      0: {
          slidesPerView: 1,
      },
      700: {
        slidesPerView: 2,
      },
      1050: {
        slidesPerView: 3,
      },    
    },
    autoplay:{
      delay: 5000,
      disableOnInteraction:false,
  }
});

// Function to load reviews from localStorage and display them
function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  const reviewWrapper = document.getElementById('review-wrapper');
  
  reviewWrapper.innerHTML = ""; // Clear existing reviews
  
  reviews.forEach(review => {
      const reviewSlide = document.createElement('div');
      reviewSlide.classList.add('swiper-slide', 'box');
      reviewSlide.style.backgroundColor = review.color;

      reviewSlide.innerHTML = `
          <i class="fas fa-quote-right"></i>
          <div class="user">
              <img src="${review.imageUrl}" alt="Review Image" style="max-width: 100px; max-height: 100px;">
              <div class="user-info">
                  <h3>${review.name}</h3>
                  <span>happy client</span>
              </div>
          </div>
          <p>${review.text}</p>
      `;

      reviewWrapper.appendChild(reviewSlide);
  });
}

// Handle review form submission
document.getElementById('review-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('review-name').value;
  const text = document.getElementById('review-text').value;
  const color = document.getElementById('color-picker').value;
  const image = document.getElementById('review-image').files[0];

  // Create an object to hold the review data
  const review = {
      name,
      text,
      color,
      imageUrl: ''  // Default empty URL
  };

  // If there's an image, upload it locally and set its URL
  if (image) {
      const reader = new FileReader();
      reader.onloadend = function() {
          review.imageUrl = reader.result; // Set the base64 image as URL
          saveReview(review); // Save review to localStorage after image processing
      };
      reader.readAsDataURL(image);
  } else {
      saveReview(review); // Save review if there's no image
  }

  // Clear the form
  document.getElementById('review-name').value = '';
  document.getElementById('review-text').value = '';
});

// Function to save the review to localStorage
function saveReview(review) {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.push(review);
  localStorage.setItem('reviews', JSON.stringify(reviews)); // Save updated reviews

  // Reload the reviews on the page
  loadReviews();
}

// Load reviews on page load
window.addEventListener('load', loadReviews);
