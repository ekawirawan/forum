import { Home, User2, MenuSquare, Search } from "lucide-react";

export const links = [
  {
    name: "Home",
    hash: "/",
    icon: <Home />,
  },
  {
    name: "Search",
    hash: "/search",
    icon: <Search />,
  },
  {
    name: "My Post",
    hash: "/post",
    icon: <MenuSquare />,
  },
  {
    name: "Profile",
    hash: "/profile",
    icon: <User2 />,
  },
];
