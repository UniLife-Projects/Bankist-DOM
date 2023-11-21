"use strict";

// Good Practice to have all variables declared at the top

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  // This has been done to prevent page from scrolling up when we click on the 'Open account .nav__link' link
  e.preventDefault();

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Method #001
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

// Method #002
// btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// ////////////////////////////////////////////////////////
// Smooth Scrolling
let btnScrollTo = document.querySelector(".btn--scroll-to");

let section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  // Co-ordinates of elements we wantt to scroll to
  // Rmr that this method getBoundingClientRect() gets co-ords from top-left of page
  // The method is also relative to the current view-port. To notice, scroll and notice change in x or y co-ords
  const section1_Coords = section1.getBoundingClientRect();

  // GEtting Current Page Scroll Co-ords
  let xScroll = window.pageXOffset;
  xScroll = window.scrollX;
  let yScroll = window.pageYOffset;
  yScroll = window.scrollY;

  let ySectionScroll = section1_Coords.top + yScroll;
  let xSectionScroll = section1_Coords.left + xScroll;

  // 🔥 #002 Scroll: All Browsers
  window.scrollTo({
    left: xSectionScroll,
    top: ySectionScroll,
    behavior: "smooth",
  });

  // See Lecture #188 Way Below for More on Smooth Scrolling
  // 🔥 Smooth Scrollin Method #003: Modern Browsers Only
  section1.scrollIntoView({ behavior: "smooth" });
});

// ////////////////////////////////////////////////////////
// Page Navigation

// We'll first implement without page navigation such that we see fault in technic
// If we had 10,000 of these links, we'd create 10,000 of the smae event listening function which would impact performance, this is where Event Delegation Comes In
// document.querySelectorAll(".nav__link").forEach(function (d) {
//   d.addEventListener("click", function (e) {
//     // console.log("LINK");

//     // Preventing the scroll to a section when we click the link
//     e.preventDefault();

//     const id = this.getAttribute("href");
//     // Not good, log to see what it gets you
//     console.log(this.href);

//     console.log(id);

//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

//// LESSON #192: Event Delegation IMplemented HEre (Project)
// Event Delegation
// 1. Add event listener to common parent element
// 2. Determine the originating event element

