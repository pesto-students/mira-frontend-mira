import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Grid,
  Typography,
  Button,
} from '@mui/material';

import { getCardList } from 'api/api';

const ListCards = () => {
  const [cardList, setCardList] = React.useState([]);
  useEffect(() => {
    (async () => {
      const response = await getCardList(projectId);
      if (response.status == 'success') {
        setCardList(response.data.data);
      }
    })();
  }, []);
  const { projectId } = useParams();

  return (
    <Box sx={{ padding: 5, pt: 0 }}>
      <Typography variant="h5">List Cards</Typography>
      <div>
        <Button type="link" href="create">
          Create Card
        </Button>
      </div>
      <List>
        {cardList.map((card) => (
          <ListItem
            key={card._id}
            button
            component="a"
            href={`/projects/${projectId}/cards/${card._id}`}
          >
            <ListItemText primary={card.title} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ListCards;
