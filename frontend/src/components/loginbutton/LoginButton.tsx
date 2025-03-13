import "./loginbutton.css";

function LoginButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="login-button__container">
      <button className="login-button" onClick={onClick}>
        LOGGA IN
      </button>
    </div>
  );
}

export default LoginButton;
