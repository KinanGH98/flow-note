import {useEffect, useRef, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {AnimatePresence, motion, useAnimation} from "framer-motion";
import SmileyFace from "./SmileyFace.jsx";

export default function FlowNote()
{
    const bottomDiv = useRef(null);
    let savedNotes = localStorage.getItem('flow-note-notes');
    const [toDoList, setToDoList] = useState(savedNotes ? JSON.parse(savedNotes) : []);

    // Save the notes when the to do list array changes.
    useEffect(() =>
    {
        localStorage.setItem('flow-note-notes', JSON.stringify(toDoList));
    }, [toDoList]);

    // Function to generate a unique ID
    const generateId = () => Math.random().toString(36).substring(2, 15);

    return (
        <>
            <div className='toDoListBackground'>
                <SmileyFace></SmileyFace>
            </div>

            <div className="toDoList">
                <AnimatePresence>
                    {toDoList.map((item) => (
                        <ToDoItem
                            key={item.id}
                            item={item}
                            onRemove={() => onRemoveHandler(item)}
                            onUpdate={onUpdateHandler}
                        />))}
                </AnimatePresence>

                {
                    toDoList.length <= 0 &&
                    <h2 className='hint-text'>Click the Add button to add a new note...</h2>
                }

                <button className="addButton" onClick={onAddHandler}>
                    <FontAwesomeIcon size='lg' icon={faAdd}></FontAwesomeIcon>
                </button>

            </div>
            <div ref={bottomDiv} style={{position: 'absolute', bottom: 0}}></div>
        </>
    );

    function onRemoveHandler(item)
    {
        const newList = toDoList.filter((todoItem) => todoItem.id !== item.id);
        setToDoList(newList);
    }

    function onAddHandler()
    {
        const newId = generateId();
        const newToDoItem = {id: newId, title: "", description: ""};
        const newList = [...toDoList, newToDoItem];
        setToDoList(newList);

        // Wait until the DOM updates.
        setTimeout(() =>
        {
            bottomDiv.current.scrollIntoView({behavior: 'smooth'});
        }, 1)
    }

    function onUpdateHandler(item, newTitle, newDescription)
    {
        const newList = toDoList.map((todoItem) =>
            todoItem.id === item.id
                ? {...todoItem, title: newTitle, description: newDescription}
                : todoItem
        );
        setToDoList(newList);
    }
}

function ToDoItem({item, onRemove, onUpdate})
{
    const bubbleAnimation = useAnimation();

    const {id, title, description} = item;

    const handleTitleChange = (e) =>
    {
        onUpdate(item, e.target.value, description);
    };

    const handleDescriptionChange = (e) =>
    {
        onUpdate(item, title, e.target.value);
    };

    useEffect(() =>
    {
        bubbleAnimation.start({
            scale: [1, 1.1, 1],
            x: 0,
            opacity: 1,
            rotateZ: 0,
            transition: {duration: 0.15}
        });
    }, []);

    return (
        <motion.div className="toDoItem" animate={bubbleAnimation}
                    initial={{
                        scale: 0.5,
                        x: '30px',
                        opacity: 0,
                        rotateZ: 15
                    }}
                    exit={{
                        opacity: 0,
                        x: '-40px',
                        scale: 0.7,
                        rotateZ: -120
                    }}>
            <input
                autoComplete='off'
                name='note-title'
                placeholder={"Title..."}
                type="text"
                value={title}
                onChange={handleTitleChange}
            />
            <textarea
                placeholder={"Description..."}
                value={description}
                onChange={handleDescriptionChange}
            ></textarea>
            <button onClick={onRemove}><FontAwesomeIcon size="lg" icon={faTrashCan}></FontAwesomeIcon></button>
        </motion.div>
    );
}