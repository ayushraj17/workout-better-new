import { Text, View } from "react-native";
import * as SQLite from "expo-sqlite";
import { useEffect, useState } from "react";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { usersTable } from "@db/schema";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "@drizzle/migrations";
import { Button } from "@/components/atomic/button";

const expo = SQLite.openDatabaseSync("db.db");

const db = drizzle(expo);

export function DashboardScreen() {
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
		<View
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				width: "100%",
				height: "100%",
				justifyContent: "center",
			}}
		>
			{items.map((item) => (
				<Text key={item.id} className="text-amber-700">
					{item.age}
				</Text>
			))}
			<Text className="text-lg font-bold text-blue-600">Hello, Tailwind!</Text>

			<Button title="Press me" variant="primary" />
			<Button title="Press me" variant="secondary" />
			<Button title="Press me" variant="outline" />
			<Button title="Press me" variant="ghost" />
			<Button title="Press me" variant="destructive" />
		</View>
	);
}