document.querySelector(".nav__links").addEventListener("click", function (e) {
  // e.target is the element where the event actually happened
  // e.currentTarget is the actual element listening for the event
  console.log(e.target);
  console.log(this);

  console.log(e.target.href);
  // Element listening doesn't have href
  console.log(this.href);

  // Matching Strategy
  if (e.target.classList.contains("nav__link")) {
    const id = this.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// LESSON #194: Building a Tabbed Component (Project)
// TAbbed Component
const tabs = document.querySelectorAll(".operations__tab");

const tabsContainer = document.querySelector(".operations__tab-container");

const tabsContent = document.querySelectorAll(".operations__content");

// Utilizing Event Delegation to listen for Button Tab Click
// Matching Technic: 'closest' [method]
tabsContainer.addEventListener("click", function (e) {
  const eTarget = e.target;
  console.log(eTarget);

  // Getting the button clicked
  // We utilize 'closest' because there are some elements inside of this Button that could be clicked as well 'span'
  const buttonClicked = e.target.closest(".operations__tab");

  // Guard Clause
  if (!buttonClicked) return;
  else {
    // Removing vertical lift from previous element Tab Button

    // Method #001: Jonas
    // tabs.forEach((d) => d.classList.remove("operations__tab--active"));

    // Method #002: 🔴 MY OWN
    const formerActiveTab = document.querySelector(".operations__tab--active");

    formerActiveTab.classList.remove("operations__tab--active");

    // Giving clicked Button a vertical lift
    buttonClicked.classList.add("operations__tab--active");
    console.log(buttonClicked);

    // Removing Inactive Content Area

    // Method #001: Jonas
    // tabsContent.forEach((d) =>
    //   d.classList.remove("operations__content--active")
    // );

    // Method #002: 🔴 MY OWN
    console.log(formerActiveTab);
    document
      .querySelector(`.operations__content--${formerActiveTab.dataset.tab}`)
      .classList.remove("operations__content--active");

    // Activating Content Area
    document
      .querySelector(`.operations__content--${buttonClicked.dataset.tab}`)
      .classList.add("operations__content--active");

    console.log(buttonClicked.dataset.tab);
  }
});

// LESSON #195: Passing ARgumentts to Event Handlers (Project)
// We shall Utilize Event Delegation over the navigator to detect nav link hovers and mouse exits
// This is the container containing all nav links
const nav = document.querySelector(".nav");

// Merges two event listeners
// Function #001
// const handleNavHover = function (e, opacity) {
//   if (e.target.classList.contains("nav__link")) {
//     // By default these two are the same but because we use the 'bind' method in the event listeners above, we redefine the 'this' keyword
//     console.log(this);
//     console.log(e.currentTarget);

//     const link = e.target;

//     // Method #001: Jonas
//     // const siblings = link.closest(".nav").querySelectorAll(".nav__link");

//     // siblings.forEach((d) => {
//     //   if (d != link) d.style.opacity = this;
//     // });

//     // logo.style.opacity = this;

//     // 🔴 Method #002: MY OWN
//     const siblings = Array.from(
//       link.closest(".nav").querySelectorAll(".nav__link")
//     ).filter((sibling) => sibling !== link);

//     const logo = link.closest(".nav").querySelector("img");

//     // siblings.forEach((sibling) => (sibling.style.opacity = opacity));
//     siblings.forEach((sibling) => (sibling.style.opacity = this));

//     // logo.style.opacity = opacity;
//     logo.style.opacity = this;
//   }
// };

// Function #002
const handleNavHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    // By default these two are the same but because we use the 'bind' method in the event listeners above, we redefine the 'this' keyword
    console.log(this);
    console.log(e.currentTarget);

    const link = e.target;

    // Method #001: Jonas
    // const siblings = link.closest(".nav").querySelectorAll(".nav__link");

    // siblings.forEach((d) => {
    //   if (d != link) d.style.opacity = this;
    // });

    // logo.style.opacity = this;

    // 🔴 Method #002: MY OWN
    const siblings = Array.from(
      link.closest(".nav").querySelectorAll(".nav__link")
    ).filter((sibling) => sibling !== link);

    const logo = link.closest(".nav").querySelector("img");

    // siblings.forEach((sibling) => (sibling.style.opacity = opacity));
    siblings.forEach((sibling) => (sibling.style.opacity = this));

    // logo.style.opacity = opacity;
    logo.style.opacity = this;
  }
};

// 'mouseover' Bubbles while 'mouseEnter' does not Bubble
// opposite of mouseEnter -> mouseLeave
// opposite of mouseover => mouseout
// Merged Into handleNavHover()
// Method #001
// nav.addEventListener("mouseover", function (e) {
//   handleNavHover(e, 0.5);
// });
// Method #002
// The event 'e' is immediately passed into the event listeners
nav.addEventListener("mouseover", handleNavHover.bind(0.5));

// Merged Into handleNavHover()
// Method #001
// nav.addEventListener("mouseout", function (e) {
//   handleNavHover(e, 1);
// });
// Method #002
// The event 'e' is immediately passed into the event listeners
nav.addEventListener("mouseout", handleNavHover.bind(1));

//////////////////////////////////////////////////////////// LESSON #196: Implementing a STicky Navigation: The Scroll Event (Project)

// Sticky navigation Method #001

// Calculating where the Sticky Navigation should start
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// // The 'scroll' event really should be avoided because it affects performance as a result of firing all the time
// window.addEventListener("scroll", function (e) {
//   // console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

//////////////////////////////////////////////////////////// LESSON #197: A BETTER WAY: The Intersection Observer API (Project)
// Shall Use this to implement the Sticky Navigation

// More interested in entries but using observer is useful
const obsCallback = function (entries, observer) {
  entries.forEach((entry) => {
    console.log(entry);
  });
};

// 💡 Observer API explanation 💡
// 'root' property is the element that the target (section1) is intercepting
// const obsOptions = {
// this root setting means that we will watch for when target (section1) is intersecting the viewport
// root: null,
// % of intersection (amount of section1 visible / not) at which the observer callback will be called
// threshold: 0.1, // 10%

// 💡 Observer API explanation 💡
// Recorded Callback function (obsCallback) triggers with timestamps:
// Keep in mind that 'section1' is on second page after the landing page
// A) Scrolling Down From Top Going Down
// A1: 00.1% | Intersecting True (94ms)
// A2: 20.2% | Intersecting True (23608ms)
// A3: 19.7% | Intersecting True (70830ms)
// A4: 00.0% | Intersecting False (190518ms)
// B) Scrolling Up From Bottom Going Up
// B1: 0.005% | Intersecting True (272626ms)
// B2: 20.00% | Intersecting True (417861ms)
// B3: 19.90% | Intersecting True (457224ms)
// B4: 0.000% | Intersecting False (460345ms)
// threshold: [0, 0.2], // 0 to 20%

// For learning purposes (❌ Read explanation above to better understand)
// This would meant that the callback function will only trigger when the section1 is 100% in view or 100% out of view. Wouldn't make sense cause the section1 is bigger than viewport too.
// threshold: [0, 1, 0.2],
// };

// 💡 Observer API explanation 💡
// obsCallback is called when the observed target element crosses the root element set ('viewport') whether scrolling up or down
// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

// 💡 Thorough Observer API explanations are above 💡
// Observing Header now: The Landing page

const header = document.querySelector(".header");

const navRectangle = nav.getBoundingClientRect();
const navHeight = navRectangle.height;

console.log(navRectangle);

function stickyNav(entries) {
  // const entry = entries[0];
  const [entry] = entries;

  console.log(entry);

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
}

const headerObserver = new IntersectionObserver(stickyNav, {
  // 💡 Observer API explanation 💡
  // Recorded Callback function (stickyNav) triggers with timestamps
  // Scrolling Down from Top Going Down
  // A) Scrolling Down From Top Going Down
  // A1: 0.992% | Intersecting True  (90.5ms)
  // A2: 0.000% | Intersecting False (540ms)
  // A3: 0.028% | Intersecting True  (1800ms)
  root: null, // setting viewport as the root element
  threshold: 0, // 0% of target element intersecting the root element, is the crossover mark
  // rootMargin: `${navHeight}px`,
  // ❌ Jonas made his margin -ve to achieve result explained below but it's actually meant to be +_ve
  rootMargin: `${navHeight}px`,
  // ✅ box of 90px (height of nav) that will be applied outside of target element to make sure the nav-bar doesn't displace any page info. This will ensure that the nav-bar appears 90px before reaching threshold.
  // It's redundant to add a -_ve 'rootMargin' because we could just add a % to the 'threshold' property
});

headerObserver.observe(header);

///////////////////////////////////////////////////////////// LESSON #198: Revealing Elements On Scroll (7.40)

// Reveal sections
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, // we want animation to kick in when the section part of the page is a bit visible / intersecting a bit (15% visible)
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

////////////////////////////////////////////////////////////// LESSON #199: Lazy Loading Images
const imgTargets = document.querySelectorAll("img[data-src]");

function loadImg(entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  // 💡 When JS changes the 'src' attribute behind the scenes, it initiates a load event
  // If we go to network tab in browser inspect tools and throttle speed to 'Slow 3G' and run script below, we can see how long it takes program to load the new image. So we decided to remove blur when the image is finally loaded
  // Remove blur
  // entry.target.classList.remove("lazy-img");

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  imgObserver.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "150px",
  // It's redundant to add a -ve 'rootMargin' because we could just add a % to the 'threhold' property. We add a +_ve 'rootMargin' to initiate whatever we're doing, that amount of space before the intersection
});

