import { ReactNode, useEffect, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import { ArrowForwardIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userName, setUserName] = useState("");
  const navigate = useNavigate()
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken'); 
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const response = await axios.get(`${import.meta.env.VITE_API_URL}api/getProfile/`, config);
          
          setUserName(response.data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleLogout =(e)=>{
    e.preventDefault();
    localStorage.removeItem("accesToken");
    navigate('/login');
  }
  
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} m={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Avatar
                    size={"md"}
                    src={`${import.meta.env.VITE_LOGO_URL}`}                  />
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Link to="/bmi-calculator">
                <Button>BMI-calculator</Button>
              </Link>
              <Link to="/profile">
                <Button>Profile</Button>
              </Link>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    // src={"https://avatars.dicebear.com/api/male/username.svg"}
                    src={`${import.meta.env.VITE_AVATAR_URL}`}  
                  />
                </MenuButton>
                <MenuList alignItems={"center"}>
                  <br />
                  <Center>
                    <Avatar
                      size={"2xl"}
                      // src={"https://avatars.dicebear.com/api/male/username.svg"}
                    src={`${import.meta.env.VITE_AVATAR_URL}`}  

                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Hi, {userName}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  {/* <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem> */}
                  <MenuItem>
                    {" "}
                    <Button
                      rightIcon={<ArrowForwardIcon />}
                      colorScheme="red"
                      variant="outline"
                      onClick={handleLogout}
                    >
                      Log Out
                    </Button>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
