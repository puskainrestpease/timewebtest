export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  
    const { prompt, token } = req.body;
  
    try {
      const response = await fetch(`http://83.217.220.161:5000/api/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, token }),
      });
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Ошибка при запросе к бэкенду:', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }
  