import { LoginResponse, RegisterData, UserDataResponse } from '../interface/interface';


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

//Hämta en användare.
export const fetchUser = async (userId: string, token: string): Promise<UserDataResponse> => {
  try {
    const response = await fetch(`https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/get/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Kunde inte hämta användarprofil.");
    }

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error("Fel vid hämtning av användardata:", error);
    throw error;
  }
};

//Api anrop för att uppdatera intressen.
export const updateUserInterests = async (token: string, userId: string, interests: string[]) => {
  try {
    const response = await fetch(`https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/update/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ interests }),
    });

    if (!response.ok) {
      throw new Error("Misslyckades att uppdatera intressen.");
    }

    return await response.json();
  } catch (error) {
    console.error("Fel vid uppdatering av intressen:", error);
    throw error;
  }
};
