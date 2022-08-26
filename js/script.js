// * Change header to scrollable version
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

// * Burger handler

document.addEventListener("DOMContentLoaded", () => {
  const menuCloseItem = document.querySelector(".header-nav-close-button");
  const burgerItem = document.querySelector(".burger");
  const menu = document.querySelector(".header-nav");
  const menuLinks = document.querySelectorAll(".header-link");

  burgerItem.addEventListener("click", () => {
    menu.classList.add("header-nav-active");
  });
  menuCloseItem.addEventListener("click", () => {
    menu.classList.remove("header-nav-active");
  });
  // if (window.innerWidth > 768) return;
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
});

// * Scroll to anchors, smooth menu links scrolling
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

// * Lite Youtube video embed
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

// * Modal login form show/hide from nav-bar/menu
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

// *Work on login/create acc forms display and showing login errors

// Showing login and create acc errors
// Function will show errors according to the form type - formElement = login/create acc form
function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form-message");

  messageElement.textContent = message;
  messageElement.classList.remove("form-message-success", "form-message-error");
  messageElement.classList.add(`form-message-${type}`);
}

// Setting errors on inputs
function setInputError(inputElement, message) {
  inputElement.classList.add("form-input-error");
  inputElement.parentElement.querySelector(
    ".form-input-error-message"
  ).textContent = message;
}
// Clearing input errors
function clearInputError(inputElement) {
  inputElement.classList.remove("form-input-error");
  inputElement.parentElement.querySelector(
    ".form-input-error-message"
  ).textContent = "";
}

// Change between login and create account forms
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const createAccountForm = document.querySelector("#createAccount");

  // Switch from Login to Create account form when clicking on the link "Don't have an acc?"
  document.querySelector("#linkCreateAccount").addEventListener("click", e => {
    e.preventDefault();
    loginForm.classList.add("form-hidden");
    createAccountForm.classList.remove("form-hidden");
  });

  // Switch from Create account form to Login form when clicking on the link "Already have an acc?"
  document.querySelector("#linkLogin").addEventListener("click", e => {
    e.preventDefault();
    loginForm.classList.remove("form-hidden");
    createAccountForm.classList.add("form-hidden");
  });

  loginForm.addEventListener("submit", e => {
    e.preventDefault();
    // Perform your AJAX/Fetch login

    // Calling the function and showing the default error message
    setFormMessage(loginForm, "error", "Invalid username/password combination");
  });

  // When the form input is blurred(user moves focus from it), we show the errors according to the users actions
  document.querySelectorAll(".form-input").forEach(inputElement => {
    inputElement.addEventListener("blur", e => {
      if (
        e.target.id === "signupUsername" &&
        e.target.value.length > 0 &&
        e.target.value.length < 10
      ) {
        setInputError(
          inputElement,
          "Username must be at least 10 characters long"
        );
      }
    });
    // When the user types smth in the input, clear the old errors
    inputElement.addEventListener("input", e => {
      clearInputError(inputElement);
    });
  });
});

// Self-calling function
// (function () {
// }())
