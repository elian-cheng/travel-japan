(function changeHeader() {
  const header = document.querySelector(".header");
  window.onscroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("header-active");
    } else {
      header.classList.remove("header-active");
    }
  };
})();
