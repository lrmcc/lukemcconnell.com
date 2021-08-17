const btn = document.querySelector(".mode-toggle");

// Get current "theme" from local storage, if equals "dark"
// add to classList and therefore toggle CSS
const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.add("dark-theme");
}


btn.addEventListener("click", function () {
    // Toggle mode upon click
    document.body.classList.toggle("dark-theme");
    
    // If dark-theme toggled set local storage "theme" to dark 
    let theme = "light";
    if (document.body.classList.contains("dark-theme")) {
      theme = "dark";
    }
    localStorage.setItem("theme", theme);
  });