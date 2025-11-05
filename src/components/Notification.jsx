const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: type === 'error' ? '#b30000' : '#0f5132',
    backgroundColor: type === 'error' ? '#f8d7da' : '#d1e7dd',
    border: type === 'error' ? '2px solid #f5c2c7' : '2px solid #badbcc',
    borderRadius: '10px',
    padding: '14px 18px',
    margin: '20px 0',
    fontSize: '16px',
    fontWeight: 500,
    boxShadow:
      type === 'error'
        ? '0 4px 10px rgba(220, 53, 69, 0.2)'
        : '0 4px 10px rgba(25, 135, 84, 0.2)',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  }

  return <div style={notificationStyle}>{message}</div>
}

export default Notification
