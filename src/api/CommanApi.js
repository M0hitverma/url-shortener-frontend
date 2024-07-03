const origin = process.env.NEXT_PUBLIC_BASE_URL;
const smart_link_url = `${origin}/url/`;
const get_smart_link_url = `${origin}/user/smartlinks`;
export const createSmartLink = async (title,url) => {
  try {
    return await fetch(smart_link_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url , title: title}),
      credentials: "include",
    })
      .then((resp) => {
        if (resp.ok) return resp.json();
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const getSmartLinks = async () => {
  try {
    return await fetch(get_smart_link_url, {
      method: "GET",
      credentials: "include",
    })
      .then((resp) => {
        return resp.json();
      })
      .catch((error) => {
        console.log("Get SmartLinks Error: ", error);
      });
  } catch (error) {
    console.log("Get SmartLinks Error: ", error);
  }
};
