import { LoginResponse, RegisterData } from '../interface/interface';

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
export const loginUser = async (nickname: string, password: string): Promise<LoginResponse> => {
  try {
    console.log("Skickar inloggningsuppgifter:", { nickname, password });

    const response = await fetch("https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/login/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname, password }),
    });

    console.log("API Response Status:", response.status);
    const jsonResponse = await response.json();
    console.log("API Response Body:", jsonResponse);

    if (!response.ok) throw new Error(jsonResponse.data?.message || "Inloggning misslyckades");

    return jsonResponse.data;
  } catch (error) {
    console.error("Fel vid inloggning:", error);
    throw error;
  }
};



//Api anrop för registrering.
export async function registerUser(userData: RegisterData) {
  try {
    const response = await fetch("https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/register/key-S5T6U", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Registrering misslyckades");
    }

    return await response.json();
  } catch (error) {
    console.error("Registreringsfel:", error);
    throw error;
  }
}