import Layout from '../components/Layout';
import Schedule from '../components/Schedule';

function SchedulePage() {
  return (
    <Layout>
      <div className="page active">
        <div className="page-header">
          <h1>📅 Расписание</h1>
        </div>
        <Schedule />
      </div>
    </Layout>
  );
}

export default SchedulePage;


