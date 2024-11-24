import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Button,
  VStack,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, ArrowBackIcon, Search2Icon } from "@chakra-ui/icons";
import chatContext from "../../context/chatContext";

const CreateGroup = ({ setactiveTab }) => {
  const context = useContext(chatContext);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const toast = useToast();

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${context.ipadd}/user/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const userData = await response.json();
      setUsers(userData.filter((user) => user._id !== context.user._id)); // Exclude the current user
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserSelection = (userId) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName) {
      toast({
        title: "Error",
        description: "Please provide a group name.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (selectedUsers.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one member.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const groupData = {
      groupName,
      members: [context.user._id, ...selectedUsers], // Include the creator in the group
    };

    try {
      const response = await fetch(`${context.ipadd}/conversation/create-group`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify(groupData),
      });

      if (!response.ok) throw new Error("Failed to create group.");

      const newGroup = await response.json();
      context.setmychatList([newGroup, ...context.mychatList]);
      setactiveTab(0);
      toast({
        title: "Success",
        description: "Group created successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error creating group:", error);
      toast({
        title: "Error",
        description: "An error occurred while creating the group.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Flex justify="space-between" mb={4}>
        <Button onClick={() => setactiveTab(0)}>
          <ArrowBackIcon />
        </Button>
        <Input
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          w="70%"
        />
      </Flex>

      <VStack align="stretch" spacing={2}>
        {users.map((user) => (
          <Flex key={user._id} align="center" justify="space-between">
            <Flex align="center">
              <Box>
                <img
                  src={user.profilePic}
                  alt={user.name}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                  }}
                />
              </Box>
              <Text ml={3}>{user.name}</Text>
            </Flex>
            <Checkbox
              isChecked={selectedUsers.includes(user._id)}
              onChange={() => handleUserSelection(user._id)}
            />
          </Flex>
        ))}
      </VStack>

      <Button
        mt={4}
        colorScheme="purple"
        w="full"
        onClick={handleCreateGroup}
      >
        Create Group <AddIcon ml={2} />
      </Button>
    </Box>
  );
};

export default CreateGroup;
