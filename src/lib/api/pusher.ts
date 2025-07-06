import { api } from "../axios";

export const submitName = async (name: string) => {
  const response = await api.post("/pusher", { name, action: "submit-name" });
  return response.data;
};

export const getNames = async () => {
  const response = await api.post("/pusher", { action: "get-names" });
  return response.data.names;
};
