"use client";
import styles from "@/styles/page.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Chip,
  Button
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  getBrokerOffers, deleteOffers, deleteOffer
} from "../../../backend/lib/helperOffer";
import {deleteProperty} from "../../../backend/lib/helperProperties"
import Status from "../../../components/Result/offerstatus";
import { IoMdCheckmark } from "react-icons/io";
import { CgClose } from "react-icons/cg";



interface Offer {
  _id: string;
  broker_buyer_name: string;
  broker_buyer_address: string;
  broker_buyer_email: string;
  broker_owner: string;
  agency: string;
  offer: string;
  status: string;
  license: string;
  property_address: string;
  property_id: string
  deed_of_sale_date_start: string;
  deed_of_sale_date_end: string;
}

const statusColorMap: Record<Offer["status"], string> = {
  accepted: "success",
  rejected: "danger",
  pending: "warning",
};


export default function Offer() {
  // State to store the offers
  const [offers, setOffers] = useState<Offer[]>([]);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const users = await response.json();
        const data = await getBrokerOffers(users?.user?.id); // Ensure this function is implemented to fetch offers based on the brokerId
        if (data && Array.isArray(data)) {
          // Check if data is an array
          setOffers(data);
          console.log(data)
        } else {
          console.error("Invalid data format received:", data);
        }
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, []);

  const onAccept = async(offerid: string, propertyid: string) => {
    try {

      await deleteProperty(propertyid)
      await deleteOffers(propertyid)

      setOffers(currentOffers => currentOffers.filter(offer => offer.property_id !== propertyid));
      setMessageColor("#4CAF50")
      setMessage("Offer accepted successfully!"); 
      setTimeout(() => setMessage(""), 6000);

    } catch(error){
      console.log(error);
      setMessageColor("#FCC603")
      setMessage("Failed to accept the offer.");
      setTimeout(() => setMessage(""), 6000); 
    }

  };


  const onDecline = async(offerid: string) => {

    try{
      await deleteOffer(offerid)

      setOffers(currentOffers => currentOffers.filter(offer => offer._id !== offerid));
      setMessageColor("#FC0303")
      setMessage("Offer declined successfully!");
      setTimeout(() => setMessage(""), 6000); 
    }

    catch(error){
      console.log(error);
      setMessageColor("#FCC603")
      setMessage("Failed to decline the offer.");
      setTimeout(() => setMessage(""), 6000); 
    }

  };


  return (
    <div className="mx-5 h-full">
      {message && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1000,
            padding: '10px 20px',
            borderRadius: '5px',
            backgroundColor: messageColor, // Green background for success
            color: 'white',
            textAlign: 'center',
            boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.2)',
            animation: 'fadeInOut 3s ease-in-out',
          }}
        >
          {message}
        </div>
      )}
      <div className="font-bold text-3xl my-5 ml-3"> Offers</div>
      {offers.length > 0 ? (
      <Table
        className={`rounded-xl ${styles.containershadow}`}
        classNames={{ wrapper: "bg-w", th: "bg-b text-w2 text-sm text-center" }}
      >
        <TableHeader>
          <TableColumn>Broker Name (Client)</TableColumn>
          <TableColumn>License #</TableColumn>
          <TableColumn>Agency</TableColumn>
          <TableColumn>Current Address</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>Offer</TableColumn>
          <TableColumn>Property Address</TableColumn>
          <TableColumn>Deed Of Sale</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {offers.map((offer) => (
            <TableRow key={offer._id}>
              <TableCell className="text-center">{offer.broker_buyer_name}</TableCell>
              <TableCell className="text-center">{offer.license}</TableCell>
              <TableCell className="text-center">{offer.agency}</TableCell>
              <TableCell className="text-center">{offer.broker_buyer_address}</TableCell>
              <TableCell className="text-center">{offer.broker_buyer_email}</TableCell>
              <TableCell className="text-center">{offer.offer}</TableCell>
              <TableCell className="text-center">{offer.property_address}</TableCell>
              <TableCell className="text-center">{offer.deed_of_sale_date_start}</TableCell>
              <TableCell className="text-center">
                <Chip className="text-white" color={statusColorMap[offer.status] as "default" | "success" | "danger" | "warning" | "primary" | "secondary"}>{offer.status}</Chip>
              </TableCell>
              <TableCell className="text-center pl-5">
          <Button className="bg-green-500 text-white mr-2" startContent={<IoMdCheckmark size={15} />} radius="full" onPress={() => onAccept(offer._id, offer.property_id)} >Accept</Button>
          <Button className="bg-red-500 text-white "startContent={<CgClose size={15} />} radius="full" onPress={() => onDecline(offer._id)}>Decline</Button>
        </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>) : (<div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px',
                  fontSize: '1rem',
                  color: '#666',
                  backgroundColor: '#f3f3f3',
                  borderRadius: '8px',
                  margin: '20px 0'
                }}>
                  You have no offers
                </div>)}
    </div>
  );
}