imgTargets.forEach((image) => imgObserver.observe(image));

/////////////////////////////////////////////////////// LESSON #200: Building a Slider Component: Part #001

function slider() {
  // Slider
  const slides = document.querySelectorAll(".slide");

  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");

  let currentSlide = 0;

  // const slider = document.querySelector(".slider");
  // slider.style.transform = `scale(0.4) translateX(-800px)`;
  // slider.style.overflow = `visible`;

  function goToSlide(targetSlide) {
    slides.forEach(function (slide, index) {
      slide.style.transform = `translate(${(index - targetSlide) * 100}%)`;
    });
  }

  // slides.forEach(function (d, i) {
  //   d.style.transform = `translate(${i * 100}%)`;
  //   // d.style.transform = `translateX(${i * 100}%)`;
  // });
  // Put into initialiseTestimonials() in Lesson #201
  // goToSlide(0);

  function nextSlide() {
    // Have to know limit such that we don't over translate
    // console.log("hi");
    if (currentSlide < slides.length - 1) {
      currentSlide++;
    } else {
      currentSlide = 0;
    }

    // Merged into 'goToSlide'
    // slides.forEach(function (slide, index) {
    //   slide.style.transform = `translate(${(index - currentSlide) * 100}%)`;
    goToSlide(currentSlide);

    activateDot(currentSlide);
  }

  function previousSlide() {
    if (currentSlide !== 0) {
      currentSlide--;
    } else {
      currentSlide = slides.length - 1;
    }
    goToSlide(currentSlide);

    activateDot(currentSlide);
  }

  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", previousSlide);

  //////////////////////////////////////////////////////////// LESSON #201: Building a Slider Component: Part #002

  // Using Keys to Slide Content
  document.addEventListener("keydown", function (e) {
    console.log(e);
    if (e.key === "ArrowLeft") previousSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  const dotContainer = document.querySelector(".dots");

  function createDots() {
    // 🔴 Creating dots: Jonas Method #001
    // slides.forEach(function (_, index) {
    //   dotContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${index}"></button>`);
    // });

    // My Own: Method #002
    for (let i = 0; i < slides.length; i++) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
      // })
    }
  }
  // Placed into initialiseTestimonials()
  // createDots();

  // If we used Jonas TEchnique #001 in activateDot() then we can just call:
  // activateDot(0);
  // Placed into initialiseTestimonials()
  // initialActivateDot();

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      // const slide = e.target.dataset.slide;
      const { slide } = e.target.dataset;

      console.log(e.target);
      console.log(e.target.dataset);
      console.log(slide);

      // Notice we're taking in string but it will be automatically converted during calculation
      goToSlide(slide);

      activateDot(slide);
    }
  });

  function initialActivateDot() {
    document
      .querySelector(`.dots__dot[data-slide="${0}"]`)
      .classList.add("dots__dot--active");
  }

  function activateDot(slide) {
    //   // Removing ex-Active Dot JOnas Technique #001
    //   document
    //     .querySelectorAll(".dots__dot")
    //     .forEach((dot) => dot.classList.remove("dots__dot--active"));

    // Removing ex-Active Dot: MINE Technique #002
    document
      .querySelector(".dots__dot--active")
      .classList.remove("dots__dot--active");

    // Making new Dot active
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  }

  // Jonas: init()
  function initialiseTestimonials() {
    goToSlide(0);
    createDots();

    // If we used Jonas TEchnique #001 in activateDot() then we can just call:
    // activateDot(0);
    initialActivateDot();
  }
  initialiseTestimonials();
}
slider();

