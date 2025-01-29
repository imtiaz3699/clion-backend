import UserRoutes from "./user.routes.js";
import PostRoutes from "./post.routes.js";
import CommentRoutes from "./comment.routes.js";


const routes = (app) => {
    app.use("/users", UserRoutes);
    app.use("/users/post", PostRoutes);
    app.use("/users/post/comment", CommentRoutes);
};

export default routes;
