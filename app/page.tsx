"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useMemo, useState } from "react";
import { useImmer } from "use-immer";
import Draggable from "./draggable";
import Droppable from "./droppable";
import Left from "./left";
import Portfolios from "./portfolios";
import Power from "./power";
import Resources from "./resources";
import Right from "./right";
import { Ap, B, Card, H1, H2, H3, Ha, Hp, I, Ph, Po, Ps } from "./util";

/* Aptitude: How good you are at a certain Approach
 * Approach: One of Psyche, Physicality, and Potency
 * Ability: One of the approach subdivisions
 */

type Aptitude = {
    owner: string;
    element: JSX.Element;
};

type Aptitudes = {
    mild: Aptitude;
    moderate: Aptitude;
    major: Aptitude;
};

type Ability =
    | "Composure"
    | "Rhetoric"
    | "Wit"
    | "Endurance"
    | "Agility"
    | "Power"
    | "Shivers"
    | "Interfacing"
    | "Volition";

function abilityDescription(ability: Ability) {
    switch (ability) {
        case "Composure":
            return "Stay calm under adversity. Withstand other wills.";
        case "Rhetoric":
            return "Convince those around you. Tempt the unwilling.";
        case "Wit":
            return "Uncover new knowledge. Remember hidden truths.";
        case "Endurance":
            return "Withstand great pressure. Struggle against the impossible.";
        case "Agility":
            return "React to new circumstances. Move with haste.";
        case "Power":
            return "Shift people and worlds. Apply intense force.";
        case "Shivers":
            return "Tune in to the Aether. Feel the world around you.";
        case "Volition":
            return "Manifest your will. Create something from nothing.";
        case "Interfacing":
            return "Manipulate complex systems. Speak with machines.";
    }
}

type Style = {
    background: string;
    text: string;
    border: string;
    radio: string;
    radioChecked: string;
};

type Approach = {
    name: string;
    flavor: string;
    aptitude: string;
    abilities: Ability[];
    style: Style;
};

type Approaches = {
    psyche: Approach;
    physicality: Approach;
    potency: Approach;
};

const genSpan = (className: string) => {
    const elem = (x: JSX.Element | string) => (
        <span className={className}>{x}</span>
    );
    return elem;
};

const ps = <Ps>Psyche</Ps>;
const cmp = <Ps>Composure</Ps>;
const ret = <Ps>Rhetoric</Ps>;
const wit = <Ps>Wit</Ps>;

const ph = <Ph>Physicality</Ph>;
const end = <Ph>Endurance</Ph>;
const agi = <Ph>Agility</Ph>;
const pwr = <Ph>Power</Ph>;

const po = <Po>Potency</Po>;
const shv = <Po>Shivers</Po>;
const vol = <Po>Volition</Po>;
const int = <Po>Interfacing</Po>;

const hp = <Hp>HP</Hp>;
const ap = <Ap>AP</Ap>;

