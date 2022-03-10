import { Request, Response } from 'express';

const getReviews = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const getReview = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const createReview = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const updateReview = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const deleteReview = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const likeReview = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

const unlikeReview = (_req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

export default {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  likeReview,
  unlikeReview,
};
