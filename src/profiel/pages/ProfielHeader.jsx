import Title from "../../components/layout/Title";
function ProfielHeader({ user }) {
  const titel = `Hallo, ${user.GEBRUIKERSNAAM}`;
  return <Title title={titel} />;
}

export default ProfielHeader;
