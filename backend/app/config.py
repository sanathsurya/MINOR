class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://user:password@localhost/secure_pds_db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'your_secret_key'
    JWT_SECRET_KEY = 'your_jwt_secret_key'
