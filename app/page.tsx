"use client";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useMemo, useState } from "react";
import { useImmer } from "use-immer";
import Draggable from "./draggable";
import Droppable from "./droppable";
import Power from "./power";

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

const bold = genSpan("font-bold");
const italic = genSpan("italic");
const psyche = genSpan("text-primary-focus");
const physicality = genSpan("text-secondary-focus");
const potency = genSpan("text-accent-focus");

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
              The Aether responds to your touch, flowing up your limbs in a
              strange, winding motion. Iridescent sparks jump between your
              fingers, and you find that controlling their movement is as simple
              as willing it. The power is intuitive and intoxicating, and the
              well you pull from feels limitless. You direct your energy to the
              star before you with a small gesture—a sea of liquid sunlight, the
              star parts, expelling its ambrosial power in one great wave. A
              billion voices cry out, then become fuel.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col min-h-screen my-4">
        <div className="flex flex-row gap-4 text-neutral-content py-8">
          <div className="basis-1/3" />
          <p className="mb-5 basis-1/2">
            APEX is a tabletop roleplaying game about the Thessians, a race of
            eldritch beings. As Thessians, the players fight and scheme to bring
            about their world-spanning plans, whether this involves conquering
            the universe, building a utopia, or simply exploring the reaches of
            the unknown. This ruleset encourages narrative-heavy, one-shot style
            play. You'll need ten ten-sided dice (10d10), a completed character
            sheet, and somewhere to track your character's resources to
            participate.
          </p>
        </div>
        <div className="flex flex-row gap-4 text-neutral-content py-8">
          <div className="basis-1/6" />
          <div className="mb-5 basis-1/2">
            <p className="text-5xl mb-2">Playing the Game</p>
            <p>
              A game of APEX involves {bold("players")}, who control{" "}
              {bold("player characters")} ({bold("PCs")}), and a{" "}
              {bold("narrator")} who controls all other characters (
              {bold("NPCs")}) and sets the scene during play. Typical play cedes
              decision-making to the players, who determine their PC's actions
              and what activities to pursue. Given the overwhelming power of the
              PCs in this game, most actions require no adjudication on the
              narrator's part and occur without any dice rolls. For instance,
              should a player want to do something unlikely to fail--ranging
              anywhere from throwing a rock a few hundred yards to flying,
              changing their form, or consuming mundane poison--the narrator
              will give the player the go-ahead to describe the action (or
              describe it themselves, if the player prefers).
            </p>
            <br />
            <p>
              Dice rolls, and APEX's {bold("dice pool")} mechanic, only come
              into play when a PC attempts an action that has a chance to fail.
              This may include challenging tasks or actions that another
              character may contest. To resolve such occurrences, every PC has
              nine {bold("abilities")} that cover different kinds of actions and
              three {bold("approaches")} associated with those abilities.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4 text-neutral-content py-8">
          <div className="basis-1/3" />
          <div className="mb-5 basis-1/2">
            <p className="text-4xl mb-2">Approaches and Abilities</p>
            <p>
              An approach is how a PC attempts to perform some action. APEX
              categorizes approaches into three general categories:{" "}
              {psyche("Psyche")}, {physicality("Physicality")}, and{" "}
              {potency("Potency")}. A {psyche("Psyche")} approach means a PC
              emphasizes using their mind and forethought, a{" "}
              {physicality("Physicality")} approach means the PC relies more on
              their physical body, and a {potency("Potency")} approach means the
              PC uses their magic more directly. As an example:{" "}
              {italic("Tracker")} wants to locate a runaway thrall. If{" "}
              {italic("Tracker")} hid a trace on the thrall before it escaped,
              she'd use a {potency("Potency")} approach. If {italic("Tracker")}{" "}
              went looking for footprints or broken branches, she 'd use a{" "}
              {physicality("Physicality")} approach. If {italic("Tracker")}{" "}
              imagined how the thrall might act and attempted to predict its
              movements, she 'd use a {psyche("Psyche")} approach.
            </p>
            <br />
            <p>
              The nine abilities are the broad categories a particular action
              can fall into and are used to describe the skill a PC has in that
              kind of action. Abilities are associated with a specific approach
              in groupings of three per approach.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4 text-neutral-content py-8">
          <div className="basis-1/6" />
          <div className="mb-5 basis-1/2">
            <p className="text-2xl mb-2 text-primary-focus">Psyche Abilities</p>
            <p>
              {psyche("Composure")}.{" "}
              {italic("Stay calm under adversity. Withstand other wills.")} A
              PC's {psyche("Composure")} is its ability to shrug off attempts to
              control or influence its actions and how well it can convincingly
              misdirect others. Some examples that use the {psyche("Composure")}{" "}
              ability are avoiding being stunned by an EMP and convincing an
              inquisitor of your innocence.
            </p>
            <br />
            <p>
              {psyche("Rhetoric")}.{" "}
              {italic("Convince those around you. Tempt the unwilling.")} A PC's{" "}
              {psyche("Rhetoric")} is its ability to manipulate others and
              persuade them into actions in the PC's favor. Some examples that
              use the {psyche("Rhetoric")} ability are tricking a noble into
              exposing his secrets in a high court and luring the son of the
              technocrat into hedonic life of sin.
            </p>
            <br />
            <p>
              {psyche("Wit")}.{" "}
              {italic("Uncover new knowledge. Remember hidden truths.")} A PC's{" "}
              {psyche("Wit")} is its ability to recall and learn information.
              Some examples that use the {psyche("Wit")} ability are learning
              the true name of a formless anomaly on the rim, distributing
              esoteric truths to mortals in exchange for favors, and remembering
              the correct lever sequence to launch a slipship.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4 text-neutral-content py-8">
          <div className="basis-1/3" />
          <div className="mb-5 basis-1/2">
            <p className="text-2xl mb-2 text-secondary-focus">
              Physicality Abilities
            </p>
            <p>
              {physicality("Endurance")}.{" "}
              {italic(
                "Withstand great pressure. Struggle against the impossible."
              )}{" "}
              A PC's {physicality("Endurance")} is its ability to push through
              hostile environments, shrug off poisoning attempts, and exert
              itself over long periods. Some examples that use the{" "}
              {physicality("Endurance")} ability are descending into the heart
              of a singularity and holding a continent above the ocean for
              millennia.
            </p>
            <br />
            <p>
              {physicality("Agility")}.{" "}
              {italic("React to new circumstances. Move with haste.")} A PC's{" "}
              {physicality("Agility")} is its ability to move with speed and
              grace. Some examples that use the {physicality("Agility")} ability
              are slicing a paladin in half before he can draw his blade and
              piloting an imperial starcraft through a dense asteroid field.
            </p>
            <br />
            <p>
              {physicality("Power")}.{" "}
              {italic("Shift people and worlds. Apply intense force.")} A PC's{" "}
              {physicality("Power")} is its ability to exert pressure on objects
              or command fear and respect among its followers. Some examples
              that use the {physicality("Power")} ability are shattering an
              ancient "unbreakable" artifact and swinging a lightblade through a
              large moon.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4 text-neutral-content py-8">
          <div className="basis-1/6" />
          <div className="mb-5 basis-1/2">
            <p className="text-2xl mb-2 text-accent-focus">Potency Abilities</p>
            <p>
              {potency("Shivers")}.{" "}
              {italic("Tune in to the Aether. Feel the world around you.")} A
              PC's {potency("Shivers")} is its ability to perceive the world
              around it and the effect technology or magic has on reality. Some
              examples that use the {potency("Shivers")} ability are seeking the
              location of the last rebels in their underground base and tracing
              the flow of mana in a broken magicircuit.
            </p>
            <br />
            <p>
              {potency("Volition")}.{" "}
              {italic("Manifest your will. Create something from nothing.")} A
              PC's {potency("Volition")} is its ability to generate or destroy
              matter and energy. Some examples that use the{" "}
              {potency("Volition")} ability are summoning a ball of fire in the
              middle of a priest's convocation and consuming the nuclear force
              in a burgeoning people 's space station.
            </p>
            <br />
            <p>
              {potency("Interfacing")}.{" "}
              {italic("Manipulate complex systems. Speak with machines.")} A
              PC's {potency("Interfacing")} is its ability to connect with
              magical mechanisms and intricate machines. Some examples that use
              the {potency("Interfacing")} ability are convincing an autonomous
              turret to fire on its creator and modifying a clock tower to
              summon fiends when it strikes midnight.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4 text-neutral-content py-8">
          <div className="basis-1/3" />
          <div className="mb-5 basis-1/2">
            <p className="text-4xl mb-2">Rolling and Resolving Actions</p>
            <p>
              Each approach has one to three pips (⦿) associated with it,
              representing how good a PC is at a particular approach--with more
              pips being better. Similarly, each ability has one to six pips.
              When a PC attempts to perform an action that might fail (or
              succeed with consequences), the narrator asks them to perform an
              ability check. The narrator determines which approach and skill
              best fit the attempted action and sets the check's difficulty from
              two to nine. The player rolls a quantity of d10s equal to the
              approach's pips plus the ability's pips and counts the number of
              successes: the dice that rolled a six or higher. The action
              succeeds if the number of successes equals or exceeds the
              difficulty. If the number of successes is greater than half the
              difficulty, rounded down, the action partially succeeds or
              succeeds with consequences. Otherwise, the action fails.
            </p>
            <br />
            <p>
              For example, {italic("Anger")} and {italic("Despair")} want to
              drive their captives to jump into the spike pit in their cell.{" "}
              {italic("Despair")} shows the captives scenes of their loved ones
              dying and their world melting in an attempt to rob them of their
              will to live. The narrator asks {italic("Despair")} to roll a{" "}
              {psyche("Psyche")}({psyche("⦿⦿")})+
              {psyche("Rhetoric")}({psyche("⦿⦿⦿")}) roll and sets the difficulty
              at three. {italic("Despair")} has five pips between her approach
              and ability, so she rolls five dice. She gets two successes, which
              doesn't match the difficulty but passes the half mark; while some
              of the captives do self-impale, the rest bolster themselves
              against her words. Seeing this, {italic("Anger")} gets bored and
              teleports into the chamber, trying to throw the prisoners in one
              by one. The narrator asks {italic("Anger")} to roll a{" "}
              {physicality("Physicality")}({physicality("⦿⦿⦿")}
              )+
              {physicality("Power")}({physicality("⦿⦿⦿⦿⦿⦿")}) roll and keeps the
              difficulty at 3. {italic("Anger")} rolls nine dice and gets six
              successes. As such, he successfully throws the remaining captives
              into the pit.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-4 text-neutral-content py-8">
          <div className="basis-1/6" />
          <div className="mb-5 basis-1/2">
            <p className="text-4xl mb-2">Creating a Player Character</p>
            <p>
              There are three steps in creating a player character in APEX:
              distributing your aptitudes, assigning pips to abilities, and
              selecting a specialty. First is distributing aptitudes--every
              player character is excellent at one approach, good at a second
              approach, and okay at the third approach. Assign three pips to
              one, two to another, and one to a third. Next is assigning pips to
              abilities. Each character starts with one pip in every skill, and
              18 free pips can be assigned to any ability. The maximum number of
              pips set to any one ability equals two plus the associated
              approach's number of pips. Finally, select a specialty. Every PC
              has one ability they're particularly good at. Add one pip onto any
              skill--this pip ignores the maximum limit from the previous step.
            </p>
            <br />
            <p>
              For example, {italic("Caregiver")} is building their character to
              be wise and magically powerful but not particularly physical. She
              assigns three pips to {psyche("Psyche")}, two to potency, and one
              to {physicality("Physicality")}. Since that makes{" "}
              {psyche("Psyche")}-associated abilities have a max of five pips,
              she puts five in {psyche("Composure")} and {psyche("Rhetoric")}{" "}
              and three in {psyche("Wit")}. {physicality("Physicality")}
              -associated abilities have a maximum of three pips, so she
              arranges two in each. {potency("Potency")}-associated abilities
              have a max of four pips; she puts three in {potency("Shivers")}{" "}
              and {potency("Volition")} and two in {potency("Interfacing")}.
              Finally, she selects {psyche("Composure")} as her specialty,
              bringing the pip total to six for that ability.
            </p>
            <br />
            <p>
              Below is an interactive menu to assist in the construction of a
              proper ability array. Begin by dragging the three collections of
              pips into the approach you wish to assign them to. Then toggle the
              pips in the ability cards until you've distributed all your
              points. Finally, select the leftmost pip in the ability you wish
              to be your PC 's specialty.
            </p>
          </div>
        </div>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex flex-row gap-4 my-4 alert">
          <div className="flex flex-row gap-4 my-4">
            <div>
              {Object.keys(aptitudes).filter(
                (kind) => aptitudes[kind as keyof Aptitudes].owner === "none"
              ).length === 0 ? (
                <></>
              ) : (
                <span>
                  Drag these pips to the<br></br>approaches outlined below.
                </span>
              )}
            </div>
            {Object.keys(aptitudes)
              .filter(
                (kind) => aptitudes[kind as keyof Aptitudes].owner === "none"
              )
              .map((kind) => (
                <div className={`card z-40`} key={kind}>
                  {aptitudes[kind as keyof Aptitudes].element}
                </div>
              ))}
          </div>
          <div className="grow" />
          <div className="flex flex-col">
            <>
              <span
                className={`countdown font-mono text-5xl ${
                  power == 0 ? "text-success" : power < 0 ? "text-error" : ""
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
                  power == 0 ? "text-success" : power < 0 ? "text-error" : ""
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
        <div className="flex flex-col gap-4 place-content-center">
          {Object.keys(approaches)
            .map((key) => ({
              key,
              ...approaches[key as keyof Approaches],
            }))
            .map(({ key, name, flavor, aptitude, abilities, style }) => (
              <div key={key} className="flex flex-row gap-4">
                <Droppable id={key}>
                  <div
                    className={`card w-96 h-56 ${style.background} ${style.text}`}
                  >
                    <div className="card-body">
                      <h2 className="card-title">{name}</h2>
                      <div className="card-actions justify-center">
                        <p>{flavor}</p>
                        {Object.keys(aptitudes).filter(
                          (kind) =>
                            aptitudes[kind as keyof Aptitudes].owner === key
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
                          Object.keys(aptitudes)
                            .filter(
                              (kind) =>
                                aptitudes[kind as keyof Aptitudes].owner === key
                            )
                            .map((kind) => (
                              <div key={kind} className="z-40">
                                {aptitudes[kind as keyof Aptitudes].element}
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
                        {/* <div className="card-actions justify-end">
                          <button className="btn btn-circle btn-xs">
                            <FontAwesomeIcon icon={faCircleInfo} />
                          </button>
                        </div> */}
                      </h2>
                      <p>{abilityDescription(ability)}</p>
                      <div className="card-actions justify-center">
                        <Power
                          className={style.radio}
                          checkedClassName={style.radioChecked}
                          aptitude={aptitude}
                          ability={ability}
                          powerUpdate={(prev: number, next: number) => {
                            setPower(power + prev - next);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </DndContext>
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
