from rest_framework import routers
from .api import LeadViewSet,ActivityViewSet

router = routers.DefaultRouter()
router.register('api/leads', LeadViewSet, 'leads')
router.register('api/activities', ActivityViewSet, 'activities')

urlpatterns = router.urls