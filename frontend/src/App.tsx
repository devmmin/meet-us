import { Box, Flex } from "@chakra-ui/react";
import { useRoutes } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./layouts/AdminLayout";
import Blog from "./pages/Blog";
import Notice from "./pages/Notice";
import Main from "./pages/Main";
import UserManagement from "./pages/UserManagement";
import Setting from "./pages/Setting";
import PostUpdate from "./pages/Blog/BlogUpdate";
import NoticeUpdate from "./pages/Notice/NoticeUpdate";
import Auth from "./components/Auth";

const App = () => {
  const routes = [
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          index: true,
          element: (
            <Auth>
              <Main />
            </Auth>
          ),
        },
        {
          path: "main",
          element: (
            <Auth>
              <Main />
            </Auth>
          ),
        },
        {
          path: "notice",
          children: [
            {
              index: true,
              element: (
                <Auth>
                  <Notice />
                </Auth>
              ),
            },
            {
              path: "update",
              children: [
                {
                  index: true,
                  element: (
                    <Auth>
                      <NoticeUpdate />
                    </Auth>
                  ),
                },
                {
                  path: ":id",
                  element: (
                    <Auth>
                      <NoticeUpdate />
                    </Auth>
                  ),
                },
              ],
            },
          ],
        },
        {
          path: "blog",
          children: [
            {
              index: true,
              element: (
                <Auth>
                  <Blog />
                </Auth>
              ),
            },
            {
              path: "update",
              children: [
                {
                  index: true,
                  element: (
                    <Auth>
                      <PostUpdate />
                    </Auth>
                  ),
                },
                {
                  path: ":id",
                  element: (
                    <Auth>
                      <PostUpdate />
                    </Auth>
                  ),
                },
              ],
            },
          ],
        },
        {
          path: "user-management",
          element: (
            <Auth>
              <UserManagement />
            </Auth>
          ),
        },
        {
          path: "setting",
          element: (
            <Auth>
              <Setting />
            </Auth>
          ),
        },
        {
          path: "*",
          element: (
            <Box p="50px" bg="gray.50" minH="100%">
              404 Not Found
            </Box>
          ),
        },
      ],
    },
    { path: "/admin/login", element: <Login /> },
  ];
  return <Flex className="App">{useRoutes(routes)}</Flex>;
};

export default App;
