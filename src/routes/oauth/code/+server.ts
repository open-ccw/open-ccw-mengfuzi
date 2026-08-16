import { error, text } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { oauthState } from "../oauthConfig";
import CryptoJS from "crypto-js";

export const POST: RequestHandler = async ({ request, platform }) => {
  const { code } = await request.json<{ code?: string }>();
  if (!code) {
    return error(500, "code is required");
  }
  const key = CryptoJS.enc.Utf8.parse(oauthState.substring(0, 16));
  const decrypted = CryptoJS.AES.decrypt(code, key, {
    iv: CryptoJS.enc.Utf8.parse(platform!.env.SEC_OAUTH_IV),
  }).toString(CryptoJS.enc.Utf8);
  return text(decrypted);
};
