import { GoogleGenerativeAI } from '@google/generative-ai';
import { Platform } from '../types';

// Initialize the Google Generative AI with API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function generatePlatformContent(platform: Platform) {
  try {
    // Update to use the newer model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    console.log('Using Gemini API with key:', process.env.NEXT_PUBLIC_GEMINI_API_KEY?.substring(0, 5) + '...');

    const prompt = `
    Generate a comprehensive article about ${platform.name}, which is a ${platform.category} platform.
    
    Here's some information about the platform:
    - Description: ${platform.description}
    - Reward Type: ${platform.rewardType}
    - Estimated Earning: ${platform.estimatedEarning}
    
    Please structure your response in JSON format with the following sections:
    
    1. intro: A compelling introduction to ${platform.name} (200-300 words)
    2. howItWorks: A detailed explanation of how ${platform.name} works (300-400 words)
    3. prosAndCons: A list of pros and cons with at least 3 items in each category
    4. estimatedEarnings: A detailed breakdown of potential earnings (200-300 words)
    5. faq: Generate 5 frequently asked questions and answers about ${platform.name}
    
    Format the response as valid JSON with these exact keys.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract the JSON part from the response
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || 
                      text.match(/```\n([\s\S]*?)\n```/) || 
                      text.match(/{[\s\S]*}/);
                      
    if (jsonMatch) {
      const jsonText = jsonMatch[1] || jsonMatch[0];
      return JSON.parse(jsonText);
    } else {
      // If no JSON format is detected, try to parse the whole text
      return JSON.parse(text);
    }
  } catch (error) {
    console.error('Error generating content with Gemini:', error);
    // Return a fallback structure if generation fails
    return {
      intro: `${platform.name} is a ${platform.category} platform that offers ${platform.rewardType} rewards.`,
      howItWorks: `${platform.description}`,
      prosAndCons: {
        pros: ['Easy to use', 'Legitimate rewards', 'User-friendly interface'],
        cons: ['Limited availability', 'Requires time investment', 'Rewards may vary']
      },
      estimatedEarnings: `Users can earn approximately ${platform.estimatedEarning} depending on activity level and engagement.`,
      faq: [
        {
          question: `What is ${platform.name}?`,
          answer: `${platform.name} is a ${platform.category} platform that offers ${platform.rewardType} rewards.`
        },
        {
          question: `How much can I earn with ${platform.name}?`,
          answer: `You can earn approximately ${platform.estimatedEarning} depending on your activity level.`
        },
        {
          question: `Is ${platform.name} legitimate?`,
          answer: `Yes, ${platform.name} is a legitimate platform that has been verified.`
        },
        {
          question: `How do I get started with ${platform.name}?`,
          answer: `To get started, simply visit their website and follow the registration process.`
        },
        {
          question: `What type of rewards does ${platform.name} offer?`,
          answer: `${platform.name} offers ${platform.rewardType} rewards to its users.`
        }
      ]
    };
  }
}
