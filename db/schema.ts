import {
	int,
	primaryKey,
	real,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users_table", {
	id: int().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	age: int().notNull(),
	email: text().notNull().unique(),
});

const timeStamps = {
	createdAt: int({ mode: "timestamp_ms" }).notNull(),
	updatedAt: int({ mode: "timestamp_ms" }).notNull(),
};

// ── 1. No dependencies ────────────────────────────────────────────────────────
// export const usersTable = sqliteTable('users_table', {
//   id: int().primaryKey({ autoIncrement: true }),
//   name: text().notNull(),
//   age: int().notNull(),
//   email: text().notNull().unique(),
//   country: text().notNull(),
//   weightUnit: text({ enum: ['kg', 'lbs'] }).notNull(),
//   ...timeStamps,
// });

export const muscleGroupsTable = sqliteTable("muscle_groups", {
	id: int().primaryKey({ autoIncrement: true }),
	name: text().notNull().unique(),
	...timeStamps,
});

export const exerciseDefinitionsTable = sqliteTable("exercise_definitions", {
	id: int().primaryKey({ autoIncrement: true }),
	name: text().notNull().unique(),
	displayName: text().notNull(),
	...timeStamps,
});

// ── 2. Depends on users ───────────────────────────────────────────────────────
export const workoutsTable = sqliteTable("workouts_table", {
	id: int().primaryKey({ autoIncrement: true }),
	userId: int()
		.notNull()
		.references(() => usersTable.id),
	notes: text(),
	...timeStamps,
});

// ── 3. Depends on exerciseDefinitions + muscleGroups ─────────────────────────
export const exerciseMuscleGroupsTable = sqliteTable(
	"exercise_muscle_groups",
	{
		exerciseDefinitionId: int()
			.notNull()
			.references(() => exerciseDefinitionsTable.id),
		muscleGroupId: int()
			.notNull()
			.references(() => muscleGroupsTable.id),
		isPrimary: int({ mode: "boolean" }).notNull().default(false),
	},
	(t) => [primaryKey({ columns: [t.exerciseDefinitionId, t.muscleGroupId] })],
);

// ── 4. Depends on workouts + exerciseDefinitions ──────────────────────────────
export const workoutExercisesTable = sqliteTable("workout_exercises", {
	id: int().primaryKey({ autoIncrement: true }),
	workoutId: int()
		.notNull()
		.references(() => workoutsTable.id),
	exerciseDefinitionId: int()
		.notNull()
		.references(() => exerciseDefinitionsTable.id),
	orderIndex: int().notNull(),
	notes: text(),
	...timeStamps,
});

// ── 5. Depends on workoutExercises ────────────────────────────────────────────
export const setsTable = sqliteTable("sets_log", {
	id: int().primaryKey({ autoIncrement: true }),
	workoutExerciseId: int()
		.notNull()
		.references(() => workoutExercisesTable.id),
	weight: real().notNull(),
	weightUnit: text({ enum: ["kg", "lbs"] }).notNull(),
	reps: int().notNull(),
	orderIndex: int().notNull(),
	setType: text({ enum: ["normal", "warmup", "dropset", "failure"] }).default(
		"normal",
	),
	...timeStamps,
});
