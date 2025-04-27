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
    redirectUrl: "/Home",
  },
  {
    id: 2,
    title: "Histórico",
    redirectUrl: "/Home",
  },
  {
    id: 3,
    title: "Calendário",
    redirectUrl: "/CalendarScreen",
  },
  {
    id: 4,
    title: "Relatório",
    redirectUrl: "/Home",
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
    case "Relatório":
      return <ChartColumn size={18} color="#f8fafc" />;
    default:
      return null;
  }
};
export { gearMenuItemData, determineIcon };
