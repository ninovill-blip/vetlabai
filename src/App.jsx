export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { petData, bloodWork, reportTier, systemPrompt, canineRanges } = req.body;

  // Validate required fields
  if (!petData || !bloodWork || !systemPrompt) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    console.log('Calling Anthropic API...');
    
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        messages: [{
          role: 'user',
          content: `${systemPrompt}

REPORT TIER: ${reportTier}

${canineRanges}

Pet Information:
Name: ${petData.name}
Breed: ${petData.breed}
Age: ${petData.age} years
Weight: ${petData.weight} lbs
Sex: ${petData.sex}
Neuter Status: ${petData.neuteredSpayed}

Blood Work Results:
${bloodWork}

Generate the appropriate report based on the tier specified above.`
        }]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API error:', response.status, errorText);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Successfully received response from Anthropic');
    
    return res.status(200).json(data);

  } catch (error) {
    console.error('Error in API handler:', error);
    return res.status(500).json({ 
      error: 'Failed to analyze blood work',
      details: error.message 
    });
  }
}
