import { oauth2Client } from "../configs/google-auth.js";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import { google } from "googleapis";

export const googleAuthHandler = async (req, res) => {
  try {
    const { code } = req.body;
    const { tokens } = await oauth2Client.getToken({
      code,
      redirect_uri: "https://ronak232.github.io/PostPal-Intelligent-Photo-Selector/",
    });

    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });
    const userInfo = await oauth2.userinfo.get();

    const { email, name, picture } = userInfo.data;

    let user = await User.findOne({ email });

    if (!user) {
      user = User.create({
        userName: name,
        email,
        image: picture,
      });
    }
    const { _id } = user;
    const getToken = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      sucess: true,
      getToken,
      user,
    });
  } catch (error) {
    console.error("google error ", error.message);
    res.status(500).json({
      message: "internal server error",
    });
  }
};