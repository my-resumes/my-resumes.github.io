const axios = require('axios');

/**
 * Function to get LinkedIn profile data
 * @param {string} accessToken - The LinkedIn API access token
 * @returns {Promise<Object>} - Profile data
 */
const getLinkedInProfile = async (accessToken) => {
    try {
        const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'X-Restli-Protocol-Version': '2.0.0',
            },
        });

        const emailResponse = await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'X-Restli-Protocol-Version': '2.0.0',
            },
        });

        // Extract the required data
        const profileData = {
            name: profileResponse.data.localizedFirstName + ' ' + profileResponse.data.localizedLastName,
            location: profileResponse.data.location ? profileResponse.data.location.name : 'Location not available',
            summary: profileResponse.data.summary || 'Summary not available',
            email: emailResponse.data.elements[0]['handle~'].emailAddress,
        };

        return profileData;

    } catch (error) {
        console.error('Error fetching LinkedIn profile:', error);
        throw error;
    }
};

/**
 * Function to get education and work history
 * @param {string} accessToken - The LinkedIn API access token
 * @returns {Promise<Object>} - Education and work history
 */
const getLinkedInExperienceAndEducation = async (accessToken) => {
    try {
        const educationResponse = await axios.get('https://api.linkedin.com/v2/educations', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'X-Restli-Protocol-Version': '2.0.0',
            },
        });

        const experienceResponse = await axios.get('https://api.linkedin.com/v2/positions', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'X-Restli-Protocol-Version': '2.0.0',
            },
        });

        const educationHistory = educationResponse.data.elements || [];
        const workHistory = experienceResponse.data.elements || [];

        return { educationHistory, workHistory };

    } catch (error) {
        console.error('Error fetching LinkedIn experience and education:', error);
        throw error;
    }
};

/**
 * Main function to run the LinkedIn data extraction
 */
const main = async () => {
    const accessToken = 'YOUR_ACCESS_TOKEN'; // Replace with the actual access token

    try {
        const profileData = await getLinkedInProfile(accessToken);
        const historyData = await getLinkedInExperienceAndEducation(accessToken);

        console.log('Profile Data:', profileData);
        console.log('Education History:', historyData.educationHistory);
        console.log('Work History:', historyData.workHistory);
    } catch (error) {
        console.error('Error in main function:', error);
    }
};

// Execute main function
main();
