import LoginButton from '../../components/loginbutton/LoginButton';
import RegisterButton from '../../components/registerbutton/RegisterButton';
import './startpage.css';

function StartPage() {
  return (
    <div className='startpage-container'>
      <h2 className="rubrik">LUNAR<br />CHAT</h2>
      <div className="button-wrapper">
        <LoginButton />
        <RegisterButton />
      </div>
    </div>
  );
}

export default StartPage;
