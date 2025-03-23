import { LoginResponse, RegisterData, UserDataResponse, FriendRequest, WallMessageType  } from '../interface/interface';


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
export const updateUserProfile = async (
  token: string,
  userId: string,
  interests: string[],
  bio: string,
  profileImage?: string
) => {
  try {
    const response = await fetch(
      `https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/update/user/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ interests, bio, profileImage }),
      }
    );

    if (!response.ok) {
      throw new Error(`Misslyckades att uppdatera profil. Status: ${response.status}`);
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    console.error("Fel vid uppdatering av profil:", error);
    throw error;
  }
};


//Hämta online users
export const fetchOnlineUsers = async (): Promise<{ users: Pick<UserDataResponse, "id" | "profileImage" | "nickname">[] }> => {
  try {
    const response = await fetch("https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/get/online/users");

    if (!response.ok) {
      throw new Error("Nätverksfel vid hämtning av användare");
    }

    const data = await response.json();

    return {
      users: data.users.map((user: UserDataResponse) => ({
        id: user.id,
        profileImage: user.profileImage || "assets/maskot4.webp",
        nickname: user.nickname,
      })),
    };
  } catch (error) {
    console.error("Fel vid hämtning av användare:", error);
    return { users: [] };
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

//Hämta en användare utan token
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

//Api-anrop för att lägga till en vän
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
    console.log("Vän tillagd:", data);
    return data;
  } catch (error) {
    console.error("Misslyckades att lägga till vän:", error);
    return null;
  }
};

//api-anrop för väggen
export const addWallMessage = async (userId: string, message: string) => {
  try {
    const response = await fetch("https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/add/wallmessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, message }),
    });

    if (!response.ok) {
      throw new Error("Kunde inte spara inlägget.");
    }

    const data = await response.json();
    return data.post;
  } catch (error) {
    console.error("Fel vid skickande av inlägg:", error);
    return null;
  }
};

//api-anrop för att hämta alla meddelandet på väggen
export const getWallMessages = async (): Promise<WallMessageType[]> => {
  try {
    const response = await fetch("https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/get/wallmessages", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Kunde inte hämta inlägg.");
    }

    const data = await response.json();

    const messages: WallMessageType[] = data.messages.map((msg: { id: string; userId: string; nickname: string; profileImage: string; message: string; createdAt: string }) => ({
      id: msg.id,
      userId: msg.userId,
      nickname: msg.nickname,
      profileImage: msg.profileImage,
      message: msg.message,
      createdAt: msg.createdAt,
    }));

    return messages;

  } catch (error) {
    console.error("Fel vid hämtning av inlägg:", error);
    return [];
  }
};

//api-anrop för att hämta alla vänner
export const getFriends = async (userId: string) => { 
  try {
    const response = await fetch(`https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/get/friends/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Fel vid hämtning av vänner: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return data.friends.map((friend: {
      userId: string;
      firstname: string;
      lastname: string;
      nickname: string;
      profileImage: string;
      createdAt?: string;
    }) => ({
      ...friend,
      id: friend.userId,
      createdAt: friend.createdAt ? new Date(friend.createdAt).toISOString() : null,
    }));
    
  } catch (error) {
    console.error("Misslyckades att hämta vänner:", error);
    return [];
  }
};

//api-anrop för att ladda upp bild
export const uploadProfileImage = async (userId: string, file: File): Promise<string> => {
  const reader = new FileReader();

  const base64String = await new Promise<string>((resolve, reject) => {
    reader.onloadend = () => {
      if (reader.result) {
        resolve(reader.result.toString().split(",")[1]);
      } else {
        reject(new Error("Misslyckades att läsa filen"));
      }
    };
    reader.onerror = () => reject(new Error("Fel vid läsning av fil"));
    reader.readAsDataURL(file);
  });

  const response = await fetch(
    `https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/upload/user/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64String }),
    }
  );

  if (!response.ok) {
    throw new Error("Uppladdning misslyckades");
  }

  const data = await response.json();
  return data.imageUrl;
};

// api-anrop hämta vänförfrågningar
export const getFriendRequests = async (userId: string): Promise<FriendRequest[]> => {
  const res = await fetch(`https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/friend/requests/${userId}`);
  if (!res.ok) throw new Error("Kunde inte hämta vänförfrågningar");

  const data = await res.json();

  if (Array.isArray(data.friendRequests)) {
    return data.friendRequests.map((item: { from: string; nickname: string; profileImage: string; firstname: string; lastname: string }): FriendRequest => ({
      id: item.from,
      nickname: item.nickname,
      profileImage: item.profileImage,
      firstname: item.firstname,
      lastname: item.lastname,
    }));
  }

  return [];
};

// api-anrop för att acceptera vänförfrågan
export const respondToFriendRequest = async (
  requesterId: string,
  userId: string
) => {
  const endpoint = "https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/friend/accept";

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      requesterId
    }),
  });

  if (!res.ok) throw new Error("Kunde inte acceptera vänförfrågan");
};

//api-anrop för att neka en vänförfrågan
export const rejectFriendRequest = async (
  requesterId: string,
  userId: string
): Promise<void> => {
  const res = await fetch("https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/friend/reject", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      requesterId,
    }),
  });

  if (!res.ok) {
    throw new Error("Kunde inte neka vänförfrågan");
  }
};


//api-anrop för att ta bort en vän
export const deleteFriend = async (userId: string, friendId: string) => {
  try {
    const response = await fetch("https://cjq9abv0ld.execute-api.eu-north-1.amazonaws.com/friend/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, friendId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Något gick fel vid borttagning av vän.");
    }
    return data;

  } catch (error) {
    console.error("Fel vid borttagning av vän:", error);
    throw error;
  }
};
