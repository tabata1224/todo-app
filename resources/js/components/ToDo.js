import { Card, CardActions, CardContent, IconButton, List, TextField } from "@mui/material";
import React, { useState } from "react";
import ToDoDetail from "./ToDoDetail";
import { useUpdateToDoMutateTask } from "../hooks/ToDo";
import { AddCircle, Delete } from "@mui/icons-material";
import { useDeleteToDoMutateTask } from "../hooks/ToDo";
import useStoreToDoDetailMutateTask from "../hooks/ToDoDetail/useStoreToDoDetailMutateTask";

function ToDo(props) {
    const [timer, setTimer] = useState(null);

    let toDo = {
        id: props.toDo.id,
        title: props.toDo.title,
    };
    const { updateToDoMutation } = useUpdateToDoMutateTask();

    /**名称更新イベント */
    const eventUpdateToDo = (event) => {
        clearTimeout(timer);

        const newTimer = setTimeout(() => {
            let data = {
                ...toDo,
                title: event.target.value,
            };
            updateToDoMutation.mutate(data);
        }, 1000);
        setTimer(newTimer);
    };

    /**削除イベント */
    const { deleteToDoMutation } = useDeleteToDoMutateTask();
    const eventDeleteToDo = (event) => {
        deleteToDoMutation.mutate(toDo);
    };

    /**ToDoDetail追加イベント */
    const { storeToDoDetailMutation } = useStoreToDoDetailMutateTask();
    const eventStoreToDoDetail = (event) => {
        storeToDoDetailMutation.mutate(toDo);
    };

    return (
        <Card>
            <TextField
                variant="standard"
                margin="dense"
                defaultValue={props.toDo.title}
                fullWidth
                onChange={eventUpdateToDo}
            />
            <CardContent>
                <List>
                    {props.toDo.to_do_details.map((detail) => {
                        return <ToDoDetail key={detail.id} detail={detail} />;
                    })}
                </List>
            </CardContent>
            <CardActions>
                <IconButton edge="start" aria-label="add" color="primary" onClick={eventStoreToDoDetail}>
                    <AddCircle />
                </IconButton>
                <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={eventDeleteToDo}
                >
                    <Delete />
                </IconButton>
            </CardActions>
        </Card>
    );
}
export default ToDo;