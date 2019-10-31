import React, { useState, useEffect, useCallback, memo } from 'react';

const OutlinedButton = memo(
    function({ label, onClick }) {
        console.log('render OutlinedButton', label);
        
        return (
            <button onClick={onClick} style={{ border: '1px solid red' }}>{label}</button>
        )
    }
)

function Timer() {
    const [time, setTime] = useState(0);

    useEffect(
        () => {
            const timeoutId = setTimeout(
                () => setTime(time + 1),
                1000
            );
            return () => clearTimeout(timeoutId);
        },
        [time]
    )

    function onPlayClick() {
        console.log('onStartClick')
    }

    const onStopClick = () => {
        console.log('onStopClick')
    }

    const onPauseClick = useCallback(
        () => {
            console.log('onPauseClick')
        },
        []
    )

    const onResetClick = useCallback(
        function() {
            console.log('onResetClick')
        },
        []
    )

    console.log('render Timer')    
    return (
        <div>   
            Time: {time}
            <OutlinedButton label='Play' onClick={onPlayClick} />
            <OutlinedButton label='Pause' onClick={onPauseClick} />
            <OutlinedButton label='Stop' onClick={onStopClick} />
            <OutlinedButton label='Reset' onClick={onResetClick} />
        </div>
    );
}

export default Timer;
