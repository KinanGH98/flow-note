import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan, faAdd} from "@fortawesome/free-solid-svg-icons";
import {AnimatePresence, motion, useAnimation} from "framer-motion";

export default function FlowNote()
{
    let savedNotes = localStorage.getItem('notes');
    const [toDoList, setToDoList] = useState(savedNotes ? JSON.parse(savedNotes) : []);

    // Save the notes when the to do list array changes.
    useEffect(() =>
    {
        localStorage.setItem('notes', JSON.stringify(toDoList));
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

    const {id, title, description} = item; // Destructure item object

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

function SmileyFace()
{
    return (
        <svg className='smiley-face' xmlns="http://www.w3.org/2000/svg" version="1.1"
             xmlns:xlink="http://www.w3.org/1999/xlink"
             xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 800 800">
            <defs>
                <radialGradient id="ccclaymoji-grad-dark" r="93%" cx="20%" cy="20%">
                    <stop offset="70%" stopColor="hsl(41, 100%, 67%)" stopOpacity="0"></stop>
                    <stop offset="97%" stopColor="#c89924" stopOpacity="1"></stop>
                </radialGradient>
                <radialGradient id="ccclaymoji-grad-light" r="65%" cx="28%" cy="20%">
                    <stop offset="0%" stopColor="#fffd88" stopOpacity="0.75"></stop>
                    <stop offset="100%" stopColor="hsl(41, 100%, 67%)" stopOpacity="0"></stop>
                </radialGradient>
                <filter id="ccclaymoji-blur" x="-100%" y="-100%" width="400%" height="400%"
                        filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB">
                    <feGaussianBlur stdDeviation="30" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic"
                                    edgeMode="none" result="blur"></feGaussianBlur>
                </filter>
                <filter id="inner-blur" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox"
                        primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feGaussianBlur stdDeviation="2" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic"
                                    edgeMode="none" result="blur"></feGaussianBlur>
                </filter>
                <filter id="eye-shadow" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox"
                        primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feDropShadow stdDeviation="10" dx="10" dy="10" floodColor="#000000" floodOpacity="0.2" x="0%"
                                  y="0%" width="100%" height="100%" result="dropShadow"></feDropShadow>
                </filter>
                <linearGradient gradientTransform="rotate(-25)" id="eye-light" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="20%" stopColor="#555555" stopOpacity="1"></stop>
                    <stop offset="100%" stopColor="black" stopOpacity="0"></stop>
                </linearGradient>
                <linearGradient id="mouth-light" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#e3bbf7" stopOpacity="1"></stop>
                    <stop offset="100%" stopColor="rgba(128, 93, 147, 1.00)" stopOpacity="0"></stop>
                </linearGradient>
                <filter id="mouth-shadow" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox"
                        primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feDropShadow stdDeviation="10" dx="10" dy="10" floodColor="#533365" floodOpacity="0.2" x="0%"
                                  y="0%" width="100%" height="100%" result="dropShadow"></feDropShadow>
                </filter>
            </defs>
            <g strokeLinecap="round">
                <path
                    d="M654.5 449.9999915274649C654.5 605.7114605301604 555.7114690026955 731.9393446271954 400 731.9393446271954C244.28921698113209 731.9393446271954 145.5 605.7114605301604 145.5 449.9999915274649C145.5 294.2892085085969 244.28921698113209 168.06063842773438 400 168.06063842773438C555.7114690026955 168.06063842773438 654.5 294.2892085085969 654.5 449.9999915274649Z "
                    fill="#c89924" opacity="0.43" filter="url(#ccclaymoji-blur)"></path>
                <path
                    d="M654.5 399.9999901752526C654.5 564.5839075541701 564.5839173789175 669.0014146766771 400 669.0014146766771C235.41680769230769 669.0014146766771 145.5 564.5839075541701 145.5 399.9999901752526C145.5 235.41679786756032 235.41680769230769 130.99856567382812 400 130.99856567382812C564.5839173789175 130.99856567382812 654.5 235.41679786756032 654.5 399.9999901752526Z "
                    fill="hsl(41, 100%, 67%)"></path>
                <path
                    d="M654.5 399.9999901752526C654.5 564.5839075541701 564.5839173789175 669.0014146766771 400 669.0014146766771C235.41680769230769 669.0014146766771 145.5 564.5839075541701 145.5 399.9999901752526C145.5 235.41679786756032 235.41680769230769 130.99856567382812 400 130.99856567382812C564.5839173789175 130.99856567382812 654.5 235.41679786756032 654.5 399.9999901752526Z "
                    fill="url(#ccclaymoji-grad-dark)"></path>
                <path
                    d="M654.5 399.9999901752526C654.5 564.5839075541701 564.5839173789175 669.0014146766771 400 669.0014146766771C235.41680769230769 669.0014146766771 145.5 564.5839075541701 145.5 399.9999901752526C145.5 235.41679786756032 235.41680769230769 130.99856567382812 400 130.99856567382812C564.5839173789175 130.99856567382812 654.5 235.41679786756032 654.5 399.9999901752526Z "
                    fill="url(#ccclaymoji-grad-light)"></path>
                <ellipse rx="25" ry="27.5" cx="350" cy="375" fill="black" filter="url(#eye-shadow)"></ellipse>
                <ellipse rx="25" ry="27.5" cx="350" cy="375" fill="url(#eye-light)" filter="url(#inner-blur)"></ellipse>
                <ellipse rx="23.5" ry="25" cx="470" cy="375" fill="black" filter="url(#eye-shadow)"></ellipse>
                <ellipse rx="23.5" ry="25" cx="470" cy="375" fill="url(#eye-light)" filter="url(#inner-blur)"></ellipse>
                <path d="M341 473.25Q383 548.25 457 473.25 " strokeWidth="27" stroke="rgba(128, 93, 147, 1.00)"
                      fill="none" filter="url(#mouth-shadow)"></path>
                <path d="M341 473.25Q383 548.25 457 473.25 " strokeWidth="9" stroke="url(#mouth-light)" fill="none"
                      filter="url(#inner-blur)"></path>
            </g>
        </svg>
    );
}