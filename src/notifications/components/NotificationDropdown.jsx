import {
  Badge,
  IconButton,
  Menu,
  Tooltip,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import Notification from "../../notification/components/Notification";
import { save } from "../../api";
import useSWRMutation from "swr/mutation";
import { useNavigate } from "react-router-dom";
import useDeviceDimensions from "../../utils/hooks/deviceDimensions.hook";
import useSWR from "swr";
import { get } from "../../api";

export default function NotificationDropdown() {
  const { data = {} } = useSWR("notificaties/recent", get);
  const notifications = data.items == undefined ? [] : data.items;

  const notificationCount = notifications.length;
  const newNotifications = `U hebt ${notificationCount} nieuwe notificaties`;
  const noNotifications = `Geen nieuwe notificaties`;
  const { isMobile } = useDeviceDimensions();

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { trigger: updateStatus } = useSWRMutation("notificaties", save);

  const handleClick = (event) => {
    !isMobile()?
    setAnchorEl(event.currentTarget):
    navigate("/notificaties?pagina=0&rijen=10");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeStatus = async (noti) => {
    notifications.pop(noti);
    try {
      await updateStatus({
        id: noti.id,
        status: "gelezen",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickNotification = (noti) => {
    changeStatus(noti);
    setAnchorEl(null);
    navigate(`notificaties/${noti.id}`)

  };

  const handleRedirect = () => {
    setAnchorEl(null);
    navigate("/notificaties?pagina=0&rijen=10");
  };


  return (
    <>
      <Tooltip
        title={notificationCount === 0 ? noNotifications : newNotifications}
      >
        <IconButton
          size="large"
          color="inherit"
          onClick={handleClick}
          aria-controls={open ? "notification-list" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          <Badge badgeContent={notificationCount} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="notification-list"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {notifications?.map((noti) => (
          <MenuItem
            key={noti.id}
            back
            onClick={() => {
              handleClickNotification(noti);
            }}
            sx={{ minWidth: 400 }}
          >
            <Notification notification={noti} />
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={handleRedirect}>
          <ListItemIcon>
            <Typography>Bekijk alle notificaties</Typography>
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </>
  );
}
