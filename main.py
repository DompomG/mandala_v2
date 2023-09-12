from flask import Flask, render_template, request, redirect, url_for
from PIL import Image
import base64
import io
from time import sleep
from threading import Thread 


# Start flask app
app = Flask(__name__)

from prompt_dict import templates, prompt_dict

#Params
id = 0
check = 0
id_style = 0
prompt = [] 
generated_images = []

def add_prompt_id(index, elem):
  if (index == 0):
    prompt.clear()
  else:
    while (len(prompt) > 1):
      prompt.pop(0)
  prompt.append(int(elem))


#Slider Images
slides = ["lion_00.png", "owl_01.png", "fox_00.png", "tree_00.png", "leafe_00.png", "flower_00.png"]
slides_animals = ["lion_00.png", "lion_01.png", "lion_02.png", "owl_00.png", "owl_01.png", "owl_02.png", "fox_00.png", "fox_01.png", "fox_02.png"]
slides_nature = ["tree_00.png", "tree_01.png", "tree_02.png", "leafe_00.png", "leafe_01.png", "leafe_02.png", "flower_00.png", "flower_01.png", "flower_02.png"]
slides_lion = ["lion_00.png", "lion_01.png", "lion_02.png"]
slides_owl = ["owl_00.png", "owl_01.png", "owl_02.png"]
slides_fox = ["fox_00.png", "fox_01.png", "fox_02.png"]
slides_tree = ["tree_00.png", "tree_01.png", "tree_02.png"]
slides_leafe = ["leafe_00.png", "leafe_01.png", "leafe_02.png"]
slides_flower = ["flower_00.png", "flower_01.png", "flower_02.png"]
slides3 = ["00_lion.png", "00_owl.png", "00_fox.png"]


#Style
style_list = ["", "striped ", "twisted "]

#Prompts
prompt_dict = {
  #Animals 0:lion 1:owl 2:fox
  0: "circular coloring book emblem with a cute lion head in center, long hair pattern mane, circular ",
  1: "circular coloring book emblem with a owl in center, long feathers, circular ",
  2: "circular coloring book emblem with a cute fox head in center, long swirly hair mane, circular ",
  #Nature 0:tree 1:leafe 2:flower
  3: "circular coloring book emblem with a big enchanted tree in center, circular ",
  4: "circular coloring book emblem with a big maple leaf in center, tentacles and branches twisting, circular ",
  5: "circular coloring book emblem with a intricate flower in center, circular ",
}

#List Options
style_list = ["", "striped ", "twisted "]
prompt_end = "border, coloring book style, black and white"

@app.route('/', methods=['POST', 'GET'])
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
  
  # Update slides2 Animals/Nature
  slides2 = []
  if prompt[0] == 0: 
    slides2 = slides_lion
  elif prompt[0] == 1:
    slides2 = slides_owl
  elif prompt[0] == 2:
    slides2 = slides_fox
  elif prompt[0] == 3:
    slides2 = slides_tree
  elif prompt[0] == 4:
    slides2 = slides_leafe    
  elif prompt[0] == 5:
    slides2 = slides_flower  
  return render_template("pattern.html", slides=slides2, image_name=image_name, category_id=id)


@app.route('/generate', methods=['POST', 'GET'])
def generate():
  sleep(4)
  if "selection" in request.form: 
    id_style = request.form.get('selection')
  else: 
    id_style = "0"
    print("Attention: No ID-Value Passed!!!")
  add_prompt_id(1, str(id_style))  
  #Get Keys
  final_prompt = prompt_dict.get(prompt[0]) + style_list[prompt[1]] + prompt_end
  print("Prompt: " + final_prompt)


  generated_images.clear()
  for i in range(len(slides3)):
    data = io.BytesIO()
    img = Image.open('static/images/' + slides3[i])
    img.save(data, format='PNG')
    generated_images.append(base64.b64encode(data.getvalue()).decode('utf-8'))
  #return redirect(url_for("results"))
  return render_template('result.html', generated_img=generated_images, prompt=final_prompt)


if __name__ == '__main__':
  #app.run()
  app.run(debug=True)


