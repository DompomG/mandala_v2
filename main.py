from flask import Flask, render_template, request, redirect, url_for
from PIL import Image
import base64
import io


# Start flask app
app = Flask(__name__)

from prompt_dict import templates, prompt_dict
id = 0
prompt = []   
def reset_prompt(i, selection):
  while len(prompt) >= i:
    prompt.pop(len(prompt)-1)
  prompt.append(selection)

slides = ["01_lion.png", "02_owl.png", "03_fox.png", "04_tree1.png", "04_tree2.png", "04_tree3.png"]
slides2 = ["01_lion.png", "02_owl.png", "03_fox.png", "04_tree1.png", "04_tree2.png", "04_tree3.png", "04_tree1.png", "04_tree2.png", "04_tree3.png"]

@app.route('/', methods=['GET', 'POST'])
def initial():
  return render_template('test.html', slides=slides)

@app.route('/home', methods=['GET', 'POST'])
def home():
  return render_template('test.html', slides=slides)


@app.route('/pattern', methods=['POST'])
def pattern():
  id = request.form.get('select')
  image_name = slides[int(id)]
  return render_template("pattern.html", slides=slides2, image_name=image_name)


@app.route('/generate', methods=['POST', 'GET'])
def generate():
  img = Image.open('test-image.png')

  data = io.BytesIO()
  img.save(data, format='PNG')
  encoded_img_data = base64.b64encode(data.getvalue())

  prompt_str = ""
  for x in prompt:
    prompt_str += x + ", "
  print('Current Prompt: ' + prompt_str)

  return render_template('display.html', img_data=encoded_img_data.decode('utf-8'), prompt_str=prompt_str)

if __name__ == '__main__':
  app.run()
  #app.run(debug=True)


