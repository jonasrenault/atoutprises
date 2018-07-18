import json

from rest_framework import permissions, viewsets
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.views import APIView

from atoutprises.config.common import Common
from atoutprises.voies.tiler import tile_image
from atoutprises.voies.models import Mur
from atoutprises.voies.serializers import MurSerializer


class MurViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    permission_classes = (permissions.AllowAny,)
    serializer_class = MurSerializer
    queryset = Mur.objects.all()


class MurTileView(APIView):
    """
    Creates the tiles for a dataset.

    * restricted to admin users
    """
    permission_classes = (permissions.AllowAny,)

    def get(self, request, pk):
        mur = get_object_or_404(Mur, pk=pk)
        tiles_per_zoom = tile_image('/Users/jonas/Desktop/imgs/mur.png', 256, Common.STATIC_ROOT)
        mur.tiles_per_zoom = json.dumps(tiles_per_zoom)
        mur.max_zoom = max(tiles_per_zoom.keys())
        mur.save()

        serializer = MurSerializer(mur)
        return Response(serializer.data)