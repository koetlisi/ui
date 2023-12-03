import os

from barcode import get_barcode_class
from barcode.writer import ImageWriter
from django.conf import settings


def create_barcode(ean13):
    ean = get_barcode_class('ean13')
    ean_instance = ean(ean13, writer=ImageWriter())
    barcode_dir = os.path.join(settings.MEDIA_ROOT, 'assets/barcode')
    if not os.path.exists(barcode_dir):
        os.makedirs(barcode_dir)
    barcode_path = os.path.join(barcode_dir, ean13)
    ean_instance.save(barcode_path)
    relative_path = os.path.relpath(barcode_path + '.png', settings.STATIC_ROOT)
    return relative_path
