import { createSignal, Show } from "solid-js";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@hope-ui/solid";
import { HiOutlineEye, HiOutlineEyeOff } from "solid-icons/hi";
import { Navigate } from "solid-app-router";
import useAuth from "hooks/use-auth";

export default function Login() {
  const [showPassword, setShowPassword] = createSignal(false);
  const { login, user } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    login({ email, password });
  }

  if (user()) {
    return <Navigate href="/" />;
  }

  return (
    <Box
      display="flex"
      width="$screenW"
      height="$screenH"
      alignItems="center"
      justifyContent="center"
      bgColor="$blackAlpha12"
    >
      <Box w="$md" p="$8" bg="$accent1" borderRadius="$md">
        <VStack
          as="form"
          spacing="$4"
          alignItems="center"
          onSubmit={handleSubmit}
        >
          <Text fontWeight="$semibold" fontSize="$2xl">
            Log in
          </Text>

          <FormControl required>
            <FormLabel for="email">Email Address</FormLabel>
            <Input
              id="email"
              type="email"
              fontSize="$sm"
              placeholder="Email Address"
            />
          </FormControl>

          <FormControl required>
            <FormLabel for="password">Password</FormLabel>
            <InputGroup>
              <Input
                id="password"
                fontSize="$sm"
                placeholder="Password"
                type={showPassword() ? "text" : "password"}
              />
              <InputRightElement
                cursor="pointer"
                onClick={() => setShowPassword(!showPassword())}
              >
                <Show when={showPassword()} fallback={<HiOutlineEye />}>
                  <HiOutlineEyeOff />
                </Show>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button fullWidth type="submit">
            Log In
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
