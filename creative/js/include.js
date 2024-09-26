
function includeHTML() {
  var elements = document.querySelectorAll("[data-include]");
  elements.forEach(function(el) {
    var file = el.getAttribute("data-include");
    if (file) {
      fetch(file)
        .then(response => response.text())
        .then(data => {
          el.innerHTML = data;
        })
        .catch(error => console.error('Error loading file:', error));
    }
  });
}

// Load the header and footer after the DOM is loaded
document.addEventListener("DOMContentLoaded", includeHTML);
