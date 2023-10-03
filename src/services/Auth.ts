import qs from "qs";
import instance from "./Api";

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await instance.post("api/auth/local?populate=*", {
    identifier: email,
    password: password,
  });

  const data = await response.data;

  return data;
};
