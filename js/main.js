const modeBtn = document.querySelector(".mode-toggle");
const defaultBtn = document.querySelector(".default-toggle");

// Get current "theme" from local storage, if equals "dark"
// add to classList and therefore toggle CSS
const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.add("dark-theme");
}
if (currentTheme == "default") {
  document.body.classList.add("default-theme");
}


modeBtn.addEventListener("click", function () {
    // Toggle mode upon click
    document.body.classList.toggle("dark-theme");
    
    // If dark-theme toggled set local storage "theme" to dark 
    let theme = "light";
    if (document.body.classList.contains("dark-theme")) {
      theme = "dark";
    }
    localStorage.setItem("theme", theme);
  });

defaultBtn.addEventListener("click", function () {
  // Toggle default upon click
  document.body.classList.toggle("default-theme");
  localStorage.setItem("theme", "default-theme");
});