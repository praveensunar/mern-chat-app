import chatContext from "../../context/chatContext";
import { useState, useContext, useRef } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  Box,
  Link,
  Avatar,
  FormControl,
  InputRightElement,
  Card,
  CardBody,
  useToast,
  Text,
} from "@chakra-ui/react";
import { LockIcon } from "@chakra-ui/icons";

const Signup = (props) => {
  const context = useContext(chatContext);
  const fileInputRef = useRef(null);
  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phoneNum, setphoneNum] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [profilePic, setprofilePic] = useState(null);

  const handletabs = props.handleTabsChange;

  function showtoast(description) {
    toast({
      title: "An error occurred.",
      description: description,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  const handleChooseFile = () => {
    fileInputRef.current.click();
    setprofilePic(fileInputRef.current.files[0]);
  };

  const handleShowClick = () => setShowPassword(!showPassword);

  // 
  

  // const handleSignup = async (e) => {
  //   e.preventDefault();
  
  //   if (!profilePic || email === "" || name === "" || phoneNum === "" || password === "") {
  //     showtoast("All fields are required, including a profile picture");
  //     return;
  //   }
  
  //   const formData = new FormData();
  //   formData.append("profilePic", profilePic);
  //   formData.append("email", email);
  //   formData.append("name", name);
  //   formData.append("phoneNum", phoneNum);
  //   formData.append("password", password);
  
  //   try {
  //     const response = await fetch(`${context.ipadd}/user/register`, {
  //       method: "POST",
  //       body: formData,
  //     });
  
  //     if (!response.ok) {
  //       const resdata = await response.json();
  //       throw new Error(resdata.error || "Failed to create account");
  //     }
  
  //     const resdata = await response.json();
  //     localStorage.setItem("token", resdata.authtoken);
  //     handletabs(0);
  //     toast({
  //       title: "Account created.",
  //       description: "Your account has been created successfully.",
  //       status: "success",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   } catch (error) {
  //     toast({
  //       title: "Error",
  //       description: error.message,
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   }
  // };
  



  const handleSignup = async (e) => {
    e.preventDefault();
  
    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Only @gmail.com addresses
    const phoneRegex = /^[0-9]{10}$/; // Exactly 10 digits
  
    // Check if all fields are filled
    if (email === "" || name === "" || phoneNum === "" || password === "") {
      showtoast("All fields are required, including a profile picture");
      return;
    }
  
    // Validate email
    if (!emailRegex.test(email)) {
      showtoast("Please enter a valid Gmail address (e.g., user@gmail.com)");
      return;
    }
  
    // Validate phone number
    if (!phoneRegex.test(phoneNum)) {
      showtoast("Phone number must be exactly 10 digits and numeric");
      return;
    }
  
    // Validate passwords match
    if (password !== confirmpassword) {
      showtoast("Passwords do not match");
      return;
    }
  
    // Prepare form data
    const formData = new FormData();
    {
      formData.append("profilePic", profilePic);
    }
    // formData.append("profilePic", profilePic);
    formData.append("email", email);
    formData.append("name", name);
    formData.append("phoneNum", phoneNum);
    formData.append("password", password);
  
    try {
      const response = await fetch(`${context.ipadd}/user/register`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        const resdata = await response.json();
        throw new Error(resdata.error || "Failed to create account");
      }
  
      const resdata = await response.json();
      localStorage.setItem("token", resdata.authtoken);
      handletabs(0);
      toast({
        title: "Account created.",
        description: "Your account has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  




  return (
    <Flex
      flexDirection="column"
      width="100%"
      height="75vh"
      justifyContent="center"
      alignItems="center"
      borderRadius={15}
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="purple.300" />
        <Heading color="pruple.400">Welcome</Heading>
        <Card minW={{ base: "90%", md: "465px" }} borderRadius={15} shadow={0}>
          <CardBody p={0}>
            <form>
              <Stack spacing={2}>
                <FormControl>
                  <InputGroup
                    borderEndRadius={"10px"}
                    borderStartRadius={"10px"}
                    size={"lg"}
                  >
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      focusBorderColor="purple.500"
                      onChange={(e) => setname(e.target.value)}
                      required
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <InputGroup
                    borderEndRadius={"10px"}
                    borderStartRadius={"10px"}
                    size={"lg"}
                  >
                    <Input
                      type="email"
                      placeholder="Email address"
                      focusBorderColor="purple.500"
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <InputGroup
                    borderEndRadius={"10px"}
                    borderStartRadius={"10px"}
                    size={"lg"}
                  >
                    <Input
                      type="number"
                      placeholder="Phone Number"
                      focusBorderColor="purple.500"
                      onChange={(e) => setphoneNum(e.target.value)}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <InputGroup
                    borderEndRadius={"10px"}
                    borderStartRadius={"10px"}
                    size={"lg"}
                  >
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<LockIcon color="gray.300" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      focusBorderColor="purple.500"
                      onChange={(e) => setpassword(e.target.value)}
                    />
                    <InputRightElement mx={1}>
                      <Button
                        fontSize={"x-small"}
                        size={"xs"}
                        onClick={handleShowClick}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <InputGroup
                    borderEndRadius={"10px"}
                    borderStartRadius={"10px"}
                    size={"lg"}
                    my={4}
                  >
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<LockIcon color="gray.300" />}
                    />
                    <Input
                      textOverflow={"ellipsis"}
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      focusBorderColor="purple.500"
                      onChange={(e) => setconfirmpassword(e.target.value)}
                    />
                    <InputRightElement mx={1}>
                      <Button
                        fontSize={"x-small"}
                        size={"xs"}
                        onClick={handleShowClick}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>

                  <Flex align="center">
                    {!profilePic && (
                      <Text mx={2} fontSize="sm">
                        Upload Profile Picture (optional)
                      </Text>
                    )}
                    {profilePic && (
                      <Text mx={2} fontSize="sm">
                        {profilePic.name.length > 30
                          ? profilePic.name.substring(0, 30) + "..."
                          : profilePic.name}
                      </Text>
                    )}
                    <Input
                      display="none"
                      type="file"
                      ref={fileInputRef}
                      onChange={(e) => {
                        console.log("File selected:", e.target.files[0]);
                        setprofilePic(e.target.files[0]);
                      }}
                    />
                    {!profilePic && (
                      <Button
                        colorScheme="purple"
                        onClick={handleChooseFile}
                        borderRadius="10px"
                        borderWidth={0}
                      >
                        <Text mr={2}>Choose File</Text>
                      </Button>
                    )}
                    {profilePic && (
                      <Button
                        size={"sm"}
                        colorScheme="red"
                        onClick={() => setprofilePic(null)}
                        borderRadius="10px"
                        borderWidth={0}
                      >
                        <Text>Remove</Text>
                      </Button>
                    )}
                  </Flex>
                </FormControl>
                <Button
                  borderRadius={10}
                  type="submit"
                  variant="solid"
                  colorScheme="purple"
                  width="full"
                  onClick={handleSignup}
                >
                  Signup
                </Button>
              </Stack>
            </form>
          </CardBody>
        </Card>
      </Stack>
      <Box>
        Already have account?{" "}
        <Link color="purple.500" onClick={() => handletabs(0)}>
          login
        </Link>
      </Box>
    </Flex>
  );
};

export default Signup;
