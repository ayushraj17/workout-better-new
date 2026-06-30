import { View, Text } from "react-native";
import React from "react";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Button } from "@/components/atomic/button";

export const SettingScreen = () => {
	return (
		<View className="items-center justify-center flex-1 bg-adaptive">
			<Text className="text-xl font-bold text-blue-500">
				Welcome to Nativewind!
			</Text>

			<ThemeSwitcher />
			<Button title="Press me" variant="primary" />
			<Button title="Press me" variant="secondary" />
			<Button title="Press me" variant="outline" />
			<Button title="Press me" variant="ghost" />
			<Button title="Press me" variant="destructive" />
		</View>
	);
};
