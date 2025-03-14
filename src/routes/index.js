import UserRoutes from "./user.routes.js";
import PostRoutes from "./post.routes.js";
import CommentRoutes from "./comment.routes.js";
import CategoryRoutes from './category.routes.js'
import ProductRoutes from './product.routes.js'
import BannerProducts from './banner.routes.js'
import cartRoutes from './cart.routes.js'
import orderRoutes from './order.routes.js'
const routes = (app) => {
    app.use("/users", UserRoutes);
    app.use("/user/cart", cartRoutes);
    app.use("/users/post", PostRoutes);
    app.use("/users/post/comment", CommentRoutes);
    app.use("/category", CategoryRoutes);
    app.use("/api/product", ProductRoutes);
    app.use("/api/banner", BannerProducts);
    app.use("/api/order", orderRoutes);
};
export default routes;