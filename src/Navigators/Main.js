import React from "react";
import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack";

import BottomNavigator from "./BottomNavigator";
import Novel from "../screens/Novel/Novel";
import Chapter from "../screens/Chapter/Chapter";
import Extension from "../screens/Extension/Extension";
import MoreStack from "./More";

import { setStatusBarStyle } from "../Hooks/setStatusBarStyle";
import { View } from "react-native";
import { useTheme } from "../Hooks/useTheme";
import { githubUpdateChecker } from "../Hooks/githubUpdateChecker";
import NewUpdateDialog from "../Components/NewUpdateDialog";

const Stack = createStackNavigator();

const stackNavigatorConfig = {
    headerShown: false,
};

const MainNavigator = () => {
    const theme = useTheme();
    setStatusBarStyle();
    const { isNewVersion, latestRelease } = githubUpdateChecker() || {};

    return (
        <View style={{ flex: 1, backgroundColor: theme.colorPrimary }}>
            {isNewVersion && <NewUpdateDialog newVersion={latestRelease} />}
            <Stack.Navigator screenOptions={stackNavigatorConfig}>
                <Stack.Screen
                    name="BottomNavigator"
                    component={BottomNavigator}
                />
                <Stack.Screen
                    name="Novel"
                    component={Novel}
                    options={{
                        headerTitle: "",
                        headerShown: true,
                        headerTransparent: true,
                        headerTintColor: "white",
                        ...TransitionPresets.RevealFromBottomAndroid,
                    }}
                />
                <Stack.Screen
                    name="Chapter"
                    component={Chapter}
                    options={{ ...TransitionPresets.SlideFromRightIOS }}
                />
                <Stack.Screen name="MoreStack" component={MoreStack} />
                <Stack.Screen name="Extension" component={Extension} />
            </Stack.Navigator>
        </View>
    );
};

export default MainNavigator;