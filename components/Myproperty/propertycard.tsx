import React from "react";
import { useState, useReducer, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  CircularProgress,
} from "@nextui-org/react";
import ModalUpdateProperty from "./Modals/ModalUpdateProperty";
import { getProperties, deleteProperty, getBrokerProperties } from "@/backend/lib/helperProperties";
import { useQuery, useQueryClient } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { deleteAction, updateAction } from "@/backend/redux/reducer";
import { ObjectId } from "mongoose";

interface Property {
  _id: ObjectId;
  propertytype: string;
  addimg: string;
  address: string;
  postalcode: string;
  pricetag: number;
  description: string;
  saletype: string;
  city: string;
}

interface CardPropertyProps {
  hoveredIndex: number | null;
  setHoveredIndex: React.Dispatch<React.SetStateAction<number | null>>;
  isDeleteOpen: boolean;
  onDeleteOpen: () => void;
  onDeleteClose: () => void;
  isUpdateOpen: boolean;
  onUpdateOpen: () => void;
  onUpdateClose: () => void;
  cardContainerClass: string;
  isEditable: boolean;
  isInsideModal?: boolean;
  properties: Property[];
}

const formReducer = (state: any, event: any) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};

export default function PropertyCard({
  isEditable = false,
  isInsideModal = false,
}) {

  const [userID, setUserID] = useState('');

  useEffect(() => {
    const getProps = async () => {
      const response = await fetch("/api/auth/session");
      const users = await response.json();
      setUserID(users.user.id)
    };
    getProps();
  }, []);

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cardContainerClass = isInsideModal
    ? "gap-2 grid-cols-3 overflow-y-auto"
    : "gap-4 grid-cols-5";

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const onUpdateOpen = () => setUpdateOpen(true);
  const onUpdateClose = () => setUpdateOpen(false);



  const {isLoading, isError, data, error} = useQuery(['properties', userID],() => getBrokerProperties(userID))
  
  const hasProperties = data && Array.isArray(data) && data.length > 0;

  if (isLoading)
    return (
      <div className="w-full flex text-xl text-center justify-center items-center">
        <CircularProgress label="Loading..." color="secondary" />
      </div>
    );

  if (isError)
    return (
      <div className="w-full flex text-xl text-center justify-center items-center">
        <div>Error: {String(error)}</div>
      </div>
    );

  return (
    <div>
      {hasProperties ?
      (<CardProperty
        hoveredIndex={hoveredIndex}
        setHoveredIndex={setHoveredIndex}
        isDeleteOpen={isDeleteOpen}
        onDeleteOpen={onDeleteOpen}
        onDeleteClose={onDeleteClose}
        isUpdateOpen={isUpdateOpen}
        onUpdateOpen={onUpdateOpen}
        onUpdateClose={onUpdateClose}
        cardContainerClass={cardContainerClass}
        isEditable={isEditable}
        isInsideModal={isInsideModal}
        properties={data}
      />): (<p>No Properties To Show</p>)
      }
    </div>
  );
}

//FUNCTION

function CardProperty({
  hoveredIndex,
  setHoveredIndex,
  isDeleteOpen,
  onDeleteOpen,
  onDeleteClose,
  isUpdateOpen,
  onUpdateOpen,
  onUpdateClose,
  cardContainerClass,
  isEditable,
  isInsideModal,
  properties: data,
}: CardPropertyProps) {
  let CADDollar = new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
  });

  const dataArray = Object.entries(data).map(([key, value]) => ({
    key,
    ...value,
  }));

  const [formData, setFormData] = useReducer(formReducer, {});
  const formID = useSelector((state) => (state as any).app.client.formID);

  const queryClient = useQueryClient();
  const deleteID = useSelector((state) => (state as any).app.client.deleteID);

  const dispatch = useDispatch();

  const deleteHandler = async () => {
    if (deleteID) {
      await deleteProperty(deleteID);
      console.log("Delete ID:", deleteID);
      await queryClient.invalidateQueries('properties');
      await dispatch(deleteAction(null));
    }
  };
  const cancelHandler = async () => {
    console.log("cancel");
    await dispatch(deleteAction(null));
  };
  return (
    <div className={`${cardContainerClass} grid grid-rows-1 p-5`}>
      {dataArray.map((obj, index) => (
        <Card
          shadow="sm"
          key={index}
          isPressable
          onPress={() => console.log("item pressed")} //here is the code that will be executed when the card is pressed
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative"
        >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={obj.propertytype || "Unknown Property"}
              className="w-full object-cover h-[240px]"
              src={obj.addimg || "#"}
            />

            {isEditable && ( // on hover on one of the cards, the edit and delete buttons will appear
              <div
                className={`absolute top-0 left-0 w-full h-full flex flex-col gap-2 justify-center items-center bg-opacity-50 bg-gray-700 z-10 rounded-xl  transition-opacity duration-300 ${
                  hoveredIndex === index ? "opacity-100" : "opacity-0"
                }`}
              >
                <Button
                  variant="solid"
                  className="bg-pr text-w2"
                  size="sm"
                  onPress={() => {
                    dispatch(updateAction(obj._id));
                    onUpdateOpen();
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="solid"
                  color="danger"
                  size="sm"
                  onPress={() => {
                    dispatch(deleteAction(obj._id)); // Assuming obj.key is the unique identifier of the property.
                    onDeleteOpen();
                  }}
                >
                  Delete
                </Button>
              </div>
            )}
          </CardBody>
          <CardFooter className="text-small justify-between">
            {" "}
            {/* //card footer, so like the price and all */}
            <b>{obj.propertytype}</b>
            <p className="text-default-500">
              {`${CADDollar.format(obj.pricetag)}` || "Unknown Price $"}
            </p>
          </CardFooter>
        </Card>
      ))}

      {/*DELETE MODAL*/}

      <Modal size="xs" isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalContent>
          {(onDeleteClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure?
              </ModalHeader>
              <ModalBody>
                <p>Your property will forever be deleted</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  variant="light"
                  onPress={() => {
                    cancelHandler();
                    onDeleteClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={() => {
                    deleteHandler();
                    onDeleteClose();
                  }}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <ModalUpdateProperty
        isOpen={isUpdateOpen}
        onClose={onUpdateClose}
        formID={formID}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}