export default function Index() {
    const [aptitudes, setAptitudes] = useImmer<Aptitudes>({
        mild: {
            owner: "none",
            element: (
                <Draggable id="mild">
                    <div className="alert flex gap-1 border-2 border-neutral-content">
                        <input
                            type="radio"
                            name="mild-1"
                            className="radio mx-1"
                            readOnly
                            checked
                        />
                    </div>
                </Draggable>
            ),
        },
        moderate: {
            owner: "none",
            element: (
                <Draggable id="moderate">
                    <div className="alert flex gap-1 border-2 border-neutral-content">
                        <input
                            type="radio"
                            name="moderate-1"
                            className="radio mx-1"
                            readOnly
                            checked
                        />
                        <input
                            type="radio"
                            name="moderate-2"
                            className="radio mx-1"
                            readOnly
                            checked
                        />
                    </div>
                </Draggable>
            ),
        },
        major: {
            owner: "none",
            element: (
                <Draggable id="major">
                    <div className="alert flex gap-1 border-2 border-neutral-content">
                        <input
                            type="radio"
                            name="major-1"
                            className="radio mx-1"
                            readOnly
                            checked
                        />
                        <input
                            type="radio"
                            name="major-2"
                            className="radio mx-1"
                            readOnly
                            checked
                        />
                        <input
                            type="radio"
                            name="major-3"
                            className="radio mx-1"
                            readOnly
                            checked
                        />
                    </div>
                </Draggable>
            ),
        },
    });
    const [power, setPower] = useState(18);

    const approaches = useMemo<Approaches>(() => {
        const init = {
            psyche: {
                name: "Psyche",
                flavor: "Use your mind. Approach problems with forethought.",
                aptitude: "none",
                abilities: ["Composure", "Rhetoric", "Wit"] as Ability[],
                style: {
                    background: "bg-primary",
                    text: "text-primary-content",
                    border: "border-primary",
                    radio: "radio-primary",
                    radioChecked: "checked:radio-primary",
                },
            },
            physicality: {
                name: "Physicality",
                flavor: "Use your body. Approach problems with tactility.",
                aptitude: "none",
                abilities: ["Endurance", "Agility", "Power"] as Ability[],
                style: {
                    background: "bg-secondary",
                    text: "text-secondary-content",
                    border: "border-secondary",
                    radio: "radio-secondary",
                    radioChecked: "checked:radio-secondary",
                },
            },
            potency: {
                name: "Potency",
                flavor: "Use your soul. Approach problems with spirit.",
                aptitude: "none",
                abilities: ["Shivers", "Volition", "Interfacing"] as Ability[],
                style: {
                    background: "bg-accent",
                    text: "text-accent-content",
                    border: "border-accent",
                    radio: "radio-accent",
                    radioChecked: "checked:radio-accent",
                },
            },
        };

        let owner: keyof Approaches;
        for (owner in init) {
            let aptitude: keyof Aptitudes;
            for (aptitude in aptitudes) {
                if (aptitudes[aptitude].owner === owner) {
                    init[owner].aptitude = aptitude;
                }
            }
        }

        return init;
    }, [aptitudes]);

    return (
        <>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage: "url(https://i.imgur.com/tDNTT7D.jpeg)",
                }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-7xl font-bold">APEX</h1>
                        <p className="mb-5 italic">
                            The Aether responds to your touch, flowing up your
                            limbs in a strange, winding motion. Iridescent
                            sparks jump between your fingers, and you find that
                            controlling their movement is as simple as willing
                            it. The power is intuitive and intoxicating, and the
                            well you pull from feels limitless. You direct your
                            energy to the star before you with a small gesture—a
                            sea of liquid sunlight, the star parts, expelling
                            its ambrosial power in one great wave. A billion
                            voices cry out, then become fuel.
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col min-h-screen my-4">
                <Right>
                    <p>
                        APEX is a tabletop roleplaying game about the Thessians,
                        a race of eldritch beings. As Thessians, the players
                        fight and scheme to bring about their world-spanning
                        plans, whether this involves conquering the universe,
                        building a utopia, or simply exploring the reaches of
                        the unknown. This ruleset encourages narrative-heavy,
                        one-shot style play. You'll need thirteen ten-sided dice
                        (13d10), a completed character sheet, and somewhere to
                        track your character's resources to participate.
                    </p>
                </Right>
                <Left>
                    <H1>Playing the Game</H1>
                    <p>
                        A game of APEX involves <B>players</B>, who control{" "}
                        <B>player characters</B> (<I>PCs</I>), and a{" "}
                        <B>narrator</B> who controls all other characters (
                        <I>NPCs</I>) and sets the scene during play. Typical
                        play cedes decision-making to the players, who determine
                        their PC's actions and what activities to pursue. Given
                        the overwhelming power of the PCs in this game, most
                        actions require no adjudication on the narrator's part
                        and occur without any dice rolls.
                    </p>
                    <br />
                    <p>
                        Should a player want to do something unlikely to
                        fail—ranging anywhere from throwing a rock a few hundred
                        yards to flying, changing their form, or consuming
                        mundane poison—the narrator will give the player the
                        go-ahead to describe the action (or describe it
                        themselves, if the player prefers).
                    </p>
                    <br />
                    <p>
                        Dice rolls, and APEX's <B>dice pool</B> mechanic, only
                        come into play when a PC attempts an action that has a
                        chance to fail. This may include challenging tasks or
                        actions that another character may contest. To resolve
                        such occurrences, every PC has nine <B>abilities</B>{" "}
                        that cover different kinds of actions and three{" "}
                        <B>approaches</B> associated with those abilities.
                    </p>
                </Left>
                <Right>
                    <H2>Approaches and Abilities</H2>
                    <p>
                        An approach is how a PC attempts to perform some action.
                        APEX categorizes approaches into three general
                        categories: {ps}, {ph}, and {po}. A {ps} approach means
                        a PC emphasizes using their mind and forethought, a {ph}{" "}
                        approach means the PC relies more on their physical
                        body, and a {po} approach means the PC uses their magic
                        more directly.
                    </p>
                    <br />
                    <Card>
                        As an example: <I>Tracker</I> wants to locate a runaway
                        thrall. If <I>Tracker</I> hid a trace on the thrall
                        before it escaped, she'd use a {po} approach. If{" "}
                        <I>Tracker</I> went looking for footprints or broken
                        branches, she'd use a {ph} approach. If <I>Tracker</I>{" "}
                        imagined how the thrall might act and attempted to
                        predict its movements, she'd use a {ps} approach.
                    </Card>
                    <br />
                    <p>
                        The nine abilities are the broad categories a particular
                        action can fall into and are used to describe the skill
                        a PC has in that kind of action. Abilities are
                        associated with a specific approach in groupings of
                        three per approach.
                    </p>
                </Right>
                <Left>
                    <H3>
                        <Ps>Psyche Abilities</Ps>
                    </H3>
                    <p>
                        {cmp}.{" "}
                        <I>Stay calm under adversity. Withstand other wills.</I>{" "}
                        A PC's {cmp} is its ability to shrug off attempts to
                        control or influence its actions and how well it can
                        convincingly misdirect others. Some examples that use
                        the {cmp} ability are avoiding being stunned by an EMP
                        and convincing an inquisitor of your innocence.
                    </p>
                    <br />
                    <p>
                        {ret}.{" "}
                        <I>Convince those around you. Tempt the unwilling.</I> A
                        PC's {ret} is its ability to manipulate others and
                        persuade them into actions in the PC's favor. Some
                        examples that use the {ret} ability are tricking a noble
                        into exposing his secrets in a high court and luring the
                        son of the technocrat into hedonic life of sin.
                    </p>
                    <br />
                    <p>
                        {wit}.{" "}
                        <I>Uncover new knowledge. Remember hidden truths.</I> A
                        PC's {wit} is its ability to recall and learn
                        information. Some examples that use the {wit} ability
                        are learning the true name of a formless anomaly on the
                        rim, distributing esoteric truths to mortals in exchange
                        for favors, and remembering the correct lever sequence
                        to launch a slipship.
                    </p>
                </Left>
                <Right>
                    <H3>
                        <Ph>Physicality Abilities</Ph>
                    </H3>
                    <p>
                        {end}.{" "}
                        <I>
                            Withstand great pressure. Struggle against the
                            impossible.
                        </I>{" "}
                        A PC's {end} is its ability to push through hostile
                        environments, shrug off poisoning attempts, and exert
                        itself over long periods. Some examples that use the{" "}
                        {end} ability are descending into the heart of a
                        singularity and holding a continent above the ocean for
                        millennia.
                    </p>
                    <br />
                    <p>
                        {agi}.{" "}
                        <I>React to new circumstances. Move with haste.</I>A
                        PC's {agi} is its ability to move with speed and grace.
                        Some examples that use the {agi} ability are slicing a
                        paladin in half before he can draw his blade and
                        piloting an imperial starcraft through a dense asteroid
                        field.
                    </p>
                    <br />
                    <p>
                        {pwr}.{" "}
                        <I>Shift people and worlds. Apply intense force.</I> A
                        PC's {pwr} is its ability to exert pressure on objects
                        or command fear and respect among its followers. Some
                        examples that use the {pwr} ability are shattering an
                        ancient "unbreakable" artifact and swinging a lightblade
                        through a large moon.
                    </p>
                </Right>
                <Left>
                    <H3>
                        <Po>Potency Abilities</Po>
                    </H3>
                    <p>
                        {shv}.{" "}
                        <I>Tune in to the Aether. Feel the world around you.</I>{" "}
                        A PC's {shv} is its ability to perceive the world around
                        it and the effect technology or magic has on reality.
                        Some examples that use the {shv} ability are seeking the
                        location of the last rebels in their underground base
                        and tracing the flow of mana in a broken magicircuit.
                    </p>
                    <br />
                    <p>
                        {vol}.{" "}
                        <I>
                            Manifest your will. Create something from nothing.
                        </I>{" "}
                        A PC's {vol} is its ability to generate or destroy
                        matter and energy. Some examples that use the {vol}{" "}
                        ability are summoning a ball of fire in the middle of a
                        priest's convocation and consuming the nuclear force in
                        a burgeoning people's space station.
                    </p>
                    <br />
                    <p>
                        {int}.{" "}
                        <I>Manipulate complex systems. Speak with machines.</I>{" "}
                        A PC's {int} is its ability to connect with magical
                        mechanisms and intricate machines. Some examples that
                        use the {int} ability are convincing an autonomous
                        turret to fire on its creator and modifying a clock
                        tower to summon fiends when it strikes midnight.
                    </p>
                </Left>
                <Right>
                    <H2>Rolling and Resolving Actions</H2>
                    <p>
                        Each approach has one to three pips (⦿) associated with
                        it, representing how good a PC is at a particular
                        approach--with more pips being better. Similarly, each
                        ability has one to six pips. When a PC attempts to
                        perform an action that might fail (or succeed with
                        consequences), the narrator asks them to perform an
                        ability check. The narrator determines which approach
                        and skill best fit the attempted action and sets the
                        check's difficulty from two to nine. The player rolls a
                        quantity of d10s equal to the approach's pips plus the
                        ability's pips and counts the number of successes: the
                        dice that rolled a six or higher. The action succeeds if
                        the number of successes equals or exceeds the
                        difficulty. If the number of successes is greater than
                        half the difficulty, rounded down, the action partially
                        succeeds or succeeds with consequences. Otherwise, the
                        action fails.
                    </p>
                    <br />
                    <Card>
                        For example, <I>Anger</I> and <I>Despair</I> want to
                        drive their captives to jump into the spike pit in their
                        cell. <I>Despair</I> shows the captives scenes of their
                        loved ones dying and their world melting in an attempt
                        to rob them of their will to live. The narrator asks{" "}
                        <I>Despair</I> to roll a {ps}(<Ps>⦿⦿</Ps>)+
                        {ret}(<Ps>⦿⦿⦿</Ps>) roll and sets the difficulty at
                        three. <I>Despair</I> has five pips between her approach
                        and ability, so she rolls five dice. She gets two
                        successes, which doesn't match the difficulty but passes
                        the half mark; while some of the captives do
                        self-impale, the rest bolster themselves against her
                        words. Seeing this, <I>Anger</I> gets bored and
                        teleports into the chamber, trying to throw the
                        prisoners in one by one. The narrator asks <I>Anger</I>{" "}
                        to roll a {ph}(<Ph>⦿⦿⦿</Ph>)+{pwr}(<Ph>⦿⦿⦿⦿⦿⦿</Ph>) roll
                        and keeps the difficulty at 3. <I>Anger</I> rolls nine
                        dice and gets six successes. As such, he successfully
                        throws the remaining captives into the pit.
                    </Card>
                </Right>
                <Left>
                    <H1>Player Resources</H1>
                    <br />
                    <H2>
                        <Hp>Health Points</Hp>
                    </H2>
                    <p>
                        While Thessians are the apex of life within the Astra,
                        they are still bound by the rules of the world and its
                        underlying Narrative. Powerful beings (such as the PCs)
                        must maintain a high local information density to
                        manifest and control their physical body. Every PC has
                        eight <Hp>Health Points</Hp> ({hp}), representing the
                        maximum information density a character can safely lose.
                        When a PC's {hp} is reduced to zero, the character loses{" "}
                        <Hp>coherence</Hp> and temporarily ceases to exist.
                    </p>
                    <br />
                    <H3>
                        <Hp>Coherence Loss and Death</Hp>
                    </H3>
                    <p>
                        A Thessian is powerful enough that the prospect of
                        killing one is nigh impossible and, as such, cannot
                        occur during a typical session of APEX. Death is not the
                        only possible negative outcome, however.{" "}
                        <Hp>Coherence loss</Hp> renders a PC immobile, unable to
                        act until aided by an ally. Fortunately, the great power
                        in a Thessian's physical form can be harnessed in a
                        potent final burst when a PC falls, causing beneficial
                        effects unique to each character (as detailed later in
                        this document).
                    </p>
                </Left>
                <Right>
                    <H2>
                        <Ap>Action Points</Ap>
                    </H2>
                    <p>
                        In addition to their {hp}, each Thessian has latent
                        energy that they can harness to increase their natural
                        ability. This energy is represented by{" "}
                        <Ap>Action Points</Ap> ({ap}), and all PCs have a
                        maximum of four. In a session of APEX, a player may
                        spend their {ap} on one of two things: they may{" "}
                        <Ap>Push the Narrative</Ap>, or they may{" "}
                        <Ap>Activate a Power</Ap>.
                    </p>
                    <br />
                    <H3>
                        <Ap>Push the Narrative</Ap>
                    </H3>
                    <p>
                        Whenever a player is asked to make an ability check,
                        they may expend some of their {ap} to{" "}
                        <Ap>Push the Narrative</Ap> and gain an edge. For each{" "}
                        {ap} spent before the roll, the player may add one
                        additional die to their dice pool. In exchange for this
                        significant boost in ability, a PC strains the
                        Narrative, causing it to rebound later in the session.
                        For each {ap} spent in this fashion, the narrator gains
                        their own {ap}, which may be used to empower adversaries
                        encountered during play.
                    </p>
                    <br />
                    <H3>
                        <Ap>Activate a Power</Ap>
                    </H3>
                    <p>
                        Each Thessian has a handful of <Ap>Powers</Ap> -- unique
                        combat abilities that encourage varied playstyles and
                        gameplay niches. During combat, players may spend an{" "}
                        {ap} to activate one of their <Ap>Powers</Ap>. Spending
                        an {ap} this way does not have a negative consequence
                        like <Ap>Push the Narrative</Ap> might. The{" "}
                        <Ap>Powers</Ap> available to your character are detailed
                        in the character creation portion of this ruleset.
                    </p>
                </Right>
                <Left>
                    <H3>Recovering Resources</H3>
                    <p>
                        There are a few ways to recover a PC's {hp} and {ap}.
                        The simplest method to borrow from an ally: a Thessian
                        may donate their resources to a close ally, though this
                        will take time in combat. Also, a player may choose to
                        convert their resources between the two pools at a 2:1
                        exchange rate. However, the most efficient way to
                        replenish resources is to take them from others.
                        Whenever a player slays a foe in combat, a d10 is
                        rolled. If the die lands on a four, five, or six, they
                        regain one {hp}. On a seven or above, they regain one{" "}
                        {ap}. The last method to recover resources is on
                        revival--if an ally aids an <Hp>incoherent</Hp> PC, they
                        return to life with half their {hp} and {ap} rounded up.
                    </p>
                </Left>
                <Right>
                    <H1>Combat</H1>
                    <p>
                        Combat in APEX is structured into rounds and turns. When
                        a round begins, all Thessians take a turn in any order
                        they like. Once the PCs have gone, the enemies take
                        their turns as one group. After the enemies complete
                        their actions, a new round begins.
                    </p>
                    <br />
                    <p>
                        During their turn, a PC can move and take one action.
                        Movement in APEX is abstract--a target may be in one of
                        three ranges. If the target is at most a few steps away,
                        it's Close; if it's within 100 feet, it's Near, and
                        anything further than that is Far. During a turn,
                        movement allows the PC to move one increment towards or
                        away from a target.
                    </p>
                    <br />
                    <p>
                        An action is anything a player chooses to do during
                        their turn. This is typically{" "}
                        <Ap>Activating a Power</Ap>, but if the player doesn't
                        want to spend an {ap}, they can instead perform a{" "}
                        <Ap>Freeform Action</Ap>: anything that might require an
                        ability check. <Ap>Freeform Action</Ap> are less
                        resource-intensive but have a chance to fail or backfire
                        depending on the difficulty of the act. Besides those
                        two options, a player may aid an <Hp>incoherent</Hp>{" "}
                        companion and donate resources.
                    </p>
                    <br />
                    <Card>
                        <p>
                            An example player round might look something like
                            this: <I>Hunger</I>, <I>Honor</I>, and <I>Mania</I>{" "}
                            are leveling the capital of a country that insulted
                            them. <I>Honor</I> marks the general and one of the
                            larger platoons with his passive <Ap>Power</Ap>,
                            then spends an {ap} to swap the positions of{" "}
                            <I>Mania</I> and an enemy tank, placing her right in
                            the middle of combat. <I>Mania</I> spends an {ap} to
                            force the enemy to fire upon itself, taking out two
                            platoons at once, then leaps into the air to avoid
                            enemy fire. She gets an <Hp>HP drop</Hp> and an{" "}
                            <Ap>AP drop</Ap> from her two kills. <I>Hunger</I>{" "}
                            wants to consume the nearest battle mech, which the
                            narrator sets at a difficulty three {ph}(<Ph>⦿⦿</Ph>
                            )+{end}(<Ph>⦿⦿⦿⦿</Ph>) check. <I>Hunger</I> rolls
                            four successes and eats the mech. No drops are
                            rolled from the battle mech.
                        </p>
                        <br />
                        <p>
                            The enemy response might look like this: The general
                            and the larger platoon cannot act due to{" "}
                            <I>Honor</I>'s mark, so they do nothing. A smaller
                            platoon is still near <I>Mania</I>, so they unload
                            their weapons and deal <Ha>1 Harm</Ha> to her. One
                            of the battle mechs near <I>Hunger</I> detonates its
                            energy core in a last-ditch effort to stop the
                            Thessian. <I>Hunger</I> takes <Ha>2 Harm</Ha> and
                            fails a difficulty two {ph}(<Ph>⦿⦿</Ph>
                            )+{end}(<Ph>⦿⦿⦿⦿</Ph>) check, losing an {ap} as a
                            result.
                        </p>
                    </Card>
                </Right>
                <Left>
                    <H1>Creating a Player Character</H1>
                    <br />
                    <H2>Portfolios</H2>
                    <p>
                        A Portfolio is a collection of powers that
                        differentiates any Thessian from another. Each PC has
                        one Portfolio, which will largely dictate the role that
                        character has in combat. Each Portfolio has a passive
                        power (which activates for free when certain conditions
                        are met), four active powers, a Coherence Loss event,
                        and a selection of specializations.
                    </p>
                    <br />
                    <p>
                        Specializations are minor modifications a player can
                        make to their character and are split into two
                        categories: General specializations and Power
                        specializations. General specializations apply to a
                        Portfolio as a whole, while Power specializations are
                        applied to a specific Power.
                    </p>
                </Left>
                <Right>
                    <H2>Building your Character</H2>
                    <p>
                        There are three steps in creating a player character in
                        APEX: distributing your aptitudes, assigning pips to
                        abilities, and selecting a specialty. First is
                        distributing aptitudes--every player character is
                        excellent at one approach, good at a second approach,
                        and okay at the third approach. Assign three pips to
                        one, two to another, and one to a third. Next is
                        assigning pips to abilities. Each character starts with
                        one pip in every skill, and 18 free pips can be assigned
                        to any ability. The maximum number of pips set to any
                        one ability equals two plus the associated approach's
                        number of pips. Finally, select a specialty. Every PC
                        has one ability they're particularly good at. Add one
                        pip onto any skill--this pip ignores the maximum limit
                        from the previous step.
                    </p>
                    <br />
                    <Card>
                        For example, <I>Caregiver</I> is building their
                        character to be wise and magically powerful but not
                        particularly physical. She assigns three pips to {ps},
                        two to potency, and one to {ph}. Since that makes {ps}{" "}
                        associated abilities have a max of five pips, she puts
                        five in {cmp} and {ret} and three in {wit}. {ph}{" "}
                        associated abilities have a maximum of three pips, so
                        she arranges two in each. {po} associated abilities have
                        a max of four pips; she puts three in {shv} and {vol}{" "}
                        and two in {int}. Finally, she selects {cmp} as her
                        specialty, bringing the pip total to six for that
                        ability.
                    </Card>
                    <br />
                    <div className="hidden lg:block">
                        <p>
                            Below is an interactive menu to assist in the
                            construction of a proper ability array. Begin by
                            dragging the three collections of pips into the
                            approach you wish to assign them to. Then toggle the
                            pips in the ability cards until you've distributed
                            all your points. Finally, select the leftmost pip in
                            the ability you wish to be your PC's specialty.
                        </p>
                    </div>
                </Right>
            </div>
            <div className="hidden lg:block">
                <Resources />
                <Portfolios />
                <DndContext onDragEnd={handleDragEnd}>
                    <div className="flex flex-row gap-4 my-4 alert">
                        <div className="flex flex-row gap-4 my-4">
                            <div>
                                {Object.keys(aptitudes).filter(
                                    (kind) =>
                                        aptitudes[kind as keyof Aptitudes]
                                            .owner === "none"
                                ).length === 0 ? (
                                    <></>
                                ) : (
                                    <span>
                                        Drag these pips to the<br></br>
                                        approaches outlined below.
                                    </span>
                                )}
                            </div>
                            {Object.keys(aptitudes)
                                .filter(
                                    (kind) =>
                                        aptitudes[kind as keyof Aptitudes]
                                            .owner === "none"
                                )
                                .map((kind) => (
                                    <div className={`card z-40`} key={kind}>
                                        {
                                            aptitudes[kind as keyof Aptitudes]
                                                .element
                                        }
                                    </div>
                                ))}
                        </div>
                        <div className="grow" />
                        <div className="flex flex-col">
                            <>
                                <span
                                    className={`countdown font-mono text-5xl ${
                                        power == 0
                                            ? "text-success"
                                            : power < 0
                                            ? "text-error"
                                            : ""
                                    }`}
                                >
                                    <span
                                        style={
                                            {
                                                "--value": Math.abs(power),
                                            } as unknown as undefined
                                        }
                                    ></span>
                                </span>
                                <span
                                    className={
                                        power == 0
                                            ? "text-success"
                                            : power < 0
                                            ? "text-error"
                                            : ""
                                    }
                                >
                                    {power > 0
                                        ? "points remaining"
                                        : power == 0
                                        ? "all points spent"
                                        : "too many points!"}
                                </span>
                            </>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 place-content-center justify-center">
                        {Object.keys(approaches)
                            .map((key) => ({
                                key,
                                ...approaches[key as keyof Approaches],
                            }))
                            .map(
                                ({
                                    key,
                                    name,
                                    flavor,
                                    aptitude,
                                    abilities,
                                    style,
                                }) => (
                                    <div
                                        key={key}
                                        className="flex flex-row gap-4 justify-center"
                                    >
                                        <Droppable id={key}>
                                            <div
                                                className={`card w-96 h-56 ${style.background} ${style.text}`}
                                            >
                                                <div className="card-body">
                                                    <h2 className="card-title">
                                                        {name}
                                                    </h2>
                                                    <div className="card-actions justify-center">
                                                        <p>{flavor}</p>
                                                        {Object.keys(
                                                            aptitudes
                                                        ).filter(
                                                            (kind) =>
                                                                aptitudes[
                                                                    kind as keyof Aptitudes
                                                                ].owner === key
                                                        ).length === 0 ? (
                                                            <div className="alert flex gap-1 border-2 border-neutral-content">
                                                                <input
                                                                    type="radio"
                                                                    name="placeholder-1"
                                                                    className="radio mx-1 p-1 invisible"
                                                                    readOnly
                                                                    checked
                                                                />
                                                                <input
                                                                    type="radio"
                                                                    name="placeholder-2"
                                                                    className="radio mx-1 invisible"
                                                                    readOnly
                                                                    checked
                                                                />
                                                                <input
                                                                    type="radio"
                                                                    name="placeholder-3"
                                                                    className="radio mx-1 invisible"
                                                                    readOnly
                                                                    checked
                                                                />
                                                            </div>
                                                        ) : (
                                                            Object.keys(
                                                                aptitudes
                                                            )
                                                                .filter(
                                                                    (kind) =>
                                                                        aptitudes[
                                                                            kind as keyof Aptitudes
                                                                        ]
                                                                            .owner ===
                                                                        key
                                                                )
                                                                .map((kind) => (
                                                                    <div
                                                                        key={
                                                                            kind
                                                                        }
                                                                        className="z-40"
                                                                    >
                                                                        {
                                                                            aptitudes[
                                                                                kind as keyof Aptitudes
                                                                            ]
                                                                                .element
                                                                        }
                                                                    </div>
                                                                ))
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Droppable>
                                        {abilities.map((ability) => (
                                            <div
                                                key={ability}
                                                className={`card w-96 h-56 bg-base-100 border-2 ${style.border}`}
                                            >
                                                <div className="card-body">
                                                    <h2 className="card-title flex flex-row">
                                                        <span>{ability}</span>
                                                        <div className="grow"></div>
                                                    </h2>
                                                    <p>
                                                        {abilityDescription(
                                                            ability
                                                        )}
                                                    </p>
                                                    <div className="card-actions justify-center">
                                                        <Power
                                                            className={
                                                                style.radio
                                                            }
                                                            checkedClassName={
                                                                style.radioChecked
                                                            }
                                                            aptitude={aptitude}
                                                            ability={ability}
                                                            powerUpdate={(
                                                                prev: number,
                                                                next: number
                                                            ) => {
                                                                setPower(
                                                                    power +
                                                                        prev -
                                                                        next
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                            )}
                    </div>
                </DndContext>
            </div>
        </>
    );

    function handleDragEnd(dee: DragEndEvent) {
        setAptitudes((draft) => {
            const heldAptitude = draft[dee.active.id as keyof Aptitudes];

            if (dee.over === null) {
                heldAptitude.owner = "none";
                return;
            }

            const hoveredApproach = dee.over.id as string;
            heldAptitude.owner = hoveredApproach;

            const hoveredApproachAptitude =
                approaches[hoveredApproach as keyof Approaches].aptitude;
            if (hoveredApproachAptitude !== "none") {
                draft[hoveredApproachAptitude as keyof Aptitudes].owner =
                    aptitudes[dee.active.id as keyof Aptitudes].owner;
            }
        });
    }
}
