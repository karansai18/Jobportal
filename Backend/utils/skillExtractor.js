// A comprehensive list of technical skills to look for in a resume.
// You can expand this list with more skills relevant to your platform.
const SKILL_KEYWORDS = [
    'javascript', 'react', 'react.js', 'next.js', 'angular', 'vue', 'typescript',
    'node.js', 'express.js', 'java', 'python', 'c#', '.net', 'php', 'ruby', 'go',
    'html', 'css', 'tailwind css', 'bootstrap', 'sass', 'less',
    'mongodb', 'sql', 'mysql', 'postgresql', 'nosql', 'graphql',
    'rest api', 'restful api', 'jwt', 'oauth',
    'docker', 'kubernetes', 'aws', 'azure', 'google cloud', 'gcp',
    'git', 'github', 'gitlab', 'ci/cd', 'jenkins',
    'jest', 'mocha', 'cypress', 'testing library',
    'data structures', 'algorithms', 'object oriented programming', 'oop',
    'machine learning', 'langchain', 'data science', 'tensorflow', 'pytorch',
    'mern stack', 'mean stack'
];

/**
 * Extracts skills from the raw text of a resume.
 * @param {string} resumeText - The full text content of the resume.
 * @returns {string[]} An array of unique skills found in the text.
 */
export const extractSkillsFromResume = (resumeText) => {
    if (!resumeText) {
        return [];
    }

    const lowercasedText = resumeText.toLowerCase();
    const foundSkills = new Set(); // Use a Set to avoid duplicate skills

    SKILL_KEYWORDS.forEach(skill => {
        // Use a regular expression with word boundaries (\b) to match whole words
        // This prevents "java" from matching "javascript".
        const regex = new RegExp(`\\b${skill}\\b`, 'g');
        if (lowercasedText.match(regex)) {
            // Normalize skills, e.g., 'react.js' becomes 'React.js'
            const normalizedSkill = skill.charAt(0).toUpperCase() + skill.slice(1);
            foundSkills.add(normalizedSkill);
        }
    });

    return Array.from(foundSkills);
};
