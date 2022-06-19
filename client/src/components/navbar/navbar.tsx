import {
  Avatar,
  Box,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Text,
} from "@hope-ui/solid";
import useAuth from "hooks/use-auth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <Box display="flex" alignItems="center" px="$6" py="$4" bgColor="$info11">
      <Text color="$info4" size="sm" fontWeight={600}>
        Solid Trello
      </Text>
      <Box flex={1} />

      <Menu>
        <MenuTrigger
          as={Avatar}
          size="xs"
          name={user()?.name}
          cursor="pointer"
        />
        <MenuContent>
          <MenuItem fontSize="$sm">
            <p onClick={logout}>Logout</p>
          </MenuItem>
        </MenuContent>
      </Menu>
    </Box>
  );
}
