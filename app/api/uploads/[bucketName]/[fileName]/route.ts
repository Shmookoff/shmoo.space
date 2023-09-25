import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { getMongooseConnection } from "@/lib/utils/get-mongoose-connection";

export const GET = async (
  req: NextRequest,
  { params }: { params: { bucketName: string; fileName: string } },
) => {
  const connection = await getMongooseConnection();
  const bucket = new mongoose.mongo.GridFSBucket(connection.db, {
    bucketName: params.bucketName,
  });
  const files = await bucket.find({ filename: params.fileName }).toArray();
  const file = files.at(0);

  if (!file) return new NextResponse(null, { status: 404 });

  const stream = bucket.openDownloadStream(
    file?._id,
  ) as unknown as ReadableStream;
  return new NextResponse(stream, {
    headers: { "Content-Type": file.contentType! },
  });
};
