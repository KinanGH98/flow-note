import {useEffect, useRef} from "react";
import {useMediaQuery} from "react-responsive";

export default function SmileyFace()
{
    const svgRef = useRef(null);
    const isMobile = useMediaQuery({query: '(max-width: 650px)'});

    const eyesOffsets = isMobile ?
        // Mobile offset.
        [{offsetY: 265, offsetX: 240}, {offsetY: 265, offsetX: 335}] :
        // Desktop offset.
        [{offsetY: 225, offsetX: 195}, {offsetY: 225, offsetX: 285}];
    const eyesSize = isMobile ? 16 : 18;

    useEffect(() =>
    {
        const handleMouseMove = (event) =>
        {
            const svg = svgRef.current;
            if (!svg) return;

            const eyes = svg.querySelectorAll('#left-eye, #right-eye');
            const pupils = svg.querySelectorAll('#left-pupil, #right-pupil');

            eyes.forEach((eye, index) =>
            {
                const pupil = pupils[index];
                const offset = eyesOffsets[index];
                const eyeRect = eye.getBoundingClientRect();
                const eyeCenterX = eyeRect.left + eyeRect.width;
                const eyeCenterY = eyeRect.top + eyeRect.height;
                const
                    angle = Math.atan2(event.clientY - eyeCenterY, event.clientX - eyeCenterX);

                const
                    pupilOffset = 0.5; // Adjust this value to control pupil size (0 to 1)

                const pupilOffsetX = eyeRect.width * pupilOffset * Math.cos(angle);
                const pupilOffsetY = eyeRect.height * pupilOffset * Math.sin(angle);

                const newPupilX = Math.max(
                    eyeRect.left,
                    eyeCenterX + pupilOffsetX + offset.offsetX
                );
                const newPupilY = Math.max(
                    eyeRect.top,
                    eyeCenterY + pupilOffsetY + offset.offsetY
                );

                pupil.setAttribute("cx", newPupilX);
                pupil.setAttribute("cy", newPupilY);
            });
        };

        document.addEventListener("mousemove", handleMouseMove);

        return () =>
        {
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, [isMobile, eyesOffsets]);

    return (
        <svg className='smiley-face' ref={svgRef} xmlns="http://www.w3.org/2000/svg" version="1.1"
             xmlnsXlink="http://www.w3.org/1999/xlink"
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
                <linearGradient id="pupilGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style={{ stopColor: "grey", stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: "black", stopOpacity: 1 }} />
                </linearGradient>
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

                <ellipse id="left-eye" rx="25" ry="27.5" cx="330" cy="375" fill="white"
                         filter="url(#eye-shadow)"></ellipse>
                <ellipse id="left-pupil" rx={eyesSize} ry={eyesSize} cx="330" cy="375" fill="url(#pupilGradient)"></ellipse>
                <ellipse id="right-eye" rx="25" ry="27.5" cx="470" cy="375" fill="white"
                         filter="url(#eye-shadow)"></ellipse>
                <ellipse id="right-pupil" rx={eyesSize} ry={eyesSize} cx="470" cy="375" fill="url(#pupilGradient)"></ellipse>


                <path d="M341 473.25Q383 548.25 457 473.25 " strokeWidth="27" stroke="rgba(128, 93, 147, 1.00)"
                      fill="none" filter="url(#mouth-shadow)"></path>
                <path d="M341 473.25Q383 548.25 457 473.25 " strokeWidth="9" stroke="url(#mouth-light)" fill="none"
                      filter="url(#inner-blur)"></path>
            </g>
        </svg>

    );
}