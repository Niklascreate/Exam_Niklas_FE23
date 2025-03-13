//Api anrop för att hämta användares intressen.
export const fetchUserInterests = async (email: string): Promise<string[]> => {
  try {
    const response = await fetch(`/api/getInterests?email=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' // Om du använder cookies
    });

    if (!response.ok) {
      throw new Error('Misslyckades att hämta intressen.');
    }

    const data = await response.json();
    return data.interests || [];
  } catch (error) {
    console.error('API-fel:', error);
    return [];
  }
};


//Api anrop för att uppdatera intressen.
export const updateUserInterests = async (token: string, email: string, interests: string[]) => {
  try {
    const response = await fetch('/api/updateUser', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // ✅ Skicka token automatiskt
      },
      body: JSON.stringify({ email, interests }),
    });

    if (!response.ok) {
      throw new Error('Misslyckades att uppdatera intressen.');
    }

    return await response.json();
  } catch (error) {
    console.error('API-fel:', error);
    throw new Error('Det gick inte att uppdatera intressena.');
  }
};



//Api anrop för inloggning.
import { LoginRequest, LoginResponse } from '../interface/interface';

export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    // const response = await fetch('https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/login/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Fel användarnamn eller lösenord.');
    }

    return await response.json();
  } catch (error) {
    console.error('Inloggningsfel:', error);
    throw new Error('Det gick inte att logga in.');
  }
};
