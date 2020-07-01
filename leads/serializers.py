from rest_framework import serializers
from leads.models import Lead, Activity

# Lead Serializer
class LeadSerializer(serializers.ModelSerializer):
  class Meta:
    model = Lead 
    fields = '__all__'


class ActivitySerializer(serializers.ModelSerializer):
  class Meta:
    model = Activity
    fields = '__all__'

