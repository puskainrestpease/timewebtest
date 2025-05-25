function Duty({ dutyData }) {
    if (!dutyData) {
      return <div className="loading-placeholder">Нет данных о дежурствах</div>;
    }
  
    return (
      <div className="duty-content">
        <div className="duty-section">
          <h3>👥 Дежурные сегодня</h3>
          <ul className="duty-list">
            {dutyData.today && dutyData.today.length > 0 ? (
              dutyData.today.map((name) => (
                <li className="duty-item" key={name}>
                  <span>{name}</span>
                </li>
              ))
            ) : (
              <li className="duty-item">
                <span>Нет данных</span>
              </li>
            )}
          </ul>
        </div>
  
        <div className="duty-section">
          <h3>📅 Следующие дежурства</h3>
          <ul className="duty-list">
            {dutyData.upcoming && dutyData.upcoming.length > 0 ? (
              dutyData.upcoming.map((duty) => (
                <li className="duty-item" key={duty.name + duty.day}>
                  <span>{duty.name}</span>
                  <span>{duty.day} число</span>
                </li>
              ))
            ) : (
              <li className="duty-item">
                <span>Нет данных</span>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
  
export default Duty;
  