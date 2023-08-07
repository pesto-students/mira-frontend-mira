import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  Box,
  Grid,
  Typography,
  Button,
} from '@mui/material';

import { useGetCardsQuery } from './cardApiSlice';
import { useAppSelector } from 'hooks';

const ListCards = () => {
  const { currentProject } = useAppSelector((state) => state.project);
  const [cards, setCards] = useState([]);

  const { data, isLoading, isSuccess } = useGetCardsQuery({
    projectId: currentProject._id,
  });

  useEffect(() => {
    if (isSuccess) {
      setCards(data.data.data);
    }
  }, [isLoading]);

  return (
    <Box sx={{ padding: 5, pt: 0 }}>
      <Typography variant="h5">List Cards</Typography>
      <div>
        <Button type="link" href="create">
          Create Card
        </Button>
      </div>
      {isLoading ? (
        'Loading cards ...'
      ) : (
        <List>
          {cards.map((card) => (
            <NavLink
              key={card._id}
              button
              component="a"
              to={`/projects/${currentProject._id}/cards/${card._id}`}
            >
              <ListItemText primary={card.title} />
            </NavLink>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ListCards;
