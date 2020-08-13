import React from 'react';

import '../components/component.css';

import Typewriter from 'typewriter-effect';

export default function TypeWriterEffect(props) {


    return (
        <Typewriter
            options={{

                autoStart: true,
                loop: true,
            }}
            onInit={(typewriter) => {
                typewriter.typeString(props.text)
                    .pauseFor(250)
                    .deleteAll()
                    .start();
            }}
        />


    );
}
