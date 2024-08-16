export default function TestResponse({ data }) {
  return (
    <>
      {data?.map((v, i) => (
        <p key={i}>{v}</p>
      ))}
    </>
  );
}
