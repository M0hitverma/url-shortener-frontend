const origin = process.env.NEXT_PUBLIC_BASE_URL;
const signUpUrl = `${origin}/auth/signup`;
const signInUrl = `${origin}/auth/signin`;
const checkAuthUrl = `${origin}/auth/`;
const logoutUrl = `${origin}/auth/logout`;
export const AuthSignUp = async (user) => {
  try {
    return await fetch(signUpUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      cache: "no-store",
    })
      .then((resp) => {
        return resp.json();
      })
      .catch((error) => {
        console.log("AuthSignUp page Error: ", error);
      });
  } catch (error) {
    console.log("AuthSignUp page Error: ", error);
  }
};

export const AuthSignIn = async (info) => {
  try {
    return await fetch(signInUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(info),
      credentials: "include",
      cache: "no-store",
    })
      .then((resp) => {
        return resp.json();
      })
      .catch((error) => {
        console.log("AuthSignIn page Error: ", error);
      });
  } catch (error) {
    console.log("AuthSignIn page Error: ", error);
  }
};

export const CheckAuth = async () => {
  try {
    return await fetch(checkAuthUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((resp) => {
        return resp.json();
      })
      .catch((error) => {
        console.log("CheckAuth page Error: ", error);
      });
  } catch (error) {
    console.log("CheckAuth page Error: ", error);
  }
};

export const logoutRequest = async () => {
  try {
    return await fetch(logoutUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      cache: "no-cache",
    })
      .then((resp) => {
        return resp.json();
      })
      .catch((error) => {
        console.log("Logout page Error: ", error);
      });
  } catch (error) {}
};
