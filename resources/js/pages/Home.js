import React from 'react';

import Grid from '@mui/material/Grid';
import ToDo from '../components/ToDo';
import { useCurrentToDoList, useGetToDoList } from '../hooks/ToDoList';
import { Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useStoreToDoMutateTask } from '../hooks/ToDo';

//**スタイル */
const fabStyle = {
    position: "fixed",
    bottom: 16,
    right: 16,
};

function Home() {
    /**ToDo追加イベント */
    const { storeToDoMutation } = useStoreToDoMutateTask();
    const eventStoreToDo = (event) => {
        storeToDoMutation.mutate();
    };

    const { isLoading } = useGetToDoList();
    const toDoList = useCurrentToDoList();
    if (isLoading) return "Now Loading.........";
    return (
        <div>
            <Grid container spacing={2}>
                {toDoList.map((toDo) => (
                    <Grid item key={toDo.id} xs={3}>
                        <ToDo toDo={toDo} />
                    </Grid>
                ))}
            </Grid>
            <Fab
                color="primary"
                aria-label="add"
                sx={fabStyle}
                onClick={eventStoreToDo}
            >
                <Add />
            </Fab>
        </div>
    );
}

export default Home;
