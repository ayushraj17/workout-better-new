import { View, Text } from "react-native";
import React from "react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";

export const SettingScreen = () => {
	return (
		<View className="items-center justify-center flex-1 bg-adaptive">
			<Text className="text-xl font-bold text-blue-500">
				Welcome to Nativewind!
			</Text>
			<ThemeSwitcher />
		</View>
	);
};
