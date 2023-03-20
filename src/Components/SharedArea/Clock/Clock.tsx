import { useEffect, useState } from "react";
import moment from "moment";
import "./Clock.css";

function Clock(): JSX.Element {
    const [time, setTime] = useState(new Date());
    let timerId: any = null;

    // Mounting
    useEffect(() => {
        timerId = setInterval(() => {
            setTime(new Date());
        }, 1000);
    }, []);

    // UnMounting
    useEffect(() => {
        return () => {
            clearInterval(timerId);
        };
    }, []);

    return (
        <div className="Clock">
            <p>{moment(time).format("HH:mm:ss")}</p>
        </div>
    );
}

export default Clock;
