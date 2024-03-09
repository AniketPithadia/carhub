"use server";
// import { connectToDb } from "./db";
import { signIn, signOut } from "./auth";
// import bcrypt from "bcryptjs";
// export const handleGithubLogin = async () => {
//   "use server";
//   await signIn("github");
// };

export const handleGoogleLogin = async () => {
  await signIn("google");
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};
export const getSession = async () => {
  return await auth();
};
export const getUserIdFromEmail = async (emailId) => {
  const currentUser = await fetch(
    `http://localhost:4000/api/user/getUser/${emailId}`
  );
  currentUser
    .json()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};
export const fetchCarlistedByUser = async (userId) => {
  const carListed = await fetch(
    `http://localhost:4000/api/user/listings/${userId}`
  );
  carListed
    .json()
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};
// export const register = async (previousState, formData) => {
//   const { username, email, password, img, passwordRepeat } =
//     Object.fromEntries(formData);

//   if (password !== passwordRepeat) {
//     return { error: "Passwords do not match" };
//   }

//   try {
//     connectToDb();

//     const user = await User.findOne({ username });

//     if (user) {
//       return { error: "Username already exists" };
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//       img,
//     });

//     await newUser.save();
//     console.log("saved to db");

//     return { success: true };
//   } catch (err) {
//     console.log(err);
//     return { error: "Something went wrong!" };
//   }
// };

// export const login = async (prevState, formData) => {
//   const { username, password } = Object.fromEntries(formData);

//   try {
//     await signIn("credentials", { username, password });
//   } catch (err) {
//     console.log(err);

//     if (err.message.includes("CredentialsSignin")) {
//       return { error: "Invalid username or password" };
//     }
//     throw err;
//   }
// };
