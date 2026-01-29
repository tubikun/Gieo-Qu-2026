export interface UserInput {
  name: string;
  dob: string;
}

export interface FortuneResult {
  title: string;
  luckyNumber: number;
  luckyColor: string;
  
  // Specific categories requested
  health: string;      // Sức khỏe
  money: string;       // Tiền bạc
  wealth: string;      // Tài lộc
  love: string;        // Tình duyên
  fame: string;        // Công danh
  career: string;      // Sự nghiệp
  aiva: string;        // AIVA
}

export enum AppState {
  IDLE = 'IDLE',
  SHAKING = 'SHAKING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}
