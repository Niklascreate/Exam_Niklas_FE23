import useUserStore from '../../../store/userStore';

const handleLogout = () => {
  useUserStore.getState().clearUser(); // ✅ Tar bort användaren & token från Zustand
  console.log("Utloggad!");
};
