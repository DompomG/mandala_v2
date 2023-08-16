from flask import Flask, render_template, request, redirect, url_for
from PIL import Image
import base64
import io


# Start flask app
app = Flask(__name__)

prompt = []   
prompt_temp = []

def reconstruct_prompt(i, selection):
  while len(prompt) >= i:
    prompt.pop(len(prompt)-1)
  prompt.append(selection)



@app.route('/', methods=['GET', 'POSTe'])
def initial():
  return render_template('index.html')


@app.route('/type', methods=['POST'])
def type():
    templates = {
      "animals": "selected_animals.html",
      "flowers": "selected_flowers.html",
      "symbols": "selected_symbols.html",
      "animals_2": "selected_animals_2.html",
      "flowers_2": "selected_flowers_2.html",
      "symbols_2": "selected_symbols_2.html",
      "animals_3": "display",
      "flowers_3": "display",
      "symbols_3": "display"
    }

    prompt_dict = {
      #ANIMALS
      "animals_2A": "coloring book mandala with fox head in center, doodle pattern mane, vector art",
      "animals_2B": "coloring book mandala with lion head in center, african pattern mane, vector art",
      "animals_2C": "coloring book mandala with owl in center, doodle pattern feathers, vector art",
      #FLOWERS
      "flowers_2A": "coloring book mandala with spirit tree in center, pattern inside, pattern leaves boarder",
      "flowers_2B": "coloring book mandala with beautiful highly detailed vector rose in center, rose pattern, curved thorn boarder pattern",
      "flowers_2C": "coloring book mandala with leave pattern, psychedelic floral pattern boarder",
      #SYMBOLS
      "symbols_2A": "coloring book mandala with big crown symbol in center, cartoon diamand pattern doodle boarder, vector art",
      "symbols_2B": "coloring book mandala with dreamy castle in center, wavy flag boarder pattern, vector art, cute doodle patterns",
      "symbols_2C": "coloring book mandala with big cartoon vector star in center, small doodle star boarder pattern"
    }
    
    selection = request.form.get('select')
    sub_selection = selection[0:len(selection)-1]

    allowed_types = ["animals_2", "flowers_2", "symbols_2"]
    allowed_types_3 = ["animals_3", "flowers_3", "symbols_3"]

    if sub_selection in allowed_types:
      prompt.clear()
      prompt.append(prompt_dict.get(selection))
      print(prompt)
      return redirect(url_for("display"))  
      #return render_template(templates.get(sub_selection))  
    elif sub_selection in allowed_types_3:
      return redirect(url_for(templates.get(sub_selection)))
    return render_template(templates.get(selection))




@app.route('/display', methods=['POST', 'GET'])
def display():
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
  app.run(debug=True)


