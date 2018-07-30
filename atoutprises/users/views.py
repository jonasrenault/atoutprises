from rest_framework import viewsets, permissions
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import User
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'list':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAdminUser]
        return [permission() for permission in permission_classes]


class UserProfileView(APIView):
    """
    Returns the current user's profile.

    * user must be logged in
    """
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


class IsAdminView(APIView):
    """
    Convenience view to check whether the user is an admin or not.
    Returns true if the user is an admin

    * only admins can access this view
    """
    permission_classes = (permissions.IsAdminUser, )

    def get(self, request):
        return Response(True)