const RESIDUE_CONDITIONS = ["Limpo", "Sujo", "Misto"];
const PACKAGE_OPTIONS = ["Caixa de Papelão", "Saco de Lixo", "Solto"];
const RESIDUE_CARDS = [
  {
    id: "1",
    name: "Papel", // Nome exibido para o usuário
    apiName: "Paper", // Nome esperado pela API
    image: "https://i.ibb.co/k25g5Lpv/paper.png",
    alt: "Papel",
  },
  {
    id: "2",
    name: "Plástico",
    apiName: "Plastic",
    image: "https://i.ibb.co/qMX0rPkM/plastic.png",
    alt: "Plástico",
  },
  {
    id: "3",
    name: "Vidro",
    apiName: "Glass",
    image: "https://i.ibb.co/GfM37wgP/glass.png",
    alt: "Vidro",
  },
  {
    id: "4",
    name: "Eletrônico",
    apiName: "Electronic",
    image: "https://i.ibb.co/tTJGbF1M/electronic.png",
    alt: "Eletrônico",
  },
  {
    id: "5",
    name: "Orgânico",
    apiName: "Organic",
    image: "https://i.ibb.co/tj5g2mm/organic.png",
    alt: "Orgânico",
  },
  {
    id: "6",
    name: "Metal",
    apiName: "Metal",
    image: "https://i.ibb.co/nN0kbw0J/metal.png",
    alt: "Metal",
  },
];
export { RESIDUE_CONDITIONS, PACKAGE_OPTIONS, RESIDUE_CARDS };

/* https://i.ibb.co/kgrQYvff/can.png
https://i.ibb.co/spzS5tkw/bottle.png */
