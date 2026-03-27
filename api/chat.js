export const config = { maxDuration: 30 };

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body || {};
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Missing message' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: `你是 CREWLOG AI 助手，專門協助台灣影視從業人員解答勞動相關問題，包含：
- 工會加入方式（台北市電影戲劇業職業工會、藝文創作人員職業工會等）
- 勞工保險、全民健康保險投保方式
- 片場合約解讀，勞報單說明
- 影視補助機構資訊（文化部 BAMID、TAICCA、各地電影委員會）
- 薪資糾紛、工時保障、意外保障等勞動法規

回答請用繁體中文，簡潔明瞭，避免過長，重點用條列或換行整理，不要用句號結尾，用逗號或空格代替，回答結尾建議使用者視需要洽詢工會或勞動部 1955 專線`,
        messages: [{ role: 'user', content: message }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Anthropic error:', err);
      return res.status(502).json({ error: 'Upstream error' });
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text || '抱歉，無法取得回應，請稍後再試';
    return res.status(200).json({ reply });
  } catch (err) {
    console.error('Chat handler error:', err);
    return res.status(500).json({ error: 'Internal error' });
  }
}
