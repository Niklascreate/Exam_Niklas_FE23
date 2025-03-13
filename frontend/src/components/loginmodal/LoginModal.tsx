import { useState } from 'react';
import { loginUser } from '../../../api/api';
import useUserStore from '../../../store/userStore';

function LoginModal() {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await loginUser({ nickname, password });
      setUser(response.user);
      console.log('Inloggad som:', response.user);
    } catch (err) {
      setError('Fel nickname eller lösenord.');
    }
  };

  return (
    <div className="login-modal__container">
      <form className="login-modal__form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <div className="login-modal__input-wrapper">
          <label className="login-modal__label">NICKNAME</label>
          <input type="text" placeholder="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
        </div>
        <div className="login-modal__input-wrapper">
          <label className="login-modal__label">LÖSENORD</label>
          <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">LOGGA IN MIG</button>
      </form>
    </div>
  );
}

export default LoginModal;
