import { prisma } from "../utils/utils.js";

export const createPost = async (req, res) => {
  const { title, description, authorId } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        description,
        authorId,
      },
    });
    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getPosts = async (req, res) => {
  const { userId, postId } = req.query;
  const postInt = parseInt(postId, 10);
  const userInt = parseInt(userId, 10);
  let posts;
  try {
    if (userId) {
      posts = await prisma.post.findMany({
        where: { authorId: userInt },
      });
      if (!posts) {
        return res.status(404).json({ message: "Post not found." });
      }
    } else if (postId) {
      posts = await prisma.post.findUnique({
        where: {
          id: postInt,
        },
        include:{
            author:{
                select:{
                    first_name:true,
                }
            },
        }
      });
      if (!posts) {
        return res.status(404).json({ message: "Post not found." });
      }
    } else {
      posts = await prisma.post.findMany();
    }
    return res.json(posts);
  } catch (e) {
    console.log(e, "IamFinallyE");
    return res.status(500).json({ message: "Server error" });
  }
};
