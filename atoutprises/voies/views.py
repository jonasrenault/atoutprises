import json
import random
from math import floor

from django.contrib.auth import get_user_model
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


User = get_user_model()


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
        top = create_top(route, climber)
        serializer = TopSerializer(top)
        return Response(serializer.data)


def create_top(route, climber):
    top = Top(climber=climber, route=route)
    top.save()
    update_scores(route, climber)
    return top


def update_scores(route, climber):
    tops = route.toppers.all()
    for top in tops:
        topper = top.climber
        if topper.id != climber.id:
            malus = floor(Common.ROUTE_DEFAULT_POINTS / (len(tops) - 1)) if len(tops) > 2 else Common.ROUTE_DEFAULT_POINTS
            topper.score -= malus
        else:
            topper.set_max_grade(route.grade)
        bonus = floor(Common.ROUTE_DEFAULT_POINTS / len(tops))
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


class CreateFakeTopsView(APIView):
    """
    Creates fake tops for the routes
    """
    permission_classes = (permissions.IsAdminUser,)

    def get(self, request):
        users = User.objects.all()
        nb_routes = Route.objects.count()
        for user in users:
            route_ids = random.sample(range(1, nb_routes), random.randint(1, 12))
            for route_id in route_ids:
                route = Route.objects.get(pk=route_id)
                create_top(route, user)

        return Response({"ok": True})