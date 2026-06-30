import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";
import AppTabs from "../components/app-tabs";

import { usersTable } from "@db/schema";
import migrations from "@drizzle/migrations";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { Text, View } from "react-native";

const expo = SQLite.openDatabaseSync("db.db");

const db = drizzle(expo);

export default function TabLayout() {
	const { success, error } = useMigrations(db, migrations);
	const [items, setItems] = useState<(typeof usersTable.$inferSelect)[] | null>(
		null,
	);

	useEffect(() => {
		if (!success) return;

		(async () => {
			await db.delete(usersTable);

			await db.insert(usersTable).values([
				{
					name: "John",
					age: 30,
					email: "john@example.com",
				},
			]);

			const users = await db.select().from(usersTable);
			setItems(users);
		})();
	}, [success]);

	if (error) {
		return (
			<View>
				<Text>Migration error: {error.message}</Text>
			</View>
		);
	}

	if (!success) {
		return (
			<View>
				<Text>Migration is in progress...</Text>
			</View>
		);
	}

	if (items === null || items.length === 0) {
		return (
			<View>
				<Text>Empty</Text>
			</View>
		);
	}

	return (
		<SafeAreaProvider>
			<AppTabs />
		</SafeAreaProvider>
	);
}
