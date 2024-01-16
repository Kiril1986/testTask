export type Data = {
  success: string;
  messages: Message[];
};

export type Message = {
  dt: string;
  message: string;
  host: string;
};
