import { LoginResponse, RegisterData, UserDataResponse } from '../interface/interface';


//Api anrop för inloggning.
export const loginUser = async (nickname: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await fetch("https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/login/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nickname, password }),
    });

    const jsonResponse = await response.json();

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
export const updateUserProfile = async (token: string, userId: string, interests: string[], bio: string) => {

  try {
    const response = await fetch(`https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/update/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ interests, bio }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error("Misslyckades att uppdatera profil.");
    }

    return responseData;
  } catch (error) {
    console.error("Fel vid uppdatering av profil:", error);
    throw error;
  }
};


//Hämta online users
export const fetchOnlineUsers = async () => {
  try {
    const response = await fetch("https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/get/online/users");
    if (!response.ok) throw new Error("Nätverksfel vid hämtning av användare");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fel vid hämtning av användare:", error);
    return [];
  }
};

//Logga ut användare.
export const logoutUser = async (userId: string) => {
  try {
    const response = await fetch("https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/logout/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    });

    if (!response.ok) throw new Error("Fel vid utloggning");

    return await response.json();
  } catch (error) {
    console.error("Fel vid utloggning:", error);
    return null;
  }
};


//Hämta alla användare (tex i searchbar)
export const fetchUsers = async () => {
  try {
    const response = await fetch("https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/get/allusers", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      }
    });

    if (!response.ok) {
      throw new Error(`Fel vid hämtning av användare: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Kunde inte hämta användare:", error);
    return [];
  }
};

//HÄmta en användare utan token
export const fetchUserPage = async (userId: string): Promise<UserDataResponse | null> => {
  try {
    const response = await fetch(`https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/get/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Kunde inte hämta användarprofil.");
    }

    const data = await response.json();

    return data.user;
  } catch (error) {
    console.error("Fel vid hämtning av användardata:", error);
    return null;
  }
};

//Api anrop för att lägga till en vän
export const addFriend = async (userId: string, friendId: string) => {
  try {
    const response = await fetch("https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/add/friend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, friendId }),
    });

    if (!response.ok) {
      throw new Error(`Fel vid tillägg av vän: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ Vän tillagd:", data);
    return data;
  } catch (error) {
    console.error("Misslyckades att lägga till vän:", error);
    return null;
  }
};



