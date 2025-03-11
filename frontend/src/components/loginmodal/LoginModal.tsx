import './loginmodal.css';

function LoginModal() {
  return (
    <div className="login-modal__container">
      <form className="login-modal__form">
        <div className="login-modal__input-wrapper">
          <label className="login-modal__label">NICKNAME</label>
          <input type="text" className="login-modal__input" placeholder="nickname" />
        </div>
        <div className="login-modal__input-wrapper">
          <label className="login-modal__label">LÖSENORD</label>
          <input type="password" className="login-modal__input" placeholder="********" />
        </div>
        <button className="login-modal__button">LOGGA IN MIG</button>
      </form>
    </div>
  );
}

export default LoginModal;
