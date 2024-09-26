// GitHub API integration functions

/**
 * Fetch user information from GitHub API
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} - User information
 */
const githubUser = (username) => {
    return $.ajax({
        url: `https://api.github.com/users/${username}`,
        method: 'GET'
    });
};

/**
 * Fetch user repositories from GitHub API
 * @param {string} username - GitHub username
 * @returns {Promise<Array>} - User repositories
 */
const githubUserRepos = (username) => {
    return $.ajax({
        url: `https://api.github.com/users/${username}/repos`,
        method: 'GET'
    });
};

/**
 * Fetch user issues from GitHub API
 * @param {string} username - GitHub username
 * @returns {Promise<Array>} - User issues
 */
const githubUserIssues = (username) => {
    return $.ajax({
        url: `https://api.github.com/users/${username}/issues`,
        method: 'GET'
    });
};

/**
 * Fetch user organizations from GitHub API
 * @param {string} username - GitHub username
 * @returns {Promise<Array>} - User organizations
 */
const githubUserOrgs = (username) => {
    return $.ajax({
        url: `https://api.github.com/users/${username}/orgs`,
        method: 'GET'
    });
};

/**
 * Check if the user starred a specific repository
 * @param {string} username - GitHub username
 * @param {string} repoName - Repository name to check
 * @returns {Promise<boolean>} - True if starred, false otherwise
 */
const githubUserStarredRepo = (username, repoName) => {
    return $.ajax({
        url: `https://api.github.com/users/${username}/starred/${repoName}`,
        method: 'GET',
        error: (err) => {
            if (err.status === 404) {
                return false; // Not starred
            } else {
                console.error("Error checking starred status:", err);
                return false;
            }
        }
    }).then(() => true);
};

/**
 * Extract username and repo name from GitHub URL
 * @param {string} url - GitHub repository URL
 * @returns {Object} - An object containing the username and repository name
 */
const extractRepoDetails = (url) => {
    const regex = /github\.com\/([^\/]+)/;
    const match = url.match(regex);
    if (match) {
        return {
            username: match[1]
        };
    } else {
        throw new Error('Invalid GitHub URL');
    }
};

/**
 * Main function to retrieve all user data from a GitHub repository URL
 * @param {string} url - GitHub repository URL
 * @returns {Promise<Object>} - Aggregated user data
 */
const githubMain = async (url) => {
    try {
        const { username } = extractRepoDetails(url);
        const [userInfo] = await Promise.all([
            githubUser(username)
        ]);

        return {
            userInfo
        };
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

