import { getPayloadClient } from "@/payload/payloadClient";

export const getMongooseConnection = async () => {
  const payload = await getPayloadClient();
  return payload.collections[Object.keys(payload.collections)[0]].Model.db;
};
