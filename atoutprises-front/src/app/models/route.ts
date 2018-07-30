export class Route {
  id: number;
  wall: number;
  setter: string;
  colour: string;
  grade: string;
  lane: string;
  holds: Hold[];
}

export class Hold {
  x: number;
  y: number;
}
