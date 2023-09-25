#!/bin/sh
MONGODB_URI=$(cat /run/secrets/MONGODB_URI) PAYLOAD_SECRET=$(cat /run/secrets/PAYLOAD_SECRET) pnpm build