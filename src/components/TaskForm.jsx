import { useState } from "react"



const TaskForm = () => {

    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");
    const [update, setUpdate] = useState(false);
    const [updateIndex, setUpdateIndex] = useState(-1);
    const [updateValue, setUpdateValue] = useState("");

    const handleAddTask = () => {
        if (input.trim() === "") return alert("empty task details");
        setTasks([...tasks, {title:input, status:'pending', startedAt: Date.now()}]);
        setInput("");
    };

    const handleEditTask1 = (index, updatedText) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = { ...updatedTasks[index], title: updatedText, updatedAt: Date.now()};
        setTasks(updatedTasks);
        setUpdate(false);
        setUpdateIndex(-1)
        setUpdateValue("");
    };
    
    return (
        <>
            {update ? (
                <>
                <input
                    value={updateValue}
                    onChange={(e) => setUpdateValue(e.target.value)}
                />
                <button onClick={() => handleEditTask1(updateIndex, updateValue)}>Update task</button>
                </>
            ) : (
                <>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter task title"
                />
                <button onClick={handleAddTask}>Add task</button>
                </>
            )}

        </>
    )
}

export default TaskForm;