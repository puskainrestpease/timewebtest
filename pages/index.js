import Layout from '../components/Layout';
import Homework from '../components/Homework';
import Loading from '../components/Loading';
import AccessDenied from '../components/AccessDenied';
import { useState, useEffect } from 'react';

function HomePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    async function loadUserInfo() {
      try {
        const token = new URLSearchParams(window.location.search).get('token');
        if (!token) {
          setAccessDenied(true);
          setIsLoading(false);
          return;
        }
        const response = await fetch(`/api/user?token=${token}`);
        if (!response.ok) {
          setAccessDenied(true);
          setIsLoading(false);
          return;
        }
        const userData = await response.json();
        setUser(userData);
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка загрузки информации о пользователе:', error);
        setAccessDenied(true);
        setIsLoading(false);
      }
    }

    loadUserInfo();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  if (accessDenied) {
    return (
      <Layout>
        <AccessDenied />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page active">
        <div className="page-header">
          <h1>📚 Домашние задания</h1>
        </div>
        <Homework />
      </div>
    </Layout>
  );
}

export default HomePage;
