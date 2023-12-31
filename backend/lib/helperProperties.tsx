const BASE_URL = "http://localhost:3000";

// Get all properties
export const getProperties = async () => {
  const response = await fetch(`${BASE_URL}/api/property`);
  const json = await response.json();

  return json;
};

// Get properties for broker in session
export const getBrokerProperties = async (brokerID: any) => {
  const response = await fetch(`${BASE_URL}/api/brokerproperty/${brokerID}`);
  const json = await response.json();

  return json;
};

// get property by id
export const getProperty = async (propertyId: any) => {
  const response = await fetch(`${BASE_URL}/api/property/${propertyId}`);
  const json = await response.json();

  if (json) return json;
  return {};
};

// Adding a new Property
export async function addProperty(formData: any) {
  try {
    const Options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URL}/api/property`, Options);
    const json = await response.json();

    return json;
  } catch (error) {
    return "ERROR FOUND";
  }
}

// Update a new Property
export async function updateProperty(propertyId: any, formData: any) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  const response = await fetch(
    `${BASE_URL}/api/property/?propertyId=${propertyId}`,
    Options
  );
  const json = await response.json();
  return json;
}

// Delete a new Property
export async function deleteProperty(propertyId: any) {
  const Options = {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  };

  const response = await fetch(
    `${BASE_URL}/api/property/?propertyId=${propertyId}`,
    Options
  );
  const json = await response.json();
  return json;
}

// Get filtered properties
export const getPropertiesFiltered = async (filters = {}) => {
  const response = await fetch(
    `${BASE_URL}/api/propertyfilter?${new URLSearchParams(filters)}`
  );
  const json = await response.json();
  return json;
};
