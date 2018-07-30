import json

from rest_framework import permissions, viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from atoutprises.config.common import Common
from atoutprises.users.permissions import IsAdminOrReadOnly
from atoutprises.voies.tiler import tile_image
from atoutprises.voies.models import Wall, Route
from atoutprises.voies.serializers import WallSerializer, RouteSerializer


class WallViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing mur instances.
    """
    permission_classes = (IsAdminOrReadOnly,)
    serializer_class = WallSerializer
    queryset = Wall.objects.all()


class RouteViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing mur instances.
    """
    permission_classes = (IsAdminOrReadOnly,)
    serializer_class = RouteSerializer
    queryset = Route.objects.all()


class WallTileView(APIView):
    """
    Creates the tiles for a mur.

    * restricted to admin users
    """
    permission_classes = (permissions.IsAdminUser,)

    def get(self, request, pk):
        mur = get_object_or_404(Wall, pk=pk)
        tiles_per_zoom = tile_image('/Users/jonas/Desktop/atoutprises/mur.png', 256, Common.STATIC_ROOT)
        mur.tiles_per_zoom = json.dumps(tiles_per_zoom)
        mur.max_zoom = max(tiles_per_zoom.keys())
        mur.save()

        serializer = WallSerializer(mur)
        return Response(serializer.data)