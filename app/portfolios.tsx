import { produce } from "immer";
import { Fragment, useCallback, useState } from "react";
import { Ap, H1, H3, Ha, Hp, Ph, Po, Ps } from "./util";

type Pair = {
    name: string;
    text: string | JSX.Element;
    target?: string;
};

type Portfolio = {
    title: string;
    passive: Pair;
    active: Pair[];
    coherenceLoss: Pair;
    generalSpecialization: Pair[];
    powerSpecialization: Pair[];
};

const harm = (x: number) => <Ha>{x} Harm</Ha>;

const ps = <Ps>Psyche</Ps>;
const ph = <Ph>Physicality</Ph>;
const po = <Po>Potency</Po>;

// sun ph
// moon po
// shade ps

function Porfolio({
    portfolio: {
        title,
        passive,
        active,
        coherenceLoss,
        generalSpecialization,
        powerSpecialization,
    },
}: {
    portfolio: Portfolio;
}) {
    const [selected, setSelected] = useState(
        [] as { name: string; id: number }[]
    );

    const toggleSelected = useCallback(
        (name: string, id: number) => {
            setSelected(
                produce(selected, (draft) => {
                    const idx = selected.findIndex(
                        (x) => id === x.id && name === x.name
                    );
                    if (idx !== -1) {
                        draft.splice(idx, 1);
                        return;
                    }

                    draft.push({ name, id });
                    if (selected.length >= 3) {
                        draft.shift();
                    }
                })
            );
        },
        [selected]
    );

    const isSelected = useCallback(
        (name: string, id: number) => {
            return (
                selected.findIndex((x) => id === x.id && name === x.name) !== -1
            );
        },
        [selected]
    );

    return (
        <>
            <H1>{title}</H1>
            <br />
            <div className="flex flex-col w-[50rem]">
                <H3>Passive Power</H3>
                <div className={`card w-full h-full bg-base-200 border-2`}>
                    <div className="card-body">
                        <h2 className="card-title flex flex-row">
                            <span>{passive.name}</span>
                            <div className="grow"></div>
                        </h2>
                        <p>{passive.text}</p>
                    </div>
                </div>
            </div>
            <br />
            <div className="flex flex-col w-[50rem]">
                <H3>Active Powers</H3>
                <div className="grid grid-cols-2 gap-4">
                    {active.map(({ name, text }) => (
                        <div
                            key={name}
                            className={`card w-full h-full bg-base-200 border-2`}
                        >
                            <div className="card-body">
                                <h2 className="card-title flex flex-row">
                                    <span>{name}</span>
                                    <div className="grow"></div>
                                </h2>
                                <p>{text}</p>
                                {/* <div className="card-actions justify-center">
                                <Power
                                    className={style.radio}
                                    checkedClassName={style.radioChecked}
                                    aptitude={aptitude}
                                    ability={ability}
                                    powerUpdate={(
                                        prev: number,
                                        next: number
                                    ) => {
                                        setPower(power + prev - next);
                                    }}
                                />
                            </div> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <br />
            <div className="flex flex-col w-[50rem]">
                <H3>Coherence Loss</H3>
                <div className={`card w-full h-full bg-base-200 border-2`}>
                    <div className="card-body">
                        <h2 className="card-title flex flex-row">
                            <span>{coherenceLoss.name}</span>
                            <div className="grow"></div>
                        </h2>
                        <p>{coherenceLoss.text}</p>
                    </div>
                </div>
            </div>
            <br />
            <div className="flex flex-col w-[50rem]">
                <H3>General Specializations</H3>
                <div className="grid grid-cols-3 gap-4">
                    {generalSpecialization.map(({ name, text }, i) => (
                        <div
                            key={`${name}/${i}`}
                            className={`card w-full h-full border-2 cursor-pointer ${
                                isSelected(name, i)
                                    ? "bg-success-content"
                                    : "bg-base-200"
                            }`}
                            onClick={() => toggleSelected(name, i)}
                        >
                            <div className="card-body">
                                <h2 className="card-title flex flex-row">
                                    <span>{name}</span>
                                    <div className="grow"></div>
                                </h2>
                                <p>{text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <br />
            <div className="flex flex-col w-[50rem]">
                <H3>Power Specializations</H3>
                <div className="grid grid-cols-3 gap-4">
                    {powerSpecialization.map(({ name, text, target }, i) => (
                        <div
                            key={`${name}/${i + generalSpecialization.length}`}
                            className={`card w-full h-full border-2 cursor-pointer ${
                                isSelected(
                                    name,
                                    i + generalSpecialization.length
                                )
                                    ? "bg-success-content"
                                    : "bg-base-200"
                            }`}
                            onClick={() =>
                                toggleSelected(
                                    name,
                                    i + generalSpecialization.length
                                )
                            }
                        >
                            <div className="card-body">
                                <h2 className="card-title flex flex-row">
                                    <span>{name}</span>
                                    <div className="grow"></div>
                                </h2>
                                <p>{text}</p>
                                <select
                                    className={`select select-bordered w-full max-w-xs ${
                                        isSelected(
                                            name,
                                            i + generalSpecialization.length
                                        )
                                            ? "bg-base-200"
                                            : "hidden"
                                    }`}
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    {!target ? (
                                        <>
                                            <option disabled selected>
                                                Select Power
                                            </option>
                                            {active.map((x) => (
                                                <option key={x.name}>
                                                    {x.name}
                                                </option>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            {active.map((x) => (
                                                <Fragment key={x.name}>
                                                    {target === x.name ? (
                                                        <>
                                                            <option selected>
                                                                {x.name}
                                                            </option>
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </Fragment>
                                            ))}
                                        </>
                                    )}
                                </select>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

const portfolios: Portfolio[] = [
    {
        title: "Pyre",
        passive: {
            name: "Slash",
            text: (
                <span>
                    Lash out with your solar blade. Deal {harm(1)} to a Close
                    enemy at the start of your turn.
                </span>
            ),
        },
        active: [
            {
                name: "Dash",
                text: (
                    <span>
                        Single out your target and charge them down. Deal{" "}
                        {harm(2)} to an enemy at Close range, or {harm(3)} to
                        them if you moved before activating Dash.
                    </span>
                ),
            },
            {
                name: "Singe",
                text: (
                    <span>
                        Cast a fiery arc with your solar blade. Deal {harm(1)}{" "}
                        to all enemies within Close range.
                    </span>
                ),
            },
            {
                name: "Finisher",
                text: (
                    <span>
                        Streak across the ground like wildfire, dealing{" "}
                        {harm(1)} to every injured enemy within Near range of
                        you.
                    </span>
                ),
            },
            {
                name: "Tracer Round",
                text: (
                    <span>
                        Hurl a flaming spear at a Far enemy, dealing {harm(1)}.
                        At the start of the next round, you can instantly
                        teleport next to that enemy.
                    </span>
                ),
            },
        ],
        coherenceLoss: {
            name: "Firestorm",
            text: (
                <span>
                    Choose a single enemy at any range. Move to Close range and
                    deal <Ha>Harm</Ha> equal to your {ph} + {po}.
                </span>
            ),
        },
        generalSpecialization: [
            {
                name: "Wellspring",
                text: <Ap>+1 AP</Ap>,
            },
            {
                name: "Hardy",
                text: <Hp>+1 HP</Hp>,
            },
            {
                name: "Hardy",
                text: <Hp>+1 HP</Hp>,
            },
            {
                name: "Mercury",
                text: "Move twice per turn.",
            },
            {
                name: "Honed",
                text: (
                    <span>
                        <Ha>+1 Harm</Ha> to Slash.
                    </span>
                ),
            },
            {
                name: "Quick-Strike",
                text: "Slash can target two enemies.",
            },
            {
                name: "Retaliate",
                text: (
                    <span>
                        Slash activates every time you take <Ha>Harm</Ha>, as
                        well as at the start of your turn.
                    </span>
                ),
            },
        ],
        powerSpecialization: [
            {
                name: "Finder",
                text: "+1 Range",
            },
            {
                name: "Lethal",
                text: <Ha>+1 Harm</Ha>,
            },
            {
                name: "Efficient",
                text: (
                    <span>
                        Costs no <Ap>AP</Ap>
                    </span>
                ),
            },
            {
                name: "Prepped",
                text: "First time this power is used in combat, it doesn't count as an action.",
            },
            {
                name: "Overclock",
                text: (
                    <span>
                        Spend 1 extra <Ap>AP</Ap> to double the <Ha>Harm</Ha>.
                    </span>
                ),
            },
            {
                name: "Sweep",
                text: "Dash affects all enemies Close to target as well.",
                target: "Dash",
            },
            {
                name: "Lit",
                text: (
                    <span>
                        Enemies hit by Singe take {harm(1)} if they act that
                        round.
                    </span>
                ),
                target: "Singe",
            },
            {
                name: "Phase-Shift",
                text: (
                    <span>
                        <Ha>Harm</Ha> for Finisher equals {po} instead of 1.
                    </span>
                ),
                target: "Finisher",
            },
            {
                name: "Pinned",
                text: "Target of Tracer Round cannot act this round.",
                target: "Tracer Round",
            },
        ],
    },
    {
        title: "Scorch",
        passive: {
            name: "",
            text: "",
        },
        active: [
            {
                name: "",
                text: "",
            },
            {
                name: "",
                text: "",
            },
            {
                name: "",
                text: "",
            },
            {
                name: "",
                text: "",
            },
        ],
        coherenceLoss: {
            name: "",
            text: "",
        },
        generalSpecialization: [
            {
                name: "",
                text: "",
            },
            {
                name: "",
                text: "",
            },
            {
                name: "",
                text: "",
            },
            {
                name: "",
                text: "",
            },
        ],
        powerSpecialization: [
            {
                name: "",
                text: "",
            },
            {
                name: "",
                text: "",
            },
            {
                name: "",
                text: "",
            },
            {
                name: "",
                text: "",
            },
        ],
    },
];

export default function Portfolios() {
    const [active, setActive] = useState(0);

    return (
        <>
            <div className="flex flex-col gap-4 my-4 alert">
                <div className="flex justify-center tabs">
                    {portfolios.map((p, i) => (
                        <a
                            key={i}
                            className={`tab tab-bordered ${
                                i == active ? "tab-active" : ""
                            }`}
                            onClick={() => setActive(i)}
                        >
                            {p.title}
                        </a>
                    ))}
                </div>
                {portfolios.map((p, i) => (
                    <div key={p.title} className={i == active ? "" : "hidden"}>
                        <Porfolio portfolio={p} />
                    </div>
                ))}
            </div>
        </>
    );
}
