import React, { useReducer, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Button,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { propertytypes, saletypes } from "@/components/Search/searchoptions";
import Success from "../success";
import Error from "../error";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useDispatch } from "react-redux";
import {
  updateProperty,
  getProperties,
  getProperty,
} from "@/backend/lib/helperProperties";
import { updateAction } from "@/backend/redux/reducer";

export default function ModalUpdateProperty({
  isOpen,
  onClose,
  formID,
  formData,
  setFormData,
}: any) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const { isLoading, isError, data, error } = useQuery(
    ["properties", formID],
    () => getProperty(formID)
  );
  const UpdateMutation = useMutation(
    (newData) => updateProperty(formID, newData),
    {
      onSuccess: () => {
        queryClient.prefetchQuery("properties", getProperties);
      },
      onError: () => {
        setIsErrorModalOpen(true);
      },
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const {
    _id,
    propertytype,
    saletype,
    addimg,
    pricetag,
    address,
    postalcode,
    city,
    description,
  } = data;

  const cancelUpdateHandler = async () => {
    console.log("cancel");
    await dispatch(updateAction(null));
  };

  const handleSubmit = async () => {
    if (Object.keys(formData).length == 0) {
      console.log("Nothing has been changed");
      setIsErrorModalOpen(true);
    } else {
      console.log(formData);
      let updatedProperty = Object.assign({}, data, formData);
      console.log(updatedProperty);
      await UpdateMutation.mutate(updatedProperty);
      setIsSuccessModalOpen(true);
      onClose();
    }
  };

  return (
    <>
      <Modal size="4xl" isOpen={isOpen} onClose={onClose} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Property
              </ModalHeader>
              <ModalBody>
                <div className="add-form my-5 px-5 grid grid-cols-3 gap-4 place-items-center mx-auto">
                  <Input
                    isRequired
                    type="faded"
                    radius="sm"
                    label="Address"
                    name="address"
                    onChange={setFormData}
                    defaultValue={address}
                  />
                  <Input
                    isRequired
                    type="faded"
                    radius="sm"
                    label="City"
                    name="city"
                    onChange={setFormData}
                    defaultValue={city}
                  />
                  <Input
                    isRequired
                    type="faded"
                    radius="sm"
                    label="Postal Code"
                    name="postalcode"
                    onChange={setFormData}
                    defaultValue={postalcode}
                  />
                  <Select
                    label="Property Type"
                    radius="sm"
                    isRequired
                    name="propertytype"
                    onChange={setFormData}
                    defaultValue={propertytype}
                  >
                    {propertytypes.map((propertytype) => (
                      <SelectItem
                        key={propertytype.value}
                        value={propertytype.value}
                      >
                        {propertytype.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    isRequired
                    label="Sale Type"
                    className="sale-select"
                    radius="sm"
                    name="saletype"
                    onChange={setFormData}
                    defaultValue={saletype}
                  >
                    {saletypes.map((saletype) => (
                      <SelectItem key={saletype.value} value={saletype.value}>
                        {saletype.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    isRequired
                    type="price"
                    label="Price"
                    radius="sm"
                    className="pricetag"
                    name="pricetag"
                    onChange={setFormData}
                    defaultValue={pricetag}
                  />
                </div>
                <Textarea
                  label="Description"
                  name="description"
                  isRequired
                  type="faded"
                  labelPlacement="outside"
                  placeholder="Enter the description of your property"
                  className={`max-w-xl px-20 mb-5 description`}
                  data-focus="false"
                  classNames={{
                    input: "border-none focus:ring-0",
                  }}
                  onChange={setFormData}
                  defaultValue={description}
                />
                <div className="addimage px-20 flex flex-col gap-3 max-w-xl">
                  <input
                    type="file"
                    className="add-img"
                    name="addimg"
                    onChange={setFormData}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    cancelUpdateHandler();
                    onClose();
                  }}
                >
                  Cancel
                </Button>
                <Button color="warning" onPress={handleSubmit}>
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <Success
        message="Property was added successfully"
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
      <Error
        message="Nothing has been changed."
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
      />
    </>
  );
}
