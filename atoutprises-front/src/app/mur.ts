export class Mur {
  id: number;
  label: string;
  key: string;
  max_zoom: number;
  tiles_per_zoom: { [key: number]: number[] };
}
