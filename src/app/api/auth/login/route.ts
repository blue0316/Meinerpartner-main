import { methodNotAllowed } from "@hapi/boom";
import type { NextApiRequest, NextApiResponse } from "next";
console.log("logingingnis");

const userHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    console.log("Hello2");
    // throw methodNotAllowed("Method not allowed");
  } else if (req.method === "POST") {
    console.log("Hello1");
  } else if (req.method === "OPTIONS") {
    return res.status(200).send("ok");
  }
};

export default userHandler;
