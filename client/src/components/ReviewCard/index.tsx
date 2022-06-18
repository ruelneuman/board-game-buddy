import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import type { Review } from '../../types';

dayjs.extend(relativeTime);

type ReviewCardProps = {
  review: Review;
};

function ReviewCard({ review }: ReviewCardProps) {
  const { user, rating, reviewText, likes, createdAt, updatedAt } = review;

  const isLiked = true; // to handle properly later
  const isOwned = true; // to handle properly later

  const handleClickLike = () => {
    // to implement
  };

  const handleClickEdit = () => {
    // to implement
  };

  const handleClickDelete = () => {
    // to implement
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }} aria-label="rating">
            {rating !== null ? rating.toFixed(1) : '-'}
          </Avatar>
        }
        title={user?.username ?? 'Anonymous'}
        subheader={`Posted ${dayjs(createdAt).fromNow()}`}
      />
      <CardContent>
        <Typography variant="body1">{reviewText}</Typography>
      </CardContent>
      <Stack direction="row" justifyContent="space-between">
        <CardActions sx={{ padding: 2 }}>
          <Button
            aria-label="Like"
            variant={isLiked ? 'contained' : 'outlined'}
            startIcon={isLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
            onClick={handleClickLike}
          >
            {likes.length}
          </Button>
          {isOwned && (
            <IconButton
              aria-label="Edit"
              color="primary"
              onClick={handleClickEdit}
            >
              <EditIcon />
            </IconButton>
          )}
          {isOwned && (
            <IconButton
              aria-label="Edit"
              color="primary"
              onClick={handleClickDelete}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </CardActions>
        <Typography
          variant="body2"
          component="div"
          color="text.secondary"
          sx={{ padding: 2, alignSelf: 'flex-end' }}
        >
          {createdAt !== updatedAt
            ? `Edited ${dayjs(updatedAt).fromNow()}`
            : ''}
        </Typography>
      </Stack>
    </Card>
  );
}

export default ReviewCard;
