function saveCVAsPDF() {
    const element = document.querySelector('.container'); // Adjust this selector to your CV container
    // Optionally hide the header and footer elements
    const header = document.querySelector('header'); // Adjust selector if needed
    const footer = document.querySelector('footer'); // Adjust selector if needed
    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';

    // Select and hide buttons
    const buttons = document.querySelectorAll('button'); // Adjust the selector if needed
    buttons.forEach(button => button.style.display = 'none');

    html2pdf()
        .from(element)
        .set({
            margin: 0.01,
            filename: 'cv.pdf',
            image: { type: 'jpeg', quality: 1 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .save()
        .then(() => {
              console.log('PDF generated successfully!');
          })
        .catch(err => {
            console.error('Error generating PDF:', err);
        })
        .finally(() => {
            // Restore the visibility of buttons
            buttons.forEach(button => button.style.display = '');
            if (header) header.style.display = '';
            if (footer) footer.style.display = '';
        });
}

  // Specific function to add a new employment history
  function addEmployment() {
      const newEmployment = document.createElement("div");
      newEmployment.contentEditable = "true";
      newEmployment.classList.add("employment-item");
      newEmployment.innerHTML = "<h5>New Employment Position</h5><p>Company, Dates</p><p>- Job Responsibilities</p>";
      document.getElementById("employment-section").appendChild(newEmployment);
  }

  // Specific function to add a new education section
  function addEducation() {
      const newEducation = document.createElement("div");
      newEducation.contentEditable = "true";
      newEducation.classList.add("education-item");
      newEducation.innerHTML = "<h5>New Degree</h5><p>University, Graduation Date</p>";
      document.getElementById("education-section").appendChild(newEducation);
  }

  // Specific function to add a new skill
  function addSkill() {
      const newSkill = document.createElement("li");
      newSkill.contentEditable = "true";
      newSkill.innerHTML = "New Skill";
      document.querySelector(".skills-item").appendChild(newSkill);
  }

  // Specific function to add a new language
  function addLanguage() {
      const newLanguage = document.createElement("li");
      newLanguage.contentEditable = "true";
      newLanguage.innerHTML = "New Language";
      document.querySelector(".language-item").appendChild(newLanguage);
  }

  // Specific function to add a new certification
  function addCertification() {
      const newCertification = document.createElement("li");
      newCertification.contentEditable = "true";
      newCertification.innerHTML = "New Certification";
      document.querySelector(".certification-item").appendChild(newCertification);
  }
  
  // Generic function to delete the last element of a section
function deleteLastSection(sectionId, elementTag) {
  const section = document
    .getElementById(sectionId)
    .getElementsByTagName(elementTag);
  if (section.length > 0) {
    section[section.length - 1].remove();
  }
}


function bindData(data) {
    for (const key in data) {
        const elements = document.querySelectorAll(`[data-bind="${key}"]`);
        elements.forEach((element) => {
            element.textContent = data[key];
        });
    }
}
