import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";
import AWS from "aws-sdk";
import { nanoid } from "nanoid";

const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};

const SES = new AWS.SES(awsConfig);

export const register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;
    if (!name) return res.status(400).send("Name required");
    if (!password || password.length < 6) {
      return res
        .status(400)
        .send("Password required and must be min 6 characters long");
    }
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email is taken");

    const hashedPassword = await hashPassword(password);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    console.log("saved user", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error, Try Again.");
  }
};

export const login = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();
    if (!user) return res.status(400).send("No User Found");

    const match = await comparePassword(password, user.password);
    if (!match) return res.status(400).send("Wrong Password");

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    user.password = undefined;
    res.cookie("token", token, {
      httpOnly: true,
      // secure: true
    });

    res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error. Try again");
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.json({ message: "logout success" });
  } catch (err) {
    console.log(err);
  }
};

export const currentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password").exec();
    console.log("CURR USER", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
};

export const sendEmail = async (req, res) => {
  // console.log("send emiail");
  // res.json({ ok: true });
  const params = {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: ["gel.lorraine@gmail.com"],
    },
    ReplyToAddresses: [process.env.EMAIL_FROM],
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
          <html>
            <h1> Reset Password Link </h1>
            <p> Please use following link to reset password</p>
          </html>
          `,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Password Reset Link",
      },
    },
  };

  const emailSend = SES.sendEmail(params).promise();

  emailSend
    .then((data) => {
      console.log(data);
      res.json({ ok: true });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    const shortCode = nanoid(6).toUpperCase();
    const user = await User.findOneAndUpdate(
      { email },
      { passwordResetCode: shortCode }
    );
    if (!user) return res.status(400).send("User not found");

    const params = {
      Source: process.env.EMAIL_FROM,
      Destination: {
        ToAddresses: [email],
      },
      ReplyToAddresses: [process.env.EMAIL_FROM],
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: `
          <html>
            <h1> Reset Password Link </h1>
            <p> Please use following link to reset password</p>
            <h2 style="color:red;"> ${shortCode} </h2>
          </html>
          `,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Password Reset Link",
        },
      },
    };

    const emailSend = SES.sendEmail(params).promise();

    emailSend
      .then((data) => {
        console.log(data);
        res.json({ ok: true });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    console.table({ email, code, newPassword });

    const hashedPassword = await hashPassword(newPassword);

    const user = User.findOneAndUpdate(
      {
        email,
        passwordResetCode: code,
      },
      {
        password: hashedPassword,
        passwordResetCode: "",
      }
    ).exec();
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
    return res.status(400).send("Error, try again.");
  }
};
