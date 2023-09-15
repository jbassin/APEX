import { produce } from "immer";
import { Fragment, useCallback, useState } from "react";
import { Ap, H1, H3, Ha, Hp, Ph, Po, Ps, Re } from "./util";

type Pair = {
    name: string;
    text: string | JSX.Element;
    target?: string | string[];
};

type Portfolio = {
    title: string;
    description: string;
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
        description,
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
                    if (selected.length >= 4) {
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
                <p>{description}</p>
            </div>
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
                                    defaultValue={0}
                                >
                                    {!target ? (
                                        <>
                                            <option disabled value={0}>
                                                Select Power
                                            </option>
                                            {active.map((x) => (
                                                <option key={x.name}>
                                                    {x.name}
                                                </option>
                                            ))}
                                        </>
                                    ) : typeof target == "string" ? (
                                        <>
                                            {active.map((x) => (
                                                <Fragment key={x.name}>
                                                    {target === x.name ? (
                                                        <option>
                                                            {x.name}
                                                        </option>
                                                    ) : (
                                                        <></>
                                                    )}
                                                </Fragment>
                                            ))}
                                        </>
                                    ) : (
                                        <>
                                            <option disabled value={0}>
                                                Select Power
                                            </option>
                                            {active.map((x) => (
                                                <Fragment key={x.name}>
                                                    {target.includes(x.name) ? (
                                                        <option>
                                                            {x.name}
                                                        </option>
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
        title: "Phenomenon",
        description:
            "You are a living natural disaster, and once you're set in motion, the destruction you bring is rapid and indiscriminate.",
        passive: {
            name: "Hazardous Aura",
            text: (
                <span>
                    Merely being in your presence is harmful to most. Deal{" "}
                    {harm(1)} to a Close enemy at the start of your turn.
                </span>
            ),
        },
        active: [
            {
                name: "Unrelenting",
                text: (
                    <span>
                        You inexorably hunt down your foes. Deal {harm(2)} to an
                        enemy at Close range, or {harm(3)} to them if you moved
                        before activating Unrelenting.
                    </span>
                ),
            },
            {
                name: "Overflow",
                text: (
                    <span>
                        You let your divine energy radiate outward. Deal{" "}
                        {harm(1)} to all enemies within Close range.
                    </span>
                ),
            },
            {
                name: "Elemental Storm",
                text: (
                    <span>
                        You streak across the ground like wildfire, dealing{" "}
                        {harm(1)} to every injured enemy within Close or Near
                        range of you.
                    </span>
                ),
            },
            {
                name: "Trace",
                text: (
                    <span>
                        You hurl a projectile at a Far enemy, dealing {harm(1)}.
                        At the start of the next round, you can instantly
                        teleport next to that enemy.
                    </span>
                ),
            },
        ],
        coherenceLoss: {
            name: "Self-Destruct",
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
                        <Ha>+1 Harm</Ha> to Hazardous Aura.
                    </span>
                ),
            },
            {
                name: "Quick-Strike",
                text: "Hazardous Aura can target two enemies.",
            },
            {
                name: "Retaliate",
                text: (
                    <span>
                        Hazardous Aura activates every time you take{" "}
                        <Ha>Harm</Ha>, as well as at the start of your turn.
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
                text: "Unrelenting affects all enemies Close to target as well.",
                target: "Unrelenting",
            },
            {
                name: "Smoldering",
                text: (
                    <span>
                        Enemies hit by Overflow take {harm(1)} if they act that
                        round.
                    </span>
                ),
                target: "Overflow",
            },
            {
                name: "Phase-Shift",
                text: (
                    <span>
                        <Ha>Harm</Ha> for Elemental Storm equals {po} instead of
                        1.
                    </span>
                ),
                target: "Elemental Storm",
            },
            {
                name: "Pinned",
                text: "Target of Trace cannot act this round.",
                target: "Trace",
            },
        ],
    },
    {
        title: "Radiant",
        description:
            "You are the font of energy from which others draw their power.",
        passive: {
            name: "Controlled Burn",
            text: (
                <span>
                    You warp the resources of your enemies. Once per round, you
                    can change a drop from one type to the other (e.g.{" "}
                    <Hp>HP</Hp> to <Ap>AP</Ap>).
                </span>
            ),
        },
        active: [
            {
                name: "Engulf",
                text: (
                    <span>
                        Your body is wreathed in energy. Until the end of your
                        next turn, any Close enemies take {harm(2)}.
                    </span>
                ),
            },
            {
                name: "Erupt",
                text: (
                    <span>
                        You create columns of energy which burst from the
                        ground. Deal {harm(2)} to target within Near range, and{" "}
                        {harm(1)} to anyone Close to them.
                    </span>
                ),
            },
            {
                name: "Snuff Out",
                text: (
                    <span>
                        You focus your fury on a wounded foe. Target injured
                        enemy at any range and deal <Ha>Harm</Ha> equal to your{" "}
                        {ps}.
                    </span>
                ),
            },
            {
                name: "Kindling",
                text: (
                    <span>
                        You fire fragments of your energy in all directions.
                        Choose a number of targets equal to or less than your{" "}
                        {ph}, at any range. Enemies take {harm(1)}, allies
                        recover <Hp>1 HP</Hp> or <Ap>1 AP</Ap>.
                    </span>
                ),
            },
        ],
        coherenceLoss: {
            name: "Glorious Visage",
            text: (
                <span>
                    Two waves blast off of you, one wrathful, one radiant. All
                    damaged enemies immediately take <Ha>Harm</Ha> equal to your{" "}
                    {ph}. Allies recover <Hp>HP</Hp> equal to your {ps}.
                </span>
            ),
        },
        generalSpecialization: [
            {
                name: "Wellspring",
                text: <Ap>+1 AP</Ap>,
            },
            {
                name: "Wellspring",
                text: <Ap>+1 AP</Ap>,
            },
            {
                name: "Hardy",
                text: <Hp>+1 HP</Hp>,
            },
            {
                name: "Burst",
                text: (
                    <span>
                        You may have 1 drop each round explode, dealing{" "}
                        {harm(2)} to all Close enemies.
                    </span>
                ),
            },
            {
                name: "Enhanced Burn",
                text: <span>You can use Controlled Burn twice per round.</span>,
            },
            {
                name: "Adapative",
                text: (
                    <span>
                        Any drop you pick up can be treated as <Hp>HP</Hp> or{" "}
                        <Ap>AP</Ap>.
                    </span>
                ),
            },
            {
                name: "Bountiful",
                text: <span>Enemies you kill create 2 drops.</span>,
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
                name: "Lethal",
                text: <Ha>+1 Harm</Ha>,
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
                name: "Versatile",
                text: (
                    <span>
                        You may use {po} in place of the keyed attribute.
                    </span>
                ),
                target: ["Kindling", "Snuff Out"],
            },
            {
                name: "Expel",
                text: (
                    <span>
                        When Engulf ends, it explodes outward, dealing {harm(1)}{" "}
                        to every enemy up to Near.
                    </span>
                ),
                target: "Engulf",
            },
            {
                name: "Powerwall",
                text: (
                    <span>
                        Erupt's column remains in place for a number of rounds
                        equal to your {po}. Deals {harm(1)} to anyone that gets
                        Close to it.
                    </span>
                ),
                target: "Erupt",
            },
            {
                name: "Feedback",
                text: (
                    <span>
                        If your Snuff Out target dies, you regain <Ap>1 AP</Ap>.
                    </span>
                ),
                target: "Snuff Out",
            },
            {
                name: "Stockpile",
                text: (
                    <span>
                        The number of targets you can select for Kindling is
                        either your {ph} or your current <Ap>AP</Ap>, whichever
                        is greater.
                    </span>
                ),
                target: "Kindling",
            },
        ],
    },
    {
        title: "Weaver",
        description:
            "You are a source of truth, and a mortal's fate is like putty in your hands.",
        passive: {
            name: "Marked",
            text: (
                <span>
                    You feel the weight of your enemies pressing against the
                    Aether. At the start of your turn, <Re>Mark</Re> any two
                    enemies. <Re>Marks</Re> remain until they have been used,
                    but do not stack.
                </span>
            ),
        },
        active: [
            {
                name: "Threadcutter",
                text: (
                    <span>
                        You fray the cords connected to your <Re>Mark</Re>.
                        Choose 1 <Re>Marked</Re> enemy. They take{" "}
                        <Ha>+1 Harm</Ha> from all sources until the start of the
                        next round. Target loses <Re>Mark</Re>.
                    </span>
                ),
            },
            {
                name: "Disconnect",
                text: (
                    <span>
                        You rip the cords from your <Re>Marks</Re>. Every{" "}
                        <Re>Marked</Re> enemy takes {harm(2)}. Targets lose{" "}
                        <Re>Mark</Re>.
                    </span>
                ),
            },
            {
                name: "Decoy",
                text: (
                    <span>
                        You conjure a convincing decoy within Near range from
                        loose threads in the local Weave. <Re>Marked</Re>{" "}
                        enemies will be compelled to target the decoy. Decoy
                        ends at the end of the round. Affected enemies lose{" "}
                        <Re>Mark</Re>.
                    </span>
                ),
            },
            {
                name: "Swap",
                text: (
                    <span>
                        You entangle yourself with a foe. Switch positions with
                        a <Re>Marked</Re> enemy. Target loses <Re>Mark</Re>.
                    </span>
                ),
            },
        ],
        coherenceLoss: {
            name: "Sharp Edge",
            text: (
                <span>
                    You take some of the cords around you with you. Choose a
                    target for each point of {po} you have, at any range. You
                    deal {harm(2)} to each.
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
                name: "Loom",
                text: (
                    <span>
                        You may <Re>Mark</Re> any three enemies instead of two.
                    </span>
                ),
            },
            {
                name: "Severed",
                text: (
                    <span>
                        <Re>Marked</Re> enemies deal <Ha>-1 Harm</Ha> to you.
                    </span>
                ),
            },
            {
                name: "Stun",
                text: (
                    <span>
                        At the start of the round, choose 1 <Re>Marked</Re>{" "}
                        enemy to not act or move this round.
                    </span>
                ),
            },
            {
                name: "Razor Edge",
                text: (
                    <span>
                        Your Sharp Edge targets all foes you have{" "}
                        <Re>Marked</Re> as well as the ones you select.
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
                name: "Tagged",
                text: (
                    <span>
                        This Power does not consume the target's <Re>Mark</Re>.
                    </span>
                ),
            },
            {
                name: "Tagged",
                text: (
                    <span>
                        This Power does not consume the target's <Re>Mark</Re>.
                    </span>
                ),
            },
            {
                name: "Restrained",
                text: <span>Threadcutter target cannot act this round.</span>,
                target: "Threadcutter",
            },
            {
                name: "Collateral Damage",
                text: (
                    <span>
                        Enemies within Close range to Disconnect targets take{" "}
                        {harm(1)}.
                    </span>
                ),
                target: "Disconnect",
            },
            {
                name: "Tension",
                text: (
                    <span>
                        Your decoy is filled with volatile energy and explodes
                        at the end of the round, dealing {harm(1)} to all Close
                        enemies and <Re>Marking</Re> them.
                    </span>
                ),
                target: "Decoy",
            },
            {
                name: "Matchmaker",
                text: (
                    <span>
                        You can switch the target with an ally instead of
                        yourself.
                    </span>
                ),
                target: "Swap",
            },
        ],
    },
    {
        title: "Bulwark",
        description:
            "You are the backbone of the world. You hold the skies aloft and spin planets in your palm.",
        passive: {
            name: "Unstoppable",
            text: (
                <span>
                    Foes are shaken by your very presence. While moving, stun 1
                    enemy within Close range--they cannot act for the rest of
                    the round.
                </span>
            ),
        },
        active: [
            {
                name: "Sentinel",
                text: (
                    <span>
                        You harden the air around you and your companions. You
                        and all Close allies reduce enemy <Ha>Harm</Ha> by 1
                        until the end of the round.
                    </span>
                ),
            },
            {
                name: "Rush",
                text: (
                    <span>
                        You charge forward as an unstoppable force. Choose a
                        Near location and rush towards it. Deal {harm(1)} to any
                        enemy in your way. This does not replace your movement.
                    </span>
                ),
            },
            {
                name: "Wring",
                text: (
                    <span>
                        You pick up a Close enemy and crush it for {harm(2)}.
                        You may then throw the target to a Near location,
                        dealing {harm(1)} to any enemies there.
                    </span>
                ),
            },
            {
                name: "Enrage",
                text: (
                    <span>
                        You recover <Hp>HP</Hp> equal to your {ph} score as you
                        roar out a challenge to your foes. All Near enemies must
                        attack you until the start of your next turn.
                    </span>
                ),
            },
        ],
        coherenceLoss: {
            name: "Earthquake",
            text: (
                <span>
                    Send a shock wave through the ground. Target a number of
                    enemies equal to your {ph} and deal {harm(2)}. Targets are
                    stunned for the rest of the round.
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
                name: "Defiant",
                text: (
                    <span>
                        Regain <Hp>1 HP</Hp> at the start of the round.
                    </span>
                ),
            },
            {
                name: "Shockwave",
                text: <span>You may stun 2 enemies with Unstoppable.</span>,
            },
            {
                name: "Overwhelming Presence",
                text: (
                    <span>
                        If you don't Move, all Close enemies cannot act this
                        round.
                    </span>
                ),
            },
            {
                name: "Ramming",
                text: <span>Enemies hit by Unstoppable take {harm(2)}.</span>,
            },
        ],
        powerSpecialization: [
            {
                name: "Finder",
                text: "+1 Range",
            },
            {
                name: "Finder",
                text: "+1 Range",
            },
            {
                name: "Lethal",
                text: <Ha>+1 Harm</Ha>,
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
                name: "Reflective",
                text: (
                    <span>
                        Deal {harm(1)} to enemies that attack allies protected
                        by Sentinel.
                    </span>
                ),
                target: "Sentinel",
            },
            {
                name: "Courier",
                text: (
                    <span>
                        You may carry a close ally with you when using Rush.
                    </span>
                ),
                target: "Rush",
            },
            {
                name: "Pull Pin",
                text: (
                    <span>
                        Enemies killed by Wring explode upon impact, dealing{" "}
                        {harm(3)} to enemies there.
                    </span>
                ),
                target: "Wring",
            },
            {
                name: "Fear",
                text: (
                    <span>
                        You may have enemies flee from you instead of attack you
                        when using Enrage.
                    </span>
                ),
                target: "Enrage",
            },
        ],
    },
    {
        title: "Pox",
        description:
            "You are pestilence that consumes all life. Your influence spreads with a mind of its own.",
        passive: {
            name: "Virulent",
            text: (
                <span>
                    Your existence degrades weaker beings. <Re>Infect</Re> 1
                    enemy at the start of combat. Enemies who are{" "}
                    <Re>Infected</Re> take {harm(1)} at the start of each round.
                </span>
            ),
        },
        active: [
            {
                name: "Contaminate",
                text: (
                    <span>
                        You spread your influence. <Re>Infect</Re> 1 enemy
                        within Near or Close range.
                    </span>
                ),
            },
            {
                name: "Propagate",
                text: (
                    <span>
                        You compel your influence to spread far and wide. Target
                        an <Re>Infected</Re> enemy up to Near range.{" "}
                        <Re>Infect</Re> all enemies within Close range of
                        target.
                    </span>
                ),
            },
            {
                name: "Symptomatic",
                text: (
                    <span>
                        You decide the fate of the <Re>Infected</Re>. Choose one
                        effect for all <Re>Infected</Re> enemies this round:{" "}
                        <Ha>-1 Harm</Ha> dealt, <Ha>+1 Harm</Ha> taken, or
                        cannot move.
                    </span>
                ),
            },
            {
                name: "Fight or Flight",
                text: (
                    <span>
                        Your influence can cause unpredictable behavior. Every{" "}
                        <Re>Infected</Re> enemy either immediately attacks the
                        closest foe, or runs away from you for one round.
                    </span>
                ),
            },
        ],
        coherenceLoss: {
            name: "Epidemic",
            text: (
                <span>
                    All <Re>Infected</Re> enemies take <Ha>Harm</Ha> equal to
                    the number of <Re>Infected</Re> enemies. <Re>Infection</Re>{" "}
                    for everyone is then removed.
                </span>
            ),
        },
        generalSpecialization: [
            {
                name: "Wellspring",
                text: <Ap>+1 AP</Ap>,
            },
            {
                name: "Wellspring",
                text: <Ap>+1 AP</Ap>,
            },
            {
                name: "Hardy",
                text: <Hp>+1 HP</Hp>,
            },
            {
                name: "Deadly",
                text: <span>Virulent deals {harm(2)}.</span>,
            },
            {
                name: "Plague",
                text: (
                    <span>
                        Virulent <Re>Infects</Re> 3 enemies.
                    </span>
                ),
            },
            {
                name: "Vector",
                text: (
                    <span>
                        Once per round, <Re>Infect</Re> an enemy within Close
                        range.
                    </span>
                ),
            },
            {
                name: "Evolved",
                text: (
                    <span>
                        Choose one of the Symptomatic effects to permanently be
                        in effect for all <Re>Infected</Re>. This effect can no
                        longer be chosen when using Symptomatic.
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
                name: "Finder",
                text: "+1 Range",
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
                name: "Split Mind",
                text: "+1 Target",
            },
            {
                name: "Split Mind",
                text: "+1 Target",
            },
            {
                name: "Adrenal",
                text: (
                    <span>
                        Contaminate target has the Fight or Flight effect
                        immediately.
                    </span>
                ),
                target: "Contaminate",
            },
            {
                name: "Viral Link",
                text: (
                    <span>
                        Propagate target takes <Ha>Harm</Ha> equal to number of
                        newly <Re>Infected</Re> enemies.
                    </span>
                ),
                target: "Propagate",
            },
            {
                name: "Clouded",
                text: (
                    <span>
                        New effect option for Symptomatic: Enemies can only deal{" "}
                        <Ha>Harm</Ha> within Close range.
                    </span>
                ),
                target: "Symptomatic",
            },
            {
                name: "Split Personality",
                text: (
                    <span>Enemies have both effects from Fight or Flight.</span>
                ),
                target: "Fight or Flight",
            },
        ],
    },
    {
        title: "Grim",
        description:
            "You are what comes after. When mortals stare into the screaming void, you stare back.",
        passive: {
            name: "Raise Dead",
            text: (
                <span>
                    Once per round, when an enemy dies, you may immediately make
                    them your <Re>Thrall</Re>. <Re>Thralls</Re> are revived with{" "}
                    <Hp>1 HP</Hp> and act on your Powers. <Re>Thralls</Re>{" "}
                    cannot move. You may have a number of <Re>Thralls</Re> equal
                    to your {ps}.
                </span>
            ),
        },
        active: [
            {
                name: "Puppet",
                text: (
                    <span>
                        You command your <Re>Thralls</Re> to lash out. Target{" "}
                        <Re>Thrall</Re> attacks a Close enemy.
                    </span>
                ),
            },
            {
                name: "Siphon",
                text: (
                    <span>
                        You sacrifice a <Re>Thrall</Re> within Close range. It
                        creates drops of <Hp>HP</Hp> or <Ap>AP</Ap> equal to its
                        maximum <Hp>HP</Hp>. Any ally may claim them.
                    </span>
                ),
            },
            {
                name: "Possess",
                text: (
                    <span>
                        You deal {harm(2)} to an enemy Close or Near, and give
                        them a single command that they will attempt to fulfill
                        on their turn.
                    </span>
                ),
            },
            {
                name: "Haunt",
                text: (
                    <span>
                        You command all your <Re>Thralls</Re> to shriek into the
                        air. Any enemies within Close range to them recoil in
                        fear and cannot act until the end of the round.
                    </span>
                ),
            },
        ],
        coherenceLoss: {
            name: "Curse",
            text: (
                <span>
                    Your <Re>Thralls</Re> detonate with their death curse. Each
                    deals {harm(2)} to all enemies within Close range.
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
                name: "Builder",
                text: <Re>+1 Thrall HP</Re>,
            },
            {
                name: "Lent Sinew",
                text: (
                    <span>
                        <Re>Thralls</Re> are revived with {po} <Hp>HP</Hp>, up
                        to their max.
                    </span>
                ),
            },
            {
                name: "Enthralling",
                text: (
                    <span>
                        Can make a <Re>Thrall</Re> anytime an enemy dies, not
                        just once per round.
                    </span>
                ),
            },
            {
                name: "Danse Macabre",
                text: (
                    <span>
                        One <Re>Thrall</Re> can move during your turn.
                    </span>
                ),
            },
            {
                name: "Howlers",
                text: (
                    <span>
                        Whenever a Thrall dies they activate the Haunt effect at
                        their location.
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
                name: "Finder",
                text: "+1 Range",
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
                name: "Split Mind",
                text: "+1 Target",
            },
            {
                name: "Split Mind",
                text: "+1 Target",
            },
            {
                name: "Marionette",
                text: (
                    <span>
                        A number of <Re>Thralls</Re> equal to your {ps} or fewer
                        may act with Puppet.
                    </span>
                ),
                target: "Puppet",
            },
            {
                name: "Ritualistic",
                text: (
                    <span>
                        <Re>Thralls</Re> sacrificed with Siphon curse enemies
                        within Close range. Cursed enemies take <Ha>+1 Harm</Ha>{" "}
                        or deal <Ha>-1 Harm</Ha> until your next turn, your
                        choice.
                    </span>
                ),
                target: "Siphon",
            },
            {
                name: "Horrified",
                text: (
                    <span>
                        All enemies within Close range of Possess target take{" "}
                        {harm(1)} and cannot move this round.
                    </span>
                ),
                target: "Possess",
            },
            {
                name: "Rallying Cry",
                text: (
                    <span>
                        One ally within Close range of Haunted <Re>Thralls</Re>{" "}
                        may take another turn this round.
                    </span>
                ),
                target: "Haunt",
            },
        ],
    },
    {
        title: "Variable",
        description:
            "You are unending change. You are the death of constancy and a catalyst for the new.",
        passive: {
            name: "Inverted Fate",
            text: (
                <span>
                    Force the battlefield to suit your whims. If you have{" "}
                    <Ap>0 AP</Ap> at the end of your turn, you may activate your{" "}
                    <Hp>Coherence Loss</Hp> event. Gain <Ap>3 AP</Ap> after.
                </span>
            ),
        },
        active: [
            {
                name: "Flurry of Change",
                text: (
                    <span>
                        You rapidly shear nearby targets. Choose Close targets
                        equal to your current <Ap>AP</Ap> count. Each target
                        takes {harm(1)}.
                    </span>
                ),
            },
            {
                name: "Brunt Force",
                text: (
                    <span>
                        You stretch a single foe's essence. Deal <Ha>Harm</Ha>{" "}
                        equal to your {po} to a target within Near or Close
                        range.
                    </span>
                ),
            },
            {
                name: "Contest",
                text: (
                    <span>
                        You single out a foe and perform a contest of wills.
                        Choos an enemy at Near range. Deal <Ha>Harm</Ha> twice
                        your {ps}. If the enemy survives, recieve damage equal
                        to your {ps}.
                    </span>
                ),
            },
            {
                name: "Snipe",
                text: (
                    <span>
                        You target those that believe they're safe from your
                        influence. Deal <Ha>Harm</Ha> equal to your {po} to a
                        target at Far range, or deal {harm(1)} to a number of
                        Far enemies equal to your {po}.
                    </span>
                ),
            },
        ],
        coherenceLoss: {
            name: "Bullet Hell",
            text: (
                <span>
                    Block the sky with a torrent of projectiles. Choose a range.
                    Every enemy at that range takes {harm(2)}.
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
                name: "Smaller Tank",
                text: (
                    <span>
                        Only gain <Ap>2 AP</Ap> from Inverted Fate.
                    </span>
                ),
            },
            {
                name: "Lifeblood",
                text: (
                    <span>
                        You may treat <Ap>AP</Ap> drops as <Hp>HP</Hp> instead.
                    </span>
                ),
            },
            {
                name: "Mercury",
                text: <span>May move twice per turn.</span>,
            },
            {
                name: "Bullet Storm",
                text: <span>Bullet Hell deals {harm(4)}.</span>,
            },
        ],
        powerSpecialization: [
            {
                name: "Boosted",
                text: (
                    <span>
                        Spend 1 extra <Ap>AP</Ap> to increase the <Ha>Harm</Ha>{" "}
                        by 1.
                    </span>
                ),
            },
            {
                name: "Boosted",
                text: (
                    <span>
                        Spend 1 extra <Ap>AP</Ap> to increase the <Ha>Harm</Ha>{" "}
                        by 1.
                    </span>
                ),
            },
            {
                name: "Solar",
                text: <span>Use {ph} instead.</span>,
                target: ["Brunt Force", "Contest", "Snipe"],
            },
            {
                name: "Lunar",
                text: <span>Use {ps} instead.</span>,
                target: ["Brunt Force", "Snipe"],
            },
            {
                name: "Twilight",
                text: <span>Use {po} instead.</span>,
                target: "Contest",
            },
            {
                name: "Prepped",
                text: "First time this power is used in combat, it doesn't count as an action.",
            },
            {
                name: "Upheaval",
                text: (
                    <span>
                        Flurry of Change deals <Ha>Harm</Ha> equal to your
                        current <Ap>AP</Ap>.
                    </span>
                ),
                target: "Flurry of Change",
            },
            {
                name: "Expanding Force",
                text: (
                    <span>
                        Brunt Force deals <Ha>Harm</Ha> to all enemies Close to
                        target as well.
                    </span>
                ),
                target: "Brunt Force",
            },
            {
                name: "Encore",
                text: (
                    <span>
                        Once per round, if you kill the target with Contest, you
                        may immediately Contest another foe at no cost.
                    </span>
                ),
                target: "Contest",
            },
            {
                name: "Curved Bullets",
                text: (
                    <span>
                        If you aim at a single target with Snipe and kill them,
                        deal <Ha>Harm</Ha> equal to your {po} to a foe Close to
                        the target.
                    </span>
                ),
                target: "Snipe",
            },
        ],
    },
    {
        title: "Sanguine",
        description:
            "You are the vital spark in every being. You are sacrificed and saved and spilled in every conflict.",
        passive: {
            name: "Ambrosia",
            text: (
                <span>
                    Your essence is just another resource to you. You may spend{" "}
                    <Hp>1 HP</Hp> when using a Power to activate its{" "}
                    <Re>Ambrosial effect</Re>.
                </span>
            ),
        },
        active: [
            {
                name: "Transfusion",
                text: (
                    <span>
                        You control the flow of life. Chose two creatures Close
                        to each other. Transfer <Hp>1 HP</Hp> from one to the
                        other.
                        <br />
                        <Re>Ambrosial effect</Re>: Transfer <Hp>HP</Hp> equal to
                        your {ph} instead.
                    </span>
                ),
            },
            {
                name: "Ritual Sacrifice",
                text: (
                    <span>
                        You pull the essence right from your foes. Deal{" "}
                        {harm(1)} to one enemy within Close range and gain{" "}
                        <Hp>1 HP</Hp>.
                        <br />
                        <Re>Ambrosial effect</Re>: Target enemy at any range.
                    </span>
                ),
            },
            {
                name: "Donation",
                text: (
                    <span>
                        You lash out with whirling talons made of your own
                        essence. Lose <Hp>1 HP</Hp> and deal {harm(1)} to every
                        enemy within Close range.
                        <br />
                        <Re>Ambrosial effect</Re>: Deal <Ha>Harm</Ha> equal to
                        your {po} instead.
                    </span>
                ),
            },
            {
                name: "Mist Form",
                text: (
                    <span>
                        You burst into a cloud of silvered mist and move to any
                        location within Far range. Deal {harm(1)} to all Close
                        enemies at location.
                        <br />
                        <Re>Ambrosial effect</Re>: Deal <Ha>Harm</Ha> equal to
                        your {ps}.
                    </span>
                ),
            },
        ],
        coherenceLoss: {
            name: "Axiom",
            text: (
                <span>
                    You lock down, surrounding yourself with a steel coffin. No
                    effect on <Hp>Coherence Loss</Hp>. You may resurrect at the
                    start of the next round without requiring aid from an ally.
                    Activate Ritual Sacrifice when you do. Doing this uses your
                    action, and you may only move on your turn.
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
                name: "Hearty",
                text: (
                    <span>
                        Regain <Hp>2 HP</Hp> from <Hp>HP</Hp> drops.
                    </span>
                ),
            },
            {
                name: "Leech",
                text: (
                    <span>
                        <Ap>AP</Ap> drops also provide <Hp>1 HP</Hp>.
                    </span>
                ),
            },
            {
                name: "Reborn",
                text: (
                    <span>
                        Gain the <Re>Ambrosial effect</Re> from Ritual Sacrifice
                        when activating Axiom.
                    </span>
                ),
            },
            {
                name: "Mobile Grave",
                text: (
                    <span>
                        You may resurrect anywhere when activating Axiom.
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
                name: "Blood Soaked",
                text: (
                    <span>
                        Gain <Re>Ambrosial effect</Re> at no cost.
                    </span>
                ),
            },
            {
                name: "Doping",
                text: (
                    <span>
                        You and your allies gain double <Hp>HP</Hp> from
                        Transfusion.
                    </span>
                ),
                target: "Transfusion",
            },
            {
                name: "Refreshing",
                text: (
                    <span>
                        If you kill with Ritual Sacrifice, you may immediately
                        activate another Power. You must still pay the{" "}
                        <Ap>AP</Ap> to do so.
                    </span>
                ),
                target: "Ritual Sacrifice",
            },
            {
                name: "Toxic Essence",
                text: (
                    <span>
                        Lose any number of <Hp>HP</Hp> to deal that number of{" "}
                        <Ha>Harm</Ha> with Donation.
                    </span>
                ),
                target: "Donation",
            },
            {
                name: "War Path",
                text: (
                    <span>
                        Mist Form deals {harm(1)} to all enemies in the movement
                        path.
                    </span>
                ),
                target: "Mist Form",
            },
        ],
    },
    {
        title: "Accursed",
        description:
            "You are the end of all. You are the inevitable that mortals would bargain their souls to avoid for just a single moment more.",
        passive: {
            name: "Damnation",
            text: (
                <span>
                    Enemies affected by your Powers are <Re>Damned</Re>.{" "}
                    <Re>Damned</Re> enemies deal <Ha>+1 Harm</Ha> the next time
                    they attack a PC, and then inflict double that <Ha>Harm</Ha>{" "}
                    on themselves. <Re>Damned</Re> is removed after.
                </span>
            ),
        },
        active: [
            {
                name: "Hellfire",
                text: (
                    <span>
                        You ignite an enemy's soul with a touch. Deal {harm(3)}{" "}
                        to an enemy within Close range. If they die from
                        Hellfire, they explode and deal {harm(1)} to all enemies
                        within Close range to them.
                    </span>
                ),
            },
            {
                name: "Brimstone",
                text: (
                    <span>
                        You cause rock and ash to burst from a tear in the
                        ground. Deal {harm(1)} to an enemy at Near range, and
                        all enemies within Close range to your target. All
                        damaged enemies can only attack at Close range until the
                        end of the round.
                    </span>
                ),
            },
            {
                name: "Banish",
                text: (
                    <span>
                        You cast your enemy to a realm of your creation,
                        momentarily. One enemy within Close range disappears
                        from the battle. They return at the end of your next
                        turn.
                    </span>
                ),
            },
            {
                name: "Snare",
                text: (
                    <span>
                        You bind the bodies of your closest foes and damn their
                        souls. Target a number of enemies equal to {ps}, they
                        cannot act this round.
                    </span>
                ),
            },
        ],
        coherenceLoss: {
            name: "Judgement Day",
            text: (
                <span>
                    All enemies within Close range are dragged to the end, never
                    to be seen from again.
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
                name: "Eternal",
                text: (
                    <span>
                        <Re>Damnation</Re> is not removed after enemies deal{" "}
                        <Ha>Harm</Ha>.
                    </span>
                ),
            },
            {
                name: "Dance with the Devil",
                text: (
                    <span>
                        <Re>Damned</Re> enemies take {harm(1)} whenever they are
                        Close to you.
                    </span>
                ),
            },
            {
                name: "Fine Print",
                text: (
                    <span>
                        <Re>Damned</Re> enemies cannot <Ha>Harm</Ha> you.
                    </span>
                ),
            },
            {
                name: "For Whom the Bell Tolls",
                text: (
                    <span>
                        Enemies are effected by Judgement Day at any range.
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
                name: "Split Mind",
                text: "+1 Target",
            },
            {
                name: "Split Mind",
                text: "+1 Target",
            },
            {
                name: "White Hot",
                text: (
                    <span>
                        Explosion <Ha>Harm</Ha> to enemies for Hellfire equals
                        your {ph}.
                    </span>
                ),
                target: "Hellfire",
            },
            {
                name: "Fissure",
                text: (
                    <span>
                        Brimstone now affects a line between you and a Far
                        location.
                    </span>
                ),
                target: "Brimstone",
            },
            {
                name: "Rift",
                text: (
                    <span>
                        When Banish target returns, they deal <Ha>Harm</Ha>{" "}
                        equal to your {po} to all enemies Close to their
                        location.
                    </span>
                ),
                target: "Banish",
            },
            {
                name: "Bound",
                text: (
                    <span>
                        <Re>Damned</Re> enemies affected by Snare take {harm(1)}{" "}
                        in addition to the Power's effects.
                    </span>
                ),
                target: "Snare",
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
