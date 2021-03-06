import json

from rest_framework import serializers

from atoutprises.voies.models import Wall, Route, Top


class JSONSerializerField(serializers.Field):
    """ Serializer for JSONField -- required to make field writable"""
    def to_internal_value(self, data):
        return json.dumps(data)

    def to_representation(self, value):
        return json.loads(value)


class WallSerializer(serializers.ModelSerializer):
    tiles_per_zoom = JSONSerializerField()

    class Meta:
        model = Wall
        fields = ('id', 'key', 'label', 'max_zoom', 'tiles_per_zoom')


class RouteSerializer(serializers.ModelSerializer):
    wall = serializers.PrimaryKeyRelatedField(many=False, queryset=Wall.objects.all())
    holds = JSONSerializerField()

    class Meta:
        model = Route
        fields = ('id', 'wall', 'setter', 'color', 'grade', 'lane', 'holds', 'tops')


class TopSerializer(serializers.ModelSerializer):
    route = RouteSerializer(many=False, read_only=True)

    class Meta:
        model = Top
        fields = '__all__'