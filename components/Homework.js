import { useState, useEffect } from 'react';

function Homework() {
  const [homework, setHomework] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadHomework() {
      try {
        const token = new URLSearchParams(window.location.search).get('token');
        const response = await fetch(`/api/homework?token=${token}`);
        const data = await response.json();
        setHomework(data);
        setLoading(false);
      } catch (e) {
        setError('Ошибка загрузки заданий');
        setLoading(false);
      }
    }

    loadHomework();
  }, []);

  if (loading) {
    return <div className="loading-placeholder">Загрузка заданий...</div>;
  }

  if (error) {
    return <div className="loading-placeholder">❌ {error}</div>;
  }

  if (!homework || !homework.subjects || Object.keys(homework.subjects).length === 0) {
    return (
      <div className="subject-card">
        <div className="subject-title">🎉 Заданий нет!</div>
        <p>Сегодня можно отдохнуть</p>
      </div>
    );
  }

  return (
    <div className="homework-content">
      {Object.entries(homework.subjects).map(([subject, tasks]) => (
        <div className="subject-card" key={subject}>
          <div className="subject-title">{subject}</div>
          <ul className="task-list">
            {tasks.map((task, index) => (
              <li className="task-item" key={index}>
                • {task}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Homework;
