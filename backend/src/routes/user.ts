import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@riteshy14/medium-common";
import { getPrisma } from "./blog";

export const userRouter = new Hono<{
  Bindings: {
    ACCELERATE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      msg: "inputs are not correct",
    });
  }
  const prisma = getPrisma(c.env.ACCELERATE_URL);

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        password: body.password,
        email: body.email,
      },
    });

    const jwt = await sign(
      {
        id: user.id,
        email: body.email,
      },
      c.env.JWT_SECRET
    );
    return c.json({
      token: jwt,
      user: { name: user.name, id: user.id, email: user.email },
    });
  } catch (error) {
    console.log(error);
    c.status(409); 
    return c.json({
      msg: "Email already exists",
    });
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "incorrect password",
    });
  }

  const prisma = getPrisma(c.env.ACCELERATE_URL);

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(401);
      return c.json({
        msg: "Incorrect emial",
      });
    }

    const jwt = await sign(
      {
        id: user.id,
        email: body.email,
      },
      c.env.JWT_SECRET
    );

    return c.json({
      token: jwt,
      user: { name: user.name, id: user.id, email: user.email },
    });
  } catch (error) {
    c.status(403);
    return c.text(`Something went wrong ${error}`);
  }
});

userRouter.delete("/del/:id", async (c) => {
  const id = c.req.param("id");

  const prisma = getPrisma(c.env.ACCELERATE_URL);

  try {
    const getuser = await prisma.user.delete({
      where: {
        id: id,
      },
    });

    return c.json({
      msg: "user deleted successfully",
    });
  } catch (error) {
    c.status(500);
    return c.json({
      msg: `something went wrong ${error}`,
    });
  }
});

userRouter.get("/all", async (c) => {
  const prisma = getPrisma(c.env.ACCELERATE_URL);

  try {
    const getuser = await prisma.user.findMany({});
    console.log("db is ", getuser);
    return c.json({
      getuser,
    });
  } catch (error) {
    c.status(404);
    return c.json({
      msg: `something wrong ${error}`,
    });
  }
});
