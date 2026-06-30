import { SafeAreaProvider } from "react-native-safe-area-context";
import AppTabs from "../components/app-tabs";
import "../../global.css";

export default function TabLayout() {
	return (
		<SafeAreaProvider>
			<AppTabs />
		</SafeAreaProvider>
	);
}
