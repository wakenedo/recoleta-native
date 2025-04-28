interface GearMenuItemProps {
  setShowActions: (show: boolean) => void;
  title: string;
  redirectUrl: string;
  isWasteProducer: boolean;
  isWasteCollector: boolean;
}

interface GearMenuContainerProps {
  isWasteProducer: boolean;
  isWasteCollector: boolean;
  children: React.ReactNode;
}

interface LogoutMenuItemProps {
  onLogout?: () => Promise<any>;
  setShowActions: (show: boolean) => void;
}

interface GearMenuContainerProps {
  isWasteProducer: boolean;
  isWasteCollector: boolean;
  children: React.ReactNode;
}

type redirectUrlType = "/Home" | "/AuthScreen" | "/CalendarScreen";

export {
  GearMenuItemProps,
  GearMenuContainerProps,
  LogoutMenuItemProps,
  redirectUrlType,
};
