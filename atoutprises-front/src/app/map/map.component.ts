import { Component, OnInit, Input, OnChanges, SimpleChange, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Zoom from 'd3-zoom';
import * as d3Tile from 'd3-tile';
import { environment } from '../../environments/environment';
import { WallService } from '../services/wall.service';
import { Wall } from '../models/wall';

class MapProperties {
  width: number;
  height: number;
}

class Prise {
  x: number;
  y: number;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {

  @ViewChild('mapcontainer') container: ElementRef;
  private props = new MapProperties();
  private tilesUrl = environment.staticEndpoint;
  private svg: any;
  private zoom: any;
  private tile: any;
  private raster: any;
  private pointsLayer: any;
  private tiles: any;
  private mur: Wall;
  private prises = new Array<Prise>();

  constructor(private wallService: WallService) {
  }

  ngOnInit() {
    this.wallService.getWalls().subscribe(murs => this.mur = murs[0]);
  }

  ngAfterViewInit() {
    const boundingRect = this.container.nativeElement.getBoundingClientRect();
    this.props.width = boundingRect.width - 4;
    this.props.height = boundingRect.height - 4;
    this.wallService.getWalls().subscribe(murs => {
      this.mur = murs[0];
      this.initZoom();
      this.initSvg();
      this.resetZoom();
    });
  }

  private initZoom() {
    this.zoom = d3Zoom.zoom().scaleExtent([1, 16]).on('zoom', this.zoomed.bind(this));
  }

  private resetZoom() {
    // Apply a zoom transform equivalent to projection.{scale,translate,center}.
    this.svg.call(this.zoom).call(this.zoom.transform, d3Zoom.zoomIdentity);
  }

  private initSvg() {
    this.tile = d3Tile.tile().size([this.props.width, this.props.height]).wrap(false);
    this.svg = d3.select('svg').attr('preserveAspectRatio', 'xMinYMin meet')
      // .attr('width', this.props.width)
      // .attr('height', this.props.height)
      .attr('viewBox', `0 0 ${this.props.width} ${this.props.height}`)
      .classed('svg-content', true);
    this.svg.on('click', this.clicked.bind(this));
    this.raster = this.svg.append('g');
    this.pointsLayer = this.svg.append('g');
  }

  private zoomed() {
    let t = d3.event.transform;
    t = t.translate(700, 512).scale(1024);
    this.tiles = this.tile.scale(t.k).translate([t.x, t.y])();
    this.tileLayers();
    this.drawPoints();
  }

  private clicked() {
    const t = d3.event;
    const transform = d3Zoom.zoomTransform(this.svg.node());
    const mouseX = d3.event.layerX || d3.event.offsetX;
    const mouseY = d3.event.layerY || d3.event.offsety;
    const coordinates = transform.invert([mouseX, mouseY]);
    coordinates[0] = coordinates[0] - 188;
    console.log('Pushing prise');
    this.prises.push({x: coordinates[0], y: coordinates[1]} as Prise);
    this.drawPoints();
  }

  private drawPoints() {
    const transform = d3Zoom.zoomTransform(this.svg.node());
    const circle = this.pointsLayer.selectAll('circle').data(this.prises);
    circle.exit().remove();

    circle.enter().append('circle').attr('stroke', 'greenyellow')
    .attr('fill', 'none')
    .merge(circle).attr('cx', d => transform.apply([d.x + 188, d.y])[0])
    .attr('cy', d => transform.apply([d.x + 188, d.y])[1])
    .attr('stroke-width', d => 0.5 * transform.k)
    .attr('r', d => transform.k * 4);
  }

  private tileLayers() {
    const image = this.raster.attr('transform', this.stringify(this.tiles.scale, this.tiles.translate))
    .selectAll('image').data(this.tiles, d => [d.tx, d.ty, d.z]);

    image.exit().remove();

    image.enter().append('image').attr('xlink:href', d => this.buildTileUrl(d.z, d.x, d.y))
      .attr('x', function(d) { return d.tx; })
      .attr('y', function(d) { return d.ty; })
      .attr('width', 256)
      .attr('height', 256);
  }

  private stringify(scale, translate) {
    const k = scale / 256;
    const r = scale % 1 ? Number : Math.round;
    return 'translate(' + r(translate[0] * scale) + ',' + r(translate[1] * scale) + ') scale(' + k + ')';
  }

  private buildTileUrl(zoom: number, x: number, y: number) {
    const max = this.mur.tiles_per_zoom[zoom];
    if (y < max[0] && x < max[1]) {
      return `${this.tilesUrl}/${zoom}/${x}/${y}.png`;
    }
    return '';
  }

}
