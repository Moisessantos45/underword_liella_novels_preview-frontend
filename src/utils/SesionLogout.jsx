import urlAxios from "../config/urlAxios.js";

const SesionLogout = async (email) => {
  try {
    await urlAxios.post("/underwordliellanovels/logout", {
      email,
    });
    return;
  } catch (error) {
    return;
  }
};

export default SesionLogout;
