import { List, ListItemText, ListSubheader, ListItem } from "@mui/material";

export default function InfoComponent({ listItems, infoHeader }) {
  return (
    <List
      subheader={<ListSubheader>{infoHeader}</ListSubheader>}
      style={{
        height: "100%",
      }}
      data-cy={`${infoHeader.toLowerCase().replace(" ", "_")}_list`}
    >
      {listItems.map((item) => {
        return (
          <>
            <ListItem>
              <ListItemText
                primary={<strong>{item.key}</strong>}
                secondary={item.value}
              />
            </ListItem>
          </>
        );
      })}
    </List>
  );
}
