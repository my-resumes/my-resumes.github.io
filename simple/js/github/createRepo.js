// createRepo.js

async function createGitHubRepo(repoName, token) {
    const repoData = {
      name: repoName,
      description: "Repository with files from browser source",
      private: false,
    };
  
    try {
      const response = await fetch("https://api.github.com/user/repos", {
        method: "POST",
        headers: {
          Authorization: `token ${atob(token)}`,
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify(repoData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log("Repository created:", result);
        return result;
      } else {
        console.error("Failed to create repository:", result);
        return null;
      }
    } catch (error) {
      console.error("Error creating repository:", error);
      return null;
    }
  }
  
  // Example usage:
  // const repoName = 'my-repo';
  // const token = 'YOUR_GITHUB_TOKEN';
  // createGitHubRepo(repoName, token).then(repo => console.log(repo));
  