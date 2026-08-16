export type Session = {
  ip: string;
  currentDevice: boolean;
  device: string;
  createdAt: number;
  browser: string;
  id: number;
  area: {
    city: string;
    country: string;
    ip: string;
    province: string;
  };
  extra: string;
};
