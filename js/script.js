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

document.getElementById('review-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent the default form submission

    // Get the form data
    const name = document.getElementById('review-name').value;
    const text = document.getElementById('review-text').value;
    const image = document.getElementById('review-image').files[0];
    const color = document.getElementById('color-picker').value;

    // Read the image file as a data URL
    const reader = new FileReader();
    reader.onload = function(event) {
        const imageUrl = event.target.result;

        // Create a review object
        const review = {
            name: name,
            text: text,
            image: imageUrl,
            color: color
        };

        // Get existing reviews from localStorage
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

        // Add the new review to the array
        reviews.push(review);

        // Save the updated reviews array to localStorage
        localStorage.setItem('reviews', JSON.stringify(reviews));

        // Update the review section
        displayReviews();
    };
    reader.readAsDataURL(image);
});

function displayReviews() {
    const reviewWrapper = document.getElementById('review-wrapper');
    reviewWrapper.innerHTML = ''; // Clear existing reviews

    // Get reviews from localStorage
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

    // Create review elements for each review
    reviews.forEach(review => {
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('swiper-slide');
        reviewElement.style.backgroundColor = review.color;

        const reviewContent = `
            <div class="review-content">
                <img src="${review.image}" alt="Review Image">
                <h3>${review.name}</h3>
                <p>${review.text}</p>
            </div>
        `;
        reviewElement.innerHTML = reviewContent;
        reviewWrapper.appendChild(reviewElement);
    });

    // Reinitialize the swiper
    new Swiper('.review-slider', {
        loop: true,
        grabCursor: true,
        spaceBetween: 20,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
}

// Display reviews on page load
document.addEventListener('DOMContentLoaded', displayReviews);