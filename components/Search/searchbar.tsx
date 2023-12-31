"use client";
import { Select, SelectItem, Button, Input } from "@nextui-org/react";
import { saletypes, propertytypes, priceranges } from "./searchoptions";
import "styles/searchbar.css";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import { useState } from "react";

export default function SearchBar({ className }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSaleType, setSelectedSaleType] = useState("");
  const [selectedPropertyType, setSelectedPropertyType] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("");

  const propertyselections = {
    term: searchTerm,
    saleType: selectedSaleType,
    propertyType: selectedPropertyType,
    priceRange: selectedPriceRange,
  };

  // Function to handle redirection on Enter key press
  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      window.location.href = "/result";
    }
  };
  return (
    <div className={`searchcontainer flex flex-wrap gap-4 ${className} `}>
      <div className="search relative w-full md:w-full lg:w-2/3 xl:w-1/4">
        <input
          type="text"
          className="property-search pl-8"
          placeholder="Region, City, Street"
          onKeyDown={handleKeyPress}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </div>
      <div className="sale-type w-4/12 md:w-1/6 lg:w-1/6 xl:w-1/6">
        <Select
          label="Sale Type"
          className="sale-select"
          radius="sm"
          onChange={(e) => setSelectedSaleType(e.target.value)}
        >
          {saletypes.map((saletype) => (
            <SelectItem key={saletype.value} value={saletype.value}>
              {saletype.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="property-types w-5/12 md:w-3/12 lg:w-3/12 xl:w-1/6">
        <Select
          label="Property Type"
          radius="sm"
          onChange={(e) => setSelectedPropertyType(e.target.value)}
        >
          {propertytypes.map((propertytype) => (
            <SelectItem key={propertytype.value} value={propertytype.value}>
              {propertytype.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="price-range w-4/12 md:w-3/12 lg:w-3/12 xl:w-1/6">
        <Select
          label="Price Range"
          radius="sm"
          onChange={(e) => setSelectedPriceRange(e.target.value)}
        >
          {priceranges.map((pricerange) => (
            <SelectItem key={pricerange.value} value={pricerange.value}>
              {pricerange.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <Link
        href={{
          pathname: "/result",
          query: {
            propertyselections: JSON.stringify(propertyselections),
          },
        }}
      >
        {" "}
        {/* This is the link to the result page */}
        <Button
          radius="sm"
          isIconOnly
          className="w-14 h-14 bg-pr hover:ring ring-dpr"
        >
          <BiSearch size={42} className="p-2  text-w" />
        </Button>
      </Link>
    </div>
  );
}
