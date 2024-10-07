import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home';
import ErrorPage from "./ErrorPage";
import PostPage from "../pages/PostPage";
import ReadPostPage from "../pages/ReadPostPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />
    },

    {
        path: 'posts/:postId',
        element: <ReadPostPage />,
    },

    {
        path: 'posts/edit/:postId',
        element: <PostPage />,
    }


])

export default router;