import { Calendar } from "antd";
import { useAppDispatch } from "../../app/hooks";
import { selectDate } from "./calendarSlice";

export const WorkoutCalendar = () => {
    const dispatch = useAppDispatch();

    return (
        <Calendar
            fullscreen={false}
            onSelect={(date) => dispatch(selectDate(date.format("YYYY-MM-DD")))}
        />
    );
};
