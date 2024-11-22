from flask import Blueprint, request, jsonify, send_file
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.utils.encryption_utils import generate_key, encrypt_file, decrypt_file
from app.utils.aws_utils import upload_to_s3, download_from_s3
from app.models import PatientRecord
from app import db
import io

file_bp = Blueprint("files", __name__)

@file_bp.route("/upload", methods=["POST"])
@jwt_required()
def upload_file():
    user = get_jwt_identity()
    if user["role"] != "Admin":
        return jsonify({"message": "Unauthorized!"}), 403

    file = request.files.get("file")
    patient_id = request.form.get("patient_id")
    if not file or not patient_id:
        return jsonify({"message": "Missing file or patient ID!"}), 400

    # Encrypt file
    file_content = file.read()
    encryption_key = generate_key("secure_password")  # Replace with KMS or secure password
    encrypted_file = encrypt_file(file_content, encryption_key)

    # Upload to S3
    filename = file.filename
    upload_to_s3(io.BytesIO(encrypted_file), filename)

    # Save record
    record = PatientRecord(patient_id=patient_id, file_path=filename)
    db.session.add(record)
    db.session.commit()

    return jsonify({"message": "File uploaded successfully!"}), 201

@file_bp.route("/download/<filename>", methods=["GET"])
@jwt_required()
def download_file(filename):
    user = get_jwt_identity()
    if user["role"] not in ["Doctor", "Patient"]:
        return jsonify({"message": "Unauthorized!"}), 403

    # Check access
    record = PatientRecord.query.filter_by(file_path=filename, patient_id=user["id"]).first()
    if not record:
        return jsonify({"message": "Access denied!"}), 403

    # Download and decrypt file
    encrypted_file = download_from_s3(filename)
    encryption_key = generate_key("secure_password")  # Replace with secure password
    decrypted_file = decrypt_file(encrypted_file, encryption_key)

    # Serve file
    return send_file(io.BytesIO(decrypted_file), download_name=filename, as_attachment=True)
