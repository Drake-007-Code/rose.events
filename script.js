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
  e.preventDefault();

  // Get the review data from the form
  const name = document.getElementById('review-name').value;
  const text = document.getElementById('review-text').value;

  // Send review data to the server
  fetch('/submit-review', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, text })
  })
  .then(response => response.json())
  .then(data => {
      console.log(data.message); // Show a success message if needed
      // Add the new review to the page
      const reviewWrapper = document.getElementById('review-wrapper');
      const reviewSlide = document.createElement('div');
      reviewSlide.classList.add('swiper-slide', 'box');

      reviewSlide.innerHTML = `
          <i class="fas fa-quote-right"></i>
          <div class="user">
              <img src="images/pic-1.png" alt="">
              <div class="user-info">
                  <h3>${name}</h3>
                  <span>happy client</span>
              </div>
          </div>
          <p>${text}</p>
      `;

      // Append the new review to the swiper wrapper
      reviewWrapper.appendChild(reviewSlide);

      // Clear the form
      document.getElementById('review-name').value = '';
      document.getElementById('review-text').value = '';
  })
  .catch(error => console.error('Error submitting review:', error));
});
