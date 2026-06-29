CREATE TABLE `exercise_definitions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`displayName` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `exercise_definitions_name_unique` ON `exercise_definitions` (`name`);--> statement-breakpoint
CREATE TABLE `exercise_muscle_groups` (
	`exerciseDefinitionId` integer NOT NULL,
	`muscleGroupId` integer NOT NULL,
	`isPrimary` integer DEFAULT false NOT NULL,
	PRIMARY KEY(`exerciseDefinitionId`, `muscleGroupId`),
	FOREIGN KEY (`exerciseDefinitionId`) REFERENCES `exercise_definitions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`muscleGroupId`) REFERENCES `muscle_groups`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `muscle_groups` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `muscle_groups_name_unique` ON `muscle_groups` (`name`);--> statement-breakpoint
CREATE TABLE `sets_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`workoutExerciseId` integer NOT NULL,
	`weight` real NOT NULL,
	`weightUnit` text NOT NULL,
	`reps` integer NOT NULL,
	`orderIndex` integer NOT NULL,
	`setType` text DEFAULT 'normal',
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`workoutExerciseId`) REFERENCES `workout_exercises`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `workout_exercises` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`workoutId` integer NOT NULL,
	`exerciseDefinitionId` integer NOT NULL,
	`orderIndex` integer NOT NULL,
	`notes` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`workoutId`) REFERENCES `workouts_table`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`exerciseDefinitionId`) REFERENCES `exercise_definitions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `workouts_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` integer NOT NULL,
	`notes` text,
	`createdAt` integer NOT NULL,
	`updatedAt` integer NOT NULL,
	FOREIGN KEY (`userId`) REFERENCES `users_table`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `users_table` ADD `country` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users_table` ADD `weightUnit` text NOT NULL;--> statement-breakpoint
ALTER TABLE `users_table` ADD `createdAt` integer NOT NULL;--> statement-breakpoint
ALTER TABLE `users_table` ADD `updatedAt` integer NOT NULL;