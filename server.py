from flask import Flask,jsonify,request,send_file
import json
import os

app = Flask(__name__)

json_file = open('db.json','r')
data = json_file.read()
json_file.close()
file_data = json.loads(data)


@app.route('/dishes',methods=['GET'])
def get_dishes():
    return jsonify(file_data['dishes'])

@app.route('/comments',methods=['GET'])
def get_comments():
    return jsonify(file_data['comments'])

@app.route('/comments',methods=['POST'])
def post_comments():
    json_data = json.loads(request.data)
    print(json_data)
    file_data['comments'].append(json_data)
    with open('db.json','w') as f: 
        json.dump(file_data, f, indent=4) 
    return jsonify({'message' : 'ok'})

@app.route('/promotions',methods=['GET'])
def get_promotions():
    return jsonify(file_data['promotions'])

@app.route('/leaders',methods=['GET'])
def get_leaders():
    return jsonify(file_data['leaders'])

@app.route('/feedback',methods=['GET'])
def get_feedback():
    return jsonify(file_data['feedback'])

@app.route('/feedback',methods=['POST'])
def post_feedback():
    json_data = json.loads(request.data)
    print(json_data)
    file_data['feedback'].append(json_data)
    with open('db.json','w') as f: 
        json.dump(file_data, f, indent=4) 
    return jsonify({'message' : 'ok'})

@app.route('/images/<name>',methods=['GET'])
def get_image(name):
    path = os.path.join(os.getcwd(),'public\\images')
    filename = path + '\\{}'.format(name)
    return send_file(filename)
    
#GET /images/uthappizza.png HTTP/1.1[0m" 404 -

if __name__ == "__main__":
    app.run(debug=True,port=5000)

    