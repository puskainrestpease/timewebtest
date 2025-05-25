import Layout from '../components/Layout';
import Duty from '../components/Duty';
import Loading from '../components/Loading';
import { useState, useEffect } from 'react';

function DutyPage() {
  const [dutyData, setDutyData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDutyData() {
      try {
        const token = new URLSearchParams(window.location.search).get('token');
        const response = await fetch(`/api/duty?token=${token}`);
        const data = await response.json();
        setDutyData(data);
        setIsLoading(false);
      } catch (e) {
        setError('Ошибка загрузки данных о дежурствах');
        setIsLoading(false);
      }
    }

    loadDutyData();
  }, []);

  return (
    <Layout>
      <div className="page active">
        <div className="page-header">
          <h1>👥 Дежурные</h1>
        </div>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="loading-placeholder">❌ {error}</div>
        ) : (
          <Duty dutyData={dutyData} />
        )}
      </div>
    </Layout>
  );
}

export default DutyPage;
