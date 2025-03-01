import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView>
      <Box className="bg-zinc-50 p-5 bg-gradient-to-tr from-zinc-50 to-emerald-100">
        <Card size="lg" variant="outline">
          <Heading size="3xl" className="text-[#184D00]">
            Sobre Nós
          </Heading>
          <Text className="py-5">
            Bem-vindo ao Recoleta, o aplicativo que está revolucionando a forma
            como lidamos com resíduos. Nossa missão é conectar geradores de
            resíduos, recicladores e tratadores de resíduos em uma rede
            colaborativa para promover a sustentabilidade e a preservação do
            meio ambiente. Nossa missão é conectar geradores de resíduos,
            recicladores e tratadores de resíduos em uma rede colaborativa para
            promover a sustentabilidade e a preservação do meio ambiente.
          </Text>
        </Card>
      </Box>
    </ScrollView>
  );
}