////////////////////////////////////////////////////////
// LECTURES
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////// LESSON #186: Selecting, Creating, and Deleting Elements

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// // Returns a static, not live HTML element reference
// const header1 = document.querySelector(".header");

// // This doesn't return a live HTML Element reference collection. Deleting anything in DOM tree, doesn't reflect in the collection
// const allSections1 = document.querySelectorAll(".section");
// console.log(allSections1);

// // Returns a static, not live HTML element reference
// document.getElementById("section--1");

// // This returns a live HTML Element reference collection. If you delete anything in DOM tree, it will reflect in the collection immediately
// const allButtons = document.getElementsByTagName("button");
// console.log(allButtons);

// // Creating and Inserting Elements #001
// // .insertAdjacentHTML
// // const message = document.createElement("div");
// // message.classList.add("cookie-message");
// // message.innerHTML =
// //   "We use cookies for improved functionality and analytics <button class='btn btn--close-cookie'>Got it!</button>";

// // header1.prepend(message);
// // append will move the element in the DOM from being before to being after the header because it's already prepended to DOM above
// // header1.append(message);

// // To add multiple same elements
// // header1.append(message.cloneNode(true));
// // We set true such that even the children elements are copied

// // Message comes before header
// // header1.before(message);
// // Message comes after header
// // header1.after(message);

