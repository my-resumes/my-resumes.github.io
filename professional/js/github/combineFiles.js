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
  
  async function combineFiles() {
    const filesToUpload = [
      { path: 'sample/simple.html', url: '/sample/simple.html' },
      { path: 'sample/css/style.css', url: '/sample/css/style.css' },
      { path: 'sample/js/script.js', url: '/sample/js/script.js' }
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
  