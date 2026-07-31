import axios from 'axios'
import EmailHistory from '../model/emailHistory.js'

export const generateEmail = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ message: 'Prompt is required' });
        }

        if (typeof prompt !== 'string') {
            return res.status(400).json({ message: 'Prompt must be a string' });
        }

        if (prompt.trim().length === 0) {
            return res.status(400).json({ message: 'Prompt cannot be empty' });
        }

        if (prompt.length > 2000) {
            return res.status(400).json({ message: 'Prompt cannot exceed 2000 characters' });
        }

        // Call Groq API (Free tier - No quota issues!)
        const groqApiKey = process.env.GROQ_API_KEY;
        if (!groqApiKey) {
            return res.status(500).json({ message: 'AI service is not configured' });
        }

       const systemPrompt = `You are an expert job outreach strategist.

Your task is to generate a HIGH-CONVERTING cold email to a recruiter for a job opportunity.

IMPORTANT:
- Even if the user gives only 2–4 words, assume realistic context.
- Do NOT ask for clarification.
- Make professional assumptions based on the user's request.
- Avoid generic phrases.
- Keep it concise and structured.

====================================================
OUTPUT FORMAT (STRICT)
====================================================

Return ONLY valid JSON:

{
  "subject": "",
  "emailBody": "",
  "LinkedInDM": "",
  "followUpEmail": ""
}

No markdown.
No explanations.
Only JSON.

====================================================
CONTEXT ASSUMPTIONS
====================================================

Interpret the user's request carefully:
- If the user mentions "fresher" or "entry-level", assume 0–1 years of experience, focus on eagerness to learn, academic projects, internships, or strong fundamentals.
- If the user does not mention experience, assume 2+ years of professional experience in backend APIs, scalable systems, or production-level features.
- Always highlight strengths relevant to the role (DSA, system design, backend APIs, scalability, performance, reliability).
- Adapt tone and content to match fresher vs experienced context.

====================================================
SUBJECT LINE RULES
====================================================

• 6–9 words
• Must sound confident
• No generic phrases like:
  - "Quick question"
  - "Looking for opportunity"
  - "Job application"
• Should highlight value or experience (or learning potential for fresher)

Example styles:
"Backend engineer eager to learn scalable APIs"
"Engineer focused on scalable system design"
"Software engineer improving system performance"

====================================================
EMAIL BODY STRUCTURE (STRICT)
====================================================

Keep 60–90 words.

Line 1: Personalized observation about hiring  
Line 2: Mention common hiring/scaling challenge  
Line 3-4: Candidate's experience/strengths (adapt fresher vs experienced)  
Line 5: Specific impact or contribution (projects, internships, or work)  
Line 6: Clear CTA  
Line 7: Sign-off with name and title  

Tone:
• Confident
• Professional
• Not desperate
• No emojis
• No hype words

====================================================
LINKEDIN DM STRUCTURE
====================================================

30–50 words.
Short, conversational.
Observation + value + soft ask.

====================================================
FOLLOW-UP EMAIL STRUCTURE
====================================================

50–80 words.
New angle.
Emphasize long-term value.
Professional urgency.
Clear CTA.

====================================================

Return ONLY valid JSON.`;


        const fullPrompt = `${systemPrompt}\n\nUser REQUEST: "${prompt.trim()}"\n\nGenerate STRONG cold email even if prompt is short. Make smart assumptions. Return ONLY valid JSON:\n{"subject": "...", "emailBody": "...", "LinkedInDM": "...", "followUpEmail": "..."}`;
        const aiResponse = await axios.post('https://api.groq.com/openai/v1/chat/completions',
            {
                model: "llama-3.3-70b-versatile",
                messages: [
                    {
                        role: "user",
                        content: fullPrompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 1024
            },
            {
                headers: {
                    'Authorization': `Bearer ${groqApiKey}`,
                    'Content-Type': 'application/json'
                },
                timeout: 30000
            }
        );

        // Parse the Groq response
        if (!aiResponse.data.choices || !aiResponse.data.choices[0] || !aiResponse.data.choices[0].message) {
            throw new Error('Invalid response from Groq API');
        }

        const generatedText = aiResponse.data.choices[0].message.content;

        // Extract JSON from the response
        const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
        let parsedResponse;

        try {
            parsedResponse = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(generatedText);
        } catch (parseError) {
            console.error('JSON parse error:', parseError, 'Generated text:', generatedText);
            return res.status(500).json({
                message: 'Failed to parse AI response',
                error: 'The AI generated invalid JSON. Please try again.'
            });
        }

        const emailData = {
            subject: parsedResponse.subject || "New Opportunity",
            emailBody: parsedResponse.emailBody || "",
            LinkedInDM: parsedResponse.LinkedInDM || parsedResponse.linkedInDM || parsedResponse.linkedinDM || "",
            followUpEmail: parsedResponse.followUpEmail || ""
        };

        // Validate response data
        if (!emailData.subject || !emailData.emailBody) {
            return res.status(500).json({
                message: 'AI generated incomplete email data. Please try again.'
            });
        }

        // Save to history
        const historyEntry = await EmailHistory.create({
            user: req.user._id,
            prompt: prompt.trim(),
            subject: emailData.subject,
            emailBody: emailData.emailBody,
            LinkedInDM: emailData.LinkedInDM,
            followUpEmail: emailData.followUpEmail
        });

        res.status(200).json(historyEntry);
    } catch (error) {
        console.error('AI Generation Error:', error.response?.data || error.message);

        if (error.response?.status === 429) {
            return res.status(429).json({
                message: 'Too many requests. Please wait a moment before trying again.',
                error: 'Rate limit exceeded'
            });
        }

        res.status(500).json({
            message: 'Failed to generate email',
            error: error.response?.data?.error?.message || error.message
        });
    }
};

export const getHistory = async (req, res) => {
    try {
        const history = await EmailHistory.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch history' });
    }
};