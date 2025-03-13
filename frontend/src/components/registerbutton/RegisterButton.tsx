import './registerbutton.css';

function RegisterButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="register-button__container">
      <button className="register-button" onClick={onClick}>REGISTRERA DIG</button>
    </div>
  )
}

export default RegisterButton
