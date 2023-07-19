import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  Image,
} from "@chakra-ui/react";
const BmiCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmiResult, setBMIResult] = useState([]);

  const calculateBMI = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log("tokennn", token);

      if (!token) {
        console.error("No token found in localStorage.");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}api/calculateBMI`,
        { weight: Number(weight), height: Number(height) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { bmi } = response.data;
      console.log(bmi);
      setBMIResult([...bmiResult, { bmi, result: getBMIResultCategory(bmi) }]);
    } catch (error) {
      console.error("Error calculating BMI:", error);
    }
  };

  const getBMIResultCategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi <= 24.9) return "Normal Weight";
    if (bmi >= 25 && bmi <= 29.9) return "Overweight";
    if (bmi >= 30 && bmi <= 34.9) return "Obesity";
    if (bmi >= 35 && bmi <= 39.9) return "Extreme Obesity";
    return "Not-Found";
  };

  return (
    <Center m={4}>

    <Box p={4} m={8}>
      <Heading mb={4}>BMI Calculator</Heading>
      <Flex mb={4} p={5}>
        <Input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          mr={2}
        />
        <Input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          mr={2}
        />
        <Button p={5} size="sm" colorScheme="twitter" onClick={calculateBMI}>Get BMI</Button>
      </Flex>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>BMI Score</Th>
            <Th>Result</Th>
          </Tr>
        </Thead>
        <Tbody>
          {bmiResult.map((item, index) => (
            <Tr key={index}>
              <Td>{item.bmi}</Td>
              <Td>{item.result}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
    <Center maxW="lg" p={4}>
        <Image src="https://near-ethernet-088.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Feb8c1b34-da3c-4cf8-ba13-1f3046992e0e%2FbmiI.jpeg?id=7b3847a5-c914-4f2e-8b34-2fdbac01ced1&table=block&spaceId=159f4c28-9b94-4583-9b02-8afa7bede8e1&width=1060&userId=&cache=v2"/>
    </Center>

    </Center>
  );
};

export default BmiCalculator;
