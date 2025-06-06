import { SavedResiduesSectionProps } from "@/components/custom/WasteManagementInterface/types";
import { Card } from "@/components/ui/card";
import { LeafIcon, XIcon } from "lucide-react-native";
import React from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";

const SavedResiduesSection: React.FC<SavedResiduesSectionProps> = ({
  residues,
  handleRemove,
  calculatePrice,
}) => {
  return (
    <View className="mt-2 mr-1">
      <Text className="mb-2 text-base font-bold text-orange-600">
        Resíduos Selecionados
      </Text>
      <ScrollView className="border border-orange-300 rounded-md p-2 min-h-36 max-h-80">
        {residues?.length === 0 && (
          <View className="w-full  items-center justify-center">
            <View className="mt-9">
              <LeafIcon size={28} color="#fed7aa" />
            </View>
            <Text className="font-semibold text-orange-200">
              Não há resíduos salvos
            </Text>
          </View>
        )}
        {(residues?.length ?? 0) > 0 && (
          <>
            {residues?.map((r) => (
              <Card
                className="shadow rounded-none border-l border-orange-500"
                key={r.apiName}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginVertical: 4,
                  paddingHorizontal: 12,
                  paddingBottom: 8,
                  paddingTop: 4,
                  backgroundColor: "#ffffff",
                }}
              >
                <View>
                  <View>
                    <Text className="uppercase text-xs text-orange-600">
                      {r.name}
                    </Text>
                  </View>
                  <View className="flex flex-row items-center">
                    <Text className="font-medium text-sm mr-1 text-slate-700">
                      {r.variant && r.variant.label}
                    </Text>
                    <Text className="text-xs text-slate-400 ">
                      | {r.variant ? `R$ ${r.variant.pricePerKg}/kg` : ""}
                    </Text>
                  </View>
                  <View className="flex flex-row items-center">
                    <Text className="text-xs  mr-1 text-slate-400">
                      {r && r.condition}
                    </Text>
                    <Text className="text-xs text-slate-400 ">
                      | {r.variant ? `${r.pkg}` : ""}
                    </Text>
                  </View>
                  <View className="flex flex-row items-center mr-1 mt-1">
                    <View className="flex flex-row items-center mt-1">
                      <Text className="text-xs text-slate-400 mr-1">
                        Quantidade:
                      </Text>
                      <Text className="text-md text-slate-600 font-semibold ">
                        {r.weight}kg
                      </Text>
                      <View className="flex flex-row items-center ml-20">
                        <View>
                          <Text className="text-xs text-slate-400 mr-1">
                            Preço:
                          </Text>
                        </View>
                        <View className="flex flex-row items-center">
                          <View>
                            <Text className="text-slate-600 text-sm font-semibold">
                              R${" "}
                            </Text>
                          </View>
                          <Text className="text-lg text-slate-600  -ml-[2px] font-semibold">
                            {r.variant
                              ? calculatePrice(
                                  r.variant,
                                  r.weight !== undefined
                                    ? String(r.weight)
                                    : "0"
                                )
                              : "0"}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  className="absolute top-1 right-1"
                  onPress={() => handleRemove(r.name)}
                >
                  <XIcon size={18} color="red" style={{ marginLeft: 8 }} />
                </TouchableOpacity>
              </Card>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};
export default SavedResiduesSection;
