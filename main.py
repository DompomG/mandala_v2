from flask import Flask, render_template, request, redirect, url_for
from PIL import Image
import base64
import io


# Start flask app
app = Flask(__name__)

from prompt_dict import templates, prompt_dict

#Params
id = 0
id_style = 0
prompt = [] 

def add_prompt_id(index, elem):
  if (index == 0):
    prompt.clear()
  else:
    while (len(prompt) > 1):
      prompt.pop(0)
  prompt.append(elem)

slides = ["01_lion.png", "02_owl.png", "03_fox.png", "04_tree1.png", "04_tree2.png", "04_tree3.png"]
slides2 = ["01_lion.png", "02_owl.png", "03_fox.png", "04_tree1.png", "04_tree2.png", "04_tree3.png", "04_tree1.png", "04_tree2.png", "04_tree3.png"]
slides3 = ["01_lion.png", "02_owl.png", "03_fox.png"]

@app.route('/', methods=['GET', 'POST'])
def initial():
  return render_template('index.html', slides=slides)

@app.route('/home', methods=['GET', 'POST'])
def home():
  return render_template('index.html', slides=slides)


@app.route('/pattern', methods=['POST', 'GET'])
def pattern():
  id = request.form.get('selection')
  add_prompt_id(0, id)
  print("Picked Image " + id + ": " + slides[int(id)])
  image_name = slides[int(id)]
  return render_template("pattern.html", slides=slides2, image_name=image_name, id=id)


@app.route('/generate', methods=['POST', 'GET'])
def generate():
  id_style = request.form.get('selection')
  add_prompt_id(1, id_style)  

  generated_images = []
  for i in range(len(slides3)):
    data = io.BytesIO()
    img = Image.open('static/images/' + slides3[i])
    img.save(data, format='PNG')
    generated_images.append(base64.b64encode(data.getvalue()).decode('utf-8'))
  return render_template('result.html', generated_img=generated_images)

if __name__ == '__main__':
  #app.run()
  app.run(debug=True)


