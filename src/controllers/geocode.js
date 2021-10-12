import request from "request";
import OAuth from "oauth-1.0a";
import crypto from "crypto";
import config from "../config/config";
import asyncWrap from "../utils/asyncWrap";

import { getCoordinates } from "../services/geocode";
const authHere = (req, res, next) => {
  const getAuth = () => {
    const oauth = OAuth({
      consumer: config.hereCredentials,
      signature_method: "HMAC-SHA256",
      hash_function(base_string, key) {
        return crypto
          .createHmac("sha256", key)
          .update(base_string)
          .digest("base64");
      },
    });

    const requestData = {
      url: "https://account.api.here.com/oauth2/token",
      method: "POST",
      data: { grant_type: "client_credentials" },
    };
    const headers = oauth.toHeader(oauth.authorize(requestData));
    const callback = (err, response, body) => {
      if (err) {
        throw err;
      }
      if (response.statusCode === 200) {
        const result = JSON.parse(body);
        req.hereAccessToken = result.access_token;
        next();
      }
    };

    const data = {
      url: requestData.url,
      method: requestData.method,
      form: requestData.data,
      headers,
    };
    return request(data, callback);
  };
  getAuth();
};

const find = asyncWrap(async (req, res) => {
  const { address } = req.query;
  const hereToken = req.hereAccessToken;
  const coordinates = await getCoordinates(hereToken, address);
  res.send(coordinates);
});

const GeoCodeController = { authHere, find };
export default GeoCodeController;
