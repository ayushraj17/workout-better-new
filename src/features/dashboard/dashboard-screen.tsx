import { Button } from "@/components/atomic/button";
import { Input } from "@/components/atomic/input";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useMemo, useRef, useState } from "react";

type WorkoutSet = {
	weight: number;
	reps: number;
};

type ParsedExercise = {
	name: string;
	sets: WorkoutSet[];
};

type InvalidWorkoutLine = {
	line: string;
	reason: string;
};
const WORKOUT_LINE_REGEX = /^(.+?)\s*-\s*(.+)$/;
const GROUP_REGEX =
	/(\d+(?:\.\d+)?)\/(\d+(?:,\d+)*)(?:\+(\d+(?:\.\d+)?)\/(\d+(?:,\d+)*))*/g;

function parseWorkout(input: string) {
	const exercises: ParsedExercise[] = [];
	const invalidLines: InvalidWorkoutLine[] = [];

	input
		.split("\n")
		.map((l) => l.trim())
		.filter(Boolean)
		.forEach((line) => {
			const lineMatch = line.match(WORKOUT_LINE_REGEX);
			if (!lineMatch) {
				invalidLines.push({
					line,
					reason: "Use format: Exercise - weight/reps, weight/reps",
				});
				return;
			}

			const [, exerciseName, rest] = lineMatch;
			const groups = [...rest.matchAll(GROUP_REGEX)];

			if (!groups.length) {
				invalidLines.push({
					line,
					reason: "No valid weight/reps groups found",
				});
				return;
			}

			const sets: WorkoutSet[] = [];

			groups.forEach(([group]) => {
				const dropSetParts = group.split("+");

				dropSetParts.forEach((part) => {
					const [weightPart, repsPart] = part.split("/");

					if (!weightPart || !repsPart) {
						return;
					}

					const weight = Number(weightPart);

					repsPart.split(",").forEach((rep) => {
						const parsedRep = Number(rep);

						if (Number.isNaN(parsedRep)) {
							return;
						}

						sets.push({
							weight,
							reps: parsedRep,
						});
					});
				});
			});

			exercises.push({ name: exerciseName.trim(), sets });
		});

	return { exercises, invalidLines };
}

export function DashboardScreen() {
	const [workout, setWorkout] = useState("");
	const [throttledWorkout, setThrottledWorkout] = useState(workout);
	const nextValue = useRef(workout);
	const isThrottled = useRef(false);
	const limit = 1000; // 1 second throttle limit

	useEffect(() => {
		nextValue.current = workout;
		if (!isThrottled.current) {
			setThrottledWorkout(workout);
			isThrottled.current = true;
			const interval = setInterval(() => {
				if (nextValue.current === throttledWorkout) {
					clearInterval(interval);
					isThrottled.current = false;
				} else {
					setThrottledWorkout(nextValue.current);
				}
			}, limit);
			return () => {
				clearInterval(interval);
				isThrottled.current = false;
			};
		}
	}, [workout]);

	const { exercises: parsedWorkout, invalidLines } = useMemo(() => {
		return parseWorkout(throttledWorkout);
	}, [throttledWorkout]);

	const handleSaveWorkout = () => {
		const parsed = parseWorkout(workout);

		if (parsed.invalidLines.length > 0) {
			// Handle invalid lines (e.g., show an error message)
			console.log(
				"Cannot save workout due to invalid lines:",
				parsed.invalidLines,
			);
			return;
		}

		// Proceed with saving the workout using parsed.exercises
		console.log("Saving workout with exercises:", parsed.exercises);
		// workoutsRepository.createWorkout({
		//   userId: 1, // Replace with actual user ID
		//   performedAt: new Date().toISOString(),
		//   exercises: parsed.exercises.map(exercise => ({
		//     name: exercise.name,
		//     sets: exercise.sets.map(set => ({
		//       weight: set.weight,
		//       reps: set.reps,
		//     })),
		//   })),
		// });
		console.log("Workout saved successfully");
		setWorkout("");
	};

	console.log({ parsedWorkout });

	return (
		<View className="bg-adaptive flex-1">
			<SafeAreaView className="flex-1 p-4">
				<Input
					value={workout}
					onChangeText={setWorkout}
					inputMode="text"
					multiline
					textAlignVertical="top"
					numberOfLines={10}
					placeholder={`Squats - 75/9,8,5\nStanding calf raises - 60/13,9,7\nRDL - 60/9,8,8`}
				/>

				{invalidLines.length > 0 && (
					<View className="mt-3 rounded-xl border border-red-500 bg-red-500/10 p-3">
						<Text className="font-semibold text-red-500">
							Invalid workout lines
						</Text>

						<View className="mt-2 gap-2">
							{invalidLines.map((item) => (
								<View key={item.line}>
									<Text className="text-red-500">{item.line}</Text>
									<Text className="text-xs text-red-400">{item.reason}</Text>
								</View>
							))}
						</View>
					</View>
				)}
				<Button
					disabled={invalidLines.length > 0}
					onPress={handleSaveWorkout}
					title="Save workout"
				/>
				<ScrollView className="mt-4">
					{parsedWorkout.map((exercise) => (
						<View
							key={exercise.name}
							className="mb-3 rounded-xl border border-border bg-card p-4"
						>
							<Text className="text-adaptive font-semibold text-lg">
								{exercise.name}
							</Text>

							<View className="mt-2 flex-row flex-wrap gap-2">
								{exercise.sets.map((set, index) => (
									<View
										key={`${exercise.name}-${index}`}
										className="rounded-lg bg-muted px-3 py-2"
									>
										<Text className="text-adaptive">
											{set.weight}
											kg ×{set.reps}
										</Text>
									</View>
								))}
							</View>
						</View>
					))}
				</ScrollView>
			</SafeAreaView>
		</View>
	);
}
