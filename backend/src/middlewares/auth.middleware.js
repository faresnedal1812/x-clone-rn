import { getAuth } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  const auth = getAuth(req);
  if (!auth || !auth.userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized - you must be logged in" });
  } else {
    next();
  }
};
