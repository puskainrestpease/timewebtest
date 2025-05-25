export default async function handler(req, res) {
    const { token } = req.query;
  
    try {
      const response = await fetch(`http://83.217.220.161:5000/api/user?token=${token}`);
      if (!response.ok) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Ошибка получения информации о пользователе:', error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }
  