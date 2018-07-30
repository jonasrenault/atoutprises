import json
from math import floor

from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from atoutprises.config.common import Common
from atoutprises.users.permissions import IsAdminOrReadOnly
from atoutprises.voies.tiler import tile_image
from atoutprises.voies.models import Wall, Route, Top
from atoutprises.voies.serializers import WallSerializer, RouteSerializer, TopSerializer

ROUTE_DEFAULT_POINTS = 1000

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

    @action(methods=['get'], detail=True, permission_classes=[IsAuthenticated])
    def top(self, request, pk):
        route = self.get_object()
        climber = request.user
        top = Top(climber=climber, route=route)
        top.save()
        climber.set_max_grade(route.grade)
        update_scores(route, climber)
        serializer = TopSerializer(top)
        return Response(serializer.data)


def update_scores(route, climber):
    tops = route.toppers.all()
    print(tops)
    for top in tops:
        topper = top.climber
        if topper.id != climber.id:
            malus = floor(ROUTE_DEFAULT_POINTS / (len(tops) - 1)) if len(tops) > 2 else ROUTE_DEFAULT_POINTS
            topper.score -= malus
        bonus = floor(ROUTE_DEFAULT_POINTS / len(tops))
        topper.score += bonus
        topper.save()


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