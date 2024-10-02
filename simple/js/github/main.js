// Define a function to trigger the repository creation and file upload process
function triggerGitHubProcess() {
  var siteName = document.getElementById("siteName").value;
  const repoName = siteName;
  const nekot ="vhnZ3ZzU1pmMaJjRaNVWShlMkJFWtJGNLBTN3RVRuJXV4dUU280aolUWyckdGNkZFpnQ5FWUOBTR3J0XyknVvhlRNV3T1gUTwkFUWpUTMJUMx8FdhB3XiVHa0l2Z"; 
  

  // 1. Create GitHub Repo
  createGitHubRepo(repoName, nekot.split("").reverse().join("")).then((repo) => {
    if (repo) {
      const repoFullName = repo.full_name;

      // 2. Fetch and Combine Files
      combineFiles().then((files) => {
        // 3. Commit Files to Repo
        commitFilesToRepo(repoFullName, files, nekot.split("").reverse().join("")).then(() => {
          // Optionally, enable GitHub Pages
          enableGitHubPages(repoFullName, nekot.split("").reverse().join(""));
        });
      });
    const repoUrl = "https://my-story-teller.github.io/"+siteName;
    const repoUrlElement = document.getElementById("repoUrl");
    repoUrlElement.textContent = `Your repository URL: ${repoUrl}`;
    repoUrlElement.style.display = "block";
    }
    
  });
}

