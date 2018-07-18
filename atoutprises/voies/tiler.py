import os
from math import log, ceil

from PIL import Image


class Tile(object):
    """Represents a single tile."""

    def __init__(self, image, number, position, coords):
        self.image = image
        self.number = number
        self.position = position
        self.coords = coords

    @property
    def row(self):
        return self.position[0]

    @property
    def column(self):
        return self.position[1]

    def save(self, directory, format='png'):
        filename = os.path.join(directory, '{}.{}'.format(self.column, format))
        self.image.save(filename, format)

    def __repr__(self):
        return '<Tile #{} ({}, {})>'.format(self.number, self.row, self.column)


def get_rows_cols_zoom(im_w, im_h, tile_size):
    rows = int(im_h / tile_size)
    if im_h % tile_size != 0:
        rows += 1

    columns = int(im_w / tile_size)
    if im_w % tile_size != 0:
        columns += 1

    zoom = max(ceil(log(rows, 2)), ceil(log(columns, 2)))

    return rows, columns, int(zoom)


def tile_image(filename, tile_size, save_dir=None):
    im = Image.open(filename)
    im_w, im_h = im.size
    zoom_dict = {}
    rows, columns, zoom = create_tiles(im, tile_size, save_dir)
    zoom_dict[zoom] = [rows, columns]
    while zoom > 1:
        im = im.resize((int(im_w / 2), int(im_h / 2)), Image.ANTIALIAS)
        im_w, im_h = im.size
        rows, columns, zoom = create_tiles(im, tile_size, save_dir)
        zoom_dict[zoom] = [rows, columns]

    # Create 256x256 level 0 tile
    im = Image.open(filename)
    im.thumbnail((tile_size, tile_size))
    tile = Tile(im, 1, (0, 0), (0, 0))
    zoom_dict[0] = [1, 1]
    if save_dir is not None:
        save_tiles([tile], save_dir, 0)

    return zoom_dict


def create_tiles(im, tile_size, save_dir=None):
    """
    Split an image into a specified number of tiles.
    Args:
       im (PIL.Image):  the image to split.
       tile_size (int):  The size of the tiles.
       save_dir (str): The dir to save the tiles to. If None, the tiles are not saved.
    Returns:
        zoom level.
    """
    im_w, im_h = im.size
    rows, columns, zoom = get_rows_cols_zoom(im_w, im_h, tile_size)
    tiles = []
    number = 1

    for y in range(0, rows):
        for x in range(0, columns):
            expand = False
            start_x = x * tile_size
            start_y = y * tile_size
            end_x = start_x + tile_size
            if end_x > im_w:
                end_x = im_w
                expand = True
            end_y = start_y + tile_size
            if end_y > im_h:
                end_y = im_h
                expand = True

            area = (start_x, start_y, end_x, end_y)
            crop = im.crop(area)
            if expand:
                image = Image.new('RGBA', (tile_size, tile_size), (0, 0, 0, 0))
                image.paste(crop, (0, 0))
            else:
                image = crop

            coords = (start_x, start_y)
            position = (x, y)
            tile = Tile(image, number, position, coords)
            tiles.append(tile)
            number += 1

    if save_dir is not None:
        save_tiles(tiles, save_dir, zoom)

    return rows, columns, zoom


def save_tiles(tiles, directory, zoom_level, format='png'):
    """
    Write image files to disk. Create specified folder(s) if they
       don't exist. Return list of :class:`Tile` instance.
    Args:
       tiles (list):  List, tuple or set of :class:`Tile` objects to save.
       directory (str):  Directory to save tiles. Created if non-existant.
       zoom_level (int): The current zoom_level.
    Returns:
        Tuple of :class:`Tile` instances.
    """
    if not os.path.exists(directory):
        os.mkdir(directory)
    zoom_dir = os.path.join(directory, str(zoom_level))
    if not os.path.exists(zoom_dir):
        os.mkdir(zoom_dir)
    for tile in tiles:
        row_dir = os.path.join(zoom_dir, str(tile.row))
        if not os.path.exists(row_dir):
            os.mkdir(row_dir)
        tile.save(row_dir, format)

    return tuple(tiles)


