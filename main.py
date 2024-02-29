from flask import Flask, render_template


app = Flask(__name__, static_folder='static', template_folder='templates')


@app.route("/")
def root_route():
    return render_template('template.html')


if __name__ == "__main__":
    app.run(port=8080)

