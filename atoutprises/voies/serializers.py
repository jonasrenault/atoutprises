import json

from rest_framework import serializers
from rest_framework.fields import JSONField

from atoutprises.voies.models import Mur


class JSONSerializerField(serializers.Field):
    """ Serializer for JSONField -- required to make field writable"""
    def to_internal_value(self, data):
        return json.dumps(data)

    def to_representation(self, value):
        return json.loads(value)


class MurSerializer(serializers.ModelSerializer):
    tiles_per_zoom = JSONSerializerField()

    class Meta:
        model = Mur
        fields = ('id', 'key', 'label', 'max_zoom', 'tiles_per_zoom')