// // Delete elements
// // document
// //   .querySelector(".btn--close-cookie")
// //   .addEventListener("click", function () {
// //     message.remove(); // Modern Way to do it
// //     const removed = message.parentElement.removeChild(message);
// //     console.log(removed);
// //   });

// //////////////////////////////////////////////////////// LESSON #187: Styles, Attributes, and Classes

// // Styles
// // These styles we set ourselves are placed as inline-styles
// // message.style.backgroundColor = "#37383d";
// // message.style.width = "120%";

// // Can't use this technic to get styles inside a class
// // console.log(message.style.color);
// // console.log(message.style.backgroundColor);

// // To get styles inside a class
// // console.log(getComputedStyle(message));
// // Returns property name
// // console.log(getComputedStyle(message)[0]);
// // Returns property value
// // console.log(getComputedStyle(message).color);
// // console.log(getComputedStyle(message).height);

// // Changing value of a Computed Style
// // message.style.height =
// //   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// // Changing CSS Variables
// document.documentElement.style.setProperty("--color-primary", "orangered");

// document.documentElement.style.setProperty("--color-primary", "#5ec576");

// // Attributes
// const logo = document.querySelector(".nav__logo");
// console.log(logo);
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// console.log(logo.classList);

// logo.alt = "Beautiful minimalist logo";

// // Non-standard
// console.log(logo.designer);
// console.log(logo.getAttribute("designer"));
// logo.setAttribute("company", "World-Biz");

// const link = document.querySelector(".nav__link--btn");
// // Notice the difference
// console.log(link.href);
// console.log(link.getAttribute("href"));
// link.href = "#";
// console.log(link.href);

// // Data Attributes: Have to begin with 'data'
// // data-version-number="3.0"
// console.log(logo.dataset.versionNumber);

// // classes
// logo.classList.add("c", "j");
// logo.classList.remove("c", "j");
// logo.classList.toggle("c");
// logo.classList.contains("c");
// // Avoid
// // logo.className = 'jonas';

// // ////////////////////////////////////////////////////// LESSON #188: Implementing Smooth Scrolling
// // Two ways of doing this, one only works in modern browsers
// // btnScrollTo = document.querySelector(".btn--scroll-to");

// // section1 = document.querySelector("#section--1");

// // btnScrollTo.addEventListener("click", function (e) {
// //   // Co-ordinates of elements we wantt to scroll to
// //   // Rmr that this method getBoundingClientRect() gets co-ords from top-left of page
// //   // The method is also relative to the current view-port. To notice, scroll and notice change in x or y co-ords
// //   const section1_Coords = section1.getBoundingClientRect();
// //   console.log(section1_Coords);
// //   // Co-ords of element clicked
// //   console.log(e.target.getBoundingClientRect());
// //   // GEtting Current Page Scroll Co-ords
// //   let xScroll = window.pageXOffset;
// //   xScroll = window.scrollX;
// //   let yScroll = window.pageYOffset;
// //   yScroll = window.scrollY;
// //   console.log(
// //     `Current Scroll Co-ordinates:\nX: ${xScroll}px\nY: ${yScroll}px\n\nThis is the distance in 'px' of the upper-most visible part of view-port from the top-left most part of the page.`
// //   );
// //   // Smooth Scrollin Method #001
// //   // Scrolling
// //   // Rmr, getBoundingClientRect() gets us co-ordinate values that are relative to the view-port so using its co-ordinates alone is not reliable. To notice, this, click on this element (btnSrollTo) at different positions of view-port and see whether it scrolls to 'section1' element correctly
// //   // #001 Scroll
// //   // window.scrollTo(section1_Coords.left, section1_Coords.top);
// //   // To correct fallacy above, we add up vertical co-ordinates to scroll to. We add the Current Y-axis page scroll + getBoundingClientRect() co-ords
// //   let ySectionScroll = section1_Coords.top + yScroll;
// //   let xSectionScroll = section1_Coords.left + xScroll;
// //   // #002 Scroll
// //   // window.scrollTo(xSectionScroll, ySectionScroll);
// //   // Now to smoothen the whole scroll animation experience, we pass in objects instead of just one argument
// //   // 🔥 #002 Scroll: All Browsers (Really #2 Well Working)
// //   window.scrollTo({
// //     left: xSectionScroll,
// //     top: ySectionScroll,
// //     behavior: "smooth",
// //   });
// //   // 🔥 Smooth Scrollin Method #003: Modern Browsers Only
// //   section1.scrollIntoView({ behavior: "smooth" });
// //   // REading height and width of VIEW-PORT excluding Scroll Bars
// //   const height = document.documentElement.clientHeight;
// //   const width = document.documentElement.clientWidth;
// //   console.log(`Height of Viewport: ${height}px\nWidth of Viewport: ${width}px`);
// // });

