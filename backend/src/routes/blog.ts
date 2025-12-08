import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@riteshy14/medium-common";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    ACCELERATE_URL: string;
    JWT_SECRET: string;
    DATABASE_URL:string
  },
  Variables:{
    userId: string
  }
}>();

let prisma: any;

export function getPrisma(url: string) {
  if (!prisma) {
      prisma = new PrismaClient({
      accelerateUrl: url
    }).$extends(withAccelerate());
  }
  return prisma;
}

blogRouter.use('/*', async (c, next)=>{
  const authHeader = c.req.header("Authorization") || "";
  const user = await verify(authHeader, c.env.JWT_SECRET)
  if(user){
    c.set("userId", user.id as string);
    await next();
  }else{
    c.status(403);
    return c.json({
      msg : "you are not logged in"
    })
  }
})

blogRouter.post('/', async(c)=>{
  const body = await c.req.json();
  const {success} = createBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message:"Inputs are incorrect"
    })
  }
  const userId = c.get("userId")
  console.log("userid", userId);

  const prisma = getPrisma(c.env.ACCELERATE_URL);

  try {
    const userExists = await prisma.user.findUnique({
    where: { id: userId },
  });

  console.log(userExists);

  if (!userExists) {
     c.status(404)
     return c.json({
      msg: "User not found",
    });
  }

  const blog = await prisma.post.create({
    data:{
      title: body.title,
      content:body.content,
      authorId: userId
    }
  })

  return c.json({
    id: blog.id
  })
  } catch (error) {
    c.status(500);
    return c.json({
      msg:`server db error ${error}`
    })
  }
})

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const {success} = updateBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message:"inputs are incorrects"
    })
  }

  try {
      const blogUpdate = await prisma.post.update({
    where:{
      id: body.id
    },
    data:{
      title:body.title,
      content:body.content
    }
  })

  return c.text("updated!");
  } catch (error) {
    c.status(500);
    return c.json({
      msg:`something went wrong, ${error}`
    })
  }
});

blogRouter.get('/bulk', async (c)=>{
  const page = Number(c.req.query("page") || 1);
  const pageSize = 20;

  const prisma = getPrisma(c.env.ACCELERATE_URL);

  try {
      const blogs = await prisma.post.findMany({
        skip:(page-1)*pageSize,
        take:pageSize,
    select:{
      content:true,
      id:true,
      title:true,
      publish:true,
      author:{
        select:{
          name:true,
          id:true
        }
      }
    }
  });

  console.log("all blogs:", blogs);

  if(!blogs || blogs.length ===0){
    return c.json({msg:"No blog found"})
  }

  return c.json({
    blogs
  })
  } catch (error) {
    console.error("Error fetching blogs:", error);
    c.status(500);
    return c.json({
      msg:`something went wrong : ${error}`
    })
  }
}) 

blogRouter.get("/:id",async (c) => {
  const id = c.req.param("id");

    if (!id) {
    return c.json({ msg: "Invalid blog ID" }, 400);
  }

  const prisma = getPrisma(c.env.ACCELERATE_URL);

  try {
    const getBlog = await prisma.post.findUnique({
      where:{
        id: id
      },
      select:{
        title:true,
        content:true,
        id:true,
        author:{
          select:{
            name:true,
            id:true
          }
        }
      }
    })

    console.log("blog is:", getBlog);
    

    return c.json({
      getBlog
    })
  } catch (error) {
    c.status(500);
    return c.json({
      msg:`error while fetching blog post,${error}`
    })
  }
});


blogRouter.delete('/:id', async (c,next)=>{
  const id = c.req.param('id')
  const userId = c.get("userId");

  if(!id){
    c.status(400);
    return c.json({msg:"Invalid blog id"})
  }

  const prisam = getPrisma(c.env.ACCELERATE_URL);

  try {
    const blog = await prisam.post.findUnique({
      where:{
        id:id
      },
      select:{
        authorId:true
      }
    })

    if(!blog){
      c.status(404);
      return c.json({msg:"blog not found"})
    }

    if(blog.authorId !== userId){
      c.status(403);
      return c.json("not allowed to delete the post")
    }

    await prisam.post.delete({
      where:{
        id:id
      }
    })

    return c.json({
      msg:"post deleted" 
    })
  } catch (error) {
    c.status(500);
    return c.json({
      msg:`Error while deleting blog,${error}`
    })
  }
})


// admin 
blogRouter.delete("/admin/:id",async (c) => {
  const id = c.req.param("id");

    if (!id) {
    return c.json({ msg: "Invalid blog ID" }, 400);
  }

  const prisma = getPrisma(c.env.ACCELERATE_URL);

  try {
    const getBlog = await prisma.post.delete({
      where:{
        id: id
      }
    })

    console.log("blog is: deleted");

    return c.json({
      msg:"deleted"
    })
  } catch (error) {
    c.status(500);
    return c.json({
      msg:`error while fetching blog post,${error}`
    })
  }
});

