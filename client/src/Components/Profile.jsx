import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Heading,
  Center,
} from "@chakra-ui/react";

const Profile = () => {
  const [calculationHistory, setCalculationHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalculationHistory = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No token found in localStorage.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
        `${import.meta.env.VITE_API_URL}api/getCalculation`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCalculationHistory(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching calculation history:", error);
        setLoading(false);
      }
    };

    fetchCalculationHistory();
  }, []);

  const getBMIResultCategory = (bmi) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi <= 24.9) return "Normal Weight";
    if (bmi >= 25 && bmi <= 29.9) return "Overweight";
    if (bmi >= 30 && bmi <= 34.9) return "Obesity";
    if (bmi >= 35 && bmi <= 39.9) return "Extreme Obesity";
    return "Not-Found";
  };

  return (
    <Box p={4}>
      {loading ? (
        <Spinner size="lg" color="blue.500" />
      ) : (
        <Center>
          <Box>
            <Heading m="auto" p={8}>
              Calculation-History
            </Heading>

            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Time</Th>
                  <Th>Height</Th>
                  <Th>Weight</Th>
                  <Th>BMI</Th>
                  <Th>Category</Th>
                </Tr>
              </Thead>
              <Tbody>
                {calculationHistory.map((calculation) => (
                  <Tr key={calculation._id}>
                    <Td>{new Date(calculation.date).toLocaleDateString()}</Td>
                    <Td>{new Date(calculation.date).toLocaleTimeString()}</Td>
                    <Td>{calculation.height} cm</Td>
                    <Td>{calculation.weight} kg</Td>
                    <Td>{calculation.bmi.toFixed(2)}</Td>
                    <Td>{getBMIResultCategory(calculation.bmi)}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Center>
      )}
    </Box>
  );
};

export default Profile;
