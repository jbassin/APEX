function makeSpan(classes: Array<string>) {
    return function Span(props: any) {
        return (
            <span className={`${classes.join(" ")} ${props.className}`}>
                {props.children}
            </span>
        );
    };
}

function makeP(classes: Array<string>) {
    return function P(props: any) {
        return (
            <p className={`${classes.join(" ")} ${props.className}`}>
                {props.children}
            </p>
        );
    };
}

export const B = makeSpan(["font-bold"]);
export const I = makeSpan(["italic"]);
export const Ps = makeSpan(["text-primary-focus"]);
export const Ph = makeSpan(["text-secondary-focus"]);
export const Po = makeSpan(["text-accent-focus"]);
export const Hp = makeSpan(["text-success"]);
export const Ap = makeSpan(["text-warning"]);
export const Ha = makeSpan(["text-error"]);

export const H1 = makeP(["text-5xl", "mb-2"]);
export const H2 = makeP(["text-4xl", "mb-2"]);
export const H3 = makeP(["text-2xl", "mb-2"]);

export function Card(props: any) {
    let x = props.children;
    if (typeof props.children[0] == "string") {
        x = <p>{props.children}</p>;
    }

    return (
        <div className="card bg-base-200 border-base-100 border-2">
            <div className="card-body">{x}</div>
        </div>
    );
}
