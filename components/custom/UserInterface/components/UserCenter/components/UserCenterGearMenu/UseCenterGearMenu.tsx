import React, { FC } from "react";
import { LogoutMenuItem } from "./components/LogoutMenuItem";
import { GearMenuContainer } from "./components/GearMenuContainer";
import { gearMenuItemData } from "./utils";
import { GearMenuItem } from "./components/GearMenuItem";

interface UserCenterGearMenuProps {
  userType?: string;
  onLogout?: () => Promise<any>;
  setShowActions: (show: boolean) => void;
}

const UseCenterGearMenu: FC<UserCenterGearMenuProps> = ({
  onLogout,
  setShowActions,
  userType,
}) => {
  const ProducesWasteUser = userType === "PRODUCES_WASTE";
  const CollectsWasteUser = userType === "COLLECTS_WASTE";
  const isWasteProducer = ProducesWasteUser && !CollectsWasteUser;
  const isWasteCollector = !ProducesWasteUser && CollectsWasteUser;
  return (
    <GearMenuContainer
      isWasteCollector={isWasteCollector}
      isWasteProducer={isWasteProducer}
    >
      {gearMenuItemData.map((item) => {
        return (
          <GearMenuItem
            key={item.id}
            title={item.title}
            setShowActions={setShowActions}
            isWasteProducer={isWasteProducer}
            isWasteCollector={isWasteCollector}
            redirectUrl={item.redirectUrl}
          />
        );
      })}

      <LogoutMenuItem setShowActions={setShowActions} onLogout={onLogout} />
    </GearMenuContainer>
  );
};
export default UseCenterGearMenu;
