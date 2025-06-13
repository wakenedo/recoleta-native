import { Address } from "../../../types";

interface RegisteredAddressCardProps {
  item: Address;
  onSelect: (id: string) => void;
  selected: boolean;
}
export { RegisteredAddressCardProps };
