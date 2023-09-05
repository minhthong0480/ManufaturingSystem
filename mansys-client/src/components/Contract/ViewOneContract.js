import React, { useEffect, useState } from "react";
import { Button, Card } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { ContractService } from "../../services/contract-service";

const ViewOneContract = () => {
  const { contractId } = useParams();
  const [contractDetails, setContractDetails] = useState({});
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchContractDetails = async () => {
//       try {
//         // Use the filter method to fetch a single contract by its ID
//         const filterResult = await ContractService.filter(1, 1, contractId);

//         if (filterResult.isSuccess && filterResult.data.length === 1) {
//           // If one contract is found, set the contract details
//           setContractDetails(filterResult.data[0]);
//         }
//       } catch (error) {
//         // Handle error here
//         console.error("Error fetching contract details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContractDetails();
//   }, [contractId]);

useEffect(() => {
    const fetchContractDetails = async () => {
      try {
        // Use the 'contractId' from useParams in your API call
        const data = await ContractService.getContractDetails(contractId);
  
        if (data && data.code === 200 && data.data) {
          // Set the contract details received from the API response
          setContractDetails(data.data);
        }
      } catch (error) {
        // Handle error here
        console.error("Error fetching contract details:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchContractDetails();
  }, [contractId]);
  

  const handleBackToContractList = () => {
    // Use window.history to navigate back to the contract list page
    window.history.back();
  };

  const renderContractCard = () => {
    return (
      <div>
        <Card title={`Contract ID: ${contractDetails.id}`} style={{ width: "100%" }}>
          <p><strong>Contract Number:</strong> {contractDetails.contractNumber}</p>
          <p><strong>Customer ID:</strong> {contractDetails.customerId}</p>
          <p><strong>User ID:</strong> {contractDetails.userId}</p>
          <p><strong>Start Date:</strong> {contractDetails.dateStart}</p>
          <p><strong>End Date:</strong> {contractDetails.dateEnd}</p>
          <p><strong>Total:</strong> {contractDetails.total}</p>
          <p><strong>Products:</strong></p>
          <ul>
            {contractDetails.products && contractDetails.products.length > 0
              ? contractDetails.products.map((product, index) => (
                  <li key={index}>{product}</li>
                ))
              : "No products available"}
          </ul>
        </Card>
      </div>
    );
  };

  return (
    <div>
      <Button
        type="default"
        icon={<ArrowLeftOutlined />}
        style={{ marginBottom: "20px" }}
        onClick={handleBackToContractList}
      >
        Back to Contract List
      </Button>

      {renderContractCard()}

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ViewOneContract;
