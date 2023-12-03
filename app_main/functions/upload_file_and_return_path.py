import os
import uuid
from django.conf import settings


def upload_file_and_return_path(file_index, uploaded_file):
    csv_files_path = os.path.join(settings.MEDIA_ROOT, file_index)
    if not os.path.exists(csv_files_path):
        os.makedirs(csv_files_path)

    # Generate a random filename using UUID
    unique_filename = f"{uuid.uuid4().hex}{os.path.splitext(uploaded_file.name)[1]}"
    file_path = os.path.join(csv_files_path, unique_filename)

    with open(file_path, 'wb+') as destination:
        for chunk in uploaded_file.chunks():
            destination.write(chunk)

    relative_path = os.path.relpath(file_path, settings.MEDIA_ROOT)
    return relative_path
