import { useCallback, useEffect, useState } from "react";

function powerFromAptitude(aptitude: string) {
  switch (aptitude) {
    case "mild":
      return 3;
    case "moderate":
      return 4;
    case "major":
      return 5;
    default:
      return 2;
  }
}

export default function Power({
  className,
  checkedClassName,
  aptitude,
  ability,
  powerUpdate,
}: {
  className: string;
  checkedClassName: string;
  aptitude: string;
  ability: string;
  powerUpdate: (prev: number, next: number) => void;
}) {
  const [power, setPower] = useState(powerFromAptitude(aptitude));
  const [activePower, setActivePower] = useState(1);

  useEffect(() => {
    const p = powerFromAptitude(aptitude);
    const oldActivePower = activePower;
    const newActivePower = activePower > p ? p : activePower;
    setPower(p);
    setActivePower(newActivePower);

    if (oldActivePower != newActivePower) {
      powerUpdate(oldActivePower, newActivePower);
    }
  }, [aptitude, activePower, powerUpdate]);

  return (
    <div className="">
      <input
        type="radio"
        name="specialty"
        className={`radio mx-1 radio-neutral ${checkedClassName}`}
        defaultChecked={false}
      />
      <input
        type="radio"
        name="specialty"
        className={`checkbox mx-1 ${className} hidden`}
        defaultChecked={true}
      />
      {Array.from(Array(power).keys()).map((idx) => (
        <input
          key={`${ability}-${idx}`}
          type="radio"
          name={`ability-${ability}-${idx}`}
          value={idx}
          className={`radio mx-1 ${className}`}
          readOnly
          checked={idx < activePower}
          onClick={() => {
            setActivePower(idx + 1);
            powerUpdate(activePower, idx + 1);
          }}
        />
      ))}
    </div>
  );
}
