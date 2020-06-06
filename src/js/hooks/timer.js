import { useState } from 'react';

const useTimer = () => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        var timerID = setInterval( () => tick(), 1000 );
        return function cleanup() {
            clearInterval(timerID);
        };
    }, []);

    function tick() {
        setDate(new Date());
    }

    return date;
}
export default useTimer;