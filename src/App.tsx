import React from "react";
import { useRecoilState } from "recoil";
import { hourSelector, minuteState } from "./recoil/atoms";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const [hours, setHours] = useRecoilState(hourSelector);

  const onMinutesChanges = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(Number(event.currentTarget.value));
  };

  const onHoursChange = (event: React.FocusEvent<HTMLInputElement>) => {
    setHours(Number(event.currentTarget.value));
  };

  return (
    <>
      <input
        value={minutes}
        onChange={onMinutesChanges}
        type="number"
        placeholder="Minutes"
      />
      <input
        value={hours}
        onChange={onHoursChange}
        type="number"
        placeholder="Hours"
      />
    </>
  );
}

export default App;
