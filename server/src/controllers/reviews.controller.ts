import { Request, Response } from 'express';

const getReviews = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const getReview = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const postReview = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const putReview = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const deleteReview = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const postLike = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const deleteLike = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

export default {
  getReviews,
  getReview,
  postReview,
  putReview,
  deleteReview,
  postLike,
  deleteLike,
};
