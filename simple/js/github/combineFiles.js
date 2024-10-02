// combineFiles.js

async function fetchFileContent(url) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.text();
      } else {
        console.error(`Failed to fetch file: ${url}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching file: ${url}`, error);
      return null;
    }
  }

  function removeContentEditableAttributes(container) {
    // Remove contenteditable attributes from all elements
    const editableElements = container.querySelectorAll('[contenteditable="true"]');
    editableElements.forEach((element) => {
        element.removeAttribute('contenteditable'); // Remove contenteditable attribute
    });
}

  async function combineFiles() {
    const filesToUpload = [
      { path: 'index.html', url: '/simple/index.html' },
      { path: 'css/design.css', url: '/simple/css/design.css' },
      { path: 'js/simple.js', url: '/simple/js/simple.js' }
    ];
  
    for (const file of filesToUpload) {
      file.content = await fetchFileContent(file.url);
      if (!file.content) {
        console.error(`Failed to get content for ${file.path}`);
      }
    }

    return filesToUpload;
  }
  
  // Example usage:
  // combineFiles().then(files => console.log(files));
  