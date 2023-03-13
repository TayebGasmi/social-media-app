import AxiosInstance from "../utils/axiosInstance";
export const sendResetPasswordEmail = async (values) => {
  try {
    const response = await AxiosInstance.post("/token", values);
    return response.data;
  } catch (error) {
    return;
  }
};
export const resetPassword = async (values, user, token) => {
  try {
    const response = await AxiosInstance.patch(
      `/token/${user}/${token}`,
      values
    );
    return response.data;
  } catch (error) {
    return;
  }
};
