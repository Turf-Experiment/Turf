
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Header fixed top on scroll
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop
    let nextElement = selectHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('fixed-top')
        nextElement.classList.add('scrolled-offset')
      } else {
        selectHeader.classList.remove('fixed-top')
        nextElement.classList.remove('scrolled-offset')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();


  // Get the current date and format it as YYYY-MM-DD for the date input field
  let today = new Date();
  let month = today.getMonth() + 1;
  let day = today.getDate();
  let year = today.getFullYear();
  let formattedDate = year + '-' + month.toString().padStart(2, '0') + '-' + day.toString().padStart(2, '0');

  // Set the default value of the date input field to today's date
  document.getElementById("date").value = formattedDate;

  

  const dateInput = document.getElementById('date');
  const today1 = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today1);


  




  

// Function to check turf availability
function checkAvailability(turfDiv) {
  // Get the small tag containing the time and availability information
  const smallTag = turfDiv.nextElementSibling;

  // Check if the small tag contains the word "unavailable"
  if (smallTag.innerHTML.includes('unavailable')) {
    return false;
  } else {
    return true;
  }
}


/* time 




function disablePastTime() {
  var now = new Date();
  var hour = now.getHours();
  var minute = now.getMinutes();
  var ampm = hour >= 12 ? 'PM' : 'AM'; // Check if the current time is AM or PM

  var timeSlots = document.getElementsByName("timeslot");
  for (var i = 0; i < timeSlots.length; i++) {
    var time = timeSlots[i].getAttribute("value");
    var timeArray = time.split(":");
    var slotHour = parseInt(timeArray[0]);
    var slotMinute = parseInt(timeArray[1]);
    var slotAmPm = slotHour >= 12 ? 'PM' : 'AM'; // Extract the AM/PM value from the time slot

    // Convert slotHour to 24-hour format if it's PM
    if (slotAmPm == 'PM' && slotHour != 12) {
      slotHour += 12;
    }

    if ((slotHour < hour || (slotHour == hour && slotMinute < minute)) ) {
      timeSlots[i].setAttribute("disabled", "disabled");
    }
  }
}


disablePastTime();

*/








/*popup

*/



const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent the default form submission
  
  // Get the form data
  const formData = new FormData(event.target);
  
  // Build the message to display
  let message="Hi! Your booking has been confirmed. <br><br>" ;
  message += "Turf Name: " + formData.get("bookingId") + "<br>";
  message += "Name: " + formData.get("name") + "<br>";
  message += "Phone Number: " + formData.get("phone") + "<br>";
  message += "Date: " + formData.get("date") + "<br>";
  message += "Time Slot: " + formData.get("timeslot") + "<br>";
  
  // Create a new div element to hold the pop-up content
  const popupDiv = document.createElement("div");
  popupDiv.classList.add("popup");

  // Create a new p element to display the message
  const messageElement = document.createElement("p");
  messageElement.innerHTML = message;

  // Create a new button element to close the pop-up
  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  
  closeButton.addEventListener("click", function() {
    // Remove the popup and the background elements from the DOM
    document.body.removeChild(popupBackground);
    document.body.removeChild(popupDiv);
    // Redirect to index page
  location.href = "types.html";
  });

  // Add the message and close button to the popup div
popupDiv.appendChild(messageElement);
popupDiv.appendChild(closeButton);

// Create a new div element for the popup background
const popupBackground = document.createElement("div");
popupBackground.classList.add("popup-background");

// Add the popup div and the background div to the page
document.body.appendChild(popupBackground);
document.body.appendChild(popupDiv);
});


















/* to select time slot */



var radioButtons = document.querySelectorAll('input[type=radio]');
  radioButtons.forEach(function(radioButton) {
    radioButton.clickCount = 0;
    radioButton.addEventListener('click', function(event) {
      this.clickCount++;
      if (this.clickCount % 2 === 0) {
        this.checked = false;
        this.clickCount = 0;
      }
    });
  });


/* heading */

function setTurfName(turfName) {
  // Add the turf name as a parameter to the booking page URL
  var bookingUrl = "booking.html?turf=" + encodeURIComponent(turfName);
  // Redirect to the booking page with the turf name parameter
  window.location.href = bookingUrl;
}

// Retrieve the turf name parameter from the URL
var urlParams = new URLSearchParams(window.location.search);
var turfName = urlParams.get('turf');

// Use the turf name as desired (e.g. display it on the page)
document.getElementById("turf-name").innerHTML = turfName;





/* turf details */





})()