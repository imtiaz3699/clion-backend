import {prisma} from '../utils/utils.js'

export const createComment = async (req, res) => {
  const { comment, userId, postId } = req.body; // Ensure these values are coming from the request

  try {
    const newComment = await prisma.comment.create({
      data: {
        comment: "First comment",
        post: {
          connect: {
            id: postId, // The `id` of the existing post
          },
        },
        user: {
          connect: {
            id: userId, // The `id` of the existing user
          },
        },
      },
    });
    return res.json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getComment = async (req, res) => {
  const { userId, postId } = req.query;
  const postInt = parseInt(postId, 10);
  const userInt = parseInt(userId, 10);
  let posts;
  try {
    if (userId) {
      posts = await prisma.comment.findMany({
        where: { user_Id: userInt },
      });
      if (!posts) {
        return res.status(404).json({ message: "Post not found." });
      }
    } else if (postId) {
      posts = await prisma.comment.findUnique({
        where: {
          id: postInt,
        },
        include: {
          author: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
      });
      
      if (!posts) {
        return res.status(404).json({ message: "Post not found." });
      }
    } else {
      posts = await prisma.comment.findMany();
    }
    return res.json(posts);
  } catch (e) {
    console.log(e, "IamFinallyE");
    return res.status(500).json({ message: "Server error" });
  }
};

