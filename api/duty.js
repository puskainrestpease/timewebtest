export default async function handler(req, res) {
    const { token } = req.query;
  
    try {
      const response = await fetch(`http://83.217.220.161:5000/api/duty?token=${token}`);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Ошибка сервера' });
    }
}
  