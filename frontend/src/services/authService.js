export const loginUser = async (username, password) => {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    if (data.access_token) {
      return { success: true, token: data.access_token };
    } else {
      return { success: false, message: data.message };
    }
  };
  
  export const registerUser = async (username, password, role) => {
    const response = await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, role }),
    });
    const data = await response.json();
    if (data.message === "User created successfully!") {
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  };
  