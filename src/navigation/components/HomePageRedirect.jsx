import { useAuth } from "../../contexts/Auth.context";
import Loader from "../../components/Loader";
import { Navigate } from "react-router-dom";
import { urlBestellingen, urlProducten } from "../utils/defaultUrls";

export default function HomePageRedirect() {
  const { ready, isAuthed, role } = useAuth();

  if (!ready) {
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Loader />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthed || role == "Klant") {
    return <Navigate to={urlProducten} />;
  }

  return <Navigate replace to={urlBestellingen} />;
}
