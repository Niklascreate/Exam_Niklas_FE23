function LoginModal() {
  return (
    <div className="login-modal__container">
      <h2 className="login-modal__title">Login</h2>
      <form className="login-modal__form">
        <input
          type="text"
          className="login-modal__input"
          placeholder="Nickname"
        />
        <input
          type="password"
          className="login-modal__input"
          placeholder="Lösenord"
        />
        <button className="login-modal__button">Login</button>
      </form>
    </div>
  )
}

export default LoginModal
