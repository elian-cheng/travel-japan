// Change header to scrollable version
(function () {
  const header = document.querySelector(".header");
  window.onscroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("header-active");
    } else {
      header.classList.remove("header-active");
    }
  };
})();

// Burger handler
(function () {
  const menuCloseItem = document.querySelector(".header-nav-close");
  const burgerItem = document.querySelector(".burger");
  const menu = document.querySelector(".header-nav");
  const menuLinks = document.querySelectorAll(".header-link");

  burgerItem.addEventListener("click", () => {
    menu.classList.add("header-nav-active");
  });
  menuCloseItem.addEventListener("click", () => {
    menu.classList.remove("header-nav-active");
  });
  if (window.innerWidth < 769) {
    // for (let i = 0; i < menuLinks.length; i++) {
    //   menuLinks[i].addEventListener("click", () => {
    //     menu.classList.remove("header-nav-active");
    //   });
    // }
    menuLinks.forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("header-nav-active");
      });
    });
  }
})();

// Scroll to anchors, smooth menu links scrolling
(function () {
  const smoothScroll = function (targetEl, duration) {
    const headerElHeight = document.querySelector(".header").clientHeight; //If the header is not fixed, delete this variable here
    let target = document.querySelector(targetEl);
    let targetPosition = target.getBoundingClientRect().top - headerElHeight; //Delete it from here too, just headerElHeight
    let startPosition = window.pageYOffset;
    let startTime = null;

    const ease = function (t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    const animation = function (currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, targetPosition, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  };

  const scrollTo = function () {
    const links = document.querySelectorAll(".js-scroll");
    links.forEach(each => {
      each.addEventListener("click", function () {
        const currentTarget = this.getAttribute("href");
        smoothScroll(currentTarget, 1000);
      });
    });
  };
  scrollTo();
})();

// Modal login form
(function () {
  const modal = document.querySelector("#modal");
  const openModalButton = document.querySelector("#open-modal-btn");
  const closeModalButton = document.querySelector("#close-modal-btn");
  const overlay = document.querySelector("#overlay");

  openModalButton.addEventListener("click", () => {
    modal.classList.add("open");
    overlay.classList.add("open");
  });

  function closeModal() {
    modal.classList.remove("open");
    overlay.classList.remove("open");
  }

  closeModalButton.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);
})();

// Lite Youtube video embed

(function () {
  if (document.querySelector("#videoPlayer")) {
    document
      .querySelector("#videoPlayer a")
      .addEventListener("click", playVideo);
  }
  function playVideo() {
    const player = document.getElementById("videoPlayer");
    const id = player.getAttribute("data-id");
    player.classList.add("loaded");
    const src =
      "https://www.youtube.com/embed/" +
      id +
      "?autoplay=1&autohide=1&rel=0&modestbranding=1&showinfo=0&border=0&wmode=opaque&theme=light&iv_load_policy=3";
    var iframe =
      "<iframe width='100%' height='100%' src='" +
      src +
      "' scrolling='no' frameborder='0' allowfullscreen></iframe>";
    player.innerHTML = iframe;
    return false;
  }
})();

// Self-calling function
// (function () {
// }())
