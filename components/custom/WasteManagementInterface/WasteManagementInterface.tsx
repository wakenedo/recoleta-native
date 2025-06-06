import React from "react";
import { SelectableResidueIcons } from "./SelectableResidueIcons";
import { AvailableDate } from "./AvailableDate";
import { ScheduleHour } from "./ScheduleHour";
import { FormControl } from "@/components/ui/form-control";
import { useResidue } from "@/hooks/useResidue";

interface WasteManagementInterfaceProps {}

export const WasteManagementInterface: React.FC<
  WasteManagementInterfaceProps
> = ({}) => {
  const {
    selectedResidue,
    selectedVariant,
    weight,
    selectedCondition,
    selectedPackage,
    selectedDate,
    selectedHour,
    photo,
    setResidue,
    setVariant,
    setWeight,
    setCondition,
    setPackage,
    setDate,
    setHour,
    setPhoto,
    setResidues,
    getResiduesAsArray,
  } = useResidue();

  return (
    <FormControl className="space-y-6 border-l rounded-md p-4 bg-white border-orange-300 shadow">
      <SelectableResidueIcons
        photo={photo}
        setPhoto={setPhoto}
        weight={weight}
        setWeight={setWeight}
        selectedResidue={selectedResidue}
        selectedCondition={selectedCondition}
        selectedPackage={selectedPackage}
        setCondition={setCondition}
        setPackage={setPackage}
        setResidue={setResidue}
        setResidues={setResidues}
        selectedVariant={selectedVariant}
        setVariant={setVariant}
        getResiduesAsArray={getResiduesAsArray}
      />
      <AvailableDate selectedDate={selectedDate} setSelectedDate={setDate} />
      <ScheduleHour
        selectedHour={selectedHour}
        selectedDate={selectedDate}
        setSelectedHour={setHour}
      />
    </FormControl>
  );
};
export default WasteManagementInterface;
