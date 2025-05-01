import React from "react";
import {
  CalendarCheck,
  ChartColumn,
  HistoryIcon,
  User2,
} from "lucide-react-native";

const gearMenuItemData = [
  {
    id: 1,
    title: "Perfil",
    redirectUrl: "/UserProfileScreen",
  },
  {
    id: 2,
    title: "Histórico",
    redirectUrl: "/HistoryScreen",
  },
  {
    id: 3,
    title: "Calendário",
    redirectUrl: "/CalendarScreen",
  },
  {
    id: 4,
    title: "Estatísticas",
    redirectUrl: "/StatsScreen",
  },
];

const determineIcon = (title: string) => {
  switch (title) {
    case "Perfil":
      return <User2 size={18} color="#f8fafc" />;
    case "Histórico":
      return <HistoryIcon size={18} color="#f8fafc" />;
    case "Calendário":
      return <CalendarCheck size={18} color="#f8fafc" />;
    case "Estatísticas":
      return <ChartColumn size={18} color="#f8fafc" />;
    default:
      return null;
  }
};
export { gearMenuItemData, determineIcon };
