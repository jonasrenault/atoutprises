export class Route {
  id: number;
  wall: number;
  setter: string;
  color: string;
  grade: string;
  lane: string;
  holds: Hold[];
}

export class Hold {
  x: number;
  y: number;
}

export class Top {
  id: number;
  date: Date;
  climber: string;
  route: Route;
}
