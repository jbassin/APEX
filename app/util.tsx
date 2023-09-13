function makeSpan(classes: Array<string>) {
    return function Span(props: any) {
        return <span className={classes.join(" ")}>{props.children}</span>;
    };
}

function makeDiv(classes: Array<string>) {
    return function Span(props: any) {
        return <div className={classes.join(" ")}>{props.children}</div>;
    };
}

export const B = makeSpan(["font-bold"]);
export const I = makeSpan(["italic"]);
export const Ps = makeSpan(["text-primary-focus"]);
export const Ph = makeSpan(["text-secondary-focus"]);
export const Po = makeSpan(["text-accent-focus"]);

export function Card(props: any) {
    return (
        <div className="card bg-base-200 border-base-100 border-2">
            <div className="card-body">
                <p>{props.children}</p>
            </div>
        </div>
    );
}
