from django.conf import settings
from django.urls import path, re_path, include, reverse_lazy
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic.base import RedirectView
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token

from atoutprises.voies.views import WallViewSet, WallTileView, RouteViewSet
from .users.views import UserViewSet, UserProfileView, IsAdminView

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'walls', WallViewSet)
router.register(r'routes', RouteViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api/v1/walls/<int:pk>/tile/', WallTileView.as_view(), name='wall-tile'),
    path('api/v1/api-token-auth/', obtain_jwt_token),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('api/v1/profile/me/', UserProfileView.as_view(), name='user-profile'),
    path('api/v1/profile/isadmin/', IsAdminView.as_view(), name='user-isadmin'),

    # the 'api-root' from django rest-frameworks default router
    # http://www.django-rest-framework.org/api-guide/routers/#defaultrouter
    re_path(r'^$', RedirectView.as_view(url=reverse_lazy('api-root'), permanent=False)),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
