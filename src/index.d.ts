export interface IGPTMessage {
  role: string;
  content: string;
}

export interface IThreadMessage {
  date: Date;
  sequence: number;
  role: string;
  content: string;
}

export interface IPersona {
  name: string;
  messages: IThreadMessage[];
}

