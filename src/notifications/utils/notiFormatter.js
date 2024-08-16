import { formatDate } from "../../utils/formatters/date";
import { formatUUID } from "../../uuid/components/uuidHelpers";

export const formatNotification = (n) => {
  return {
    id: n.id,
    avatar: n.avatar,
    soort: n.notificatieSoort,
    content: n.tekst,
    bestelling: n.bestellingid,
    datum: formatDate(new Date(n.datum)),
    status: n.status,
  };
}

export const formatNotificationId = (n) => {
  return {
    id: n.id,
    avatar: n.avatar,
    soort: n.notificatieSoort,
    content: n.tekst,
    bestelling: n.bestellingid,
    datum: formatDate(new Date(n.datum)),
    status: n.status,
    buuid: formatUUID(n.bestellingUuid),
  };
};