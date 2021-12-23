import {Button, Drawer, List, ListItem} from "@mui/material";
import {Link} from "react-router-dom";
import {useState} from "react";

export const AdminMenu = props => {
    const [open, setOpen] = useState(null)

    return (
        <div>
            <Button
                onClick={() => setOpen(!open)}
                style={{color:"red"}}
            >
                Admin
            </Button>
            <Drawer
                open={open}
                anchor="right"
                onClick={() => setOpen(!open)}
            >
                <List style={{padding:"20px"}}>
                    <ListItem>
                        <Link to="/admin/stats" style={{color:"black"}}>Статистика</Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/admin/films" style={{color:"black"}}>Фільми</Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/admin/cinemas" style={{color:"black"}}>Кінотеатри</Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/admin/halls" style={{color:"black"}}>Зали</Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/admin/showtimes" style={{color:"black"}}>Час показу</Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/admin/reservations" style={{color:"black"}}>Бронювання</Link>
                    </ListItem>
                    <ListItem>
                        <Link to="/admin/users" style={{color:"black"}}>Користувачі</Link>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    )
}