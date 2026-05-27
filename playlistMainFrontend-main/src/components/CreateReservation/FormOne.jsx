import React from "react";
import Banner from "../CreateReservation/components/Banner";
//import Body from "../CreateReservation/components/Body";
import Header from "./components/Header";
import FormGroup from "./components/Form";

import { useLocation } from "react-router-dom";

export default function FormOne({
  type,
  setFormOneData,
  setActiveStep,
  initialData,
}) {
  const location = useLocation();

  return (
    <div>
      <div>
        <Header type="Basic Info" />
      </div>
      <FormGroup
        type={type}
        initialData={initialData}
        setFormOneData={setFormOneData}
        setActiveStep={setActiveStep}
      />
    </div>
  );
}


