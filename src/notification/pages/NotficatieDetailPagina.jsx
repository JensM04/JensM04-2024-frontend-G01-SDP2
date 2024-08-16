import { useParams } from "react-router";
import NotificationDetail from "../components/NotificationDetail";
import Title from "../../components/layout/Title";
import { Button } from "@mui/material";
import { getNotifById } from "../../notifications/utils/notificaties";
import useSWR from "swr";
import AsyncData from "../../components/AsyncData";
import { formatNotificationId } from "../../notifications/utils/notiFormatter";
import { formatUUID } from "../../uuid/components/uuidHelpers";
import { NavLink } from "react-router-dom";

export default function NotificatieDetailPagina() {
  const { id } = useParams();
  const {
    data: notificatie,
    isLoading,
    error,
  } = useSWR(`notificaties/${id}`, getNotifById);

  return (
    <div>
      <AsyncData loading={isLoading} error={error}>
        {!isLoading && (
          <>
            <Title title={`notificatie ${id}`} />
            <NotificationDetail
              notification={formatNotificationId(notificatie)}
            />
            <Button
              variant="contained"
              sx={{
                bgcolor: "#E33D36",
                "&:hover": {
                  bgcolor: "#E33D36",
                },
                marginTop: 2,
              }}
              LinkComponent={NavLink}
              to={`/bestellingen/${notificatie.bestellingUuid}`}
            >
              Zie Bestelling
            </Button>
          </>
        )}
      </AsyncData>
    </div>
  );
}
