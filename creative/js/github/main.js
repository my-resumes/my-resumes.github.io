// Define a function to trigger the repository creation and file upload process
function triggerGitHubProcess() {
  const repoName = "my-new-repo";
  const token = "YOUR_GITHUB_TOKEN";

  // 1. Create GitHub Repo
  createGitHubRepo(repoName, token).then((repo) => {
    if (repo) {
      const repoFullName = repo.full_name;

      // 2. Fetch and Combine Files
      combineFiles().then((files) => {
        // 3. Commit Files to Repo
        commitFilesToRepo(repoFullName, files, token).then(() => {
          // Optionally, enable GitHub Pages
          enableGitHubPages(repoFullName, token);
        });
      });
    }
  });
}