from rest_framework import pagination
from rest_framework.response import Response


class ContentRangeHeaderPagination(pagination.PageNumberPagination):

    def get_paginated_response(self, data):
        headers = {'X-Page': self.page.number, 'X-Per-Page': self.page_size,
                   'X-Total': self.page.paginator.count,
                   'X-Total-Pages': self.page.paginator.num_pages,
                   'Access-Control-Expose-Headers': 'X-Page, X-Per-Page, X-Total, X-Total-Pages'}

        return Response(data, headers=headers)


class ContentRangeHeaderLimitOffsetPagination(pagination.LimitOffsetPagination):

    def get_paginated_response(self, data):
        content_range = 'items {0}-{1}/{2}'.format(self.offset, self.offset + self.limit, self.count)
        headers = {'Content-Range': content_range}
        return Response(data, headers=headers)