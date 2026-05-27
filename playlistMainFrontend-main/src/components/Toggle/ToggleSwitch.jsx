import React from "react";
import { Label, Input, Switch } from "./ToggleSwitch";
export default function ToggleSwitch({ checked, onChange }) {
  return (
    <>
      <Label>
        <Input checked={checked} type="checkbox" onChange={onChange} />
        <Switch />
      </Label>
    </>
  );
}


