export type SeatArrangementType = {
  sid?: string;
  status?: string;
  backgroundColor?: string;
  color?: string;
};

export type MovieType = {
  _id?: string;
  id?: number;
  movie?: string;
  movieDescription?: string;
  image?: string;
  timeAndDate?: string;
  seatsArrangement?: SeatArrangementType[];
};
