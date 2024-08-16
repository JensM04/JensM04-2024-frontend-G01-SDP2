import { formatUUID } from "./uuidHelpers"

export default function UUID({uuid}) {
    return (<>
        {formatUUID(uuid)}
    </>)
}