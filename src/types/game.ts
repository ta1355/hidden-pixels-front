export interface Game {
  id: number;
  appId: number;
  name: string;
  releaseDate: string;
  price: string;
  peakCCU: number;
  developer: string;
  publisher: string;
  headerImage: string;
  genres: string[];
  tags: string[];
  supportedLanguages: string[];
}
