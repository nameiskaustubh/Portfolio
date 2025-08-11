import React from "react";
import {motion} from "framer-motion";

const About =() =>{
    return(
        <section
        id="aboutm"
        className="min-h-screen flex flex-col justify-center items-center bg-white px-6 py-16"
        >
            <motion.h2
            className="text-3xl md=text-4xl font-bold text-gray-800 mb-4"
            initial={{y: -30, opacity:0}}
            animate={{y: 0, opacity:1}}
            transition={{duration: 0.6}}
            
            >
                About Me
            </motion.h2>

            <motion.p
            className="text-gray-600 max-w-2xl text center mb-6"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.3}}
            >
              I'm a passionate frontend developer who loves crafting beautiful, responsive UIs.
        With a background in DSA and a desire to grow into a full-stack role, I'm constantly
        learning and pushing my limits to build awesome projects and solve real-world problems.   
            </motion.p>
        </section>
    );
};
export default About;
