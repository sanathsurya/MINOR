from app import create_app
from app.database import create_db

app = create_app()

if __name__ == '__main__':
    with app.app_context():
        create_db()
    app.run(debug=True)
