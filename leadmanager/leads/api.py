from leads.models import Lead,Activity
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer,ActivitySerializer

# Lead Viewset


class LeadViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = LeadSerializer

    def get_queryset(self):
        return self.request.user.leads.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class ActivityViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = ActivitySerializer

    def get_queryset(self):
        return self.request.user.activities.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
