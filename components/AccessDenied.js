function AccessDenied() {
    return (
      <div className="access-denied">
        <div className="error-icon">❌</div>
        <h2>У вас нет доступа</h2>
        <p>Извините, но вы не зарегистрированы в системе</p>
      </div>
    );
  }
  
export default AccessDenied;
  