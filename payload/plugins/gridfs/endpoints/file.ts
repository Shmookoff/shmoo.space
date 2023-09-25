import { Endpoint } from "payload/config";
import { Config } from "@/payload/payload-types";
import { CollectionConfig } from "payload/types";
import { FileData, FileSize } from "payload/dist/uploads/types";
import { TypeWithID } from "payload/dist/collections/config/types";

interface ConstructFileEndpointOpts {
  collectionConfig: CollectionConfig;
  path: string;
}

export const constructFileEndpoint = ({
  path = "/file",
  collectionConfig,
}: ConstructFileEndpointOpts): Omit<Endpoint, "root"> => ({
  path: `${path}/:filename`,
  method: "get",
  handler: async (req, res, next) => {
    res.status(200).json({ path });
    // const doc = await req.payload.findByID({
    //   collection: collectionConfig.slug as keyof Config["collections"],
    //   id: req.params.id,
    // }) as (FileSize | FileData) & TypeWithID;
    // doc.
  },
});
