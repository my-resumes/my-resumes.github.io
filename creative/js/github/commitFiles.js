// commitFiles.js

async function commitFilesToRepo(repoFullName, files, token) {
    for (const file of files) {
      const fileData = {
        message: `Add ${file.path}`,
        content: btoa(file.content), // Base64 encode the content
        branch: "main",
      };
  
      try {
        const response = await fetch(
          `https://api.github.com/repos/${repoFullName}/contents/${file.path}`,
          {
            method: "PUT",
            headers: {
              Authorization: `token ${token}`,
              Accept: "application/vnd.github.v3+json",
            },
            body: JSON.stringify(fileData),
          }
        );
  
        const result = await response.json();
        console.log(`Committed file: ${file.path}`, result);
      } catch (error) {
        console.error(`Error committing file: ${file.path}`, error);
      }
    }
  }
  
  // Enable GitHub Pages
  async function enableGitHubPages(repoFullName, token) {
    const pagesData = {
      source: {
        branch: "main",
        path: "/",
      },
    };
  
    try {
      const response = await fetch(
        `https://api.github.com/repos/${repoFullName}/pages`,
        {
          method: "POST",
          headers: {
            Authorization: `token ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
          body: JSON.stringify(pagesData),
        }
      );
  
      const result = await response.json();
      console.log("GitHub Pages enabled:", result);
    } catch (error) {
      console.error("Error enabling GitHub Pages:", error);
    }
  }
  
  // Example usage:
  // const repoFullName = 'your-username/your-repo';
  // commitFilesToRepo(repoFullName, files, token).then(() => enableGitHubPages(repoFullName, token));
  