// ////////////////////////////////////////////////////////// LESSON #189: Types of Events and Event Handlers
// // Rmr this will get the first element that matches criteria
// const h1 = document.querySelector("h1");
// const h2 = document.querySelector("h2");

// // Method #001: New and Better way for Event Listening
// // 1) With this method we can attach multiple event listeners to the same event
// // 2) We can switch of an event listener with this method
// // h1.addEventListener("mouseenter", function (e) {
// //   alert("addEventListener: Great! You are reading the heading :D");
// // });

// const alertH1Once = function (e) {
//   alert(
//     "1️⃣ addEventListener just one time no more!: Great! You are reading the heading :D"
//   );

//   // If we want to listen for event just once
//   h1.removeEventListener("mouseenter", alertH1Once);
// };
// const alertH1 = function (e) {
//   alert(
//     "🕰️ addEventListener 15 Seconds!: Great! You are reading the heading :D ⏳"
//   );
// };

// h1.addEventListener("mouseenter", alertH1Once);

// // Removing Event listener after a timeout
// h1.addEventListener("mouseenter", alertH1);

// // Event listener will switch off in 10seconds
// setTimeout(function () {
//   h1.removeEventListener("mouseenter", alertH1);
//   alert("Event Listener has timed out");
// }, 15000);

// // Method #002: Older way of Event Listening
// // Any other subsequential listener attached to this same event would override the first listener
// h2.onmouseenter = function (e) {
//   alert("onmouseenter: Great! You are reading the heading :D");
// };

// ///////////////////////////////////////////////////////// LESSON #190: Event Propagation: Bubbling and Capturing

// // Every event is generated at the root element, the Document Root
// // In the Capturing Phase, the event moves down the DOM tree order to the target element
// // As soon as event reaches target, the 'Target phase' begins, where events are handled right at the target
// // Event LIsteners will wait for event to occur and then initiate callback function on event occurrence. The listener opens the event window. All this happening during the 'Target Phase'
// // The event then goes back up to the Document Root, through the parent elements and not the sibling elements, just parents. This is the 'Bubbling Phase'
// // This is important because it's asif the event happened in all these parent elements
// // By default, events are only handled in the Target and Bubbling Phase.
// // However, We can set up event handlers to respond to events in the 'Capturing Phase' as well
// // Not all events have a Capturing and Bubbling Phase. Some events only have the 'Target Phase'
// // CApturing and Bubbling is the Propagation we're talking about

// ///////////////////////////////////////////////////////// LESSON #191: Event Propagation in Practice
// // Plan is to give all navigation links and their parents event handlers and respond with randomly generated colors

// // Random Color
// // rgb(255, 255, 255)

// // Generates a number within a certain range
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// // These event handlers are only catching the 'target' and the 'bubbling' event phases
// // Catching the 'Bubbling' event phase will be useful for something in next lesson called 'event delegation'
// // Attaching event to nav__link
// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   console.log("LINK");
//   this.style.backgroundColor = randomColor();

