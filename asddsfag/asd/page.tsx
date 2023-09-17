import getPayloadClient from "@/payload/payloadClient";

const Asd = async () => {
  const payload = await getPayloadClient();
  const data = await payload.findGlobal({ slug: "siteIdentity" });
  return JSON.stringify(data);
};

export default Asd;
