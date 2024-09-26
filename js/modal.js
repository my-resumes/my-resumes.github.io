document
  .getElementById("dataSelectionModalForm")
  .addEventListener("show.bs.modal", function (event) {
    var triggerElement = event.relatedTarget;
    // Extract values from data-* attributes
    var title = triggerElement.getAttribute('data-title');
    var subtitle = triggerElement.getAttribute('data-subtitle');
    var href = triggerElement.getAttribute('data-href');

    // Update modal title, subtitle, and button href
    var modalTitle = document.getElementById('modalTitle');
    var modalSubtitle = document.getElementById('modalSubtitle');
    var baseurl = document.getElementById('baseurl');

    modalTitle.textContent = title;
    modalSubtitle.textContent = subtitle;
    baseurl.value = href;

  });

  document.getElementById('modalActionButton').addEventListener('click', function() {
    var githubValue = document.getElementById('github').value;
    var linkedInValue = document.getElementById('linkedin').value;
    var baseurl = document.getElementById('baseurl').value;

    var queryParams = new URLSearchParams();
    if (githubValue) queryParams.append('github', encodeURIComponent(githubValue));
    if (linkedInValue) queryParams.append('linkedin', encodeURIComponent(linkedInValue));

    var finalHref = baseurl + '?' + queryParams.toString();
    window.location.href = finalHref;
});
