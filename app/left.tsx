export default function Left(props: any) {
  return (
    <div className="flex flex-row gap-4 text-neutral-content py-8">
      <div className="lg:basis-1/6" />
      <div className="mb-5 lg:basis-1/2">{props.children}</div>
    </div>
  );
}
