from django.http import FileResponse
from django.shortcuts import get_object_or_404
from django.conf import settings
import os


def document_barcode_image(barcode_id):
    barcode_path = os.path.join(settings.STATIC_ROOT, 'assets/dist/img/barcode', barcode_id + '.png')
    # Serve the file using Django's FileResponse
    with open(barcode_path, 'rb') as f:
        response = FileResponse(f)
        response['Content-Disposition'] = f'attachment; filename="{barcode_id}.png"'
        return response
