import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
    const [courseGoals, setCourseGoals] = useState([]);
    const [modalIsVisible, setModalIsVisible] = useState(false);

    function addGoalHandler(enteredGoalText) {
        setCourseGoals(currentCourseGoals => [
            ...currentCourseGoals,
            { text: enteredGoalText, key: Math.random().toString() },
        ]);
        setModalIsVisible(false);
    }

    function deleteGoalHandler(key) {
        setCourseGoals(currentCourseGoals => currentCourseGoals.filter(goal => goal.key !== key));
    }

    return (
        <>
            <StatusBar />
            <View style={styles.appContainer}>
                <Button
                    title="Add New Goal"
                    color="#5e0acc"
                    onPress={() => setModalIsVisible(true)}
                />
                <GoalInput
                    onAddGoal={addGoalHandler}
                    isVisible={modalIsVisible}
                    onCloseModal={() => setModalIsVisible(!modalIsVisible)}
                />
                <View style={styles.goalsContainer}>
                    <FlatList
                        data={courseGoals}
                        renderItem={itemData => (
                            <GoalItem
                                text={itemData.item.text}
                                onDeleteItem={deleteGoalHandler}
                                id={itemData.item.key}
                            />
                        )}
                    />
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
    },

    goalsContainer: {
        flex: 5,
    },
});
