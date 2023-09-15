import { useState } from "react";
import { Ap, Hp } from "./util";

const rangeColors = [
    "172, 66%, 50%",
    "165, 62%, 55%",
    "155, 56%, 59%",
    "140, 47%, 64%",
    "111, 40%, 66%",
    "83, 42%, 63%",
    "62, 44%, 59%",
    "48, 64%, 61%",
    "41, 88%, 63%",
];

export default function Resources() {
    const max = 8;
    const [slider, setSlider] = useState(4);

    return (
        <>
            <div className="flex flex-row gap-4 my-4 alert">
                <div className="flex flex-col">
                    <Hp className="countdown font-mono text-5xl">
                        <span
                            style={
                                {
                                    "--value": 2 + (max - slider),
                                } as unknown as undefined
                            }
                        ></span>
                    </Hp>
                    <Hp>HP</Hp>
                </div>
                <div className="grow">
                    <input
                        className="range"
                        style={
                            {
                                "--range-shdw": rangeColors[slider],
                                backgroundColor: `hsl(${rangeColors[slider]})`,
                            } as unknown as undefined
                        }
                        type="range"
                        min={0}
                        max={max}
                        value={slider}
                        step={1}
                        onChange={(x) => setSlider(parseInt(x.target.value))}
                    />
                    <div className="w-full flex justify-between text-xs px-2">
                        {[...Array(max + 1)].map((_, i) => (
                            <span key={i}>|</span>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col">
                    <Ap className="countdown font-mono text-5xl">
                        <span
                            style={
                                {
                                    "--value": 2 + slider,
                                } as unknown as undefined
                            }
                        ></span>
                    </Ap>
                    <Ap>AP</Ap>
                </div>
            </div>
        </>
    );
}
