export default async function handler(req, res) {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const API_KEY = process.env.ANTHROPIC_API_KEY;

  if (!API_KEY) {
    console.error('ANTHROPIC_API_KEY not found');
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { systemPrompt, canineRanges, petData, bloodWork, reportTier } = req.body;

    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: `${systemPrompt}

${canineRanges}

Pet: ${petData.name}
Breed: ${petData.breed}
Age: ${petData.age} years
Weight: ${petData.weight} lbs
Sex: ${petData.sex}
Spayed/Neutered: ${petData.neuteredSpayed}

Blood Work Results:
${bloodWork}

Generate appropriate educational report for tier: ${reportTier}`
        }]
      })
    });

    if (!anthropicResponse.ok) {
      const errorText = await anthropicResponse.text();
      console.error('Anthropic API error:', anthropicResponse.status, errorText);
      return res.status(anthropicResponse.status).json({ 
        error: `Anthropic API error: ${anthropicResponse.status}` 
      });
    }

    const data = await anthropicResponse.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(data);

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
}