//   // e.target is the element where the event happened
//   // e.currentTarget is the element on which the event handler is attached
//   console.log("LINK", e.target, e.currentTarget);

//   // 'this' here will be the same as e.currentTarget
//   console.log(this === e.currentTarget);

//   // Stop Event Propagation
//   // Not good idea though
//   // e.stopPropagation();
// });

// // Attaching event to nav__links (parent to nav__link)
// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   // console.log("LINK");
//   this.style.backgroundColor = randomColor();

//   console.log("CONTAINER", e.target, e.currentTarget);

//   // 'this' here will be the same as e.currentTarget
//   console.log(this === e.currentTarget);
// });

// // This event handler will listen for the 'Capturing' Event Phase. We notice it working when we click on a link and look at the logs in console
// // Attaching event to nav (parent to nav__links)
// document.querySelector(".nav").addEventListener(
//   "click",
//   function (e) {
//     // console.log("LINK");
//     this.style.backgroundColor = randomColor();

//     console.log("NAV", e.target, e.currentTarget);

//     // 'this' here will be the same as e.currentTarget
//     console.log(this === e.currentTarget);
//   },
//   true
// );

// // Bubbling and CApturing exists for historical reasons when JS was implemented differently in different browsers

// // Catching the 'Bubbling' event phase will be useful for something in next lesson called 'event delegation'

// // ///////////////////////////////////////////////////////// LESSON #192: Event Delegation Implemented in ACtual Project Code

// // We'll be using Event Delegation to implement Smooth Scrolling

// ////////////////////////////////////////////////////////
// // LESSON #193: DOM TRAVERSING

// const h1_1 = document.querySelector("h1");

// // gEtting Children of 'H1' element, direct and indirect children
// console.log(h1_1.querySelectorAll(".highlight"));

// // Direct and Indirect Children in Collection
// console.log(h1_1.childNodes);

// // Direct Children of element
// // And this is a live collection
// console.log(h1_1.children);

// h1_1.firstElementChild.style.color = "white";

// h1_1.lastElementChild.style.color = "orangered";

// h1_1.lastElementChild.style.color = getComputedStyle(
//   document.documentElement
// ).getPropertyValue("--color-primary");

// h1_1.lastElementChild.style.color = "white";

// // Going Upwards: Parents
// // More Generic Property
// console.log(h1_1.parentNode);
// // Limited to direct parents. More specific property
// console.log(h1_1.parentElement);

// // Most immediate ancestor with class '.header'
// // h1_1.closest(".header").style.background = "var(--gradient-secondary)";

// // This method can end up returning itself as well
// // h1_1.closest(".header").style.background = "var(--gradient-secondary)";

// // Going sideways: siblings
// console.log(h1_1.previousSibling);
// console.log(h1_1.nextSibling);

// console.log(h1_1.parentElement.children);
// [...h1.parentElement.children].forEach(function (e) {
//   if (e !== h1_1) {
//     e.style.transform = "scale(0.5%)";
//   }
// });

// LESSON #202: LifeCycle DOM Events
// 'DOMContentLoaded' event is fired as soon as the HTML has been parsed and all scripts have been downloaded and executed. This event doesn't wait for images, CSS files, and other external resources though
document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML parsed and DOM tree built!", e);
});

// This event is fired after CSS files and other external resources have been downloaded
window.addEventListener("load", function (e) {
  console.log("Page fully loaded", e);
});

// Event fired immediately before user is about to leave a page. Can use this to ask user if they're sure they'd like to leave the page
// window.addEventListener("beforeunload", function (e) {
//   // IN some browsers, but not Chrome, this is necessary to make this event listening and handling to work
//   // The e.preventDefault() call is generally used to ensure that the event handler is executed, but its effect may vary across different browsers. Some browsers require it to make this event work as expected. In this case, it's mainly to ensure cross-browser compatibility.
//   e.preventDefault();

//   console.log(e);

//   // This mechanism allows web pages to provide custom messages to users when they attempt to leave a page. However, please note that modern browsers, especially those based on Chromium (like Google Chrome), may not show the custom message specified in e.returnValue for security reasons.
//   e.returnValue = "";
// });
